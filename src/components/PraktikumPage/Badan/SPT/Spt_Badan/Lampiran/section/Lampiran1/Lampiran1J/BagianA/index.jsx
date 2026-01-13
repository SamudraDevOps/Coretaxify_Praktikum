import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1JBagianA() {
  return <UniversalLabaRugi jenisPerusahaan={JENIS_PERUSAHAAN.INFRASTRUKTUR} bagian="A" />;
}
