import React from "react";
import "./assignmentPopup.css";
import { IoMdClose } from "react-icons/io";

const UpdateAssignmentPopup = ({
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

  // Find the current task
  const currentTask = tasks.find(task => task.id === parseInt(formData.task_id));

  // Add debug info
  if (formData.task_id && !currentTask) {
    console.warn(`Selected task (ID: ${formData.task_id}) not found in available tasks:`, tasks);
  }

  return (
    <div className="assignment-popup-overlay">
      <div className="assignment-popup-container">
        <div className="assignment-popup-header">
          <h2>Edit Praktikum</h2>
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
              placeholder="Masukkan judul praktikum"
            />
          </div>
          
          <div className="form-group">
            <label>Kode Praktikum:</label>
            <input
              type="text"
              name="assignment_code"
              value={formData.assignment_code || ""}
              onChange={handleChange}
              readOnly
              className="read-only-field"
            />
            <small>Kode praktikum tidak dapat diubah</small>
          </div>
          
          <div className="form-group">
            <label>Soal: {currentTask ? `(Sekarang: ${currentTask.name})` : ''}</label>
            <select
              name="task_id"
              value={formData.task_id || ""}
              onChange={handleChange}
            >
              <option value="">Pilih Soal</option>
              {tasks.map(task => (
                <option key={task.id} value={task.id}>
                  {task.name}
                  </option>
                ))}
            </select>
            {formData.task_id && !currentTask && (
              <small className="error-text">Task dengan ID {formData.task_id} tidak ditemukan</small>
            )}
          </div>
          
          <div className="form-group">
            <label>Periode Mulai:</label>
            <input
                type="datetime-local"
                name="start_period"
                value={formData.start_period || ""}
                onChange={handleChange}
            />
            <small>Format: YYYY-MM-DD HH:MM</small>
          </div>

          <div className="form-group">
            <label>Periode Selesai:</label>
            <input
                type="datetime-local"
                name="end_period"
                value={formData.end_period || ""}
                onChange={handleChange}
            />
            <small>Format: YYYY-MM-DD HH:MM</small>
          </div>
          
          <div className="form-group">
            <label>File Pendukung (Kosongkan jika tidak ingin mengubah):</label>
            <div className="file-upload-container">
              <div className="file-upload-box">
                {formData.supporting_file ? (
                  <div className="file-selected">
                    <p>{typeof formData.supporting_file === 'object' 
                      ? formData.supporting_file.name 
                      : 'File tersedia: ' + formData.supporting_file}</p>
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
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAssignmentPopup;
