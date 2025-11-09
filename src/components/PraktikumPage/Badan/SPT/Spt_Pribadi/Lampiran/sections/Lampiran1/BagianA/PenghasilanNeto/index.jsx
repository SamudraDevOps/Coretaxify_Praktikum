import DaftarPenghasilanNeto from "./PenghasilanNeto";

const DaftarPenghasilanNetoconfig = {
  baseFields: [
    "nomoridentitas", // override title -> "Nomor Identitas Pemberi Kerja"
    "nama", // override title -> "Nama Pemberi Kerja" (readOnly)
    "penghasilanBruto", // custom currency
    "pengurangan", // custom currency
    "penghasilanNeto", // custom display (auto bruto - pengurangan)
    "keteranganHarta", // BASE: select (Harta PPS / Harta Investasi PPS)
  ],

  customChildren: [
    // override BASE 'nomoridentitas' agar title/placeholder sesuai
    {
      key: "nomoridentitas",
      type: "text",
      title: "Nomor Identitas Pemberi Kerja",
      placeholder: "Nomor Identitas Pemberi Kerja",
      required: true,
    },

    // override BASE 'nama' (key 'nama' di GlobalModal = namaPemotong) agar title sesuai
    {
      key: "nama",
      type: "text",
      title: "Nama Pemberi Kerja",
      placeholder: "Nama Pemberi Kerja otomatis terisi",
      readOnly: true,
      className: "bg-gray-100 text-gray-600",
      required: false,
    },

    // PENGHASILAN BRUTO (currency)
    {
      key: "penghasilanBruto",
      type: "currency",
      title: "Penghasilan Bruto",
      placeholder: "Masukkan jumlah penghasilan bruto",
      required: true,
    },

    // PENGURANGAN (currency)
    {
      key: "pengurangan",
      type: "currency",
      title: "Pengurangan Penghasilan Bruto/Biaya",
      placeholder: "Masukkan jumlah pengurangan",
      required: true,
    },

    // NETO (display, auto = bruto - pengurangan)
    {
      key: "penghasilanNeto",
      type: "display",
      title: "Penghasilan Neto",
      placeholder: "-",
      format: (value, formData) => {
        const bruto = Number(formData?.penghasilanBruto || 0);
        const kurang = Number(formData?.pengurangan || 0);
        const neto = Math.max(0, bruto - kurang);
        // format ke rupiah
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(neto);
      },
    },
  ],
};

const DaftarPenghasilanNetoIndex = () => {
  return (
    <div className="space-y-4">
      <DaftarPenghasilanNeto config={DaftarPenghasilanNetoconfig} />
    </div>
  );
};
export default DaftarPenghasilanNetoIndex;
