import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { format } from 'date-fns';
import UpdateExamPopUp from './UpdateExamPopUp';
import './examTable.css';

const ExamTable = ({ exams, onUpdate, onDelete, onViewMembers, tasksData, currentPage, itemsPerPage }) => {
    const [selectedExam, setSelectedExam] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleUpdateClick = (exam) => {
        setSelectedExam(exam);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateSuccess = () => {
        setIsUpdateModalOpen(false);
        setSelectedExam(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        try {
            return format(new Date(dateString), 'yyyy-MM-dd HH:mm');
        } catch (error) {
            return dateString;
        }
    };

    const getTaskName = (taskId) => {
        if (!tasksData || !tasksData.data) return "Unknown Task";
        const task = tasksData.data.find(task => task.id === taskId);
        return task ? task.name : "Unknown Task";
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    // Apply sorting if sortConfig is set
    const sortedExams = [...exams];
    if (sortConfig.key) {
        sortedExams.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
    }

    // Calculate the index for display
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

    return (
        <div className="psc-exam-table-container">
            <table className="psc-exam-table">
                <thead className="psc-exam-thead">
                    <tr className="psc-exam-tr">
                        <th className="psc-exam-th">No</th>
                        <th className="psc-exam-th" onClick={() => handleSort("name")}>
                            Nama Ujian{" "}
                            {sortConfig.key === "name"
                                ? sortConfig.direction === "ascending"
                                    ? "↑"
                                    : "↓"
                                : "↑"}
                        </th>
                        <th className="psc-exam-th">Soal</th>
                        <th className="psc-exam-th">File Support</th>
                        <th className="psc-exam-th">Tanggal Mulai</th>
                        <th className="psc-exam-th">Tanggal Selesai</th>
                        <th className="psc-exam-th">Durasi (menit)</th>
                        <th className="psc-exam-th">Status</th>
                        <th className="psc-exam-th">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExams.length > 0 ? (
                        sortedExams.map((exam, index) => (
                            <tr key={exam.id} className="psc-exam-tr">
                                <td className="psc-exam-td">{indexOfFirstItem + index + 1}</td>
                                <td className="psc-exam-td">{exam.name}</td>
                                <td className="psc-exam-td">{getTaskName(exam.task_id)}</td>
                                <td className="psc-exam-td">{exam.supporting_file || "No file"}</td>
                                <td className="psc-exam-td">{formatDate(exam.start_period)}</td>
                                <td className="psc-exam-td">{formatDate(exam.end_period)}</td>
                                <td className="psc-exam-td">{exam.duration}</td>
                                <td className="psc-exam-td">
                                    {exam.status === 'ACTIVE' ? (
                                        <span className="psc-exam-status-badge active">Aktif</span>
                                    ) : exam.status === 'COMPLETED' ? (
                                        <span className="psc-exam-status-badge completed">Selesai</span>
                                    ) : (
                                        <span className="psc-exam-status-badge inactive">Tidak Aktif</span>
                                    )}
                                </td>
                                <td className="psc-exam-td">
                                    <button
                                        className="psc-exam-action-button edit"
                                        onClick={() => handleUpdateClick(exam)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="psc-exam-action-button delete"
                                        onClick={() => onDelete(exam.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="psc-exam-action-button view"
                                        onClick={() => onViewMembers(exam.id, exam.name)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="psc-exam-tr">
                            <td colSpan="9" className="psc-exam-td text-center">
                                Tidak ada data ujian
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isUpdateModalOpen && selectedExam && (
                <UpdateExamPopUp
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onSuccess={handleUpdateSuccess}
                    examData={selectedExam}
                    onUpdate={onUpdate}
                    tasksData={tasksData}
                />
            )}
        </div>
    );
};

export default ExamTable;
