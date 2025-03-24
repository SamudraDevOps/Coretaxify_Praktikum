import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import AssignmentsTable from './AssignmentsTable';

const MahasiswaPscKelasPraktikum = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cookies] = useCookies(["token"]);
    const [search, setSearch] = useState("");

    // Fetch group details
    const { 
        isLoading: isLoadingGroup, 
        isError: isErrorGroup, 
        data: groupData, 
        error: groupError 
    } = useQuery({
        queryKey: ["mahasiswa_psc_group", id],
        queryFn: async () => {
            const { data } = await axios.get(`${RoutesApi.student_psc.groups.url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                    Accept: "application/json",
                }
            });
            return data;
        },
    });

    // Fetch assignments for this group
    const { 
        isLoading: isLoadingAssignments, 
        isError: isErrorAssignments, 
        data: assignmentsData, 
        error: assignmentsError,
        refetch: refetchAssignments
    } = useQuery({
        queryKey: ["mahasiswa_psc_group_assignments", id],
        queryFn: async () => {
            const { data } = await axios.get(`${RoutesApi.student_psc.groups.url}/${id}/assignments`, {
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

    const handleBackClick = () => {
        navigate('/mahasiswa-psc/kelas');
    };

    // Loading state for the group data
    if (isLoadingGroup) {
        return (
            <div className="loading">
                <ClipLoader color="#7502B5" size={50} />
            </div>
        );
    }

    // Error state for the group data
    if (isErrorGroup) {
        return (
            <div className="h-screen w-full justify-center items-center flex">
                <Alert variant="destructive" className="w-1/2 bg-white">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error!</AlertTitle>
                    <div className="">
                        <p>{groupError?.message ?? "Error loading class data!"}</p>
                        <div className="w-full flex justify-end">
                            <button
                                className="bg-green-500 p-2 rounded-md text-white"
                                onClick={() => window.location.reload()}
                            >
                                Ulangi
                            </button>
                        </div>
                    </div>
                </Alert>
            </div>
        );
    }

    // Filter assignments based on search
    const filteredAssignments = assignmentsData?.data?.filter(item => 
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div className="kontrak-container">
            <div className="header flex items-center">
                <button 
                    onClick={handleBackClick}
                    className="mr-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h2>{groupData?.data?.name || 'Kelas'}</h2>
                    <p className="text-sm text-gray-600">Daftar praktikum dalam kelas ini</p>
                </div>
            </div>
            
            <div className="search-add-container">
                <div className="search-input-container">
                    <input
                        type="text"
                        id="search"
                        className="search-input"
                        placeholder="Cari Praktikum                     🔎"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <AssignmentsTable 
                assignments={filteredAssignments}
                loading={isLoadingAssignments}
                error={isErrorAssignments ? assignmentsError : null}
                refetch={refetchAssignments}
            />

            {assignmentsData?.meta && (
                <div className="pagination-container !static !bg-transparent mt-10 !shadow-none">
                    <div className="pagination-info">
                        Showing {assignmentsData.meta.from || 0} to {assignmentsData.meta.to || 0} of {assignmentsData.meta.total || 0} entries
                    </div>
                    <div className="pagination">
                        <button
                            className={`page-item`}
                            onClick={() => {
                                if (assignmentsData.links.prev) {
                                    // Handle pagination if needed
                                }
                            }}
                            disabled={!assignmentsData.links.prev}
                        >
                            &lt;
                        </button>
                        <button className="page-item">{assignmentsData.meta.current_page}</button>
                        <button
                            className={`page-item`}
                            onClick={() => {
                                if (assignmentsData.links.next) {
                                    // Handle pagination if needed
                                }
                            }}
                            disabled={!assignmentsData.links.next}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MahasiswaPscKelasPraktikum;