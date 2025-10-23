import React from "react";

/** Utility */
const fmtRp = (v) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(v || 0));

export default function ShareholderModal({
    open,
    onClose,
    onSave,
    initialData,
}) {
    const [form, setForm] = React.useState({
        nama: "",
        alamat: "",
        kodeNegara: "IDN",
        npwpNik: "",
        jabatan: "",
        modalNilai: 0,
        modalPersen: 0,
        dividen: 0,
    });

    React.useEffect(() => {
        if (open) {
            setForm({
                nama: initialData?.nama ?? "",
                alamat: initialData?.alamat ?? "",
                kodeNegara: initialData?.kodeNegara ?? "IDN",
                npwpNik: initialData?.npwpNik ?? "",
                jabatan: initialData?.jabatan ?? "",
                modalNilai: initialData?.modalNilai ?? 0,
                modalPersen: initialData?.modalPersen ?? 0,
                dividen: initialData?.dividen ?? 0,
            });
        }
    }, [open, initialData]);

    const handle = (key, val) => setForm((s) => ({ ...s, [key]: val }));

    const submit = (e) => {
        e?.preventDefault?.();
        if (!form.nama?.trim() || !form.alamat?.trim() || !form.kodeNegara?.trim() || !form.npwpNik?.trim() || !form.jabatan?.trim()) {
            alert("Lengkapi semua field bertanda *");
            return;
        }
        const payload = {
            ...form,
            modalNilai: Number(String(form.modalNilai).replace(/\D/g, "")) || 0,
            modalPersen: Number(form.modalPersen) || 0,
            dividen: Number(String(form.dividen).replace(/\D/g, "")) || 0,
            kodeNegara: form.kodeNegara?.toUpperCase(),
        };
        onSave?.(payload);
        onClose?.();
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => e.key === "Escape" && onClose?.()}
        >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* dialog */}
            <div className="relative w-[720px] max-w-[95vw] rounded-lg bg-white shadow-xl">
                {/* header */}
                <div className="border-b px-5 py-3">
                    <div className="text-[12px] font-semibold text-slate-700 uppercase">
                        Edit Daftar Pemegang Saham/Pemilik Modal dan Jumlah Dividen yang Akan
                        Dibagikan serta Daftar Direksi dan Komisaris
                    </div>
                </div>

                {/* body */}
                <form onSubmit={submit} className="px-5 py-4 space-y-3">
                    {/* Nama */}
                    <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-3 text-[13px] text-slate-700">Nama *</label>
                        <div className="col-span-9">
                            <input
                                value={form.nama}
                                onChange={(e) => handle("nama", e.target.value)}
                                className="w-full rounded border bg-slate-100 px-3 py-2 text-[13px]"
                                placeholder="Nama"
                            />
                        </div>
                    </div>

                    {/* Alamat */}
                    <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-3 text-[13px] text-slate-700">Alamat *</label>
                        <div className="col-span-9">
                            <input
                                value={form.alamat}
                                onChange={(e) => handle("alamat", e.target.value)}
                                className="w-full rounded border bg-slate-100 px-3 py-2 text-[13px]"
                                placeholder="Alamat"
                            />
                        </div>
                    </div>

                    {/* Kode Negara */}
                    <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-3 text-[13px] text-slate-700">Kode Negara *</label>
                        <div className="col-span-9">
                            <input
                                value={form.kodeNegara}
                                onChange={(e) => handle("kodeNegara", e.target.value.toUpperCase())}
                                className="w-32 rounded border bg-slate-100 px-3 py-2 text-[13px] uppercase"
                                placeholder="IDN"
                                maxLength={3}
                            />
                        </div>
                    </div>

                    {/* NPWP/NIK */}
                    <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-3 text-[13px] text-slate-700">NPWP/NIK *</label>
                        <div className="col-span-9">
                            <input
                                value={form.npwpNik}
                                onChange={(e) => handle("npwpNik", e.target.value)}
                                className="w-full rounded border bg-slate-100 px-3 py-2 text-[13px]"
                                placeholder="0123..."
                            />
                        </div>
                    </div>

                    {/* Jabatan */}
                    <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-3 text-[13px] text-slate-700">Jabatan *</label>
                        <div className="col-span-9">
                            <input
                                value={form.jabatan}
                                onChange={(e) => handle("jabatan", e.target.value)}
                                className="w-60 rounded border bg-slate-100 px-3 py-2 text-[13px]"
                                placeholder="Direktur"
                            />
                        </div>
                    </div>

                    {/* Modal Disetor (Rp) */}
                    <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-3 text-[13px] text-slate-700">Modal Disetor *</label>
                        <div className="col-span-9">
                            <div className="relative">
                                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-500">Rp.</span>
                                <input
                                    value={form.modalNilai ? fmtRp(form.modalNilai).replace("Rp", "").trim() : ""}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/\D/g, "");
                                        handle("modalNilai", Number(raw || 0));
                                    }}
                                    className="w-56 rounded border bg-white pl-10 pr-3 py-2 text-[13px]"
                                    inputMode="numeric"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Modal Disetor % */}
                    <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-3 text-[13px] text-slate-700">Modal Disetor *</label>
                        <div className="col-span-9">
                            <div className="relative w-40">
                                <input
                                    value={form.modalPersen}
                                    onChange={(e) => handle("modalPersen", e.target.value.replace(/[^\d.]/g, ""))}
                                    className="w-full rounded border bg-white pr-10 pl-3 py-2 text-[13px] text-right"
                                    inputMode="decimal"
                                    placeholder="0"
                                />
                                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-500">%</span>
                            </div>
                        </div>
                    </div>

                    {/* Dividen/Pembagian Laba */}
                    <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-3 text-[13px] text-slate-700">Dividen/Pembagian Laba *</label>
                        <div className="col-span-9">
                            <div className="relative">
                                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[12px] text-slate-500">Rp.</span>
                                <input
                                    value={form.dividen ? fmtRp(form.dividen).replace("Rp", "").trim() : ""}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/\D/g, "");
                                        handle("dividen", Number(raw || 0));
                                    }}
                                    className="w-56 rounded border bg-white pl-10 pr-3 py-2 text-[13px]"
                                    inputMode="numeric"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </form>

                {/* footer */}
                <div className="flex items-center justify-end gap-2 border-t px-5 py-3">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[13px] hover:bg-slate-50"
                        onClick={onClose}
                    >
                        ✕ <span>Tutup</span>
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-[13px] font-medium text-white hover:bg-indigo-700"
                        onClick={submit}
                    >
                        💾 <span>Simpan</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
