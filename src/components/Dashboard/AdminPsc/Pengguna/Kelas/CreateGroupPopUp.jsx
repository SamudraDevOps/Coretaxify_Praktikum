import React, { useState } from "react";
import "./editPopupKelas.css"; // Reuse existing styles
import { IoReload } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const CreateGroupPopup = ({ 
  isOpen, 
  onClose, 
  onSave, 
  formData, 
  setFormData, 
  isLoading 
}) => {
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, import_file: e.target.files[0] });
    }
  };

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleReloadCode = () => {
    setFormData({ ...formData, class_code: generateRandomCode() });
    if (errors.class_code) {
      setErrors({ ...errors, class_code: null });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Nama kelas harus diisi";
    }

    if (!formData.start_period) {
      newErrors.start_period = "Periode mulai harus diisi";
    }

    if (!formData.end_period) {
      newErrors.end_period = "Periode selesai harus diisi";
    } else if (formData.start_period && new Date(formData.end_period) <= new Date(formData.start_period)) {
      newErrors.end_period = "Periode selesai harus setelah periode mulai";
    }

    if (!formData.class_code) {
      newErrors.class_code = "Kode kelas harus diisi";
    }

    if (!formData.status) {
      newErrors.status = "Status harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Modify the save handler to use validation
  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  return (
    <div className="edit-popup-container-kelas">
      <div className="edit-popup-content-kelas">
        <div className="edit-popup-header-kelas">
          <h2>Tambah Kelas Baru</h2>
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form>
          <div className="edit-form-group-kelas">
            <label>Nama Kelas:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Masukkan nama kelas"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          
          <div className="edit-form-group-kelas">
            <label>Periode Mulai:</label>
            <input
              type="date"
              name="start_period"
              value={formData.start_period || ""}
              onChange={handleChange}
              max={formData.end_period}
            />
            {errors.start_period && (
              <p className="text-red-500 text-sm">{errors.start_period}</p>
            )}
          </div>
          
          <div className="edit-form-group-kelas">
            <label>Periode Selesai:</label>
            <input
              type="date"
              name="end_period"
              value={formData.end_period || ""}
              onChange={handleChange}
              min={formData.start_period || new Date().toISOString().split("T")[0]}
            />
            <small>Harus setelah periode mulai</small>
            {errors.end_period && (
              <p className="text-red-500 text-sm">{errors.end_period}</p>
            )}
          </div>
          
          <div className="edit-form-group-kelas">
            <label>Kode Kelas:</label>
            <div className="flex-container">
              <input
                type="text"
                name="class_code"
                value={formData.class_code || ""}
                onChange={handleChange}
                className="code-input"
                placeholder="Kode kelas unik"
              />
              <button 
                type="button" 
                onClick={handleReloadCode}
                className="generate-code-button"
              >
                <IoReload />
              </button>
            </div>
            <small>Kode kelas harus unik</small>
            {errors.class_code && (
              <p className="text-red-500 text-sm">{errors.class_code}</p>
            )}
          </div>
          
          <div className="edit-form-group-kelas">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
            >
              <option value="">Pilih Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>
          
          {/* <div className="edit-form-group-kelas">
            <label>Import Data (Opsional):</label>
            <input
              type="file"
              name="import_file"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
            <small>Format: XLSX, XLS (Max 5MB)</small>
          </div> */}
          
          <div className="edit-popup-actions-kelas">
            <button
              type="button"
              onClick={onClose}
              className="edit-cancel-button"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="edit-save-button"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPopup;