import React, { useState } from "react";
import axios from "axios";
import { IntentEnum } from "@/enums/IntentEnum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CookiesProvider, useCookies } from "react-cookie";
import { FaPlus, FaTrash, FaFileImport } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { RoutesApi } from "@/Routes";
import Swal from "sweetalert2";
import { Routes } from "react-router";

const ExportMahasiswaPsc = ({ onClose, inExport, isExportOpen }) => {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2025);
  const [cookies, setCookie] = useCookies(["user"]);
  const queryClient = useQueryClient();

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    downloadMutation.mutate();
  };

  const downloadMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.get(
          `${RoutesApi.admin.users.index().url}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
              Accept: "application/octet-stream",
            },
            params: {
              intent: IntentEnum.API_USER_EXPORT_MAHASISWA_PSC,
              month: month,
              year: year,
            },
            responseType: "blob",
          }
        );

        // Create blob URL from response
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const blobUrl = window.URL.createObjectURL(blob);

        // Extract filename from header
        const contentDisposition = response.headers["content-disposition"];
        let filename = "soal.xlsx";
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches?.[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }

        // Trigger download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        window.URL.revokeObjectURL(blobUrl);

        return response;
      } catch (error) {
        console.error("Download error:", error);
        Swal.fire("Gagal!", "Gagal mengunduh file", "error");
        throw error;
      }
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Berhasil!",
        text: "Data Mahasiswa Berhasil Di Export",
        icon: "success",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
        didClose: () => {
          onClose();
        },
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: "Gagal Export Data Mahasiswa",
        icon: "error",
        timer: 2000, // auto close after 2 seconds
        showConfirmButton: false,
        timerProgressBar: true,
        didClose: () => {
          onClose();
        },
      });
    },
    onMutate: () => {
      downloadMutation.isLoading = true; // tambahkan ini untuk memperbarui state isLoading
    },
    onSettled: () => {
      downloadMutation.isLoading = false; // tambahkan ini untuk memperbarui state isLoading
    },
  });

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
        <div>
          <div className="border rounded-md p-4 mb-2 bg-white">
            <div className="mt-4 flex justify-between gap-4 items-center">
              <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                Bulan
                <span className="text-red-500">*</span>
              </label>
              <select
                className="w-64 flex-auto border p-2 rounded appearance-none"
                value={month}
                onChange={handleMonthChange}
                placehoder="Pilih Bulan"
              >
                <option value="">Pilih Bulan</option>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select>
              <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                Tahun
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-64 flex-auto border p-2 rounded appearance-none"
                value={year}
                onChange={handleYearChange}
                placeholder="Masukkan Tahun"
              />
            </div>
            <div className="edit-popup-actions-mahasiswa">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
                disabled={downloadMutation.isLoading}
              >
                {downloadMutation.isLoading ? "Loading..." : "Export"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportMahasiswaPsc;
