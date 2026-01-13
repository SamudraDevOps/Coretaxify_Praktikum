import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1GBagianA() {
  return <UniversalLabaRugi jenisPerusahaan={JENIS_PERUSAHAAN.ASURANSI} bagian="A" />;
}
