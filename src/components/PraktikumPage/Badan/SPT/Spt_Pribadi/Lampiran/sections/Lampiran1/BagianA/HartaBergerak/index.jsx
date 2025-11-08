import DaftarHartaBergerak from "./HartaBergerak";

const DaftarHartaBergerakconfig = {
  baseFields: [
    "kode",
    "deskripsi",
    "lokasiHarta",
    "jenis",
    "merk",
    "tahunPerolehan",
    "nilaiPerolehan",
    "nilaiSaatIni",
    "keterangan",
  ],
  customChildren: [
    {
      key: "deskripsi",
      type: "text",
      title: "Deskripsi",
      placeholder: "Deskripsi Harta",
      required: true,
    },
    {
      key: "jenis",
      type: "text",
      title: "Jenis",
      placeholder: "Jenis Harta Bergerak",
      required: true,
    },
    {
      key: "merk",
      type: "text",
      title: "Merk",
      placeholder: "Merk/Brand",
      required: true,
    },
    {
      key: "nilaiPerolehan",
      type: "currency",
      title: "Nilai Perolehan",
      placeholder: "Masukkan nilai perolehan",
      required: true,
    },
    {
      key: "nilaiSaatIni",
      type: "currency",
      title: "Nilai Saat Ini",
      placeholder: "Masukkan nilai saat ini",
      required: true,
    },
  ],
  defaultData: {
    kode: "",
    deskripsi: "",
    jenis: "",
    merk: "",
    tahunPerolehan: "",
    nilaiPerolehan: 0,
    nilaiSaatIni: 0,
    keterangan: "",
  },
};

const DaftarInvestasiIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarHartaBergerak config={DaftarHartaBergerakconfig} />
    </div>
  );
};
export default DaftarInvestasiIndex;
