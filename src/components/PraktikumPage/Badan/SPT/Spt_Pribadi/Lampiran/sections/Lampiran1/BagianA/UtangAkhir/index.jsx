import DaftarUtangAkhir from "./PenghasilanNeto";

const DaftarUtangAkhirconfig = {
  baseFields: [
    "kode",           
    "deskripsi",        
    "npwpPemotong",     
    "negara",           
    "tahunPerolehan",   
    "saldo",            
    "keteranganHarta",  
  ],

  customChildren: [
    // DESKRIPSI UTANG
    {
      key: "deskripsi",
      type: "select-search",
      title: "Deskripsi",
      placeholder: "Pilih jenis utang",
      required: true,
      span: 1,
      options: [
        { id: 1, kode: "101", value: "101", label: "Utang Bank/Lembaga Keuangan Bukan Bank" },
        { id: 2, kode: "102", value: "102", label: "Kartu Kredit" },
        { id: 3, kode: "103", value: "103", label: "Utang Afiliasi" },
        { id: 4, kode: "109", value: "109", label: "Utang Lainnya" },
      ],
      onChange: (value, updateField) => {
        // isi 'kode' dari 3 digit value
        updateField("kode", value || "");
      },
    },

    {
      key: "saldo",
      type: "currency",
      title: "Saldo",
      placeholder: "Masukkan jumlah saldo",
      required: true,
    },
  ],
};  

const DaftarUtangAkhirIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarUtangAkhir config={DaftarUtangAkhirconfig} />
    </div>
  );
};
export default DaftarUtangAkhirIndex;