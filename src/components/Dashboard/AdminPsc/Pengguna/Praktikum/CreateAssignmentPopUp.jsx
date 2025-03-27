import React from "react";
import "./assignmentPopup.css";
import { RxCross1 } from "react-icons/rx";

const CreateAssignmentPopup = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  isLoading,
  tasks = [],
  groups = []
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

  // const handleGroupsChange = (e) => {
  //   // Convert HTMLCollection to Array and get selected options
  //   const selectedOptions = Array.from(e.target.selectedOptions);
  //   const selectedGroups = selectedOptions.map(option => option.value);
    
  //   setFormData({ ...formData, groups: selectedGroups });
  // };

  // Updated function to handle checkbox selection
  const handleGroupCheckbox = (groupId) => {
    // Create a copy of the current groups array
    let updatedGroups = [...(formData.groups || [])];
    
    // Check if the group is already selected
    if (updatedGroups.includes(groupId)) {
      // If selected, remove it
      updatedGroups = updatedGroups.filter(id => id !== groupId);
    } else {
      // If not selected, add it
      updatedGroups.push(groupId);
    }
    
    // Update the form data with the new groups array
    setFormData({ ...formData, groups: updatedGroups });
  };

  return (
    <div className="assignment-popup-overlay">
      <div className="assignment-popup-container">
        <div className="assignment-popup-header">
          <h2>Tambah Praktikum</h2>
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
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

          {/* Multi-select for groups */}
          {/* <div className="form-group">
            <label>Pilih Kelas (bisa pilih lebih dari satu):</label>
            <select
              multiple
              name="groups"
              value={formData.groups || []}
              onChange={handleGroupsChange}
              className="multi-select"
              required
            >
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            <small>Tahan tombol Ctrl (Windows) atau Command (Mac) untuk memilih beberapa kelas</small>
          </div> */}

          {/* Replace multi-select with checkbox list */}
          <div className="form-group">
            <label>Pilih Kelas:</label>
            <div className="checkbox-group-container">
              {groups.length > 0 ? (
                groups.map(group => (
                  <div key={group.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`group-${group.id}`}
                      checked={formData.groups?.includes(group.id)}
                      onChange={() => handleGroupCheckbox(group.id)}
                    />
                    <label htmlFor={`group-${group.id}`}>
                      {group.name} ({group.class_code})
                    </label>
                  </div>
                ))
              ) : (
                <p className="no-data-message">Tidak ada kelas tersedia</p>
              )}
            </div>
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
