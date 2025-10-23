import React from "react";
import GlobalTable from "../../components/table/GlobalTable";
import ShareholderModal from "../../components/modal/ShareholderModal";
import { Pencil, Trash2, Plus } from "lucide-react";

const fmtRp = (v) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v ?? 0);

export default function Lampiran2Section({ sourceData }) {
    const [rows, setRows] = React.useState(
        sourceData ?? [
            {
                nama: "PEMEGANG SAHAM SATU",
                alamat: "JL. JALAN SATU RT 001 RW 001 KOTA ADM. JAKARTA PUSAT 10350",
                kodeNegara: "Indonesia",
                npwpNik: "0123456789012001",
                jabatan: "Direktur",
                modalNilai: 0,
                modalPersen: 0,
                dividen: 0,
            },
            {
                nama: "PEMEGANG SAHAM DUA",
                alamat: "JL. JALAN DUA RT 002 RW 00 KOTA TANGERANG SELATAN 15426",
                kodeNegara: "Indonesia",
                npwpNik: "0123456789012002",
                jabatan: "Direktur",
                modalNilai: 0,
                modalPersen: 0,
                dividen: 0,
            },
        ]
    );

    // Modal state
    const [openAdd, setOpenAdd] = React.useState(false);

    // Pagination
    const [page, setPage] = React.useState(1);
    const pageSize = 10;
    const total = rows.length;
    const pageData = React.useMemo(
        () => rows.slice((page - 1) * pageSize, page * pageSize),
        [rows, page]
    );

    // Totals
    const totalNilai = rows.reduce((a, b) => a + (b.modalNilai || 0), 0);
    const totalPersen = rows.reduce((a, b) => a + (b.modalPersen || 0), 0);
    const totalDividen = rows.reduce((a, b) => a + (b.dividen || 0), 0);

    // Column groups
    const columnGroups = [
        {
            title: "TINDAKAN",
            children: [
                {
                    key: "_actions",
                    title: "",
                    width: 52,
                    align: "center",
                    render: (r, i) => (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                className="rounded border px-2 py-1 text-[12px] hover:bg-slate-50"
                                title="Edit"
                                onClick={() => alert(`Edit baris ${i + 1}`)}
                            >
                                <Pencil size={14} />
                            </button>
                            <button
                                className="rounded border px-2 py-1 text-[12px] hover:bg-slate-50"
                                title="Hapus"
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
                { key: "nama", title: "NAMA", width: 240 },
                { key: "alamat", title: "ALAMAT", width: 320 },
                { key: "kodeNegara", title: "KODE NEGARA", width: 120, align: "center" },
                { key: "npwpNik", title: "NPWP/NIK", width: 160, align: "center" },
                { key: "jabatan", title: "JABATAN", width: 140, align: "center" },
            ],
        },
        {
            title: "MODAL DISETOR",
            children: [
                { key: "modalNilai", title: "NILAI (Rp)", width: 140, align: "right", render: (r) => fmtRp(r.modalNilai) },
                { key: "modalPersen", title: "%", width: 80, align: "center", render: (r) => r.modalPersen ?? 0 },
            ],
        },
        {
            title: "DIVIDEN/PEMBAGIAN LABA (Rp)",
            children: [{ key: "dividen", title: "", width: 180, align: "right", render: (r) => fmtRp(r.dividen) }],
        },
    ];

    return (
        <div className="space-y-3">
            {/* Header + Button Tambah */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Daftar Pemegang Saham</h2>
                <button
                    onClick={() => setOpenAdd(true)}
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    <Plus size={16} />
                    Tambah
                </button>
            </div>

            <GlobalTable
                columnGroups={columnGroups}
                data={pageData}
                rowKey={(_, i) => `${page}-${i}`}
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
                stickyHeader
                footerRow={
                    <div className="flex">
                        <div className="flex-1">
                            <div
                                className="grid"
                                style={{
                                    gridTemplateColumns:
                                        "52px 48px 240px 320px 120px 160px 140px 140px 80px 180px",
                                }}
                            >
                                <div className="col-span-7 border border-slate-200 px-3 py-2 text-right text-[13px] font-semibold text-slate-700">
                                    JUMLAH
                                </div>
                                <div className="border border-slate-200 px-3 py-2 text-right text-[13px] font-semibold text-slate-700">
                                    {fmtRp(totalNilai)}
                                </div>
                                <div className="border border-slate-200 px-3 py-2 text-center text-[13px] font-semibold text-slate-700">
                                    {totalPersen}
                                </div>
                                <div className="border border-slate-200 px-3 py-2 text-right text-[13px] font-semibold text-slate-700">
                                    {fmtRp(totalDividen)}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Modal Tambah */}
            <ShareholderModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onSave={(payload) => {
                    setRows((prev) => [...prev, { ...payload, kodeNegara: payload.kodeNegara === "IDN" ? "Indonesia" : payload.kodeNegara }]);
                    // optionally reset to last page
                    const nextTotal = rows.length + 1;
                    const nextPage = Math.ceil(nextTotal / pageSize);
                    setPage(nextPage);
                }}
            />
        </div>
    );
}
