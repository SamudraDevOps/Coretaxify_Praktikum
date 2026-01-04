import UniversalLabaRugi from '@shared/LaporanLabaRugi/UniversalLabaRugi';
import { JENIS_PERUSAHAAN } from '@shared/LaporanLabaRugi/perusahaanConfig';

// Mapping lampiran ke jenis perusahaan
const lampiranToJenisPerusahaan = {
    Lampiran1A: JENIS_PERUSAHAAN.UMUM,
    Lampiran1B: JENIS_PERUSAHAAN.MANUFAKTUR,
    Lampiran1C: JENIS_PERUSAHAAN.JASA,
    Lampiran1D: JENIS_PERUSAHAAN.UMUM,
};

export default function UniversalBagianA({ lampiran }) {
    const jenisPerusahaan = lampiranToJenisPerusahaan[lampiran];
    if (!jenisPerusahaan) {
        return <div>Jenis perusahaan tidak ditemukan untuk lampiran {lampiran}</div>;
    }

    return (
        <UniversalLabaRugi
            jenisPerusahaan={jenisPerusahaan}
            bagian="A"
        />
    );
}