import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFile } from "react-icons/fa";

const AssignmentsTable = ({ assignments, loading, error, refetch }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 bg-red-50 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-red-800">Error loading assignments</h3>
                <p className="mt-1 text-sm text-red-600">{error?.message || "Something went wrong"}</p>
                <button 
                    className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                    onClick={refetch}
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!assignments || assignments.length === 0) {
        return (
            <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada praktikum</h3>
                <p className="mt-1 text-sm text-gray-500">Belum ada praktikum yang tersedia di kelas ini.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
                <div 
                    key={assignment.id} 
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/mahasiswa-psc/praktikum/${assignment.id}`)}
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
                                <p>Mulai: {assignment.start_date || 'N/A'}</p>
                            </div>
                            <div>
                                <p>Deadline: {assignment.end_date || 'N/A'}</p>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <button 
                                className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/mahasiswa-psc/praktikum/${assignment.id}`);
                                }}
                            >
                                Lihat Detail
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AssignmentsTable;