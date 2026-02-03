import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1LBagianB() {
  return (
    <UniversalNeraca
      jenisPerusahaan={JENIS_PERUSAHAAN.PEMBIAYAAN  }
      bagian="B"
      kategoriEntitas="badan"
    />
  );
}
