import React from "react";
import "./editPopupMahasiswaKelas.css";

const EditPopupMahasiswa = ({ 
  onClose, 
  data = {}, 
  onSave,
  formData,
  setFormData,
  isLoading = false,
  title = "Edit Mahasiswa",
  isReadOnly = false
}) => {
  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-popup-container-mahasiswa-kelas">
      <div className="edit-popup-content-mahasiswa-kelas">
        <div className="edit-popup-header-mahasiswa-kelas">
          <h2>{title}</h2>
        </div>
        <form>
          <div className="edit-form-group-mahasiswa-kelas">
            <label>Nama Mahasiswa:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              className={isReadOnly ? "read-only-field-kelas" : ""}
            />
          </div>
          <div className="edit-form-group-mahasiswa-kelas">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              className={isReadOnly ? "read-only-field-kelas" : ""}
            />
          </div>
          <div className="edit-form-group-mahasiswa-kelas">
            <label>Status:</label>
            {isReadOnly ? (
              <input
                type="text"
                value={formData.status || ""}
                readOnly
                className="read-only-field-kelas"
              />
            ) : (
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
            )}
          </div>
          
          <div className="edit-popup-actions-mahasiswa-kelas">
            {!isReadOnly && (
              <button
                className="edit-save-button-kelas"
                type="button"
                onClick={onSave}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            )}
            <button
              className="edit-cancel-button-kelas"
              type="button"
              onClick={onClose}
            >
              {isReadOnly ? "Tutup" : "Batal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopupMahasiswa;
