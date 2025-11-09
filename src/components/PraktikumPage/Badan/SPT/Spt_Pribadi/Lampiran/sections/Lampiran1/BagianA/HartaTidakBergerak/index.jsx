import DaftarHartaTidakBergerak from "./HartaTidakBergerak";

const DaftarHartaTidakBergerakconfig = {
  baseFields: [
    "kode",
    "deskripsi",
    "lokasiHarta",
    "ukuranTanah",
    "ukuranBangunan",
    "sumberKepemilikan",
    "nomorSertifikat",
    "tahunPerolehan",
    "biayaPerolehan",
    "nilaiSaatIni",
    "keteranganHarta",
  ],
  customChildren: [
    {
      key: "deskripsi",
      type: "select-search",
      title: "Deskripsi",
      placeholder: "Pilih jenis harta tidak bergerak",
      required: true,
      span: 1,
      options: [
        { id: 1, kode: "0501", value: "0501", label: "Tanah Kosong" },
        {
          id: 2,
          kode: "0502",
          value: "0502",
          label: "Tanah dan/atau Bangunan untuk Tempat Tinggal",
        },
        { id: 3, kode: "0503", value: "0503", label: "Apartemen" },
        { id: 4, kode: "0504", value: "0504", label: "Vessel" },
        {
          id: 5,
          kode: "0505",
          value: "0505",
          label: "Tanah atau Lahan untuk Usaha (Pertanian, Perkebunan, dsb)",
        },
        {
          id: 6,
          kode: "0506",
          value: "0506",
          label: "Tanah dan/atau Bangunan untuk Usaha (Toko, Pabrik, dsb)",
        },
        {
          id: 7,
          kode: "0507",
          value: "0507",
          label: "Tanah dan/atau Bangunan yang Disewakan",
        },
        { id: 8, kode: "0509", value: "0509", label: "Harta Tidak Bergerak Lainnya" },
      ],
      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },

    // UKURAN TANAH
    {
      key: "ukuranTanah",
      type: "number",
      title: "Ukuran Properti - Tanah (m²)",
      placeholder: "Masukkan luas tanah (m²)",
      required: true,
      inputMode: "decimal",
      min: 0,
      step: "any",
      // validate: (v) => {
      //   if (v === "" || v == null) return "Ukuran tanah harus diisi";
      //   if (Number(v) < 0) return "Ukuran tanah tidak boleh negatif";
      //   return true;
      // },
    },

    // UKURAN BANGUNAN
    {
      key: "ukuranBangunan",
      type: "number",
      title: "Ukuran Properti - Bangunan (m²)",
      placeholder: "Masukkan luas bangunan (m²)",
      required: true,
      inputMode: "decimal",
      min: 0,
      step: "any",
      // validate: (v) => {
      //   if (v === "" || v == null) return "Ukuran bangunan harus diisi";
      //   if (Number(v) < 0) return "Ukuran bangunan tidak boleh negatif";
      //   return true;
      // },
    },

    // SUMBER KEPEMILIKAN
    {
      key: "sumberKepemilikan",
      type: "select-search",
      title: "Sumber Kepemilikan",
      placeholder: "Pilih sumber kepemilikan",
      required: false,
      span: 1,
      options: [
        { id: 1, kode: "01", value: "01", label: "Warisan" },
        { id: 2, kode: "02", value: "02", label: "Hasil Sendiri" },
        { id: 3, kode: "03", value: "03", label: "Utang" },
        { id: 4, kode: "04", value: "04", label: "Hibah" },
        { id: 5, kode: "05", value: "05", label: "Hadiah" },
        { id: 6, kode: "06", value: "06", label: "Sumber Lainnya" },
      ],
    },

    // NOMOR SERTIFIKAT
    {
      key: "nomorSertifikat",
      type: "text",
      title: "Nomor Sertifikat",
      placeholder: "Masukkan nomor sertifikat",
      required: true,
      // validate: (v) =>
      //   !v || !String(v).trim() ? "Nomor sertifikat harus diisi" : true,
    },
  ],
};

const DaftarHartaTidakBergerakIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarHartaTidakBergerak config={DaftarHartaTidakBergerakconfig} />
    </div>
  );
};
export default DaftarHartaTidakBergerakIndex;
