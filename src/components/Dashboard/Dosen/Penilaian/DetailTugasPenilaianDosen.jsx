import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoReload } from "react-icons/io5";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function DetaiTugaslPenilaianDosen() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [selectedData, setSelectedData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [cookies, setCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    const [data, setData] = useState([
        {
            id: "1",
            namaPraktikum: "PT.NARA JAYA",
        },
        {
            id: "2",
            namaPraktikum: "PT NARA JAYA",
        },
    ]);

    const [formData, setFormData] = useState({
        namaPraktikum: "",
    });


    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "ascending" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
    };

    const handleEditClick = (index) => {
        setSelectedData(data[index]);
        setIsOpen(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [search, setSearch] = useState("");

    const processedData = data.map((item) => ({
        ...item,
        highlight:
            search &&
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(search.toLowerCase())
            ),
    }));

    return (
        <div className="kontrak-container">
            <div className="header">
                <h2>Detail Praktikum - Penilaian</h2>
            </div>
            <div className="search-add-container">
                <div className="search-input-container">
                    <input
                        type="text"
                        id="search"
                        className="search-input"
                        placeholder="Cari Ujian                       🔎"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th onClick={() => handleSort("namaPraktikum ")}>
                                Nama Praktikum{" "}
                                {sortConfig.key === "namaPraktikum"
                                    ? sortConfig.direction === "ascending"
                                        ? "↑"
                                        : "↓"
                                    : sortConfig.direction === "descending"
                                        ? "↓"
                                        : "↑"}
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item.id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{item.namaPraktikum}</td>
                                <td>
                                    <button
                                        className="action-button"
                                        onClick={() => navigate('/dosen/penilaian/detail-tugas/detail-penilaian')}
                                    >
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-container sticky">
                    <div className="pagination-info">
                        {`Showing ${indexOfFirstItem + 1} to ${Math.min(
                            indexOfLastItem,
                            data.length
                        )} of ${data.length} entries`}
                    </div>

                    <div className="pagination ">
                        <button
                            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {Array.from(
                            { length: Math.ceil(data.length / itemsPerPage) },
                            (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                        <button
                            className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? "disabled" : ""}`}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <EditPopupMahasiswa
                    onClose={() => setIsOpen(false)}
                    data={selectedData}
                />
            )}
        </div>
    );
}