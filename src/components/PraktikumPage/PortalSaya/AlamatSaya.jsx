import React, { useState } from 'react';
import SidebarProfilSaya from './SidebarProfilSaya';
import { BsFiletypeXls } from "react-icons/bs";

const AlamatSaya = () => {
    const [alamat, setAlamat] = useState({
        alamat: "Jl. Raya Ciputat Parung No. 1",
        kelurahan: "Ciputat Timur",
        kecamatan: "Ciputat",
        kota: "Tangerang Selatan",
        provinsi: "Banten",
        kodePos: "15111"
    });

    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarProfilSaya />

            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <h2 className='text-2xl font-semibold'>Alamat</h2>
                <div className="spcae-y-2 h-full mt-4">
                    <h1 className="text-lg font-semibold">Alamat Utama</h1>
                    <p className="mt-2">Detail Alamat Utama : Link dari import an awal kang</p>
                </div>
            </div>
        </div>
    );
}
export default AlamatSaya;