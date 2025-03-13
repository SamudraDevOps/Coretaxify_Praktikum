import React from "react";
import "./soalPopup.css";
import { IoMdClose } from "react-icons/io";
import { FaUpload } from "react-icons/fa";

const CreateSoalPopup = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  isLoading
}) => {
  if (!isOpen) return null;

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        import_file: e.target.files[0]
      });
    }
  };

  return (
    <div className="soal-popup-overlay">
      <div className="soal-popup-container">
        <div className="soal-popup-header">
          <h2>Tambah Soal</h2>
          <button className="close-button" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="soal-popup-form">
          <div className="form-group">
            <label>Judul Soal:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleNameChange}
              required
              placeholder="Masukkan judul soal"
            />
          </div>
          <div className="form-group">
            <label>File Excel:</label>
            <div className="file-upload-container">
              <div className="file-upload-box">
                {formData.import_file ? (
                  <div className="file-selected">
                    <p>{formData.import_file.name}</p>
                  </div>
                ) : (
                  <div className="file-upload-placeholder">
                    <FaUpload className="upload-icon" />
                    <p>Klik atau drop file Excel di sini</p>
                    <small>Format: .xlsx, .xls, .csv</small>
                  </div>
                )}
                <input
                  type="file"
                  name="import_file"
                  onChange={handleFileChange}
                  accept=".xlsx,.xls,.csv"
                  className="file-input"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="soal-popup-actions">
          <button 
            className="cancel-button" 
            onClick={onClose}
          >
            Batal
          </button>
          <button 
            className="save-button" 
            onClick={onSave}
            disabled={isLoading || !formData.name || !formData.import_file}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSoalPopup;
