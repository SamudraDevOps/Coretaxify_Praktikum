export const jenisHartaGlobal = [
  { id: 1, kode: "01", value: "01", label: "Sepeda" },
  { id: 2, kode: "02", value: "02", label: "Motor" },
  { id: 3, kode: "03", value: "03", label: "Mobil Penumpang" },
  { id: 4, kode: "04", value: "04", label: "Bus" },
  { id: 5, kode: "05", value: "05", label: "Kendaraan Angkutan" },
  { id: 6, kode: "06", value: "06", label: "Kendaraan Khusus" },
  { id: 7, kode: "07", value: "07", label: "Kereta Api" },
  { id: 8, kode: "08", value: "08", label: "Pesawat Terbang" },
  { id: 9, kode: "09", value: "09", label: "Kapal Laut" },
  { id: 10, kode: "10", value: "10", label: "Mesin" },
  { id: 11, kode: "11", value: "11", label: "Gerobak/Troli" },
  { id: 12, kode: "12", value: "12", label: "Kapal Pesiar" },
  { id: 13, kode: "13", value: "13", label: "Peralatan" },
  { id: 14, kode: "14", value: "14", label: "Aset Bergerak Lainnya" },
  { id: 15, kode: "15", value: "15", label: "Peralatan Olahraga Khusus" },
  { id: 16, kode: "16", value: "16", label: "Peralatan Elektronik" },
  { id: 17, kode: "17", value: "17", label: "Rumah Tangga Furnitur" },
  { id: 18, kode: "18", value: "18", label: "Peralatan Lainnya" },
  { id: 19, kode: "19", value: "19", label: "Jet Ski" },
  { id: 20, kode: "20", value: "20", label: "Aset Lainnya" },
];

// Contoh custom untuk Kelompok 2 (misal hanya beberapa jenis harta berbeda)
export const jenisHartaKelompok2 = [
  { id: 1, kode: "21", value: "21", label: "Komputer" },
  { id: 2, kode: "22", value: "22", label: "Printer" },
  { id: 3, kode: "23", value: "23", label: "Scanner" },
  // Bisa juga meng-extend dari kelompok 1 jika ada yang sama:
  ...jenisHartaGlobal.filter((j) => j.value === "10" || j.value === "13"), // contoh ambil "Mesin" dan "Peralatan"
];

// Contoh custom untuk kelompok Bangunan
export const jenisHartaBangunan = [
  { id: 1, kode: "B01", value: "B01", label: "Gedung Permanen" },
  { id: 2, kode: "B02", value: "B02", label: "Gedung Semi Permanen" },
  { id: 3, kode: "B03", value: "B03", label: "Ruko" },
  // dst...
];
