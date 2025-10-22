import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Header from './Header';
import LabaRugi from '@/components/PraktikumPage/Badan/SPT/Spt_Badan/Lampiran/section/LampiranL1-C/BagianA';

const LampiranL1C = () => {
    const [showLaporanLabaRugi, setShowLaporanLabaRugi] = useState(true);
    
    return (
        <div className='space-y-4'>
            <Header />
            <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full">
                <h3 className="text-lg font-semibold"
                    onClick={() => setShowLaporanLabaRugi(!showLaporanLabaRugi)}>
                    Laporan Laba Rugi
                </h3>
                {showLaporanLabaRugi ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showLaporanLabaRugi && (
                <div className="border rounded-md p-4 mb-4">
                    <LabaRugi />
                </div>
            )}
        </div>
    )
}

export default LampiranL1C
