import React, { useState } from "react";
import LaporanLabaRugi from "./LaporanLabaRugi";
import ModalLabaRugi from "@lampiran/Lampiran3/LaporanLabaRugi/form/ModalLabaRugi";
import { buildSchema } from "@lampiran/Lampiran3/LaporanLabaRugi/form/schemas";

//  ROWS PATEN: isi lengkap sesuai yang dipingin bang pusing pala aing
const ROWS = [
  // GROUP PENJUALAN
  { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
  {
    id: 4002,
    kodeAkun: "4002",
    keterangan: "Domestik",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 4003,
    kodeAkun: "4003",
    keterangan: "Ekspor",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  { id: "t-penjualan-bruto", type: "subtotal", level: 0, keterangan: "Penjualan Bruto" },

  // DIKURANGI:
  { id: "label-dikurangi1", type: "label", level: 0, keterangan: "Dikurangi :" },
  {
    id: 4011,
    kodeAkun: "4011",
    keterangan: "Pengembalian",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 4012,
    kodeAkun: "4012",
    keterangan: "Potongan Penjualan",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  { id: 4020, kodeAkun: "4020", keterangan: "Penjualan Bersih", type: "subtotal", level: 0 },

  // HPP
  { id: "g-hpp", type: "header", level: 0, keterangan: "Harga Pokok Penjualan (HPP)" },
  {
    id: 5001,
    kodeAkun: "5001",
    keterangan: "Pembelian",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5008,
    kodeAkun: "5008",
    keterangan: "Persediaan Awal",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  // { id: "label-dikurangi2", type: "label", level: 1, keterangan: "(Dikurangi: Persediaan Akhir)" },
  {
    id: 5009,
    kodeAkun: "5009",
    keterangan: "(Dikurangi: Persediaan Akhir)",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  { id: 5020, kodeAkun: "5020", keterangan: "Jumlah HPP", type: "subtotal", level: 0 },
  { id: 4300, kodeAkun: "4300", keterangan: "Laba Kotor", type: "subtotal", level: 0 },

  // BEBAN OPERASIONAL (sebagian contoh)
  { id: "g-beban-opr", type: "header", level: 0, keterangan: "Beban Operasional" },
  {
    id: 5311,
    kodeAkun: "5311",
    keterangan: "Gaji, Tunjangan, Bonus, Honorarium, THR, dsb",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5313,
    kodeAkun: "5313",
    keterangan: "Beban Transportasi",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5314,
    kodeAkun: "5314",
    keterangan: "Beban Penyusutan dan Amortisasi",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },

  {
    id: 5315,
    kodeAkun: "5315",
    keterangan: "Beban Sewa",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },

  {
    id: 5316,
    kodeAkun: "5316",
    keterangan: "Beban Bunga",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },
  {
    id: 5317,
    kodeAkun: "5317",
    keterangan: "Beban Sehubungan Dengan Jasa",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },

  {
    id: 5318,
    kodeAkun: "5318",
    keterangan: "Beban Piutang Tidak Tertagih",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },

  {
    id: 5320,
    kodeAkun: "5320",
    keterangan: "Beban Pemasaran, Promosi, dan Periklanan",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },

  {
    id: 5321,
    kodeAkun: "5321",
    keterangan: "Beban Entertaiment",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },

  {
    id: 5322,
    kodeAkun: "5322",
    keterangan: "Beban Umum dan Administrasi",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },

  {
    id: 5399,
    kodeAkun: "5399",
    keterangan: "Beban Usaha Lainnya ",
    type: "line",
    level: 1,
    nilaiKomersial: 0,
    nonObjekPajak: 0,
    pphFinal: 0,
    tidakFinal: 0,
    penyesuaianPositif: 0,
    penyesuaianNegatif: 0,
    kodePenyesuaian: "",
    nilaiFiskal: 0,
  },

  {
    id: 5400,
    kodeAkun: "5400",
    keterangan: "Jumlah Beban Usaha",
    type: "subtotal",
    level: 0,
  },

  {
    id: 4800,
    kodeAkun: "4800",
    keterangan: "Laba (Rugi) Sebelum Pajak ",
    type: "subtotal",
    level: 0,
  },
];

export default function LabaRugi() {
  const [rows, setRows] = useState(ROWS);
  const [open, setOpen] = useState(false);
  const [schema, setSchema] = useState([]);
  const [selected, setSelected] = useState(null);

  const openModal = (row) => {
    // untuk header/label/subtotal → lock semua field (tidak bisa edit) Keseleuruhan King kalo ini
    const isReadOnlyRow = row.type !== "line";
    const dyn = isReadOnlyRow
      ? [
          { name: "kodeAkun", readOnly: true },
          { name: "keterangan", readOnly: true },
          { name: "nilaiKomersial", readOnly: true },
          { name: "nonObjekPajak", readOnly: true },
          { name: "pphFinal", readOnly: true },
          { name: "tidakFinal", readOnly: true },
          { name: "penyesuaianPositif", readOnly: true },
          { name: "penyesuaianNegatif", readOnly: true },
          { name: "kodePenyesuaian", readOnly: true },
          { name: "nilaiFiskal", readOnly: true },
        ]
      : [
          // contoh: untuk baris angka tetap, identitas dikunci( Untuk baris biasa, Tetapi buat semuanya)
          { name: "kodeAkun", readOnly: true },
          { name: "keterangan", readOnly: true },
          { name: "nilaiFiskal", readOnly: true },
        ];

    setSchema(buildSchema(row, dyn));
    setSelected(row);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const onSubmit = (values) => {
    console.log(">>> submit dari modal", values);
    setRows((prev) => prev.map((r) => (r.id === selected.id ? { ...r, ...values } : r)));
    closeModal();
  };

  return (
    <>
      <LaporanLabaRugi rows={rows} openModal={openModal} />
      <ModalLabaRugi
        open={open}
        onClose={closeModal}
        title={selected ? "UBAH" : "UBAH"}
        schema={schema}
        initialData={selected || {}}
        onSubmit={onSubmit}
      />
    </>
  );
}
