import React, { useState } from "react";
import { IoReload } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { RxCross1 } from "react-icons/rx";
import "./createExamPopUp.css";

const CreateExamPopUp = ({
  isOpen,
  onClose,
  onCreate,
  tasksData,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    task_id: "",
    start_period: "",
    end_period: "",
    duration: "",
    supporting_file: null,
    exam_code: generateRandomCode(),
  });

  function generateRandomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, supporting_file: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  const handleReloadCode = () => {
    setFormData({ ...formData, exam_code: generateRandomCode() });
  };

  if (!isOpen) return null;

  return (
    <div className="assignment-popup-overlay">
      <div className="assignment-popup-container">
        <div className="assignment-popup-header">
          <h2>Tambah Ujian</h2>
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="assignment-popup-form">
          <div className="form-group">
            <label>Nama Ujian:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama ujian"
              required
            />
          </div>

          <div className="form-group">
            <label>Soal:</label>
            <select
              name="task_id"
              value={formData.task_id}
              onChange={handleChange}
              required
            >
              <option value="">Pilih soal</option>
              {tasksData && tasksData.data ? (
                tasksData.data.map((task) => (
                  <option key={task.id} value={task.id.toString()}>
                    {task.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Tidak ada data soal
                </option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Kode Ujian:</label>
            <div className="flex items-center gap-2">
              <input
                name="exam_code"
                value={formData.exam_code}
                onChange={handleChange}
                readOnly
                className="read-only-field"
              />
              <button
                type="button"
                className="p-3 bg-purple-800 rounded-md hover:bg-purple-900"
                onClick={handleReloadCode}
              >
                <IoReload className="text-lg text-white" />
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Tanggal Mulai:</label>
            <input
              type="datetime-local"
              name="start_period"
              value={formData.start_period}
              onChange={handleChange}
              max={formData.end_period}
              required
            />
          </div>

          <div className="form-group">
            <label>Tanggal Selesai:</label>
            <input
              type="datetime-local"
              name="end_period"
              value={formData.end_period}
              onChange={handleChange}
              min={
                formData.start_period || new Date().toISOString().split("T")[0]
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Durasi (menit):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Masukkan durasi ujian dalam menit"
              required
            />
          </div>

          <div className="form-group">
            <label>File Support:</label>
            <div className="file-upload-container">
              <div className="file-upload-box">
                {formData.supporting_file ? (
                  <div className="file-selected">
                    <p>{formData.supporting_file.name}</p>
                  </div>
                ) : (
                  <div className="file-upload-placeholder">
                    <p>Klik atau drop file di sini</p>
                    <small>Format: PDF, DOC, DOCX, XLSX, XLS, etc.</small>
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

          <div className="assignment-popup-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Batal
            </button>
            <button type="submit" disabled={isLoading} className="save-button">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader color="#ffffff" size={16} />
                  <span className="ml-2">Menyimpan...</span>
                </div>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamPopUp;
