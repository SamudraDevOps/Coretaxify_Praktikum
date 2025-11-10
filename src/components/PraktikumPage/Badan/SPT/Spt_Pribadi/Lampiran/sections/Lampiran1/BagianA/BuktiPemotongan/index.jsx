import DaftarBuktiPemotongan from "./BuktiPemotongan";

const DaftarBuktiPemotonganconfig = {
  baseFields: [
    "nama", // BASE (readOnly) -> override title: "Nama Pemotong/Pemungut PPh"
    "npwp", // BASE -> override title: "NPWP Pemotong/Pemungut PPh"
    "nomorBuktiPemotongan", // custom (text)
    "calender", // BASE date -> override title: "Tanggal Pemotongan"
    "jenisPajak", // custom (select-search)
    "dasarPengenaanPajak", // BASE currency
    "pphdipotong", // BASE currency
  ],

  customChildren: [
    // NAMA (override label/readOnly styling)
    {
      key: "nama",
      type: "text",
      title: "Nama Pemotong / Pemungut PPh",
      placeholder: "Nama Pemotong/Pemungut otomatis terisi",
      readOnly: true,
      className: "bg-gray-100 text-gray-600",
    },

    // NPWP (override label)
    {
      key: "npwp",
      type: "text",
      title: "NPWP Pemotong / Pemungut PPh",
      placeholder: "Nomor Identitas Pemotong / Pemungut PPh",
      required: true,
    },

    // NOMOR BUKTI
    {
      key: "nomorBuktiPemotongan",
      type: "text",
      title: "Nomor Bukti Pemotongan / Pemungutan",
      placeholder: "Masukkan nomor bukti pemotongan / pemungutan",
      required: true,
    },

    // TANGGAL (override title untuk 'calender')
    {
      key: "calender",
      type: "date",
      title: "Tanggal Pemotongan",
      placeholder: "Pilih tanggal pemotongan",
      required: true,
    },

    // JENIS PAJAK
    {
      key: "jenisPajak",
      type: "select-search",
      title: "Jenis Pajak",
      placeholder: "Pilih jenis pajak",
      required: true,
      options: [
        { id: 1, kode: "21", value: "Pasal21", label: "PPh Pasal 21" },
        { id: 2, kode: "22", value: "Pasal22", label: "PPh Pasal 22" },
        { id: 3, kode: "23", value: "Pasal23", label: "PPh Pasal 23" },
        { id: 4, kode: "26", value: "Pasal26", label: "PPh Pasal 26" },
        { id: 5, kode: "DTP", value: "DTP", label: "PPh DTP" },
      ],
    },
  ],
};

const DaftarBuktiPemotonganIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarBuktiPemotongan config={DaftarBuktiPemotonganconfig} />
    </div>
  );
};
export default DaftarBuktiPemotonganIndex;
