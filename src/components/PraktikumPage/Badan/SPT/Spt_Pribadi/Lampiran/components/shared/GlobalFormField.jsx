import React, { useState, useEffect, useMemo } from "react";
import { formatNumber, parseFormattedNumber } from "../../utils/formatCurrency";
import { defaultYearPickerProps } from "../../utils/datePickerUtils";
import Select from "react-select";

function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}

// BASE FIELDS INDUK - Field yang pasti ada di berbagai tempat
export const BASE_FIELD_TEMPLATES = {
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
    required: true,
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
    required: false,
    readOnly: true,
    className: "bg-gray-100 text-gray-600",
  },

  npwpPemotong: {
    key: "npwp",
    type: "text",
    title: "NPWP ",
    placeholder: "Nomor Identitas ",
    readOnly: false,
    required: true,
  },

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
};

// Komponen Global Form Field
export default function GlobalFormField({
  fields = [], // Array field config (langsung)
  baseFields = [], // Array nama field dari BASE_FIELD_TEMPLATES
  customChildren = [], // Array custom field objects
  formData = {}, // Data form
  onFieldChange, // Callback onChange(key, value)
  readOnlyFields = [], // Array key field yang readonly
  errors = {}, // Object error messages {key: errorMessage}
  labelWidth = "w-80", // Tailwind class untuk width label
  hiddenFields = [], // Array key field yang disembunyikan
}) {
  const [apiData, setApiData] = useState({
    countries: [],
    currencies: [],
    loading: false,
  });

  // Helper function untuk currency label
  const currencyLabel = (currencies) => {
    if (!currencies) return "—";
    const [code, obj] = Object.entries(currencies)[0] || [];
    if (!code || !obj?.name) return "—";
    return `${obj.name} (${code})`;
  };

  // Load countries data untuk select-search
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

  // Build allFields dari baseFields dan customChildren
  const allFields = useMemo(() => {
    // Jika fields sudah langsung dikirim, gunakan itu
    if (fields && fields.length > 0) {
      return fields;
    }

    // Jika pakai baseFields + customChildren
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

    // Sort berdasarkan urutan di baseFields
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
  }, [fields, baseFields, customChildren]);

  // Filter visible fields
  const visibleFields = useMemo(() => {
    return allFields.filter((field) => !hiddenFields.includes(field.key));
  }, [allFields, hiddenFields]);

  // Update field value
  const updateField = (key, value) => {
    if (onFieldChange) {
      onFieldChange(key, value);
    }
  };

  // Render field berdasarkan type
  const renderField = (field) => {
    // GROUP FIELD DENGAN 1 LABEL
    // ...di dalam renderField...
    if (field.type === "group" && Array.isArray(field.fields)) {
      return (
        <div key={field.key} className="space-y-1">
          <div className="flex items-center gap-4">
            <label className={`text-sm font-medium text-gray-700 ${labelWidth} flex-shrink-0`}>
              {field.title}
            </label>
            <div className="flex flex-1 gap-4">
              {field.fields.map((f) => {
                const value =
                  f.type === "currency" ? formatNumber(formData[f.key]) : formData[f.key] || "";
                const isReadOnly = f.readOnly;
                return (
                  <div key={f.key} className="flex-1">
                    {f.subLabel && <div className="text-xs text-gray-500 mb-1">{f.subLabel}</div>}
                    <input
                      type={f.type}
                      value={value}
                      onChange={(e) => {
                        const val =
                          f.type === "currency"
                            ? parseFormattedNumber(e.target.value)
                            : e.target.value;
                        updateField(f.key, val);
                      }}
                      placeholder={f.placeholder}
                      readOnly={isReadOnly}
                      className={`w-full flex-1 p-2 border rounded-md text-sm transition-colors ${
                        isReadOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    const { key, type, title, placeholder, className, rows = 3, format } = field;
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

    // Horizontal layout wrapper
    const fieldWrapper = (content) => (
      <div key={key} className="space-y-1">
        <div className="flex items-center gap-4">
          <label className={`text-sm font-medium text-gray-700 ${labelWidth} flex-shrink-0`}>
            {title}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {content}
        </div>
        {hasError && <p className="text-red-500 text-xs mt-1 ml-52">{hasError}</p>}
      </div>
    );

    switch (type) {
      case "select":
        return fieldWrapper(
          <select
            value={value}
            onChange={(e) => {
              const selectedValue = e.target.value;

              if (field.onChange) {
                const selectedOption = field.options?.find((opt) => opt.value === selectedValue);
                updateField(key, selectedValue);
                setTimeout(() => {
                  field.onChange(selectedValue, updateField, selectedOption);
                }, 0);
              } else {
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
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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

      case "month":
        return fieldWrapper(
          <input
            type="month"
            value={value}
            onChange={(e) => updateField(key, e.target.value)}
            placeholder={placeholder}
            readOnly={isReadOnly}
            className={baseInputClass}
          />
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

  return <div className="space-y-4">{visibleFields.map(renderField)}</div>;
}
