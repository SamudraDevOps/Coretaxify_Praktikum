import React, { useState } from "react";
import "./editPopupKelas.css";
import { RxCross1 } from "react-icons/rx";

const EditPopupKelas = ({
  onClose,
  data,
  onSave,
  formData,
  setFormData,
  isLoading,
}) => {
  // Add errors state for validation
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Add validation function
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
    } else if (
      formData.start_period &&
      new Date(formData.end_period) <= new Date(formData.start_period)
    ) {
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
  const handleSaveWithValidation = () => {
    if (validate()) {
      onSave();
    }
  };

  return (
    <div className="edit-popup-container-kelas">
      <div className="edit-popup-content-kelas">
        <div className="edit-popup-header-kelas">
          <h2>Edit Kelas</h2>
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
              min={
                formData.start_period || new Date().toISOString().split("T")[0]
              }
            />
            <small>Harus setelah periode mulai</small>
            {errors.end_period && (
              <p className="text-red-500 text-sm">{errors.end_period}</p>
            )}
          </div>
          <div className="edit-form-group-kelas">
            <label>Kode Kelas:</label>
            <input
              type="text"
              name="class_code"
              value={formData.class_code || ""}
              onChange={handleChange}
              readOnly
              className="read-only-field"
            />
            <small>Kode kelas tidak dapat diubah</small>
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
              onClick={handleSaveWithValidation}
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
