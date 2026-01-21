import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran3A1BAagianB() {
  return (
    <UniversalNeraca
      jenisPerusahaan={JENIS_PERUSAHAAN.DAGANG}
      bagian="B"
      kategoriEntitas="orang_pribadi"
    />
  );
}
