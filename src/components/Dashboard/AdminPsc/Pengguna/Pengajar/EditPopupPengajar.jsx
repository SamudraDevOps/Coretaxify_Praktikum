import React from "react";
import "./editPopupDosen.css";

const EditPopupPengajar = ({ 
  isOpen, 
  onClose, 
  dosen, 
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
    <div className="edit-popup-container-dosen">
      <div className="edit-popup-content-dosen">
        <div className="edit-popup-header-dosen">
          <h2>Edit Pengajar</h2>
        </div>
        <form>
          <div className="edit-form-group-dosen">
            <label>Nama Pengajar:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-dosen">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="edit-form-group-dosen">
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
        </form>
        <div className="edit-popup-actions-dosen">
          <button 
            className="edit-save-button" 
            onClick={onSave}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </button>
          <button className="edit-cancel-button" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopupPengajar;
