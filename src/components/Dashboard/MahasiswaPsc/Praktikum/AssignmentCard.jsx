import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFile } from "react-icons/fa";

const AssignmentCard = ({ assignment }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/mahasiswa-psc/praktikum/${assignment.id}`);
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
        navigate(`/mahasiswa-psc/praktikum/${assignment.id}`);
    };

    return (
        <div 
            key={assignment.id} 
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="h-3 bg-purple-600"></div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 truncate">{assignment.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        assignment.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                        {assignment.status}
                    </span>
                </div>
                
                <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{assignment.description || 'Tidak ada deskripsi'}</p>
                </div>
                
                {assignment.file_path && (
                    <div className="flex items-center text-sm text-blue-600 mb-4">
                        <FaFile className="mr-1" />
                        <span>File pendukung tersedia</span>
                    </div>
                )}
                
                <div className="flex justify-between text-sm text-gray-500">
                    <div>
                        <p>Mulai: {assignment.start_date || assignment.start_period || 'N/A'}</p>
                    </div>
                    <div>
                        <p>Deadline: {assignment.end_date || assignment.end_period || 'N/A'}</p>
                    </div>
                </div>
                
                <div className="mt-4">
                    <button 
                        className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={handleButtonClick}
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentCard;