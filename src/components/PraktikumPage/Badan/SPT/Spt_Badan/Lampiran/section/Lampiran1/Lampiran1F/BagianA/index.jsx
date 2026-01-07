import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/LaporanLabaRugi/perusahaanConfig";

export default function Lampiran1FBagianA() {
  return <UniversalLabaRugi jenisPerusahaan={JENIS_PERUSAHAAN.DANA_PENSIUN} bagian="A" />;
}
