import React from 'react';
import { FaTimes } from 'react-icons/fa';
import FormFieldA4 from './FormFieldA4';

const ModalA4 = ({ 
  showModal, 
  closeModal, 
  modalData, 
  updateModalData, 
  onSave, 
  editingId 
}) => {
  if (!showModal) return null;

  const handleSave = () => {
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {editingId ? 'Edit Data Piutang' : 'Tambah Data Piutang'}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <FormFieldA4 
          modalData={modalData}
          updateModalData={updateModalData}
        />

        {/* Footer Modal */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            onClick={closeModal}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {editingId ? 'Update Data' : 'Simpan Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalA4;