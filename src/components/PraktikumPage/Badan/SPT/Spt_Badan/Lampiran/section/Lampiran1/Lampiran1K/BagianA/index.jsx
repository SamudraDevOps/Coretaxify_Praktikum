import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1KBagianA() {
  return <UniversalLabaRugi jenisPerusahaan={JENIS_PERUSAHAAN.SEKURITAS} bagian="A" />;
}
