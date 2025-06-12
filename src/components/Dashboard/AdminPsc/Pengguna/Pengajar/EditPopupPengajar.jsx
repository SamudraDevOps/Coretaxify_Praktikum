import React, { useState } from "react";
import "./editPopupPengajar.css";
import { RxCross1 } from "react-icons/rx";

const EditPopupPengajar = ({
  onClose,
  data = {},
  onSave,
  formData,
  setFormData,
  isLoading = false,
  title = "Edit Pengajar",
  isReadOnly = false,
}) => {
  // Add errors state for validation
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Add validation function
  const validate = () => {
    if (isReadOnly) return true; // No validation needed in read-only mode
    
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

  // Handle save with validation
  const handleSaveWithValidation = () => {
    if (validate()) {
      onSave();
    }
  };

  return (
    <div className="edit-popup-container-instruktur">
      <div className="edit-popup-content-instruktur">
        <div className="edit-popup-header-instruktur">
          <h2>{title}</h2>
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
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
            {!isReadOnly && errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
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
            {!isReadOnly && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
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
              <>
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
              </>
            )}
          </div>

          <div className="edit-popup-actions-instruktur">
            {!isReadOnly && (
              <button
                className="edit-save-button"
                type="button"
                onClick={handleSaveWithValidation}
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
