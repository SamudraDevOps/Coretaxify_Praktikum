import React from "react";
import "./assignmentPopup.css";
import { IoMdClose } from "react-icons/io";

const CreateAssignmentPopup = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  isLoading,
  tasks = []
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        supporting_file: e.target.files[0]
      });
    }
  };

  return (
    <div className="assignment-popup-overlay">
      <div className="assignment-popup-container">
        <div className="assignment-popup-header">
          <h2>Tambah Praktikum</h2>
          <button className="close-button" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="assignment-popup-form">
          <div className="form-group">
            <label>Judul Praktikum:</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              placeholder="Masukkan judul praktikum"
            />
          </div>
          
          <div className="form-group">
            <label>Soal:</label>
            <select
              name="task_id"
              value={formData.task_id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Soal</option>
              {tasks.map(task => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Periode Mulai:</label>
            <input
                type="datetime-local"
                name="start_period"
                value={formData.start_period || ""}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <label>Periode Selesai:</label>
            <input
                type="datetime-local"
                name="end_period"
                value={formData.end_period || ""}
                onChange={handleChange}
                required
            />
            </div>
            
          <div className="form-group">
            <label>File Pendukung (Opsional):</label>
            <div className="file-upload-container">
              <div className="file-upload-box">
                {formData.supporting_file ? (
                  <div className="file-selected">
                    <p>{formData.supporting_file.name}</p>
                  </div>
                ) : (
                  <div className="file-upload-placeholder">
                    <p>Klik atau drop file di sini</p>
                    <small>Format: PDF, DOC, DOCX, etc.</small>
                  </div>
                )}
                <input
                  type="file"
                  name="supporting_file"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="assignment-popup-actions">
          <button 
            className="cancel-button" 
            onClick={onClose}
          >
            Batal
          </button>
          <button 
            className="save-button" 
            onClick={onSave}
            disabled={isLoading || !formData.name || !formData.task_id || !formData.start_period || !formData.end_period}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentPopup;
