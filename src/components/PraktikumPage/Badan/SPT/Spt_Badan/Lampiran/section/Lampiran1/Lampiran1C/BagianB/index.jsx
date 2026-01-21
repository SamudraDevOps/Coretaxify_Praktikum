import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1CBagianB() {
  return (
    <UniversalNeraca jenisPerusahaan={JENIS_PERUSAHAAN.DAGANG} bagian="B" kategoriEntitas="badan" />
  );
}
