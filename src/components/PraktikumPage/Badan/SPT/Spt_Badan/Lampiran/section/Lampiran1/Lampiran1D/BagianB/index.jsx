import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1DBagianB() {
  return (
    <UniversalNeraca jenisPerusahaan={JENIS_PERUSAHAAN.JASA} bagian="B" kategoriEntitas="badan" />
  );
}
