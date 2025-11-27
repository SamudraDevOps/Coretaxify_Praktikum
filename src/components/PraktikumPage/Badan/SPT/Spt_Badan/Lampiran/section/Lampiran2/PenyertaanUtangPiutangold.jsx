import React from "react";
import GlobalTable from "@shared/GlobalTable";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function PenyertaanUtangPiutang() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const total = rows.length;

  const pageData = React.useMemo(
    () => rows.slice((page - 1) * pageSize, page * pageSize),
    [rows, page]
  );

  // totals
  const totalPenyertaan = rows.reduce((a, b) => a + (b.nilaiModal || 0), 0);
  const totalUtang = rows.reduce((a, b) => a + (b.nilaiUtang || 0), 0);
  const totalPiutang = rows.reduce((a, b) => a + (b.nilaiPiutang || 0), 0);

  const columnGroups = [
    {
      title: "TINDAKAN",
      children: [
        {
          key: "_actions",
          title: "",
          width: 52,
          align: "center",
          render: (_r, i) => (
            <div className="flex items-center justify-center gap-2">
              <button
                className="rounded border px-2 py-1 text-[12px] hover:bg-slate-50"
                onClick={() => alert(`Edit baris ${i + 1}`)}
              >
                <Pencil size={14} />
              </button>
              <button
                className="rounded border px-2 py-1 text-[12px] hover:bg-slate-50"
                //  DIUBAH: delete harus menghitung index global
                onClick={() =>
                  setRows((prev) => prev.filter((_, idx) => idx !== (page - 1) * pageSize + i))
                }
              >
                <Trash2 size={14} />
              </button>
            </div>
          ),
        },
        {
          key: "_no",
          title: "NO",
          width: 48,
          align: "center",
          render: (_r, i) => (page - 1) * pageSize + (i + 1),
        },
      ],
    },
    {
      title: "",
      children: [
        { key: "nama", title: "NAMA", width: 180 },
        { key: "kodeNegara", title: "KODE NEGARA", width: 120, align: "center" },
        { key: "npwpNik", title: "NPWP/NIK", width: 160, align: "center" },
      ],
    },
    {
      title: "PENYERTAAN MODAL",
      children: [
        {
          key: "nilaiModal",
          title: "NILAI (Rp)",
          width: 140,
          align: "right",
          render: (r) => formatRupiah(r.nilaiModal),
        },
        {
          key: "persenModal",
          title: "%",
          width: 80,
          align: "center",
          render: (r) => r.persenModal ?? 0,
        },
      ],
    },
    {
      title: "UTANG",
      children: [
        {
          key: "nilaiUtang",
          title: "NILAI (Rp)",
          width: 140,
          align: "right",
          render: (r) => formatRupiah(r.nilaiUtang),
        },
        { key: "tahunUtang", title: "TAHUN/BAGIAN TAHUN PAJAK", width: 200, align: "center" },
        {
          key: "bungaUtang",
          title: "BUNGA UTANG/TAHUN",
          width: 180,
          align: "right",
          render: (r) => formatRupiah(r.bungaUtang),
        },
      ],
    },
    {
      title: "PIUTANG",
      children: [
        {
          key: "nilaiPiutang",
          title: "NILAI (Rp)",
          width: 140,
          align: "right",
          render: (r) => formatRupiah(r.nilaiPiutang),
        },
        { key: "tahunPiutang", title: "TAHUN/BAGIAN TAHUN PAJAK", width: 200, align: "center" },
        {
          key: "bungaPiutang",
          title: "BUNGA PIUTANG/TAHUN",
          width: 180,
          align: "right",
          render: (r) => formatRupiah(r.bungaPiutang),
        },
      ],
    },
  ];

  //  BARU — FooterRow dipisah supaya rapi
  const footerRow = (
    <div className="flex">
      <div className="flex-1">
        <div
          className="grid"
          style={{
            // 🔁 DIUBAH: dijadikan dalam variabel sendiri
            gridTemplateColumns:
              "52px 48px 180px 120px 160px 140px 80px 140px 200px 180px 140px 200px 180px",
          }}
        >
          {/* JUMLAH (gabung 5 kolom pertama) */}
          <div className="col-span-5 border border-slate-200 px-3 py-2 text-right text-[13px] font-semibold text-slate-700">
            JUMLAH
          </div>

          {/* TOTAL PENYERTAAN */}
          <div className="border border-slate-200 px-3 py-2 text-right text-[13px] font-semibold text-slate-700">
            {formatRupiah(totalPenyertaan)}
          </div>

          {/* Kosong (% kolom) */}
          <div className="border border-slate-200"></div>

          {/* TOTAL UTANG */}
          <div className="border border-slate-200 px-3 py-2 text-right text-[13px] font-semibold text-slate-700">
            {formatRupiah(totalUtang)}
          </div>

          {/* Kosong Tahun Utang */}
          <div className="border border-slate-200"></div>
          {/* Kosong Bunga Utang */}
          <div className="border border-slate-200"></div>

          {/* TOTAL PIUTANG */}
          <div className="border border-slate-200 px-3 py-2 text-right text-[13px] font-semibold text-slate-700">
            {formatRupiah(totalPiutang)}
          </div>

          {/* Kosong Tahun Piutang */}
          <div className="border border-slate-200"></div>
          {/* Kosong Bunga Piutang */}
          <div className="border border-slate-200"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Penyertaan Modal, Utang, & Piutang</h3>
        <button
          onClick={() =>
            setRows((prev) => [
              ...prev,
              {
                nama: "ENTRI BARU",
                kodeNegara: "IDN",
                npwpNik: "",
                nilaiModal: 0,
                persenModal: 0,
                nilaiUtang: 0,
                tahunUtang: "",
                bungaUtang: 0,
                nilaiPiutang: 0,
                tahunPiutang: "",
                bungaPiutang: 0,
              },
            ])
          }
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={16} />
          Tambah
        </button>
      </div>

      <GlobalTable
        columnGroups={columnGroups}
        data={pageData}
        //  BARU — tambahkan rowKey untuk konsistensi
        rowKey={(r, i) => r.id ?? `row-${i}`}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        stickyHeader
        footerRow={footerRow} //  DIUBAH: kini pakai variabel
      />
    </div>
  );
}
