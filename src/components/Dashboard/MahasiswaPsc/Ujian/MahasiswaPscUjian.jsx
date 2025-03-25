import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import JoinExam from './JoinExam';
import ExamCard from './ExamCard';

const MahasiswaPscUjian = () => {
    const [cookies] = useCookies(["token"]);
    const [search, setSearch] = useState("");
    const [url, setUrl] = useState(RoutesApi.student_psc.exams.url);
    const [isJoinExamOpen, setIsJoinExamOpen] = useState(false);

    // Fetch exams data
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ["mahasiswa_psc_ujian", url],
        queryFn: async () => {
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                    Accept: "application/json",
                }
            });
            return data;
        },
    });

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleJoinExamSuccess = () => {
        refetch();
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="loading">
                <ClipLoader color="#7502B5" size={50} />
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="h-screen w-full justify-center items-center flex">
                <Alert variant="destructive" className="w-1/2 bg-white">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error!</AlertTitle>
                    <div className="">
                        <p>{error?.message ?? "Error loading ujian!"}</p>
                        <div className="w-full flex justify-end">
                            <button
                                className="bg-green-500 p-2 rounded-md text-white"
                                onClick={() => refetch()}
                            >
                                Ulangi
                            </button>
                        </div>
                    </div>
                </Alert>
            </div>
        );
    }

    // Filter data based on search
    const filteredData = data?.data?.filter(item => 
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.status?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    // Separate active exams from other exams
    const activeExams = filteredData.filter(exam => exam.status === 'ACTIVE');
    const otherExams = filteredData.filter(exam => exam.status !== 'ACTIVE');

    return (
        <div className="kontrak-container">
            <div className="header">
                <h2>Ujian Saya</h2>
            </div>
            <div className="search-add-container">
                <div className="search-input-container">
                    <input
                        type="text"
                        id="search"
                        className="search-input"
                        placeholder="Cari Ujian                     🔎"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <button
                    className="bg-blue-800 p-2 rounded-md text-white hover:bg-blue-900 flex items-center"
                    onClick={() => setIsJoinExamOpen(true)}
                >
                    <FaPlus className="mr-2" /> Gabung Ujian
                </button>
            </div>

            {filteredData.length === 0 ? (
                <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada ujian</h3>
                    <p className="mt-1 text-sm text-gray-500">Anda belum terdaftar di ujian manapun.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                        onClick={() => setIsJoinExamOpen(true)}
                    >
                        Gabung Ujian
                    </button>
                </div>
            ) : (
                <div>
                    {activeExams.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ujian Aktif</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeExams.map((exam) => (
                                    <ExamCard key={exam.id} exam={exam} />
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {otherExams.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ujian Lainnya</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {otherExams.map((exam) => (
                                    <ExamCard key={exam.id} exam={exam} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {data?.meta && (
                <div className="pagination-container !static !bg-transparent mt-10 !shadow-none">
                    <div className="pagination-info">
                        Showing {data.meta.from || 0} to {data.meta.to || 0} of {data.meta.total || 0} entries
                    </div>
                    <div className="pagination">
                        <button
                            className={`page-item`}
                            onClick={() => {
                                if (data.links.prev) setUrl(data.links.prev);
                            }}
                            disabled={!data.links.prev}
                        >
                            &lt;
                        </button>
                        <button className="page-item">{data.meta.current_page}</button>
                        <button
                            className={`page-item`}
                            onClick={() => {
                                if (data.links.next) setUrl(data.links.next);
                            }}
                            disabled={!data.links.next}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}

            {/* Join Exam Dialog */}
            <JoinExam 
                isOpen={isJoinExamOpen} 
                setIsOpen={setIsJoinExamOpen} 
                onSuccess={handleJoinExamSuccess}
            />
        </div>
    );
};

export default MahasiswaPscUjian;