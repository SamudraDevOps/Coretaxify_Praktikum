import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1FBagianB() {
  return (
    <UniversalNeraca
      jenisPerusahaan={JENIS_PERUSAHAAN.DANA_PENSIUN}
      bagian="B"
      kategoriEntitas="badan"
    />
  );
}
