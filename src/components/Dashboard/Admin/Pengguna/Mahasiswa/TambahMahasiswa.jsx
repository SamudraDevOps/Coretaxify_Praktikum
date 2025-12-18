import React, { useState, useRef } from "react";
// Accept dataContract as prop
import axios from "axios";
import { useCookies } from "react-cookie";
import { getCsrf } from "@/service/getCsrf";
import { RoutesApi } from "@/Routes";
import { IntentEnum } from "@/enums/IntentEnum";
import "./editPopupMahasiswa.css";
import { FaPlus, FaTrash, FaFileImport } from "react-icons/fa";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { RxCross1 } from "react-icons/rx";

const TambahMahasiswa = ({
    onClose,
    onSave,
    isLoading,
    title = "Tambah Mahasiswa",
    isMultipleMode = true,
    initialStudents = null,
    dataContract
}) => {
    const [students, setStudents] = useState(
        initialStudents || (isMultipleMode ? [{ name: "", email: "", password: "", contract_code: "", status: "ACTIVE" }] : [])
    );
    const [cookies] = useCookies(["user"]);
    const [saving, setSaving] = useState(false);
    const [importError, setImportError] = useState("");
    const [isImporting, setIsImporting] = useState(false);
    const [importSuccess, setImportSuccess] = useState("");
    const [selectedContractCode, setSelectedContractCode] = useState("");
    const fileInputRef = useRef(null);

    const handleStudentChange = (index, field, value) => {
        const updated = [...students];
        updated[index] = { ...updated[index], [field]: value };
        setStudents(updated);
    };

    const addStudentRow = () => setStudents([...students, { name: "", email: "", password: "", contract_code: "", status: "ACTIVE" }]);
    const removeStudentRow = (index) => {
        const updated = [...students];
        updated.splice(index, 1);
        setStudents(updated);
    };

    const handleSaveMultiple = async () => {
        if (!selectedContractCode) {
            Swal.fire("Gagal!", "Harap pilih kontrak terlebih dahulu.", "error");
            return;
        }

        const valid = students.filter(s => s.name && s.email && s.password && s.status);
        if (valid.length === 0) {
            Swal.fire("Gagal!", "Harap isi setidaknya satu Mahasiswa dengan nama, email, dan password.", "error");
            return;
        }
        // check duplicate emails
        const emails = valid.map(s => s.email);
        const unique = new Set(emails);
        if (emails.length !== unique.size) {
            Swal.fire("Gagal!", "Terdapat email duplikat. Email Mahasiswa tidak boleh sama", "error");
            return;
        }
        setSaving(true);
        try {
            const csrf = await getCsrf();
            // Bulk import
            // attach selected contract_code to each student
            const payload = valid.map(s => ({ ...s, contract_code: s.contract_code || selectedContractCode }));

            const res = await axios.post(
                RoutesApi.getUserAdmin.url,
                { data: payload },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrf,
                        Authorization: `Bearer ${cookies.token}`,
                    },
                    params: { intent: IntentEnum.API_USER_IMPORT_MAHASISWA },
                }
            );
            Swal.fire("Berhasil!", `${valid.length} mahasiswa berhasil ditambahkan.`, "success");
            if (onSave) onSave(payload);
            onClose && onClose();
        } catch (err) {
            Swal.fire("Gagal!", err?.response?.data?.message || "Terjadi kesalahan saat menyimpan.", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleImportClick = () => fileInputRef.current.click();

    const handleFileImport = (e) => {
        setImportError("");
        setImportSuccess("");
        const file = e.target.files[0];
        if (!file) return;
        setIsImporting(true);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (jsonData.length < 2) {
                    setImportError("File tidak memiliki data yang cukup. Pastikan file berisi header dan minimal satu baris data.");
                    return;
                }

                const headers = jsonData[0].map(h => String(h).toLowerCase().trim());
                const nameIndex = headers.indexOf("name");
                const emailIndex = headers.indexOf("email");
                const passwordIndex = headers.indexOf("password");
                const contractCodeIndex = headers.indexOf("contract_code");
                const statusIndex = headers.indexOf("status");

                if (nameIndex === -1 || emailIndex === -1 || passwordIndex === -1) {
                    setImportError("Format file tidak valid. Pastikan memiliki kolom 'name', 'email', dan 'password'.");
                    return;
                }

                const imported = jsonData.slice(1).map(row => {
                    const status = statusIndex !== -1 ? row[statusIndex] : "ACTIVE";
                    return {
                        name: row[nameIndex] || "",
                        email: row[emailIndex] || "",
                        password: row[passwordIndex] || "",
                        contract_code: (contractCodeIndex !== -1 ? row[contractCodeIndex] : undefined) || selectedContractCode || "",
                        status: ["ACTIVE", "INACTIVE"].includes(status) ? status : "ACTIVE",
                    };
                }).filter(s => s.name && s.email && s.password);

                if (imported.length === 0) {
                    setImportError("Tidak ada data valid yang dapat diimport dari file.");
                    return;
                }

                setStudents(imported);
                setImportSuccess(`${imported.length} Mahasiswa berhasil diimport.`);
                e.target.value = null;
            } catch (error) {
                console.error(error);
                setImportError("Terjadi kesalahan saat memproses file. Pastikan file memiliki format yang benar.");
            } finally {
                setIsImporting(false);
            }
        };

        reader.onerror = () => {
            setImportError("Terjadi kesalahan saat membaca file.");
            setIsImporting(false);
        };

        reader.readAsArrayBuffer(file);
    };

    const downloadTemplate = () => {
        const ws = XLSX.utils.aoa_to_sheet([
            ["name", "email", "password", "contract_code", "status"],
            ["John Doe", "john.doe@example.com", "password123", "L-0001", "ACTIVE"],
            ["Jane Smith", "jane.smith@example.com", "password456", "L-0002", "ACTIVE"],
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, "student_import_template.xlsx");
    };

    return (
        <div className="edit-popup-container-mahasiswa">
            <div className="edit-popup-content-mahasiswa">
                <div className="edit-popup-header-mahasiswa">
                    <h2>{title}</h2>
                    <RxCross1 className="text-2xl hover:cursor-pointer" onClick={onClose} />
                </div>

                {isMultipleMode ? (
                    <div>
                        {importSuccess && <div className="import-success">{importSuccess}</div>}
                        <div className="import-section ">
                            <div className="flex mb-3 items-start">
                                <select value={selectedContractCode} onChange={(e) => setSelectedContractCode(e.target.value)} className="w-fit border px-2 py-1 rounded">
                                    <option value="">Pilih Kontrak</option>
                                    {dataContract.data.map((item) => (
                                        <option key={item.contract_code} value={item.contract_code}>
                                            {item.contract_code + " - " + (item.university?.name || "")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="import-buttons">
                                <button type="button" className="import-button" onClick={handleImportClick} disabled={isImporting}>
                                    {isImporting ? <span className="loading-spinner">Importing...</span> : (<><FaFileImport /> Import dari Excel/CSV</>)}
                                </button>
                                <button type="button" className="template-button" onClick={downloadTemplate}>Download Template</button>
                            </div>
                            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept=".xlsx,.xls,.csv" onChange={handleFileImport} />
                            {importError && <div className="import-erro">{importError}</div>}
                        </div>

                        <div className="students-counter"><strong>{students.length}</strong> Mahasiswa akan ditambahkan</div>
                        <div className="students-table">
                            <div className="students-table-header">
                                <div className="student-field-header">Nama Mahasiswa</div>
                                <div className="student-field-header">Email</div>
                                <div className="student-field-header">Password</div>
                                {/* <div className="student-field-header">Kontrak</div> */}
                                <div className="student-field-header">Status</div>
                                <div className="student-field-header actions">Actions</div>
                            </div>

                            {students.map((student, index) => (
                                <div key={index} className="student-row">
                                    <div className="student-field">
                                        <input type="text" value={student.name} onChange={(e) => handleStudentChange(index, "name", e.target.value)} placeholder="Nama Mahasiswa" required />
                                    </div>
                                    <div className="student-field">
                                        <input type="email" value={student.email} onChange={(e) => handleStudentChange(index, "email", e.target.value)} placeholder="Email" required />
                                    </div>
                                    <div className="student-field">
                                        <input type="text" value={student.password} onChange={(e) => handleStudentChange(index, "password", e.target.value)} placeholder="Password" required />
                                    </div>
                                    <div className="student-field">
                                        <select value={student.status} onChange={(e) => handleStudentChange(index, "status", e.target.value)}>
                                            <option value="ACTIVE">Active</option>
                                            <option value="INACTIVE">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="student-field actions">
                                        <button type="button" className="remove-student-btn" onClick={() => removeStudentRow(index)} disabled={students.length === 1}><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="add-student-row">
                            <button type="button" className="add-student-btn" onClick={addStudentRow}><FaPlus /> Tambah Mahasiswa Lain</button>
                        </div>

                        <div className="edit-popup-actions-mahasiswa">
                            <button className="edit-save-button" type="button" onClick={onSave} disabled={isLoading}>{(isLoading) ? "Menyimpan..." : "Simpan Semua"}</button>
                            <button className="edit-cancel-button" type="button" onClick={onClose}>Batal</button>
                        </div>
                    </div>
                ) : (
                    <form>
                        <div className="edit-form-group-mahasiswa">
                            <label>Nama Mahasiswa:</label>
                            <input type="text" name="name" required />
                        </div>
                        <div className="edit-form-group-mahasiswa">
                            <label>Email:</label>
                            <input type="email" name="email" required />
                        </div>
                        <div className="edit-popup-actions-mahasiswa">
                            <button className="edit-save-button" type="button" onClick={onClose}>Simpan</button>
                            <button className="edit-cancel-button" type="button" onClick={onClose}>Batal</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TambahMahasiswa;
