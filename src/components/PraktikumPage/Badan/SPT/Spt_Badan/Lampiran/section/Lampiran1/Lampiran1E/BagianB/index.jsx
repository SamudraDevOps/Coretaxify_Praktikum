import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1EBagianB() {
  return (
    <UniversalNeraca
      jenisPerusahaan={JENIS_PERUSAHAAN.BANK_KONVENSIONAL}
      bagian="B"
      kategoriEntitas="badan"
    />
  );
}
