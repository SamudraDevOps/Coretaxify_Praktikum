import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFile, FaClock } from "react-icons/fa";

const ExamCard = ({ exam }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/mahasiswa-psc/ujian/${exam.id}`);
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
        navigate(`/mahasiswa-psc/ujian/${exam.id}`);
    };

    // Calculate time remaining if exam is active
    const getTimeRemaining = () => {
        if (exam.status !== 'ACTIVE') return null;
        
        const endDate = new Date(exam.end_date || exam.end_period);
        const now = new Date();
        
        if (endDate <= now) return "Waktu habis";
        
        const diffMs = endDate - now;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffDays > 0) {
            return `${diffDays} hari ${diffHrs} jam lagi`;
        } else if (diffHrs > 0) {
            return `${diffHrs} jam ${diffMins} menit lagi`;
        } else {
            return `${diffMins} menit lagi`;
        }
    };

    const timeRemaining = getTimeRemaining();

    return (
        <div 
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="h-3 bg-red-600"></div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 truncate">{exam.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        exam.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                        exam.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {exam.status}
                    </span>
                </div>
                
                <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{exam.description || 'Tidak ada deskripsi'}</p>
                </div>
                
                {exam.file_path && (
                    <div className="flex items-center text-sm text-blue-600 mb-4">
                        <FaFile className="mr-1" />
                        <span>File pendukung tersedia</span>
                    </div>
                )}
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div>
                        <p>Mulai: {exam.start_date || exam.start_period || 'N/A'}</p>
                    </div>
                    <div>
                        <p>Selesai: {exam.end_date || exam.end_period || 'N/A'}</p>
                    </div>
                </div>
                
                {timeRemaining && (
                    <div className="flex items-center text-sm text-orange-600 mb-4">
                        <FaClock className="mr-1" />
                        <span>{timeRemaining}</span>
                    </div>
                )}
                
                <div className="mt-4">
                    <button 
                        className={`w-full px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            exam.status === 'ACTIVE' 
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                                : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                        }`}
                        onClick={handleButtonClick}
                    >
                        {exam.status === 'ACTIVE' ? 'Mulai Ujian' : 'Lihat Detail'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamCard;