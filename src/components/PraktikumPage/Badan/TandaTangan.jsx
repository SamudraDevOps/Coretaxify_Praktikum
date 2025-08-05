import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";

const TandaTangan = ({
  onConfirm,
  isLoading = false,
  disabled = false,
  confirmText = "Simpan",
  children,
  className = "",
  npwp,
}) => {
  const [formData, setFormData] = useState({
    jenisPenandatanganan: "tanda_tangan_pembayar_pajak",
    penyediaPenandatangan: "",
    idPenandatangan: "",
    kataSandiPenandatangan: "",
  });

  const [hasConfirmedSignature, setHasConfirmedSignature] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmSignature = () => {
    // You can add real confirmation logic here
    setHasConfirmedSignature(true);
    console.log("Konfirmasi Tanda Tangan:", formData);
  };

  const handleSave = () => {
    if (!formData.kataSandiPenandatangan) {
      alert("Kata sandi penandatangan wajib diisi.");
      return;
    }

    console.log("Data Tanda Tangan Disimpan:", formData);
    onConfirm(formData);
    setShowDialog(false);
    setHasConfirmedSignature(false);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setHasConfirmedSignature(false);
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <button
          onClick={() => setShowDialog(true)}
          className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${className}`}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <ClipLoader color="#ffffff" size={16} /> Loading...
            </>
          ) : (
            children
          )}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        {/* X Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={closeDialog}
        >
          <X className="w-5 h-5" />
        </button>

        <AlertDialogHeader>
          <AlertDialogTitle>Tanda Tangan Dokumen</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          <form className="space-y-4 mt-2">
            {/* Jenis Penandatanganan (disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jenis Penandatanganan*
              </label>
              <select
                name="jenisPenandatanganan"
                value={formData.jenisPenandatanganan}
                disabled
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 text-gray-700 rounded-md shadow-sm sm:text-sm"
              >
                <option value="tanda_tangan_pembayar_pajak">
                  Tanda Tangan Pembayar Pajak
                </option>
              </select>
            </div>

            {/* Penyedia Penandatangan */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Penyedia Penandatangan*
              </label>
              <input
                type="text"
                name="penyediaPenandatangan"
                value="Kode Otorisasi DJP"
                disabled
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 text-gray-700 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            {/* ID Penandatangan */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID Penandatangan
              </label>
              <input
                type="text"
                name="idPenandatangan"
                value={npwp ?? "-"}
                disabled
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 text-gray-700 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            {/* Kata Sandi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kata Sandi Penandatangan*
              </label>
              <input
                type="password"
                name="kataSandiPenandatangan"
                value={formData.kataSandiPenandatangan}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </form>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasConfirmedSignature || isLoading}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mr-2 ${
              !hasConfirmedSignature || isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={16} /> : confirmText}
          </button>

          <button
            type="button"
            onClick={handleConfirmSignature}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Konfirmasi Tanda Tangan
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TandaTangan;
