import DaftarHartaLainnya from "./HartaLainnya";

const DaftarHartaLainnyaconfig = {
  baseFields: [
    "kode",
    "deskripsi",
    "tahunPerolehan",
    "biayaPerolehan",
    "nilaiSaatIni",
    "buktiKepemilikan",
    "InformasiTambahan",
    "keteranganHarta",
  ],

  customChildren: [
    {
      key: "deskripsi",
      type: "select-search",
      title: "Deskripsi",
      placeholder: "Pilih deskripsi harta",
      required: true,
      span: 1,
      options: [
        { id: 1, kode: "0601", value: "0601", label: "Paten" },
        { id: 2, kode: "0602", value: "0602", label: "Royalti" },
        { id: 3, kode: "0603", value: "0603", label: "Merek dagang" },
        { id: 4, kode: "0699", value: "0699", label: "Harta Tidak Berwujud Lainnya" },

        { id: 5, kode: "0701", value: "0701", label: "Emas batangan" },
        { id: 6, kode: "0702", value: "0702", label: "Emas perhiasan" },
        { id: 7, kode: "0703", value: "0703", label: "Batangan non emas" },
        { id: 8, kode: "0704", value: "0704", label: "Perhiasan non emas" },
        { id: 9, kode: "0705", value: "0705", label: "Permata" },
        { id: 10, kode: "0706", value: "0706", label: "Barang-barang seni dan antik" },
        { id: 11, kode: "0707", value: "0707", label: "Peralatan olahraga khusus" },
        { id: 12, kode: "0708", value: "0708", label: "Peralatan elektronik" },
        { id: 13, kode: "0709", value: "0709", label: "Perabot rumah tangga" },
        { id: 14, kode: "0710", value: "0710", label: "Peralatan kantor" },
        { id: 15, kode: "0711", value: "0711", label: "Jet Ski" },
        { id: 16, kode: "0712", value: "0712", label: "Persediaan Usaha" },
        { id: 17, kode: "0799", value: "0799", label: "Harta Lainnya" },
      ],
      onChange: (value, updateField) => {
        updateField("kode", value || "");
      },
    },

    {
      key: "buktiKepemilikan",
      type: "text",
      title: "Bukti Kepemilikan / Nomor Akun",
      placeholder: "Masukkan bukti kepemilikan / nomor akun",
      required: true,
    },

    {
      key: "InformasiTambahan",
      type: "text",
      title: "Informasi Tambahan",
      placeholder: "Masukkan informasi tambahan",
      required: true,
    },
  ],
};
const DaftarHartaLainnyaIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarHartaLainnya config={DaftarHartaLainnyaconfig} />
    </div>
  );
};
export default DaftarHartaLainnyaIndex;
