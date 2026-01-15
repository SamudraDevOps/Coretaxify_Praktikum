import UniversalNeraca from "@shared/Neraca/UniversalNeraca";
import { JENIS_PERUSAHAAN } from "@shared/perusahaanConfig";

export default function Lampiran1BBagianB() {
  return <UniversalNeraca jenisPerusahaan={JENIS_PERUSAHAAN.MANUFAKTUR} bagian="B" />;
}
