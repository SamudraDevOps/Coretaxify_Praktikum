import React from "react";
import "./editPopupPengajar.css";

const EditPopupPengajar = ({ 
  onClose, 
  data = {}, 
  onSave,
  formData,
  setFormData,
  isLoading = false,
  title = "Edit Pengajar",
  isReadOnly = false
}) => {
  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-popup-container-instruktur">
      <div className="edit-popup-content-instruktur">
        <div className="edit-popup-header-instruktur">
          <h2>{title}</h2>
        </div>
        <form>
          <div className="edit-form-group-instruktur">
            <label>Nama Pengajar:</label>
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
          <div className="edit-form-group-instruktur">
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
          <div className="edit-form-group-instruktur">
            <label>Status:</label>
            {isReadOnly ? (
              <input
                type="text"
                value={formData.status || ""}
                readOnly
                className="read-only-field"
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
          
          <div className="edit-popup-actions-instruktur">
            {!isReadOnly && (
              <button
                className="edit-save-button"
                type="button"
                onClick={onSave}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Simpan"}
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

export default EditPopupPengajar;
              
