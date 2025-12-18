import React, { useState, useEffect, useRef } from "react";
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
    isLoading = false,
    title = "Tambah Mahasiswa",
    isMultipleMode = true,
    initialStudents = null,
    dataContract // expected: { data: [{ contract_code, university: { name } }] }
}) => {
    const [students, setStudents] = useState(
        initialStudents ||
        (isMultipleMode
            ? [{ name: "", email: "", password: "", contract_id: "", status: "ACTIVE" }]
            : [])
    );
    const [cookies] = useCookies(["user"]);
    const [saving, setSaving] = useState(false);
    const [importError, setImportError] = useState("");
    const [isImporting, setIsImporting] = useState(false);
    const [importSuccess, setImportSuccess] = useState("");
    const [selectedContractId, setSelectedContractId] = useState(""); // ✅ contract_id, bukan code
    const fileInputRef = useRef(null);

    // 🔍 Debug logs
    useEffect(() => {
        console.log("[DEBUG] selectedContractId updated:", selectedContractId);
    }, [selectedContractId]);

    useEffect(() => {
        console.log("[DEBUG] students updated:", students);
    }, [students]);

    const handleStudentChange = (index, field, value) => {
        const updated = [...students];
        updated[index] = { ...updated[index], [field]: value };
        setStudents(updated);
    };

    const addStudentRow = () =>
        setStudents([...students, { name: "", email: "", contract_id: "", status: "ACTIVE" }]);

    const removeStudentRow = (index) => {
        const updated = [...students];
        updated.splice(index, 1);
        setStudents(updated);
    };

    const handleContractChange = (e) => {
        const value = e.target.value;
        console.log("[DEBUG] Contract selected:", value);
        setSelectedContractId(value);
    };

    const handleSaveMultiple = () => {
        console.log("[DEBUG] handleSaveMultiple triggered");
        console.log("[DEBUG] selectedContractId:", selectedContractId);
        console.log("[DEBUG] students:", students);

        if (!selectedContractId?.trim()) {
            Swal.fire("Gagal!", "Harap pilih kontrak terlebih dahulu.", "error");
            return;
        }

        // Validasi & filter mahasiswa
        const valid = students.filter(s => s.name?.trim() && s.email?.trim() && s.status);
        const invalid = students.filter(s => !(s.name?.trim() && s.email?.trim() && s.status));

        console.log("[DEBUG] Valid:", valid, "Invalid:", invalid);

        if (valid.length === 0) {
            Swal.fire("Gagal!", "Tidak ada data mahasiswa yang valid untuk disimpan.", "error");
            return;
        }

        // ✅ DELEGATE ke EditMahasiswa — biar dia yang handle axios
        if (onSave) {
            onSave(valid, selectedContractId, invalid, []);
        } else {
            console.warn("[WARN] onSave prop not provided");
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
                const ws = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

                if (jsonData.length < 2) {
                    throw new Error("File harus berisi header dan minimal 1 baris data.");
                }

                const headers = jsonData[0].map(h => String(h).toLowerCase().trim());
                const nameIdx = headers.indexOf("name");
                const emailIdx = headers.indexOf("email");
                
                // ❌ HAPUS: const contractIdIdx = headers.indexOf("contract_id");
                const statusIdx = headers.indexOf("status");

                if (nameIdx === -1 || emailIdx === -1 ) {
                    throw new Error("File harus memiliki kolom: name, email.");
                }

                // ✅ Hanya ambil name, email, password, status — TIDAK ADA contract_id di sini
                const imported = jsonData.slice(1).map(row => {
                    const name = (row[nameIdx] || "").toString().trim();
                    const email = (row[emailIdx] || "").toString().trim();
                    
                    const status = statusIdx !== -1 && ["ACTIVE", "INACTIVE"].includes(row[statusIdx])
                        ? row[statusIdx].toString().trim()
                        : "ACTIVE";

                    return { name, email, status }; // ✅ TANPA contract_id
                }).filter(s => s.name && s.email);

                if (imported.length === 0) throw new Error("Tidak ada data valid untuk diimpor.");

                setStudents(imported);
                setImportSuccess(`${imported.length} mahasiswa berhasil diimpor.`);
                e.target.value = null;
            } catch (error) {
                const msg = error.message || "Gagal memproses file.";
                setImportError(msg);
                console.error("[ERROR] Import failed:", error);
            } finally {
                setIsImporting(false);
            }
        };

        reader.onerror = () => {
            setImportError("Gagal membaca file.");
            setIsImporting(false);
        };

        reader.readAsArrayBuffer(file);
    };

    const downloadTemplate = () => {
        const ws = XLSX.utils.aoa_to_sheet([
            ["name", "email", "contract_id", "status"],
            ["John Doe", "john.doe@example.com", "L-0001", "ACTIVE"],
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, "template_import_mahasiswa.xlsx");
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
                        <div className="import-section">
                            <div className="flex mb-3 items-start">
                                <select
                                    value={selectedContractId}
                                    onChange={handleContractChange}
                                    className="w-fit border px-2 py-1 rounded"
                                >
                                    <option value="">Pilih Kontrak</option>
                                    {dataContract?.data && dataContract.data.length > 0 ? (
                                        dataContract.data.map((item) => (
                                            <option key={item.contract_code} value={item.contract_code}>
                                                {item.contract_code} - {item.university?.name || "—"}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Tidak ada kontrak tersedia</option>
                                    )}
                                </select>
                                {selectedContractId && (
                                    <span className="ml-2 text-green-600 font-medium">
                                        ✓ {selectedContractId}
                                    </span>
                                )}
                            </div>

                            <div className="import-buttons">
                                <button
                                    type="button"
                                    className="import-button"
                                    onClick={handleImportClick}
                                    disabled={isImporting}
                                >
                                    {isImporting ? "Importing..." : <><FaFileImport /> Import dari Excel/CSV</>}
                                </button>
                                <button type="button" className="template-button" onClick={downloadTemplate}>
                                    Download Template
                                </button>
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileImport}
                            />
                            {importError && <div className="import-error text-red-500">{importError}</div>}
                        </div>

                        <div className="students-counter">
                            <strong>{students.length}</strong> Mahasiswa akan ditambahkan
                        </div>

                        <div className="students-table">
                            <div className="students-table-header">
                                <div className="student-field-header">Nama</div>
                                <div className="student-field-header">Email</div>
                                {/* <div className="student-field-header">Password</div> */}
                                <div className="student-field-header">Status</div>
                                <div className="student-field-header actions">Aksi</div>
                            </div>

                            {students.map((student, index) => (
                                <div key={index} className="student-row">
                                    <div className="student-field">
                                        <input
                                            type="text"
                                            value={student.name}
                                            onChange={(e) => handleStudentChange(index, "name", e.target.value)}
                                            placeholder="Nama Mahasiswa"
                                            required
                                        />
                                    </div>
                                    <div className="student-field">
                                        <input
                                            type="email"
                                            value={student.email}
                                            onChange={(e) => handleStudentChange(index, "email", e.target.value)}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    {/* <div className="student-field">
                                        <input
                                            type="text"
                                            value={student.password}
                                            onChange={(e) => handleStudentChange(index, "password", e.target.value)}
                                            placeholder="Password"
                                            required
                                        />
                                    </div> */}
                                    <div className="student-field">
                                        <select
                                            value={student.status}
                                            onChange={(e) => handleStudentChange(index, "status", e.target.value)}
                                        >
                                            <option value="ACTIVE">Active</option>
                                            <option value="INACTIVE">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="student-field actions">
                                        <button
                                            type="button"
                                            className="remove-student-btn"
                                            onClick={() => removeStudentRow(index)}
                                            disabled={students.length <= 1}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="add-student-row">
                            <button type="button" className="add-student-btn" onClick={addStudentRow}>
                                <FaPlus /> Tambah Mahasiswa Lain
                            </button>
                        </div>

                        <div className="edit-popup-actions-mahasiswa">
                            <button
                                className="edit-save-button"
                                type="button"
                                onClick={handleSaveMultiple}
                                disabled={saving || isLoading}
                            >
                                {saving ? "Menyimpan..." : "Simpan Semua"}
                            </button>
                            <button className="edit-cancel-button" type="button" onClick={onClose}>
                                Batal
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-500">Mode tambah tunggal belum diimplementasi.</p>
                        <button className="edit-cancel-button mt-4" onClick={onClose}>Tutup</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TambahMahasiswa;