import React from "react";
import BiayaPromosi from "./BiayaPromosi";

//  CONFIG Kelompok 1
const BiayaPromosiConfig = {
  baseFields: [
    "namaPemotong",
    "npwpPemotong",
    "alamat",
    "calender",
    "jenisBiaya",
    "biayaPromosi",
    "keterangan",
    "pphdipotong",
    "nomorBuktiPotong",
  ],

  customChildren: [
    {
      key: "jenisBiaya",
      type: "select-search",
      title: "Jenis Biaya Promosi",
      placeholder: "Pilih Jenis Biaya Promosi",
      required: true,
      span: 1,
      options: [
        {
          id: 1,
          kode: "01",
          value: "01",
          label: "Barang promosi atau merchandise (kaos, topi, mug, kalender, dll)",
        },
        {
          id: 2,
          kode: "02",
          value: "02",
          label: "Diskon penjualan atau potongan harga promosi",
        },
        {
          id: 3,
          kode: "03",
          value: "03",
          label: "Sample produk gratis untuk pelanggan (free sample)",
        },
        {
          id: 4,
          kode: "04",
          value: "04",
          label: "Hadiah undian promosi atau doorprize acara pemasaran",
        },
        {
          id: 5,
          kode: "05",
          value: "05",
          label: "Sponsor event atau kegiatan promosi pelanggan",
        },
        {
          id: 6,
          kode: "06",
          value: "06",
          label: "Biaya iklan atau promosi media (TV, radio, online, sosial media)",
        },
        {
          id: 7,
          kode: "07",
          value: "07",
          label: "Pameran, expo, atau sewa booth promosi produk",
        },
        {
          id: 8,
          kode: "08",
          value: "08",
          label: "Acara peluncuran produk (product launching)",
        },
        {
          id: 9,
          kode: "09",
          value: "09",
          label: "Pembayaran atau produk gratis untuk influencer/endorser",
        },
        {
          id: 10,
          kode: "10",
          value: "10",
          label: "Kegiatan CSR promosi yang membawa nama atau logo perusahaan",
        },
        {
          id: 11,
          kode: "11",
          value: "11",
          label: "Penyediaan makanan dan minuman di tempat kerja (kantin/catering)",
        },
        {
          id: 12,
          kode: "12",
          value: "12",
          label: "Seragam kerja dan perlengkapannya (sepatu safety, helm proyek)",
        },
        {
          id: 13,
          kode: "13",
          value: "13",
          label: "Fasilitas transportasi atau kendaraan dinas karyawan",
        },
        {
          id: 14,
          kode: "14",
          value: "14",
          label: "Fasilitas tempat tinggal atau rumah/mess karyawan",
        },
        {
          id: 15,
          kode: "15",
          value: "15",
          label: "Fasilitas kesehatan atau asuransi kesehatan dari perusahaan",
        },
        {
          id: 16,
          kode: "16",
          value: "16",
          label: "Tunjangan komunikasi (pulsa, paket data, telepon kantor)",
        },
        {
          id: 17,
          kode: "17",
          value: "17",
          label: "Fasilitas pendidikan atau beasiswa dari perusahaan",
        },
        {
          id: 18,
          kode: "18",
          value: "18",
          label: "Perlengkapan kerja pribadi (laptop, HP dinas, alat kerja)",
        },
        {
          id: 19,
          kode: "19",
          value: "19",
          label: "Tunjangan makan atau voucher konsumsi karyawan",
        },
        {
          id: 20,
          kode: "20",
          value: "20",
          label: "Fasilitas kendaraan pribadi dinas untuk pimpinan",
        },
        {
          id: 21,
          kode: "21",
          value: "21",
          label: "Fasilitas rumah tinggal pribadi dari perusahaan",
        },
        {
          id: 22,
          kode: "22",
          value: "22",
          label: "Fasilitas rekreasi, outing, atau perjalanan liburan",
        },
        {
          id: 23,
          kode: "23",
          value: "23",
          label: "Asuransi jiwa atau pensiun yang dibayarkan oleh perusahaan",
        },
        {
          id: 24,
          kode: "24",
          value: "24",
          label: "Keanggotaan klub/gym/golf untuk karyawan atau pimpinan",
        },
        {
          id: 25,
          kode: "25",
          value: "25",
          label: "Penggunaan aset perusahaan untuk kepentingan pribadi",
        },
        {
          id: 26,
          kode: "26",
          value: "26",
          label: "Tunjangan kenikmatan lainnya dalam bentuk non-tunai",
        },
        {
          id: 27,
          kode: "27",
          value: "27",
          label: "Biaya promosi atau natura lainnya yang terkait kegiatan usaha",
        },
        { id: 28, kode: "28", value: "28", label: "Lainnya" },
      ],

      onChange: (value, updateField) => {
        updateField("kode", value);
      },
    },

    {
      key: "biayaPromosi",
      type: "currency",
      title: "Biaya Promosi",
      placeholder: "Masukkan jumlah biaya Promosi",
      required: true,
    },
    {
      key: "nomorBuktiPotong",
      type: "text",
      title: "Nomor Bukti Potong",
      placeholder: "Masukkan Pemotongan Pajak",
      required: true,
    },
  ],

  // defaultData: {
  //   namaPemotong: "PT. Contoh Perusahaan",
  //   npwpPemotong: "",
  //   kode: "",
  //   jenis: "",
  //   labakotor: "",
  // },
};

// console.log(" BiayaPromosiConfig defined:", BiayaPromosiConfig);

const BiayaPromosiIndex = () => {
  return (
    <div className="space-y-4">
      <BiayaPromosi config={BiayaPromosiConfig} />
    </div>
  );
};

// console.log(" BiayaPromosiIndex component exported");

export default BiayaPromosiIndex;
