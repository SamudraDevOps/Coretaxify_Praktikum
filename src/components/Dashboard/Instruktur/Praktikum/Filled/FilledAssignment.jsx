import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RoutesApi } from '@/Routes';
import { useCookies } from 'react-cookie';
import { IntentEnum } from '@/enums/IntentEnum';
import { FaArrowLeft, FaEye, FaUsers, FaCopy } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const FilledAssignment = () => {
    const [cookies] = useCookies(['token']);
    const [assignments, setAssignments] = useState([]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            // Get CSRF token
            const csrfResponse = await axios.get(RoutesApi.csrf, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
            });

            axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfResponse.data.token;
            
            // Get assignments API call
            const response = await axios.get(
                RoutesApi.instructor.assignments.url,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfResponse.data.token,
                        Authorization: `Bearer ${cookies.token}`,
                    },
                    params: {
                        intent: IntentEnum.API_INSTRUCTOR_GET_ASSIGNMENTS,
                    },
                }
            );
            
            return response.data;
        }
    });

    useEffect(() => {
        if (data) {
            setAssignments(data.data || []);
        }
    }, [data]);

    const copyAssignmentCode = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            Swal.fire({
                title: "Berhasil!",
                text: "Kode praktikum berhasil disalin!",
                icon: "success",
                confirmButtonText: "OK",
                timer: 1500,
            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
            Swal.fire({
                title: "Gagal!",
                text: "Gagal menyalin kode praktikum.",
                icon: "error",
                confirmButtonText: "OK",
            });
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getStatusBadge = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        
        if (deadlineDate < now) {
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Selesai</span>;
        } else {
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>;
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 flex justify-center items-center h-64">
                <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 text-gray-600">Memuat data praktikum...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error?.message || "Terjadi kesalahan saat memuat data praktikum."}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center mb-6">
                <Link to="/instruktur/praktikum" className="mr-4">
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                        <FaArrowLeft />
                    </button>
                </Link>
                <h1 className="text-2xl font-bold">Praktikum Aktif</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Daftar Praktikum</h2>
                </div>
                <div className="p-4">
                    {assignments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Belum ada praktikum yang dibuat.</p>
                            <Link to="/dashboard/instruktur/praktikum/blank" className="mt-4 inline-block">
                                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">
                                    Buat Praktikum Baru
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenggat Waktu</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peserta</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {assignments.map((assignment) => (
                                        <tr key={assignment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{assignment.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{assignment.code}</span>
                                                    <button 
                                                        className="text-gray-500 hover:text-gray-700"
                                                        onClick={() => copyAssignmentCode(assignment.code)}
                                                        title="Salin kode"
                                                    >
                                                        <FaCopy />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(assignment.deadline)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(assignment.deadline)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    <FaUsers className="text-gray-500" />
                                                    <span>{assignment.participants_count || 0}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <Link to={`/dashboard/instruktur/praktikum/detail/${assignment.id}`}>
                                                        <button className="flex items-center gap-1 px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                                                            <FaEye />
                                                            <span>Detail</span>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FilledAssignment;
