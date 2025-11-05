import React, { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { formatNumber, parseFormattedNumber } from "../../utils/formatCurrency";
import { defaultYearPickerProps } from "../../utils/datePickerUtils";
import Select from "react-select";
function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}

//  BASE FIELDS INDUK - Field yang pasti ada di berbagai tempat / Defautlt fields bisa di tambah jika mau  hehe
const BASE_FIELD_TEMPLATES = {
  // Field Global Untuk Semua Lampiran
  keterangan: {
    key: "keterangan",
    type: "textarea",
    title: "Keterangan",
    placeholder: "Masukkan keterangan",
    rows: 3,
    required: false,
  },

  alamat: {
    key: "alamat",
    type: "textarea",
    title: "Alamat",
    placeholder: "Masukkan alamat",
    rows: 2,
    required: false,
  },

  bulanTahun: {
    key: "bulanTahun",
    type: "month",
    title: "Bulan dan Tahun",
    placeholder: "Pilih bulan dan tahun",
    required: true,
  },

  tahun: {
    key: "tahun",
    type: "year",
    title: "Tahun",
    placeholder: "Pilih tahun",
    required: true,
    yearPickerProps: defaultYearPickerProps,
  },

  bulan: {
    key: "bulan",
    type: "select",
    title: "Bulan",
    placeholder: "Pilih bulan",
    required: true,
    options: [
      { value: "01", label: "Januari" },
      { value: "02", label: "Februari" },
      { value: "03", label: "Maret" },
      { value: "04", label: "April" },
      { value: "05", label: "Mei" },
      { value: "06", label: "Juni" },
      { value: "07", label: "Juli" },
      { value: "08", label: "Agustus" },
      { value: "09", label: "September" },
      { value: "10", label: "Oktober" },
      { value: "11", label: "November" },
      { value: "12", label: "Desember" },
    ],
  },

  calender: {
    key: "calender",
    type: "date",
    title: "Tanggal",
    placeholder: "Pilih tanggal",
    required: true,
  },

  pphdipotong: {
    key: "pphdipotong",
    type: "currency",
    title: "PPh Yang Dipotong/Dipungut",
    placeholder: "Masukkan jumlah PPh yang dipotong/dipungut",
    required: true,
  },

  namaPemotong: {
    key: "nama",
    type: "text",
    title: "Nama ",
    placeholder: "Nama ",
    required: true,
    readOnly: true,
    className: "bg-gray-100 text-gray-600",
  },

  npwpPemotong: {
    key: "npwp",
    type: "text",
    title: "NPWP ",
    placeholder: "Nomor Identitas ",
    required: true,
  },

  // Field untuk Lampiran 2

  alamatPemotong: {
    key: "alamatPemotong",
    type: "textarea",
    title: "Alamat Pemotong",
    placeholder: "Masukkan alamat pemotong",
    rows: 2,
    required: false,
  },

  kode: {
    key: "kode",
    type: "text",
    title: "Kode",
    placeholder: "Kode akan otomatis terisi",
    required: true,
    readOnly: true,
    className: "bg-gray-100 text-gray-600",
  },

  dasarPengenaanPajak: {
    key: "dasarPengenaanPajak",
    type: "currency",
    title: "Dasar Pengenaan Pajak",
    placeholder: "Masukkan jumlah dasar pengenaan pajak",
    required: true,
  },

  labakotor: {
    key: "labakotor",
    type: "currency",
    title: "Laba Kotor",
    placeholder: "Masukkan jumlah laba kotor",
    required: true,
  },
};

