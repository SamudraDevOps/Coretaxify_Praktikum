import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"; 

const TandaTangan = ({ isOpen, onClose }) => {
    // State untuk mengelola form
    const [formData, setFormData] = useState({
        jenisPenandatanganan: "",
        penyediaPenandatangan: "",
        idPenandatangan: "",
        kataSandiPenandatangan: "",
    });

    // Handler untuk perubahan input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler untuk tombol Simpan
    const handleSave = () => {
        // Validasi data di sini jika diperlukan
        console.log("Data Tanda Tangan:", formData);
        // Simpan data ke backend atau lakukan aksi lainnya
        onClose(); // Tutup popup setelah disimpan
    };

    // Handler untuk tombol Konfirmasi Tanda Tangan
    const handleConfirmSignature = () => {
        // Lakukan konfirmasi tanda tangan di sini
        console.log("Konfirmasi Tanda Tangan:", formData);
        // Kirim data ke backend atau lakukan aksi lainnya
        onClose(); // Tutup popup setelah konfirmasi
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tanda Tangan Dokumen</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <form>
                            <div className="mb-4">
                                <label
                                    htmlFor="jenisPenandatanganan"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Jenis Penandatanganan*
                                </label>
                                <select
                                    id="jenisPenandatanganan"
                                    name="jenisPenandatanganan"
                                    value={formData.jenisPenandatanganan}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Pilih Jenis Penandatanganan</option>
                                    <option value="tanda_tangan_pembayar_pajak">
                                        Tanda Tangan Pembayar Pajak
                                    </option>
                                    <option value="kode_otorisasi_djp">Kode Otorisasi DJP</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="penyediaPenandatangan"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Penyedia Penandatangan*
                                </label>
                                <input
                                    type="text"
                                    id="penyediaPenandatangan"
                                    name="penyediaPenandatangan"
                                    value={formData.penyediaPenandatangan}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="idPenandatangan"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    ID Penandatangan
                                </label>
                                <input
                                    type="text"
                                    id="idPenandatangan"
                                    name="idPenandatangan"
                                    value={formData.idPenandatangan}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="kataSandiPenandatangan"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Kata Sandi Penandatangan
                                </label>
                                <input
                                    type="password"
                                    id="kataSandiPenandatangan"
                                    name="kataSandiPenandatangan"
                                    value={formData.kataSandiPenandatangan}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </form>
                    </div>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Batal</AlertDialogCancel>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mr-2"
                    >
                        Simpan
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

// CONTOH IMPLEMENTASINE KING

// import React, { useState } from "react";
// import TandaTangan from "./TandaTangan";

// const YourComponent = () => {
//     const [isPopupOpen, setIsPopupOpen] = useState(false);

//     return (
//         <>
//             <button
//                 onClick={() => setIsPopupOpen(true)}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Buka Popup Tanda Tangan
//             </button>

//             {/* Render komponen TandaTangan */}
//             <TandaTangan isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
//         </>
//     );
// };