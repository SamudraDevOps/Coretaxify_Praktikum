import DaftarHartaBergerak from "./HartaBergerak";

const DaftarHartaBergerakconfig = {
  baseFields: [
    "kode",
    "tipe",
    "lokasiHarta",
    "merk",
    "nopol",
    "kepemilikan",
    "npwpPemotong",
    "namaPemotong",
    "tahunPerolehan",
    "biayaPerolehan",
    "nilaiSaatIni",
    "keterangan",
  ],
  customChildren: [
    {
      key: "tipe",
      type: "select-search",
      title: "Tipe",
      placeholder: "Pilih jenis harta",
      required: false,
      span: 1,
      options: [
        {
          id: 1,
          kode: "0401",
          value: "0401",
          label: "Sepeda",
        },
        {
          id: 2,
          kode: "0402",
          value: "0402",
          label: "Sepeda Motor",
        },
        {
          id: 3,
          kode: "0403",
          value: "0403",
          label: "Mobil Penumpang",
        },
        {
          id: 4,
          kode: "0404",
          value: "0404",
          label: "Bus",
        },
        {
          id: 5,
          kode: "0405",
          value: "0405",
          label: "Kendaraan Angkutan Jalan",
        },
        {
          id: 6,
          kode: "0406",
          value: "0406",
          label: "Kendaraan Tujuan Khusus",
        },
        {
          id: 7,
          kode: "0407",
          value: "0407",
          label: "Kereta",
        },
        {
          id: 8,
          kode: "0408",
          value: "0408",
          label: "Pesawat Terbang",
        },
        {
          id: 9,
          kode: "0409",
          value: "0409",
          label: "Kapal",
        },
        {
          id: 10,
          kode: "0410",
          value: "0410",
          label: "Mesin",
        },
        {
          id: 11,
          kode: "0411",
          value: "0411",
          label: "Gerobak",
        },
        {
          id: 12,
          kode: "0412",
          value: "0412",
          label: "Kapal Pesiar",
        },
        {
          id: 13,
          kode: "0499",
          value: "0499",
          label: "Harta Bergerak Lainnya",
        },
      ],

      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },
    {
      key: "merk",
      type: "text",
      title: "Merk/Model",
      placeholder: "Merk/Brand",
      required: true,
    },
    {
      key: "nopol",
      type: "text",
      title: "Nomor Polisi/Registrasi",
      placeholder: "Masukkan nomor polisi",
      required: true,
      readOnly: false,
    },

    {
      key: "kepemilikan",
      type: "select-search",
      title: "Kepemilikan",
      placeholder: "Pilih jenis kepemilikan",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "01",
          value: "01",
          label: "atas nama sendiri",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "atas nama orang lain",
        },
      ],
    }, 
  ],
};

const DaftarHartaBergerakIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarHartaBergerak config={DaftarHartaBergerakconfig} />
    </div>
  );
};
export default DaftarHartaBergerakIndex;
