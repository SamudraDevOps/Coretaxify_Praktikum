import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1ABagianA() {
  return (
    <UniversalLabaRugi jenisPerusahaan={JENIS_PERUSAHAAN.UMUM} bagian="A" kategoriEntitas="badan" />
  );
}
