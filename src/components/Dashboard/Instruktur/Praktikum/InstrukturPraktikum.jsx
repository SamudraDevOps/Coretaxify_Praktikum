import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaFileMedical } from "react-icons/fa";

const InstrukturPraktikum = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Praktikum</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Blank Assignment Card */}
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-4 bg-purple-50 rounded-t-lg">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <FaFileMedical className="text-purple-600" />
                            Buat Praktikum Baru
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Buat dan kelola praktikum baru dari awal
                        </p>
                    </div>
                    <div className="p-4">
                        <p className="mb-4 text-gray-600">
                            Buat praktikum baru, atur detail, dan kelola tugas-tugas untuk mahasiswa.
                        </p>
                        <Link to="/instruktur/praktikum/kosong">
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">
                                Buat Praktikum Baru
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Filled Assignment Card */}
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-4 bg-blue-50 rounded-t-lg">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <FaFileAlt className="text-blue-600" />
                            Praktikum Aktif
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Lihat dan kelola praktikum yang sudah dibuat
                        </p>
                    </div>
                    <div className="p-4">
                        <p className="mb-4 text-gray-600">
                            Akses praktikum yang sudah dibuat, pantau progres mahasiswa, dan kelola tugas.
                        </p>
                        <Link to="/instruktur/praktikum/terisi">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                                Lihat Praktikum Aktif
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstrukturPraktikum;