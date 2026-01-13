import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

// Mapping lampiran ke jenis perusahaan (1 lampiran = 1 perusahaan)
const lampiranToJenisPerusahaan = {
  Lampiran1A: JENIS_PERUSAHAAN.UMUM,
  Lampiran1B: JENIS_PERUSAHAAN.MANUFAKTUR,
  Lampiran1C: JENIS_PERUSAHAAN.DAGANG,
  Lampiran1D: JENIS_PERUSAHAAN.JASA,
  Lampiran1E: JENIS_PERUSAHAAN.BANK_KONVENSIONAL,
  Lampiran1F: JENIS_PERUSAHAAN.DANA_PENSIUN,
  Lampiran1G: JENIS_PERUSAHAAN.ASURANSI,
  Lampiran1H: JENIS_PERUSAHAAN.PROPERTI,
  Lampiran1I: JENIS_PERUSAHAAN.BANK_SYARIAH,
  Lampiran1J: JENIS_PERUSAHAAN.INFRASTRUKTUR,
  Lampiran1K: JENIS_PERUSAHAAN.SEKURITAS,
  Lampiran1L: JENIS_PERUSAHAAN.PEMBIAYAAN,
};

/**
 * UniversalBagian - Component untuk render Bagian A (LabaRugi) atau Bagian B (Neraca)
 * @param {string} lampiran - Lampiran ID (e.g., "Lampiran1A")
 * @param {string} bagian - "A" untuk LabaRugi, "B" untuk Neraca
 */
export default function UniversalBagian({ lampiran, bagian }) {
  const jenisPerusahaan = lampiranToJenisPerusahaan[lampiran];

  if (!jenisPerusahaan) {
    return (
      <div style={{ padding: "20px", color: "red", border: "2px solid red" }}>
         Jenis perusahaan tidak ditemukan untuk lampiran <strong>{lampiran}</strong>
      </div>
    );
  }

  // Render berdasarkan bagian
  if (bagian === "A") {
    return <UniversalLabaRugi jenisPerusahaan={jenisPerusahaan} bagian="A" />;
  }

  if (bagian === "B") {
    return <UniversalNeraca jenisPerusahaan={jenisPerusahaan} bagian="B" />;
  }

  return (
    <div style={{ padding: "20px", color: "orange", border: "2px solid orange" }}>
       Bagian <strong>{bagian}</strong> tidak dikenali. Harus "A" atau "B".
    </div>
  );
}
