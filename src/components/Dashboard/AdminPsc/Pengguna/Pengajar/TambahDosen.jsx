import React from "react";
import "./tambahDosen.css";
import { IoMdClose } from "react-icons/io";

const TambahDosen = ({ 
  isOpen, 
  onClose, 
  onSave,
  formData,
  setFormData,
  isLoading = false
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="tambah-dosen-overlay">
      <div className="tambah-dosen-container">
        <div className="tambah-dosen-header">
          <h2>Tambah Pengajar</h2>
          <button className="close-button" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="tambah-dosen-form">
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
          </div>
          <div className="password-info">
            <p>Password akan digenerate secara otomatis dan akan dikirimkan ke email pengajar.</p>
          </div>
        </div>
        <div className="tambah-dosen-actions">
          <button 
            className="cancel-button" 
            onClick={onClose}
          >
            Batal
          </button>
          <button 
            className="save-button" 
            onClick={onSave}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahDosen;
