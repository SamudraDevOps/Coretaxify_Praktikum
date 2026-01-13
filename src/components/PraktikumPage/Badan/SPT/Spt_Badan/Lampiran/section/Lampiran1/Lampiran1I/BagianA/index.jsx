import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1IBagianA() {
  return <UniversalLabaRugi jenisPerusahaan={JENIS_PERUSAHAAN.BANK_SYARIAH} bagian="A" />;
}