const GlobalModal = ({
  isOpen = false,
  onClose,
  onSave,
  title = "",
  size = "lg",

  baseFields = [], // Array nama field dari BASE_FIELD_TEMPLATES
  customChildren = [], // Array custom field objects
  fieldGroups = [], // Fallback ke sistem lama

  data = {},
  hiddenFields = [],
  readOnlyFields = [],
  saveButtonText = "Simpan",
  cancelButtonText = "Batal",
  showFooter = true,
  onFieldChange,
  validation = {},
  children,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  //  ADD STATE UNTUK API DATA
  const [apiData, setApiData] = useState({
    countries: [],
    currencies: [],
    loading: false,
  });

  // Initialize form data
  useEffect(() => {
    if (isOpen) {
      setFormData({ ...data });
      setErrors({});
    }
  }, [isOpen, data]);

  //  HELPER FUNCTION UNTUK CURRENCY LABEL
  const currencyLabel = (currencies) => {
    if (!currencies) return "—";
    const [code, obj] = Object.entries(currencies)[0] || [];
    if (!code || !obj?.name) return "—";
    return `${obj.name} (${code})`;
  };

  //  LOAD COUNTRIES DATA
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setApiData((prev) => ({ ...prev, loading: true }));
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,currencies,cca2");
        const countries = await res.json();

        const mapped = countries
          .map((c) => ({
            nama: c?.name?.common || "—",
            currencies: c?.currencies || null,
          }))
          .filter((x) => x.nama !== "—")
          .sort((a, b) => a.nama.localeCompare(b.nama, "id"));

        // Generate currency options
        const currencySet = new Set();
        for (const n of mapped) {
          if (!n.currencies) continue;
          for (const [code, obj] of Object.entries(n.currencies)) {
            if (obj?.name) currencySet.add(`${obj.name} (${code})`);
          }
        }
        const currencies = Array.from(currencySet)
          .sort((a, b) => a.localeCompare(b, "en"))
          .map((v) => ({ value: v, label: v }));

        if (mounted) {
          setApiData({
            countries: mapped.map((n, idx) => ({
              value: n.nama,
              label: n.nama,
              kodeNegara: String(idx + 1).padStart(3, "0"),
              mataUangPrefill: currencyLabel(n.currencies),
              currencies: n.currencies,
            })),
            currencies,
            loading: false,
          });
        }
      } catch (e) {
        console.error("Gagal mengambil data negara:", e);
        if (mounted) setApiData((prev) => ({ ...prev, loading: false }));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const allFields = useMemo(() => {
    const fieldMap = new Map();

    // Add base fields dari BASE_FIELD_TEMPLATES
    baseFields.forEach((fieldName) => {
      if (BASE_FIELD_TEMPLATES[fieldName]) {
        fieldMap.set(fieldName, BASE_FIELD_TEMPLATES[fieldName]);
      }
    });

    // Add custom children, override jika ada di base fields
    customChildren.forEach((field) => {
      fieldMap.set(field.key, field);
    });

    //  SORT berdasarkan urutan di baseFields
    const sortedFields = [];
    baseFields.forEach((fieldName) => {
      if (fieldMap.has(fieldName)) {
        sortedFields.push(fieldMap.get(fieldName));
      }
    });

    // Add remaining custom fields yang tidak ada di baseFields
    customChildren.forEach((field) => {
      if (!baseFields.includes(field.key)) {
        sortedFields.push(field);
      }
    });

    return sortedFields;
  }, [baseFields, customChildren]);

  // Filter visible fields
  const visibleFields = useMemo(() => {
    return allFields.filter((field) => !hiddenFields.includes(field.key));
  }, [allFields, hiddenFields]);

  // Update field value
  const updateField = (key, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [key]: value };
      return newData;
    });

    // Clear error untuk field ini
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }

    // Call external onChange if provided
    if (onFieldChange) {
      onFieldChange(key, value);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    visibleFields.forEach((field) => {
      const value = formData[field.key];

      // Required validation dengan handling khusus untuk currency dan number
      if (field.required) {
        if (field.type === "currency" || field.type === "number") {
          // Untuk currency/number, nilai 0 adalah valid, null/undefined/empty string tidak valid
          if (value === null || value === undefined || value === "") {
            newErrors[field.key] = `${field.title} harus diisi`;
            return;
          }
        } else {
          // Untuk field lain
          if (!value || (typeof value === "string" && !value.trim())) {
            newErrors[field.key] = `${field.title} harus diisi`;
            return;
          }
        }
      }
      // Custom validation - jalankan hanya jika value ada/tidak kosong
      if (field.validate && value !== null && value !== undefined && value !== "") {
        const error = field.validate(value);
        if (error) {
          newErrors[field.key] = error;
          return;
        }
      }

      // Global validation
      if (validation[field.key] && value) {
        const error = validation[field.key](value, formData);
        if (error) {
          newErrors[field.key] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  //  RENDER FIELD - HORIZONTAL LAYOUT
  const renderField = (field) => {
    const { key, type, title, placeholder, className, rows = 3, format, parse } = field;
    const isReadOnly = readOnlyFields.includes(key) || field.readOnly;
    const hasError = errors[key];

    const value = type === "currency" ? formData[key] : formData[key] || "";

    const baseInputClass = cn(
      "flex-1 p-2 border rounded-md text-sm transition-colors",
      isReadOnly
        ? "bg-gray-100 text-gray-600 cursor-not-allowed"
        : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      hasError ? "border-red-300 focus:ring-red-500" : "border-gray-300",
      className
    );

    //  HORIZONTAL LAYOUT WRAPPER
    const fieldWrapper = (content) => (
      <div key={key} className="space-y-1">
        {/* Horizontal Layout: Label kiri, Input kanan */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            {title}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {content}
        </div>
        {/* Error di bawah */}
        {hasError && <p className="text-red-500 text-xs mt-1 ml-52">{hasError}</p>}
      </div>
    );

    switch (type) {
      case "select":
        console.log("Rendering select field:", { key, options: field.options });

        return fieldWrapper(
          <select
            value={value}
            onChange={(e) => {
              const selectedValue = e.target.value;
              console.log("Select onChange:", { key, selectedValue });

              if (field.onChange) {
                const selectedOption = field.options?.find((opt) => opt.value === selectedValue);
                console.log("Custom onChange found:", { selectedOption });

                updateField(key, selectedValue);

                setTimeout(() => {
                  field.onChange(selectedValue, updateField, selectedOption);
                }, 0);
              } else {
                // console.log("Using default updateField");
                updateField(key, selectedValue);
              }
            }}
            disabled={isReadOnly}
            className={cn(
              baseInputClass,
              "w-full pr-9 appearance-none overflow-hidden text-ellipsis whitespace-nowrap"
            )}
          >
            <option value="">{placeholder}</option>
            {field.options?.map((option) => {
              // console.log("Rendering option:", option);
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        );

      case "textarea":
        return fieldWrapper(
          <textarea
            value={value}
            onChange={(e) => updateField(key, e.target.value)}
            placeholder={placeholder}
            readOnly={isReadOnly}
            rows={rows}
            className={cn(baseInputClass, "resize-none")}
          />
        );

      case "currency":
        return fieldWrapper(
          <input
            type="text"
            value={formatNumber(value)}
            onChange={(e) => {
              const numericValue = parseFormattedNumber(e.target.value);
              updateField(key, numericValue);
            }}
            placeholder={placeholder}
            readOnly={isReadOnly}
            inputMode="numeric"
            className={baseInputClass}
          />
        );

      case "display":
        return fieldWrapper(
          <div
            className={cn(
              "flex-1 p-2 bg-gray-50 border rounded-md text-sm text-gray-700",
              "border-gray-200"
            )}
          >
            {format ? format(value, formData) : value || "-"}
          </div>
        );

      case "number":
        return fieldWrapper(
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                updateField(key, "");
              } else {
                const numericValue = Number(val);
                updateField(key, numericValue);
              }
            }}
            placeholder={placeholder}
            readOnly={isReadOnly}
            min={field.min !== undefined ? field.min : 0}
            className={baseInputClass}
          />
        );

      //  Select Serach dari Library React
      case "select-search":
        let options = [];
        let isLoading = false;

        if (key === "negara") {
          options = apiData.countries;
          isLoading = apiData.loading;
        } else if (key === "mataUang") {
          options = apiData.currencies;
          isLoading = apiData.loading;
        } else {
          options = field.options || [];
        }

        return fieldWrapper(
          <div className="flex-1">
            <Select
              options={options}
              isClearable
              isLoading={isLoading}
              placeholder={isLoading ? "Memuat..." : placeholder}
              value={value ? options.find((o) => o.value === value) || null : null}
              onChange={(selected) => {
                const newValue = selected?.value || "";

                updateField(key, newValue);

                if (field.onChange) {
                  setTimeout(() => {
                    field.onChange(newValue, updateField, selected);
                  }, 0);
                }
              }}
              classNames={{
                control: () => cn(baseInputClass, "p-1"),
                input: () => "text-sm",
                placeholder: () => "text-gray-400 text-sm",
                singleValue: () => "text-sm text-gray-700",
                menu: () => "text-sm",
              }}
            />
          </div>
        );

      case "text":
      case "date":
      case "email":
      default:
        return fieldWrapper(
          <input
            type={type}
            value={value}
            onChange={(e) => updateField(key, e.target.value)}
            placeholder={placeholder}
            readOnly={isReadOnly}
            className={baseInputClass}
          />
        );
    }
  };

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-full mx-4",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={cn("bg-white rounded-lg shadow-xl w-full", sizeClasses[size])}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-96">
          {children || <div className="space-y-3">{visibleFields.map(renderField)}</div>}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {cancelButtonText}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {saveButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalModal;
