import UniversalLabaRugi from "@shared/LaporanLabaRugi/UniversalLabaRugi";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran3A1BagianA() {
  return (
    <UniversalLabaRugi
      jenisPerusahaan={JENIS_PERUSAHAAN.DAGANG}
      bagian="A"
      kategoriEntitas="orang_pribadi"
    />
  );
}
