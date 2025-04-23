import React, { useState, useRef } from "react";
import "./tambahPengajar.css";
import { FaFileImport, FaPlus, FaTrash } from "react-icons/fa";
import * as XLSX from 'xlsx';
import { RxCross1 } from "react-icons/rx";

const TambahPengajar = ({ 
  isOpen, 
  onClose, 
  onSave,
  formData,
  setFormData,
  isLoading = false,
  onImport = null,
  isMultipleMode = false
}) => {
  if (!isOpen) return null;

  // For multiple instructors mode
  const [instructors, setInstructors] = useState(isMultipleMode ? [{ name: "", email: "", status: "ACTIVE" }] : []);
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);
  // Add errors state for validation
  const [errors, setErrors] = useState({});
  const [instructorErrors, setInstructorErrors] = useState([{}]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // For handling changes in multiple instructors mode
  const handleInstructorChange = (index, field, value) => {
    const updatedInstructors = [...instructors];
    updatedInstructors[index] = { ...updatedInstructors[index], [field]: value };
    setInstructors(updatedInstructors);
    
    // Clear error for this field in this instructor
    const updatedErrors = [...instructorErrors];
    if (updatedErrors[index] && updatedErrors[index][field]) {
      updatedErrors[index] = { ...updatedErrors[index], [field]: null };
      setInstructorErrors(updatedErrors);
    }
  };

  // Add a new instructor row
  const addInstructorRow = () => {
    setInstructors([...instructors, { name: "", email: "", status: "ACTIVE" }]);
    setInstructorErrors([...instructorErrors, {}]);
  };

  // Remove an instructor row
  const removeInstructorRow = (index) => {
    const updatedInstructors = [...instructors];
    updatedInstructors.splice(index, 1);
    setInstructors(updatedInstructors);
    
    const updatedErrors = [...instructorErrors];
    updatedErrors.splice(index, 1);
    setInstructorErrors(updatedErrors);
  };

  // Validate single instructor form
  const validateSingleForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Nama pengajar harus diisi";
    }

    if (!formData.email) {
      newErrors.email = "Email pengajar harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.status) {
      newErrors.status = "Status harus dipilih";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate multiple instructors
  const validateMultipleForm = () => {
    let isValid = true;
    const newInstructorErrors = instructors.map((instructor, index) => {
      let instructorError = {};
      
      if (!instructor.name) {
        instructorError.name = "Nama pengajar harus diisi";
        isValid = false;
      }
      
      if (!instructor.email) {
        instructorError.email = "Email pengajar harus diisi";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(instructor.email)) {
        instructorError.email = "Format email tidak valid";
        isValid = false;
      }
      
      if (!instructor.status) {
        instructorError.status = "Status harus dipilih";
        isValid = false;
      }
      
      return instructorError;
    });
    
    // Check for duplicate emails
    const emails = instructors.map(instructor => instructor.email);
    const uniqueEmails = new Set(emails.filter(email => email)); // Filter out empty emails
    
    if (uniqueEmails.size < emails.filter(email => email).length) {
      // There are duplicates
      const duplicateEmails = {};
      emails.forEach((email, index) => {
        if (email && emails.indexOf(email) !== index) {
          newInstructorErrors[index] = {
            ...newInstructorErrors[index],
            email: "Email duplikat. Setiap pengajar harus memiliki email unik."
          };
          isValid = false;
        }
      });
    }
    
    setInstructorErrors(newInstructorErrors);
    return isValid;
  };

  // Handle save for multiple instructors
  const handleSaveMultiple = () => {
    if (validateMultipleForm()) {
      // Filter out any empty rows
      const validInstructors = instructors.filter(instructor => 
        instructor.name && instructor.email && instructor.status
      );
      
      onSave(validInstructors);
    }
  };

  // Handle file import
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
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Check if the file has data
        if (jsonData.length < 2) {
          setImportError("File tidak memiliki data yang cukup. Pastikan file berisi header dan minimal satu baris data.");
          return;
        }
        
        // Get headers (first row)
        const headers = jsonData[0].map(header => header.toLowerCase().trim());
        
        // Check if required columns exist
        const nameIndex = headers.indexOf('name');
        const emailIndex = headers.indexOf('email');
        const statusIndex = headers.indexOf('status');
        
        if (nameIndex === -1 || emailIndex === -1) {
          setImportError("Format file tidak valid. Pastikan file memiliki kolom 'name' dan 'email'.");
          return;
        }
        
        // Process data rows (skip header row)
        const importedInstructors = jsonData.slice(1).map(row => {
          const status = statusIndex !== -1 ? row[statusIndex] : 'ACTIVE';
          return {
            name: row[nameIndex] || '',
            email: row[emailIndex] || '',
            status: ['ACTIVE', 'INACTIVE'].includes(status) ? status : 'ACTIVE'
          };
        }).filter(instructor => instructor.name && instructor.email); // Filter out empty rows
        
        if (importedInstructors.length === 0) {
          setImportError("Tidak ada data valid yang dapat diimpor dari file.");
          return;
        }
        
        if (isMultipleMode) {
          // Set the imported instructors for multiple mode
          setInstructors(importedInstructors);
          setInstructorErrors(Array(importedInstructors.length).fill({}));
          setImportSuccess(`Berhasil mengimpor ${importedInstructors.length} data pengajar dari file.`);
        } else if (importedInstructors.length > 0) {
          // If only adding one instructor, set the form data to the first imported instructor
          setFormData(importedInstructors[0]);
          setErrors({});
          setImportSuccess("Berhasil mengimpor data pengajar dari file.");
        }
        
        // Reset file input
        e.target.value = null;
        
      } catch (error) {
        console.error("Error parsing file:", error);
        setImportError("Terjadi kesalahan saat membaca file. Pastikan format file benar.");
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

  // Download sample template
  const downloadTemplate = () => {
    // Create a sample worksheet
    const ws = XLSX.utils.aoa_to_sheet([
      ['name', 'email', 'status'],
      ['John Doe', 'john@example.com', 'ACTIVE'],
      ['Jane Smith', 'jane@example.com', 'ACTIVE']
    ]);
    
    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Instructors');
    
    // Generate and download the file
    XLSX.writeFile(wb, 'instructor_import_template.xlsx');
  };

  // Trigger file input click
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  // Handle save with validation for single instructor
  const handleSaveWithValidation = () => {
    if (validateSingleForm()) {
      onSave();
    }
  };

  return (
    <div className="tambah-instruktur-overlay">
      <div className="tambah-instruktur-container">
        <div className="tambah-instruktur-header">
          <h2>Tambah Pengajar</h2>
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Import Section */}
        <div className="import-section">
          <div className="import-buttons">
            <button
              type="button"
              className="import-button"
              onClick={handleImportClick}
              disabled={isImporting}
            >
              {isImporting ? (
                <>
                  <span className="loading-spinner"></span>
                  Importing...
                </>
              ) : (
                <>
                  <FaFileImport /> Import dari Excel/CSV
                </>
              )}
            </button>
            <button 
              type="button" 
              className="template-button"
              onClick={downloadTemplate}
            >
              Download Template
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".xlsx,.xls,.csv"
            onChange={handleFileImport}
          />
          {importError && (
            <div className="import-error">
              {importError}
            </div>
          )}
          {importSuccess && (
            <div className="import-success">
              {importSuccess}
            </div>
          )}
        </div>

        {isMultipleMode ? (
          <div>
            <div className="instructors-counter">
              <strong>{instructors.length}</strong> pengajar akan ditambahkan
            </div>

            <div className="instructors-table-container">
              <h3 className="section-title">Daftar Pengajar</h3>
              <p className="section-description">
                Tambahkan informasi untuk setiap pengajar yang ingin didaftarkan.
              </p>
              
              <div className="instructors-table">
                <div className="instructors-table-header">
                  <div className="instructor-field-header">Nama Pengajar</div>
                  <div className="instructor-field-header">Email</div>
                  <div className="instructor-field-header">Status</div>
                  <div className="instructor-field-header actions">Actions</div>
                </div>
                
                {instructors.map((instructor, index) => (
                  <div key={index} className="instructor-row">
                    <div className="instructor-field">
                      <input
                        type="text"
                        value={instructor.name}
                        onChange={(e) => handleInstructorChange(index, "name", e.target.value)}
                        placeholder="Nama Pengajar"
                        required
                      />
                      {instructorErrors[index]?.name && (
                        <p className="text-red-500 text-sm">{instructorErrors[index].name}</p>
                      )}
                    </div>
                    <div className="instructor-field">
                      <input
                        type="email"
                        value={instructor.email}
                        onChange={(e) => handleInstructorChange(index, "email", e.target.value)}
                        placeholder="Email"
                        required
                      />
                      {instructorErrors[index]?.email && (
                        <p className="text-red-500 text-sm">{instructorErrors[index].email}</p>
                      )}
                    </div>
                    <div className="instructor-field">
                      <select
                        value={instructor.status}
                        onChange={(e) => handleInstructorChange(index, "status", e.target.value)}
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                      {instructorErrors[index]?.status && (
                        <p className="text-red-500 text-sm">{instructorErrors[index].status}</p>
                      )}
                    </div>
                    <div className="instructor-field actions">
                      <button 
                        type="button" 
                        className="remove-instructor-btn"
                        onClick={() => removeInstructorRow(index)}
                        disabled={instructors.length === 1}
                        title={instructors.length === 1 ? "Minimal satu pengajar" : "Hapus pengajar ini"}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="add-instructor-row">
              <button 
                type="button" 
                className="add-instructor-btn"
                onClick={addInstructorRow}
              >
                <FaPlus /> Tambah Pengajar Lain
              </button>
            </div>
            
            <div className="tambah-instruktur-actions">
              <button 
                className="cancel-button" 
                onClick={onClose}
                disabled={isLoading}
              >
                Batal
              </button>
              <button 
                className="save-button" 
                onClick={handleSaveMultiple}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Semua"
                )}
              </button>
            </div>
          </div>
        ) : (
          <> 
            <div className="tambah-instruktur-form">
              <div className="form-group">
                <label>Nama Pengajar:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama pengajar"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan email pengajar"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status}</p>
                )}
              </div>
              <div className="password-info">
                <p>Password akan digenerate secara otomatis dan akan dikirimkan ke email pengajar.</p>
              </div>
            </div>
            <div className="tambah-instruktur-actions">
              <button 
                className="cancel-button" 
                onClick={onClose}
              >
                Batal
              </button>
              <button 
                className="save-button" 
                onClick={handleSaveWithValidation}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TambahPengajar;
