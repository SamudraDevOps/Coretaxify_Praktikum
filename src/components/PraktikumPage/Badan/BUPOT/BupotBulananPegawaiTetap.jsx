import React from 'react';


const BupotBulananPegawaiTetap = () => {
    return (
        <div className='container-fluid'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h2 className="text-lg font-semibold mb-4">BUPOT Bulanan Pegawai Tetap</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Bulan</label>
                        <select className="border border-gray-300 rounded-md py-2 px-3 w-full">
                            <option value="januari">Januari</option>
                            <option value="februari">Februari</option>
                            <option value="maret">Maret</option>
                            <option value="april">April</option>
                            <option value="mei">Mei</option>
                            <option value="juni">Juni</option>
                            <option value="juli">Juli</option>
                            <option value="agustus">Agustus</option>
                            <option value="september">September</option>
                            <option value="oktober">Oktober</option>
                            <option value="november">November</option>
                            <option value="desember">Desember</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BupotBulananPegawaiTetap
