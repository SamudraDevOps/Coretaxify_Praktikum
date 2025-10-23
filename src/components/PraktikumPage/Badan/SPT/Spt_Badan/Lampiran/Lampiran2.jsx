import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Header from './Header';
import Lampiran2Section from './section/Lampiran2';
import PenyertaanUtangPiutang from './section/Lampiran2/PenyertaanUtangPiutang';


const Lampiran2 = () => {
    const [showTabA, setShowTabA] = useState(true);
    return (
        <div className='space-y-4'>
            <Header />
            <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full">
                <h3 className="text-lg font-semibold"
                    onClick={() => setShowTabA(!showTabA)}>
                    Daftar Pemegang Saham/Anggota dan Pembagian Dividen atau Bagian Laba
                </h3>
                {showTabA ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showTabA && (
                <div className="border rounded-md p-4 mb-4">
                    <Lampiran2Section />
                    <div className="mt-4">
                        <PenyertaanUtangPiutang />
                    </div>
                </div>
            )}
        </div>
    )
};


export default Lampiran2
