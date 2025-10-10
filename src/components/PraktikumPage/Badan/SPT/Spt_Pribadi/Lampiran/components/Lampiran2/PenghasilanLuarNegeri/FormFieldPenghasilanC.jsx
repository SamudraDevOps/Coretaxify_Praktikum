import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select"; // import react-select
import { formatRupiah, formatNumber, parseFormattedNumber } from "../../../utils/formatCurrency";

export const KODE_PENGHASILAN = [
  { id: 1, kode: "101", deskripsi: "Penghasilan dari pekerjaan dalam hubungan kerja" },
  { id: 2, kode: "102", deskripsi: "Penghasilan dari usaha dan/atau pekerjaan bebas" },
  { id: 3, kode: "103", deskripsi: "Penghasilan dari modal (dividen, bunga, royalti)" },
  { id: 4, kode: "104", deskripsi: "Penghasilan dari pekerjaan bebas (profesi luar negeri)" },
  { id: 5, kode: "105", deskripsi: "Penghasilan dari pengalihan harta (capital gain)" },
  { id: 6, kode: "106", deskripsi: "Penghasilan lainnya (hadiah, pensiun, dan sebagainya)" },
];

const FormFieldPenghasilanC = ({ modalData, updateModalData }) => {
  const [negaraRaw, setNegaraRaw] = useState([]);
  const [negLoading, setNegLoading] = useState(false);

  // helper: label mata uang "Full Name (CODE)"
  const currencyLabel = (currencies) => {
    if (!currencies) return "—";
    const [code, obj] = Object.entries(currencies)[0] || [];
    if (!code || !obj?.name) return "—";
    return `${obj.name} (${code})`;
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setNegLoading(true);
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,currencies,cca2");
        const countries = await res.json();

        const mapped = countries
          .map((c) => ({
            nama: c?.name?.common || "—",
            currencies: c?.currencies || null,
          }))
          .filter((x) => x.nama !== "—")
          .sort((a, b) => a.nama.localeCompare(b.nama, "id"));

        if (mounted) setNegaraRaw(mapped);
      } catch (e) {
        console.error("Gagal mengambil data negara:", e);
      } finally {
        if (mounted) setNegLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // === Options untuk react-select ===
  const negaraOptions = useMemo(
    () =>
      negaraRaw.map((n, idx) => ({
        value: n.nama,
        label: n.nama,
        kodeNegara: String(idx + 1).padStart(3, "0"), // 001.. berdasarkan urutan A-Z
        mataUangPrefill: currencyLabel(n.currencies),
      })),
    [negaraRaw]
  );

  const mataUangOptions = useMemo(() => {
    const set = new Set();
    for (const n of negaraRaw) {
      if (!n.currencies) continue;
      for (const [code, obj] of Object.entries(n.currencies)) {
        if (obj?.name) set.add(`${obj.name} (${code})`);
      }
    }
    return Array.from(set)
      .sort((a, b) => a.localeCompare(b, "en"))
      .map((v) => ({ value: v, label: v }));
  }, [negaraRaw]);

  // === Handlers react-select ===
  const handleNegaraChange = (selected) => {
    if (!selected) {
      updateModalData("negara", "");
      updateModalData("kodeNegara", "");
      updateModalData("nama", "");
      // Jangan hapus mataUang kalau user mau pertahankan pilihan manual
      return;
    }
    updateModalData("negara", selected.value);
    updateModalData("kodeNegara", selected.kodeNegara);
    updateModalData("nama", selected.value);

    console.log("Negara dipilih:", selected);

    // Prefill mata uang negara (boleh diubah user kemudian)
    if (selected.mataUangPrefill && selected.mataUangPrefill !== "—") {
      updateModalData("mataUang", selected.mataUangPrefill);
    }
  };

  const handleMataUangChange = (selected) => {
    updateModalData("mataUang", selected?.value || "");
  };

  const handleSelectChange = (fieldName) => (selectedValue) => {
    updateModalData(fieldName, selectedValue);

    // Logic khusus berdasarkan field yang diubah
    switch (fieldName) {
      case "jenis": {
        console.log("jenis dipilih:", selectedValue);
        if (selectedValue) {
          //  Cari data lengkap dari KODE_PENGHASILAN
          const selectedPenghasilan = KODE_PENGHASILAN.find((item) => item.kode === selectedValue);

          if (selectedPenghasilan) {
            updateModalData("kode", selectedPenghasilan.kode);
            updateModalData("jenisId", selectedPenghasilan.id);
            updateModalData("jenisDeskripsi", selectedPenghasilan.deskripsi);

            console.log("Data penghasilan lengkap:", selectedPenghasilan);
          }
        } else {
          updateModalData("kode", "");
          updateModalData("jenisId", "");
          updateModalData("jenisDeskripsi", "");
        }
        break;
      }
      default:
        break;
    }
  };

  // Function untuk handle input nilai piutang menggunakan utility function
  const handleNumericChange = (fieldName) => (e) => {
    const numericValue = parseFormattedNumber(e.target.value);
    updateModalData(fieldName, numericValue);
  };

  return (
    <div className="space-y-3">
      {/* Nama Pemberi Penghasilan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Nama Pemberi Penghasilan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={modalData.namaPemberi || ""}
          onChange={(e) => updateModalData("namaPemberi", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Nama Pemberi Penghasilan"
        />
      </div>

      {/*  Nama Negara */}
      {/* <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">Kode Negara</label>
        <select
          value={modalData.negara || ""}
          onChange={(e) => handleSelectChange("negara")(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Pilih Negara</option>
          {KODE_NEGARA.map((item) => (
            <option key={item.kode} value={item.nama}>
              {item.nama}
            </option>
          ))}
        </select>
      </div> */}

      {/* Nama Negara (react-select, searchable) */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">Nama Negara</label>
        <div className="flex-1">
          <Select
            options={negaraOptions}
            isClearable
            isLoading={negLoading}
            placeholder={negLoading ? "Memuat..." : "Cari atau pilih negara..."}
            value={
              modalData.negara
                ? negaraOptions.find((o) => o.value === modalData.negara) || null
                : null
            }
            onChange={handleNegaraChange}
            classNames={{
              control: () =>
                "flex-1 border rounded-md text-sm p-1 focus:ring-2 focus:ring-gray-500",
              input: () => "text-sm",
              placeholder: () => "text-gray-400 text-sm",
              singleValue: () => "text-sm text-gray-700",
              menu: () => "text-sm",
            }}
          />
        </div>
      </div>

      {/*Preview data yang dipilih */}
      {modalData.negara && (
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">Preview</label>
          <div className="flex-1 p-2 bg-blue-50 border border-blue-200 rounded-md text-sm">
            <div>
              <strong>Kode:</strong> {modalData.kodeNegara}
            </div>
            <div>
              <strong>Nama:</strong> {modalData.nama}
            </div>
            <div>
              <strong>Mata Uang:</strong> {modalData.mataUang}
            </div>
          </div>
        </div>
      )}

      {/* Tanggal Bukti Pemotongan / Pemumutan */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Tanggal Pemotongan
        </label>
        <input
          type="date"
          value={modalData.tanggalPemotongan || ""}
          onChange={(e) => updateModalData("tanggalPemotongan", e.target.value)}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/*  Jenis penghasilan dengan mapping */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Jenis Penghasilan
        </label>
        <div className="flex-1">
          <Select
            options={KODE_PENGHASILAN.map((item) => ({ value: item.kode, label: item.deskripsi }))}
            isClearable
            placeholder="Pilih Jenis Penghasilan"
            value={
              modalData.jenis
                ? {
                    value: modalData.jenis,
                    label:
                      KODE_PENGHASILAN.find((i) => i.kode === modalData.jenis)?.deskripsi ||
                      modalData.jenis,
                  }
                : null
            }
            onChange={(selected) => handleSelectChange("jenis")(selected ? selected.value : "")}
            classNames={{
              control: () =>
                "flex-1 border rounded-md text-sm p-1 focus:ring-2 focus:ring-gray-500",
              input: () => "text-sm",
              placeholder: () => "text-gray-400 text-sm",
              singleValue: () => "text-sm text-gray-700",
              menu: () => "text-sm",
            }}
          />
        </div>
      </div>

      {/* Kode */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Kode <span className="text-red-500">*</span>
        </label>
        <input
          readOnly
          type="text"
          value={modalData.kode || ""}
          className="flex-1 p-2 border rounded-md bg-gray-100 text-gray-600 text-sm"
          placeholder="Kode akan otomatis terisi"
        />
      </div>

      {/*  penghasilan Neto*/}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Penghasilan Neto
          {/* <span className="text-red-500">*</span>  */}
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.penghasilanNeto)}
          onChange={handleNumericChange("penghasilanNeto")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah penghasilan neto"
          inputMode="numeric"
        />
      </div>

      {/*  Pajak yang Dibayar/Dipotong/Terutang di Luar Negeri dalam 
Mata Uang Asing*/}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Pajak yang Dibayar/Dipotong/Terutang di Luar Negeri dalam Mata Uang Asing{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          // min={0}
          value={formatNumber(modalData.pajakDibayarLuarNegeri)}
          onChange={handleNumericChange("pajakDibayarLuarNegeri")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah pajak yang dibayar"
          inputMode="numeric"
        />    
      </div>

      {/* Mata Uang (react-select, searchable, bisa override prefill) */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">Mata Uang</label>
        <div className="flex-1">
          <Select
            options={mataUangOptions}
            isClearable
            placeholder="Cari atau pilih mata uang…"
            value={
              modalData.mataUang ? { value: modalData.mataUang, label: modalData.mataUang } : null
            }
            onChange={handleMataUangChange}
            classNames={{
              control: () =>
                "flex-1 border rounded-md text-sm p-1 focus:ring-2 focus:ring-gray-500",
              input: () => "text-sm",
              placeholder: () => "text-gray-400 text-sm",
              singleValue: () => "text-sm text-gray-700",
              menu: () => "text-sm",
            }}
          />
        </div>
      </div>

      {/*  Pajak yang Dibayar/Dipotong/Terutang di Luar Negeri dalam 
Mata Uang Rupiah*/}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Pajak yang Dibayar/Dipotong/Terutang di Luar Negeri dalam Mata Uang Rupiah{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          // min={0}
          value={formatNumber(modalData.pajakDibayarRupiah)}
          onChange={handleNumericChange("pajakDibayarRupiah")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah pajak yang dibayar"
          inputMode="numeric"
        />
      </div>

      {/*Preview data yang dipilih */}
      {/* {modalData.jenis && (
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
            Preview
          </label>
          <div className="flex-1 p-2 bg-blue-50 border border-blue-200 rounded-md text-sm">
            <div><strong>ID:</strong> {modalData.jenisId}</div>
            <div><strong>Kode:</strong> {modalData.kode}</div>
            <div><strong>Deskripsi:</strong> {modalData.jenisDeskripsi}</div>
          </div>
        </div>
      )} */}

      {/* Kredit yang dapat Diperhitungkan*/}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Kredit yang dapat diperhitungkan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          min={0}
          value={formatNumber(modalData.kreditYangDapatDiperhitungkan)}
          onChange={handleNumericChange("kreditYangDapatDiperhitungkan")}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm "
          placeholder="Masukkan jumlah kredit yang dapat diperhitungkan"
          inputMode="numeric"
        />
      </div>
    </div>
  );
};
export default FormFieldPenghasilanC;
