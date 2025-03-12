import React from "react";
import "./editPopupMahasiswa.css";

const EditPopupMahasiswa = ({ 
  onClose, 
  data = {}, 
  onSave,
  formData,
  setFormData,
  isReadOnly = false,
  title = "Edit Mahasiswa"
}) => {
  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-popup-container-mahasiswa">
      <div className="edit-popup-content-mahasiswa">
        <div className="edit-popup-header-mahasiswa">
          <h2>{title}</h2>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!isReadOnly && onSave) onSave();
        }}>
          <div className="edit-form-group-mahasiswa">
            <label>Nama Mahasiswa:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              className={isReadOnly ? "read-only-field" : ""}
            />
          </div>
          <div className="edit-form-group-mahasiswa">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              className={isReadOnly ? "read-only-field" : ""}
            />
          </div>
          <div className="edit-popup-actions-mahasiswa">
            {!isReadOnly && onSave && (
              <button className="edit-save-button" type="submit">
                Simpan
              </button>
            )}
            <button
              className="edit-cancel-button"
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
