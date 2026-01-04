import UniversalLabaRugi from '@shared/LaporanLabaRugi/UniversalLabaRugi';
import { JENIS_PERUSAHAAN } from '@shared/LaporanLabaRugi/perusahaanConfig';

export default function Lampiran1DBagianA() {
  return (
    <UniversalLabaRugi
      jenisPerusahaan={JENIS_PERUSAHAAN.JASA}
      bagian="A"
    />
  );
}