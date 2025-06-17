import React, { useState } from "react";
import "./editPopupKelas.css"; // Reuse existing styles
import { IoReload } from "react-icons/io5";

const CreateGroupPopup = ({ 
  isOpen, 
  onClose, 
  onSave, 
  formData, 
  setFormData, 
  isLoading 
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  };

  return (
    <div className="edit-popup-container-kelas">
      <div className="edit-popup-content-kelas">
        <div className="edit-popup-header-kelas">
          <h2>Tambah Kelas Baru</h2>
        </div>
        <form>
          <div className="edit-form-group-kelas">
            <label>Nama Kelas:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              placeholder="Masukkan nama kelas"
            />
          </div>
          
          <div className="edit-form-group-kelas">
            <label>Periode Mulai:</label>
            <input
              type="date"
              name="start_period"
              value={formData.start_period || ""}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="edit-form-group-kelas">
            <label>Periode Selesai:</label>
            <input
              type="date"
              name="end_period"
              value={formData.end_period || ""}
              onChange={handleChange}
              required
            />
            <small>Harus setelah periode mulai</small>
          </div>
          
          <div className="edit-form-group-kelas">
            <label>Kode Kelas:</label>
            <div className="flex-container">
              <input
                type="text"
                name="class_code"
                value={formData.class_code || ""}
                onChange={handleChange}
                required
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
          </div>
          
          <div className="edit-form-group-kelas">
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
          </div>
          
          <div className="edit-form-group-kelas">
            <label>Import Data (Opsional):</label>
            <input
              type="file"
              name="import_file"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
            <small>Format: XLSX, XLS (Max 5MB)</small>
          </div>
          
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
              onClick={onSave}
              className="edit-save-button"
              disabled={isLoading || !formData.name || !formData.start_period || !formData.end_period || !formData.class_code || !formData.status}
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