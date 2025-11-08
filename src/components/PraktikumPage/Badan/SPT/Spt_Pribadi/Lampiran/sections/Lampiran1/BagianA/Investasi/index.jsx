import DaftarInvestasi from "./Investasi";

const DaftarInvestasiconfig = {
  baseFields: [
    "kode",
    "deskripsi",
    "lokasiharta",
    "nomoridentitas",
    "penerimaInvestasi",
    "buktiKepemilikan",
    "biayaPerolehan",
    "tahunPerolehan",
    "nilaiSaatIni",
    "keteranganHarta",
  ],
  customChildren: [
    {
      key: "deskripsi",
      type: "select",
      title: "Deskripsi",
      placeholder: "Pilih jenis harta",
      required: false,
      span: 1,
      options: [
        {
          id: 1,
          kode: "0301",
          value: "0301",
          label: "Saham yang dibeli untuk dijual kembali",
        },
        {
          id: 2,
          kode: "0302",
          value: "0302",
          label: "Saham Non Bursa",
        },
        {
          id: 3,
          kode: "0303",
          value: "0303",
          label: "Saham Bursa",
        },
        {
          id: 4,
          kode: "0304",
          value: "0304",
          label: "Obligasi Perusahaan",
        },
        {
          id: 5,
          kode: "0305",
          value: "0305",
          label: "Obligasi Pemerintah",
        },
        {
          id: 6,
          kode: "0306",
          value: "0306",
          label: "Surat Utang Lainnya",
        },
        {
          id: 7,
          kode: "0307",
          value: "0307",
          label: "Kontrak Investasi Kolektif (KIK) Indonesia",
        },
        {
          id: 8,
          kode: "0308",
          value: "0308",
          label: "Instrumen Derivatif",
        },
        {
          id: 9,
          kode: "0309",
          value: "0309",
          label: "Penyertaan modal dalam perusahaan lain yang bukan atas saham",
        },
        {
          id: 10,
          kode: "0310",
          value: "0310",
          label: "Asuransi",
        },
        {
          id: 11,
          kode: "0311",
          value: "0311",
          label: "Unit Link di Asuransi",
        },
        {
          id: 12,
          kode: "0399",
          value: "0399",
          label: "Investasi Lainnya",
        },
      ],
      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },
    {
      key: "lokasiharta",
      type: "text",
      title: "Lokasi Harta",
      placeholder: "Lokasi Harta",
      required: true,
    },

    {
      key: "penerimaInvestasi",
      type: "text",
      title: "Nama Bank/Institusi/Penerima Investasi",
      placeholder: "Nama Bank/Institusi/Penerima Investasi",
      required: true,
    },
    {
      key: "buktiKepemilikan",
      type: "text",
      title: "Bukti Kepemilikan/Nomor Akun",
      placeholder: "Bukti Kepemilikan/Nomor Akun",
      required: true,
    },
    {
      key: "biayaPerolehan",
      type: "currency",
      title: "Biaya Perolehan",
      placeholder: "Masukkan jumlah biaya perolehan",
      required: true,
    },
    {
      key: "nilaiSaatIni",
      type: "currency",
      title: "Nilai Saat ini",
      placeholder: "Masukkan jumlah nilai saat ini",
      required: true,
    },
  ],
};

const DaftarInvestasiIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarInvestasi config={DaftarInvestasiconfig} />
    </div>
  );
};

export default DaftarInvestasiIndex;
