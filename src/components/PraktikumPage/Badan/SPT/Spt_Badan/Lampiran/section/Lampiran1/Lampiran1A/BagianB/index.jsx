import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1ABagianB() {
  return (
    <UniversalNeraca jenisPerusahaan={JENIS_PERUSAHAAN.UMUM} bagian="B" kategoriEntitas="badan" />
  );
}
