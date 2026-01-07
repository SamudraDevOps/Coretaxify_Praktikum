import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/LaporanLabaRugi/perusahaanConfig";

// Mapping lampiran ke jenis perusahaan (1 lampiran = 1 perusahaan, tidak ada duplikasi)
const lampiranToJenisPerusahaan = {
  Lampiran1A: JENIS_PERUSAHAAN.UMUM,
  Lampiran1B: JENIS_PERUSAHAAN.MANUFAKTUR,
  Lampiran1C: JENIS_PERUSAHAAN.DAGANG,
  Lampiran1D: JENIS_PERUSAHAAN.JASA,
  Lampiran1E: JENIS_PERUSAHAAN.BANK_KONVENSIONAL,
  Lampiran1F: JENIS_PERUSAHAAN.DANA_PENSIUN,
  Lampiran1G: JENIS_PERUSAHAAN.ASURANSI,
};

export default function UniversalBagianA({ lampiran }) {
  const jenisPerusahaan = lampiranToJenisPerusahaan[lampiran];
  if (!jenisPerusahaan) {
    return <div>Jenis perusahaan tidak ditemukan untuk lampiran {lampiran}</div>;
  }

  return <UniversalLabaRugi jenisPerusahaan={jenisPerusahaan} bagian="A" />;
}
