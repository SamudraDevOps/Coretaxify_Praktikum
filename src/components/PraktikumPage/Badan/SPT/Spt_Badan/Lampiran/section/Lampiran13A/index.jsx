import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

export default function PenanamanModalModal({ isOpen, onClose, onSave, initialData = {} }) {
  // Inisialisasi state form
  const [form, setForm] = useState({
    keputusanNomorA: "",
    keputusanTanggalA: "",
    keputusanNomorB: "",
    keputusanTanggalB: "",
    mataUangAsing: "",
    ekuivalen: "",
    dalamRupiah: "",
    jumlahTotal: "",
    bentukPenanaman: "",
    bidangDaerah: "",
    fasilitasPenguranganNeto: false,
    fasilitasPenyusutanCepat: false,
    fasilitasKompensasi: false,
    fasilitasPengenaanDividen: false,
    fasilitasPersentase: "",
    fasilitasTahun: "",
    akumulasiSDTahunIni: "",
    padaSaatMulaiBerproduksi: "",
    saatMulaiBerproduksiTanggal: "",
    tahunKet: "",
    jumlahPenguranganNeto: "",
    ...initialData,
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        keputusanNomorA: "",
        keputusanTanggalA: "",
        keputusanNomorB: "",
        keputusanTanggalB: "",
        mataUangAsing: "",
        ekuivalen: "",
        dalamRupiah: "",
        jumlahTotal: "",
        bentukPenanaman: "",
        bidangDaerah: "",
        fasilitasPenguranganNeto: false,
        fasilitasPenyusutanCepat: false,
        fasilitasKompensasi: false,
        fasilitasPengenaanDividen: false,
        fasilitasPersentase: "",
        fasilitasTahun: "",
        akumulasiSDTahunIni: "",
        padaSaatMulaiBerproduksi: "",
        saatMulaiBerproduksiTanggal: "",
        tahunKet: "",
        jumlahPenguranganNeto: "",
        ...initialData,
      });
    }
  }, [isOpen, initialData]);

  const prevOverflowRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflowRef.current || "";
      prevOverflowRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // jumlah total auto calculate

  useEffect(() => {
    const ekuivalen = parseFloat(form.ekuivalen) || 0;
    const dalamRupiah = parseFloat(form.dalamRupiah) || 0;
    const jumlahTotal = ekuivalen + dalamRupiah;
    if (form.jumlahTotal !== jumlahTotal) {
      setForm((prev) => ({ ...prev, jumlahTotal }));
    }
  }, [form.ekuivalen, form.dalamRupiah]);

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleCurrencyChange = (key, displayValue) => {
    const num = parseFormattedNumber(displayValue ?? "");
    update(key, num);
  };

  const handleSave = () => {
    onSave && onSave(form);
    console.log("Saved data:", form);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start md:items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose && onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white w-full max-w-[1200px] rounded shadow-xl border overflow-hidden flex flex-col"
        style={{ maxHeight: "92vh" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-20">
          <h3 className="text-sm font-semibold">
            FASILITAS PERPAJAKAN DALAM RANGKA PENANAMAN MODAL
          </h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100" aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 overflow-auto" style={{ flex: 1 }}>
          {/* SECTION 1 */}
          <section className="mb-4 border rounded bg-white">
            <div className="px-3 py-2 border-b bg-gray-50 text-xs font-semibold">
              1. DALAM HAL PERUSAHAAN MENDAPAT FASILITAS PENANAMAN MODAL, JELASKAN:
            </div>

            <div className="p-4 space-y-4">
              {/* Header A */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-4 text-xs font-semibold">
                  A. KEPUTUSAN ATAU PEMBERITAHUAN PEMBERIAN FASILITAS
                </div>
              </div>

              {/* Nomor A */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-4 text-xs font-normal">Nomor </div>
                <div className="md:col-span-8">
                  <input
                    value={form.keputusanNomorA}
                    onChange={(e) => update("keputusanNomorA", e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Tanggal A */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-4 text-xs font-normal">Tanggal </div>
                <div className="md:col-span-8">
                  <input
                    type="date"
                    value={form.keputusanTanggalA}
                    onChange={(e) => update("keputusanTanggalA", e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Header B */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-4 text-xs font-semibold">
                  B. KEPUTUSAN PEMANFAATAN FASILITAS
                </div>
              </div>

              {/* Nomor B */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-4 text-xs font-semibold">Nomor </div>
                <div className="md:col-span-8">
                  <input
                    value={form.keputusanNomorB}
                    onChange={(e) => update("keputusanNomorB", e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Tanggal B */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-4 text-xs font-semibold">Tanggal </div>
                <div className="md:col-span-8">
                  <input
                    type="date"
                    value={form.keputusanTanggalB}
                    onChange={(e) => update("keputusanTanggalB", e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* SECTION 2 */}
          <section className="mb-4 border rounded bg-white">
            <div className="px-3 py-2 border-b bg-gray-50 text-xs font-semibold">
              2. PENANAMAN MODAL YANG DISETUJUI
            </div>

            <div className="p-4 space-y-4">
              {/* A: JUMLAH PENANAMAN MODAL YANG DISETUJUI */}
              <div className="border rounded p-3 bg-white">
                <div className="text-xs font-semibold mb-3">
                  A. JUMLAH PENANAMAN MODAL YANG DISETUJUI
                </div>

                {/* row: DALAM MATA UANG ASING + EKUIVALEN */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center mb-5">
                  <div className="md:col-span-4 text-xs font-normal">DALAM MATA UANG ASING</div>

                  <div className="md:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <input
                          aria-label="Dalam Mata Uang Asing"
                          value={formatNumber(form.mataUangAsing ?? "")}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const num = parseFormattedNumber(raw);
                            update("mataUangAsing", isNaN(num) ? "" : num);
                          }}
                          className="w-full border rounded px-3 py-2 text-sm"
                          placeholder="Contoh: USD 1,000,000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* row: EKUIVALEN */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-4 text-xs font-normal">EKUIVALEN</div>

                  <div className="md:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          value={formatNumber(form.ekuivalen ?? "")}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const num = parseFormattedNumber(raw);
                            update("ekuivalen", isNaN(num) ? "" : num);
                          }}
                          className={
                            "w-full border rounded px-3 py-2 text-sm" +
                            (!form.mataUangAsing ? " bg-gray-200" : "")
                          }
                          placeholder="Ekuivalen"
                          readOnly={!form.mataUangAsing}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* row: Dalam Rupiah */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center mt-5 mb-5">
                  <div className="md:col-span-4 text-xs font-normal">Dalam Rupiah</div>

                  <div className="md:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          aria-label="Dalam Rupiah"
                          value={formatNumber(form.dalamRupiah ?? "")}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const num = parseFormattedNumber(raw);
                            update("dalamRupiah", isNaN(num) ? "" : num);
                          }}
                          className="w-full border rounded px-3 py-2 text-sm"
                          placeholder="Dalam Rupiah"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* row: Jumlah */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-4 text-xs font-normal"> Jumlah Total</div>

                  <div className="md:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          value={formatNumber(form.jumlahTotal ?? "")}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const num = parseFormattedNumber(raw);
                            update("jumlahTotal", isNaN(num) ? "" : num);
                          }}
                          className="w-full border rounded px-3 py-2 text-sm bg-gray-200 "
                          placeholder="Jumlah Total"
                          readOnly={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* B + C */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                <div className="md:col-span-4 text-xs font-semibold">B. BENTUK PENANAMAN MODAL</div>

                <div className="md:col-span-8">
                  <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="bentuk"
                        aria-label="Bentuk Penanaman - Baru"
                        checked={form.bentukPenanaman === "baru"}
                        onChange={() => update("bentukPenanaman", "baru")}
                      />
                      <span className="text-sm">Baru</span>
                    </label>

                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="bentuk"
                        aria-label="Bentuk Penanaman - Perluasan"
                        checked={form.bentukPenanaman === "perluasan"}
                        onChange={() => update("bentukPenanaman", "perluasan")}
                      />
                      <span className="text-sm">Perluasan</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* C: DI BIDANG DAN/ATAU DAERAH */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-4 text-xs font-semibold">
                  C. DI BIDANG DAN/ATAU DAERAH
                </div>

                <div className="md:col-span-8">
                  <input
                    aria-label="Bidang/Daerah"
                    value={form.bidangDaerah}
                    onChange={(e) => update("bidangDaerah", e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Sebutkan bidang / daerah"
                  />
                </div>
              </div>

              {/* D. Fasilitas */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                <div className="md:col-span-4 text-xs font-semibold">
                  D. FASILITAS YANG DIBERIKAN
                </div>

                <div className="md:col-span-5">
                  <div className="space-y-2 text-sm">
                    <label className="inline-flex items-start gap-2">
                      <input
                        type="checkbox"
                        aria-label="Pengurangan Penghasilan Neto"
                        checked={form.fasilitasPenguranganNeto}
                        onChange={(e) => update("fasilitasPenguranganNeto", e.target.checked)}
                      />
                      <span className="leading-tight">PENGURANGAN PENGHASILAN NETO</span>
                    </label>

                    <label className="inline-flex items-start gap-2">
                      <input
                        type="checkbox"
                        aria-label="Penyusutan/Amortisasi Cepat"
                        checked={form.fasilitasPenyusutanCepat}
                        onChange={(e) => update("fasilitasPenyusutanCepat", e.target.checked)}
                      />
                      <span className="leading-tight">PENYUSUTAN/AMORTISASI YANG DIPERCEPAT</span>
                    </label>

                    <label className="inline-flex items-start gap-2">
                      <input
                        type="checkbox"
                        aria-label="Kompensasi Kerugian"
                        checked={form.fasilitasKompensasi}
                        onChange={(e) => update("fasilitasKompensasi", e.target.checked)}
                      />
                      <span className="leading-tight">
                        PENAMBAHAN JANGKA WAKTU KOMPENSASI KERUGIAN
                      </span>
                    </label>

                    <label className="inline-flex items-start gap-2">
                      <input
                        type="checkbox"
                        aria-label="Pengenaan Dividen"
                        checked={form.fasilitasPengenaanDividen}
                        onChange={(e) => update("fasilitasPengenaanDividen", e.target.checked)}
                      />
                      <span className="leading-tight">
                        PENGENAAN PPh ATAS DIVIDEN YANG DIBAYARKAN KEPADA WAJIB PAJAK LUAR NEGERI
                        SELAIN BENTUK USAHA TETAP DI INDONESIA SEBESAR 10% (SEPULUH PERSEN) ATAU
                        TARIF YANG LEBIH RENDAH MENURUT TAX TREATY YANG BERLAKU
                      </span>
                    </label>
                  </div>

                  {/* Persentase  */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                    <div className="md:col-span-4 text-xs font-semibold">PERSENTASE</div>

                    <div className="md:col-span-8 flex flex-col md:flex-row md:items-center md:gap-3">
                      <input
                        type="number"
                        aria-label="Persentase fasilitas"
                        value={form.fasilitasPersentase ?? ""}
                        onChange={(e) => update("fasilitasPersentase", e.target.value)}
                        className={
                          "w-32 border rounded px-3 py-2 text-sm" +
                          (form.fasilitasPenguranganNeto === false ? " bg-gray-200" : "")
                        }
                        placeholder="%"
                        readOnly={form.fasilitasPenguranganNeto === false}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                    <div className="md:col-span-4 text-xs font-semibold">TAHUN</div>

                    <div className="md:col-span-8 flex flex-col md:flex-row md:items-center md:gap-3 w-full">
                      <div className="flex-2">
                        <label className="sr-only">Tahun fasilitas</label>
                        <select
                          value={form.fasilitasTahun}
                          onChange={(e) => update("fasilitasTahun", e.target.value)}
                          className={
                            "w-32 border rounded px-3 py-2 text-sm" +
                            (form.fasilitasKompensasi === false ? " bg-gray-200" : "")
                          }
                          aria-label="Pilih Tahun Fasilitas"
                          readOnly={form.fasilitasKompensasi === false}
                        >
                          <option value="">Silakan Pilih</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="mb-4 border rounded bg-white">
            <div className="px-3 py-2 border-b bg-gray-50 text-xs font-semibold">
              3. REALISASI PENANAMAN MODAL
            </div>

            <div className="p-4 space-y-4">
              {/* A. Akumulasi s.d Tahun Ini */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 text-xs font-semibold">
                  A. AKUMULASI S.D. TAHUN INI
                </div>

                <div className="md:col-span-4">
                  <input
                    type="text"
                    aria-label="Akumulasi s.d Tahun Ini"
                    value={formatNumber(form.akumulasiSDTahunIni) ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const num = parseFormattedNumber(raw);
                      update("akumulasiSDTahunIni", isNaN(num) ? "" : num);
                    }}
                    className="w-full border rounded px-3 py-2 text-sm "
                    placeholder="Masukkan jumlah"
                  />
                </div>
              </div>

              {/* B. Pada Saat Mulai Berproduksi Komersial */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 text-xs font-semibold">
                  B. PADA SAAT MULAI BERPRODUKSI KOMERSIAL
                </div>

                <div className="md:col-span-4">
                  <input
                    type="text"
                    aria-label="Pada Saat Mulai Berproduksi Komersial"
                    value={formatNumber(form.padaSaatMulaiBerproduksi) ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const num = parseFormattedNumber(raw);
                      update("padaSaatMulaiBerproduksi", isNaN(num) ? "" : num);
                    }}
                    className="w-full border rounded px-3 py-2 text-sm "
                    placeholder="Masukkan jumlah"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="mb-4 border rounded bg-white">
            <div className="px-3 py-2 border-b bg-gray-50 text-xs font-semibold">
              4. SAAT MULAI BERPRODUKSI KOMERSIAL
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 text-xs font-semibold">
                  SAAT MULAI BERPRODUKSI KOMERSIAL
                </div>

                <div className="md:col-span-8">
                  <input
                    type="date"
                    value={form.saatMulaiBerproduksiTanggal ?? ""}
                    onChange={(e) => update("saatMulaiBerproduksiTanggal", e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section className="mb-4 border rounded bg-white">
            <div className="px-3 py-2 border-b bg-gray-50 text-xs font-semibold">
              5. FASILITAS PENGURANGAN PENGHASILAN NETO
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 text-xs font-semibold">TAHUN KE-</div>

                <div className="md:col-span-8">
                  <select
                    value={form.tahunKet}
                    onChange={(e) => update("tahunKet", e.target.value)}
                    className="w-40 border rounded px-3 py-2 text-sm"
                  >
                    <option value="">Silakan Pilih</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>

              {/* Jumlah Pengurangan Penghasilan Neto */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 text-xs font-semibold">
                  JUMLAH PENGURANGAN PENGHASILAN NETO (Rp)
                </div>

                <div className="md:col-span-8">
                  <input
                    type="text"
                    value={formatNumber(form.jumlahPenguranganNeto) ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const num = parseFormattedNumber(raw);
                      update("jumlahPenguranganNeto", isNaN(num) ? "" : num);
                    }}
                    className="w-full border rounded px-3 py-2 text-sm "
                    placeholder="Masukkan jumlah"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer sticky */}
        <div className="px-4 py-3 border-t bg-white flex items-center justify-end gap-3 sticky bottom-0 z-10">
          <button onClick={onClose} className="px-4 py-2 border rounded text-sm">
            Tutup
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-700 text-white rounded text-sm">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
