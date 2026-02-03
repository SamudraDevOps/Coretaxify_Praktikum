import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1KBagianB() {
  return (
    <UniversalNeraca
      jenisPerusahaan={JENIS_PERUSAHAAN.SEKURITAS}
      bagian="B"
      kategoriEntitas="badan"
    />
  );
}
