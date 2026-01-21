import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1BBagianA() {
  return (
    <UniversalLabaRugi
      jenisPerusahaan={JENIS_PERUSAHAAN.MANUFAKTUR}
      bagian="A"
      kategoriEntitas="badan"
    />
  );
}
