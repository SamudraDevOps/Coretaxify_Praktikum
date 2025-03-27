import React from 'react';
import { useNavigate } from 'react-router-dom';
import Wulan from "../../../../assets/images/wulan.png";

const GroupCard = ({ kelas }) => {
    const navigate = useNavigate();

    const handleViewClass = (e) => {
        e.preventDefault();
        navigate(`/mahasiswa-psc/kelas/${kelas.id}/praktikum`);
    };

    return (
        <a
            className="relative shadow-lg rounded-lg w-100 md:min-w-96 p-4 cursor-pointer"
            href={`/mahasiswa-psc/kelas/${kelas.id}/praktikum`}
            onClick={handleViewClass}
        >
            <div className="bg-purple-700 flex justify-between text-white p-4 rounded-t-lg w-150 relative">
                <div className="">
                    <h3 className="font-bold text-lg">{kelas.name}</h3>
                    <p className="text-sm">Kode: {kelas.class_code}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    kelas.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                    {kelas.status}
                </span>
            </div>
            <div className="p-4">
                <ul className="text-gray-700 text-sm space-y-2 h-10">
                    <li>
                        <strong className="text-indigo-700">
                            Kode Kelas: {kelas.class_code}
                        </strong>
                    </li>
                    {kelas.users_count && (
                        <li className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                            <span>{kelas.users_count} Mahasiswa</span>
                        </li>
                    )}
                </ul>
            </div>
            <div className="border-t px-4 py-2 flex items-center text-gray-700 text-sm">
                <p>Waktu pengerjaan:</p>
                <p className="text-gray-500 p-4">{kelas.start_period || 'N/A'}</p>-
                <p className="text-gray-500 p-4">{kelas.end_period || 'N/A'}</p>
            </div>
            <img
                src={Wulan}
                alt="Icon"
                className="absolute bottom-[120px] right-4 w-14 h-14 rounded-full border-2 border-white shadow-md"
            />
        </a>
    );
};

export default GroupCard;