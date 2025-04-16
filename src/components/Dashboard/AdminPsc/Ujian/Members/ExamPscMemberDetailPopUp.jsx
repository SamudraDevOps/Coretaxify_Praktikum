import React from "react";
import "./memberStyles.css";
import { IoMdClose } from "react-icons/io";

const ExamPscMemberDetailPopup = ({ onClose, member }) => {
  if (!member) return null;

  return (
    <div className="member-detail-popup-overlay">
      <div className="member-detail-popup-container">
        <div className="member-detail-popup-header">
          <h2>Detail Peserta</h2>
          <button className="close-button" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="member-detail-popup-content">
          <div className="member-detail-item">
            <span className="detail-label">Nama:</span>
            <span className="detail-value">{member.name}</span>
          </div>
          <div className="member-detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{member.email}</span>
          </div>
          <div className="member-detail-item">
            <span className="detail-label">Status:</span>
            <span className="detail-value">{member.status}</span>
          </div>
          {member.pivot && (
            <>
              <div className="member-detail-item">
                <span className="detail-label">Nilai:</span>
                <span className="detail-value">{member.pivot.score || '-'}</span>
              </div>
              <div className="member-detail-item">
                <span className="detail-label">Status Ujian:</span>
                <span className="detail-value">
                  {member.pivot.status === 'COMPLETED' ? 'Selesai' : 
                   member.pivot.status === 'IN_PROGRESS' ? 'Sedang Mengerjakan' : 'Belum Mulai'}
                </span>
              </div>
              <div className="member-detail-item">
                <span className="detail-label">Waktu Mulai:</span>
                <span className="detail-value">{member.pivot.start_time || '-'}</span>
              </div>
              <div className="member-detail-item">
                <span className="detail-label">Waktu Selesai:</span>
                <span className="detail-value">{member.pivot.end_time || '-'}</span>
              </div>
              <div className="member-detail-item">
                <span className="detail-label">Tanggal Bergabung:</span>
                <span className="detail-value">{member.pivot.created_at || '-'}</span>
              </div>
              <div className="member-detail-item">
                <span className="detail-label">Terakhir Diperbarui:</span>
                <span className="detail-value">{member.pivot.updated_at || '-'}</span>
              </div>
            </>
          )}
        </div>
        <div className="member-detail-popup-actions">
          <button className="close-detail-button" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamPscMemberDetailPopup;