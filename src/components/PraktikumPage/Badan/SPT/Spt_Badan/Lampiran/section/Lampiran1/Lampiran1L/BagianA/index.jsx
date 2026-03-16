import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1LBagianA() {
  return (
    <UniversalLabaRugi
      jenisPerusahaan={JENIS_PERUSAHAAN.PEMBIAYAAN}
      bagian="A"
      kategoriEntitas="badan"
    />
  );
}
