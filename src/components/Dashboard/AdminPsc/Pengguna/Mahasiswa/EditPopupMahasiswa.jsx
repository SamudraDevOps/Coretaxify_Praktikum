import React, { useState } from "react";
import "./editPopupMahasiswa.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const EditPopupMahasiswa = ({ 
  onClose, 
  data = {}, 
  onSave,
  formData,
  setFormData,
  isLoading = false,
  title = "Edit Mahasiswa",
  isCreateMode = false,
  isReadOnly = false,
  isMultipleMode = false // bulk
}) => {
  // For multiple students mode
  const [students, setStudents] = useState(isMultipleMode ? [{ name: "", email: "", status: "ACTIVE" }] : []);

  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // For handling changes in multiple students mode
  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [field]: value };
    setStudents(updatedStudents);
  };

  // Add a new student row
  const addStudentRow = () => {
    setStudents([...students, { name: "", email: "", status: "ACTIVE" }]);
  };

  // Remove a student row
  const removeStudentRow = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  // Handle save for multiple students
  const handleSaveMultiple = () => {
    // Filter out any empty rows
    const validStudents = students.filter(student => student.name && student.email && student.status);
    if (validStudents.length === 0) {
      alert("Harap isi setidaknya satu mahasiswa dengan nama, email, dan status.");
      return;
    }

    // check email duplicates
    const emails = validStudents.map(student => student.email);
    const uniqueEmails = new Set(emails);

    if (emails.length !== uniqueEmails.size) {
      alert("Terdapat email duplikat. Email mahasiswa tidak boleh sama");
      return;
    }

    onSave(validStudents);
  };

  

  return (
    <div className="edit-popup-container-mahasiswa">
      <div className="edit-popup-content-mahasiswa">
        <div className="edit-popup-header-mahasiswa">
          <h2>{title}</h2>
        </div>

        {/* Handle Multiple Students Mode */}
        {isMultipleMode ? (
          <div>
            <div className="students-counter">
              <strong>{students.length}</strong> mahasiswa akan ditambahkan
            </div>
            <div className="students-table">
              <div className="students-table-header">
                <div className="student-field-header">Nama Mahasiswa</div>
                <div className="student-field-header">Email</div>
                <div className="student-field-header">Status</div>
                <div className="student-field-header actions">Actions</div>
              </div>

              {students.map((student, index) => (
                <div key={index} className="student-row">
                  <div className="student-field">
                    <input 
                      type="text" 
                      value={student.name}
                      onChange={(e) => handleStudentChange(index, "name", e.target.value)}
                      placeholder="Nama Mahasiswa"
                      required
                    />
                  </div>
                  <div className="student-field">
                    <input 
                      type="email"
                      value={student.email}
                      onChange={(e) => handleStudentChange(index, "email", e.target.value)}
                      placeholder="Email"
                      required 
                    />
                  </div>
                  <div className="student-field">
                    <select
                      value={student.status}
                      onChange={(e) => handleStudentChange(index, "status", e.target.value)}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                  <div className="student-field actions">
                    <button
                      type="button"
                      className="remove-student-btn"
                      onClick={() => removeStudentRow(index)}
                      disabled={students.length === 1}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="add-student-row">
              <button
                type="button"
                className="add-student-btn"
                onClick={addStudentRow}
              >
                <FaPlus /> Add Another Student
              </button>
            </div>

            <div className="edit-popup-actions-mahasiswa">
              <button
                className="edit-save-button"
                type="button"
                onClick={handleSaveMultiple}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Semua"
                )}
              </button>
              <button
                className="edit-cancel-button"
                type="button"
                onClick={onClose}
              >
                Batal
              </button>
            </div>

          </div>
        ) : (

        <form>
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
          <div className="edit-form-group-mahasiswa">
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
          {isCreateMode && (
            <div className="edit-form-group-mahasiswa">
              <p className="text-info">
                <small>
                  Password akan digenerate secara otomatis dan akan dikirimkan ke email mahasiswa.
                </small>
              </p>
            </div>
          )}
          
          <div className="edit-popup-actions-mahasiswa">
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
        )}
      </div>
    </div>
  );
};

export default EditPopupMahasiswa;
