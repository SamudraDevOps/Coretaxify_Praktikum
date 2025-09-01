import React from "react";
import { FaPlus, FaTrash, FaFileImport } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

const ExportMahasiswaPsc = ({ onClose, inExport, isExportOpen }) => {
  if (!isExportOpen) return null;

  return (
    <div className="edit-popup-container-mahasiswa">
      <div className="edit-popup-content-mahasiswa">
        <div className="edit-popup-header-mahasiswa">
          <h2>Export Mahasiswa PSC</h2>
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ExportMahasiswaPsc;
