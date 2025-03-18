import React from "react";
import "./editPopupKelas.css";

const EditPopupKelas = ({ onClose, data, onSave, formData, setFormData, isLoading }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-popup-container-kelas">
      <div className="edit-popup-content-kelas">
        <div className="edit-popup-header-kelas">
          <h2>Edit Kelas</h2>
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
            <input
              type="text"
              name="class_code"
              value={formData.class_code || ""}
              onChange={handleChange}
              required
              readOnly
              className="read-only-field"
            />
            <small>Kode kelas tidak dapat diubah</small>
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
          <div className="edit-popup-actions-kelas">
            <button type="button" onClick={onClose} className="edit-cancel-button">
              Batal
            </button>
            <button
              type="button"
              onClick={onSave}
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

export default EditPopupKelas;
