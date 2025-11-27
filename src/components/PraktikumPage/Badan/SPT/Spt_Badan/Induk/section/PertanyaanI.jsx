import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PertanyaanI = ({ onAnswerChange, answersState }) => {
  const [showSection, setShowSection] = useState(false);

  const DEFAULT_UPLOADED = {
    laporanKeuangan: null,
    laporanKonsolidasianGrup: null,
    opiniAudit: null,
    buktiKreditPajakLuarNegeri: null,
    buktiPenanamanKembali: null,
    suratPenghitunganDividen: null,
  };

  const [uploadedFiles, setUploadedFiles] = useState(DEFAULT_UPLOADED);

  // Load initial state dari parent jika ada
  useEffect(() => {
    if (answersState?.uploadedFiles) {
      setUploadedFiles((prev) => ({
        ...prev,
        ...answersState.uploadedFiles,
      }));
    }
  }, [answersState]);

  // Helper: optional, kalau mau revoking URL biar ga bocor memori
  const revokeUrlIfAny = (fileObj) => {
    if (fileObj?.url) {
      URL.revokeObjectURL(fileObj.url);
    }
  };

  // Handler upload file
  const handleFileUpload = (field, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file), // Untuk preview
    };

    setUploadedFiles((prev) => {
      // bersihkan URL lama kalau ada
      revokeUrlIfAny(prev[field]);

      const updated = { ...prev, [field]: newFile };
      onAnswerChange?.("uploadedFiles", updated);
      return updated;
    });
    // reset input supaya bisa pilih file yang sama lagi kalau mau

    event.target.value = "";
  };

  // Handler hapus file
  const handleRemoveFile = (field) => {
    setUploadedFiles((prev) => {
      revokeUrlIfAny(prev[field]);

      const updated = { ...prev, [field]: null };
      onAnswerChange?.("uploadedFiles", updated);
      return updated;
    });
  };

  // Fungsi helper untuk menampilkan nama file atau placeholder
  const getFileName = (file) => (file ? file.name : "Belum diunggah");

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const items = [
    {
      key: "a1",
      field: "laporanKeuangan", // <-- mapping ke DEFAULT_UPLOADED
      number: "a. 1.",
      title: "Laporan Keuangan/Laporan Keuangan yang Telah Diaudit*",
    },
    {
      key: "a2",
      field: "laporanKonsolidasianGrup",
      number: "a. 2.",
      title: "Laporan Keuangan Konsolidasian untuk Wajib Pajak Grup",
    },
    {
      key: "b",
      field: "opiniAudit",
      number: "b.",
      title: "Opini Audit",
    },
    {
      key: "c",
      field: "opiniAudit32432432",
      number: "b1.",
      title: "Opini Audit23432435",
    },
  ];

  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowSection(!showSection)}
      >
        <h3 className="text-lg font-semibold">I. LAMPIRAN LAINNYA</h3>
        <span
          className={`transition-transform duration-500 ease-in-out ${
            showSection ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          showSection ? "opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border rounded-md p-4 mb-4">
          <div className="divide-y">
            {items.map((item) => {
              const file = uploadedFiles[item.field];

              return (
                <div key={item.key} className="px-4 py-6">
                  <div className="grid grid-cols-12 gap-4 items-start">
                    {/* KIRI: TEKS PERTANYAAN */}
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        <span className="font-medium mr-1">{item.number}</span>
                        {item.title}
                      </p>

                      <p className="mt-6 text-xs text-gray-500">File yang Diunggah</p>
                    </div>

                    {/* KANAN: BOX UPLOAD */}
                    <div className="col-span-12 md:col-span-8 lg:col-span-9">
                      <div className="bg-gray-50 border rounded-md overflow-hidden">
                        {/* BAR TOMBOL */}
                        <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-gray-100 border-b">
                          {/* Tombol PILIH → trigger input file */}
                          <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded bg-blue-900 text-white hover:bg-blue-800 cursor-pointer">
                            <span className="text-lg leading-none">+</span>
                            <span>Pilih</span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload(item.field, e)}
                            />
                          </label>

                          {/* Unggah – di desainmu kelihatan masih disabled, kita ikuti */}
                          <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium rounded bg-white text-gray-400 border border-gray-300 flex items-center gap-2 cursor-not-allowed"
                            disabled
                          >
                            <span className="text-xs">⬆</span>
                            <span>Unggah</span>
                          </button>

                          {/* BATAL / HAPUS FILE */}
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(item.field)}
                            className={`px-4 py-2 text-sm font-medium rounded border flex items-center gap-2 ${
                              file
                                ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                : "bg-white text-gray-400 border-gray-200 cursor-not-allowed"
                            }`}
                            disabled={!file}
                          >
                            <span className="text-xs">✕</span>
                            <span>Batal</span>
                          </button>
                        </div>

                        {/* AREA LIST FILE */}
                        <div className="px-4 py-4 min-h-[70px] text-sm text-gray-600 flex items-center justify-between">
                          <div>
                            <div className="font-medium">{getFileName(file)}</div>
                            {file && (
                              <div className="text-xs text-gray-400 mt-1">
                                {file.type || "Tipe tidak diketahui"} • {formatFileSize(file.size)}
                              </div>
                            )}
                            {!file && (
                              <div className="text-xs text-gray-400">
                                Tidak ada file yang diunggah.
                              </div>
                            )}
                          </div>

                          {file && (
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Lihat / Unduh
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PertanyaanI;
