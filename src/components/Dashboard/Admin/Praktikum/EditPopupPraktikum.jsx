import React, { useState, useEffect } from "react";
import "./editPopupPraktikum.css";
import { RxCross1 } from "react-icons/rx";

const EditPopupPraktikum = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  isLoading,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="edit-popup-container-dosen">
      <div className="edit-popup-content-dosen">
        <div className="w-full flex justify-end">
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="edit-popup-header-dosen">
          <h2>Edit Praktikum</h2>
        </div>
        <form>
          <div className="edit-form-group-dosen">
            <label>Nama Praktikum</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <div className="edit-popup-actions-dosen">
          <button className="edit-cancel-button" onClick={onClose}>
            Batal
          </button>
          <button
            className="edit-save-button"
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

export default EditPopupPraktikum;
