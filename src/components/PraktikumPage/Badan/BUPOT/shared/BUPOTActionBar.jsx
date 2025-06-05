import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { RoutesApi } from "@/Routes";
import Swal from "sweetalert2";

const BUPOTActionBar = ({
  type,
  status,
  title,
  showCreateButton = true,
  selectedItems = [],
  onActionComplete,
}) => {
  const { id, akun } = useParams();
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);

  // Map types to their creation routes
  const createPaths = {
    bppu: `/praktikum/${id}/sistem/${akun}/bupot/bppu/create`,
    bpnr: `/praktikum/${id}/sistem/${akun}/bupot/bpnr/create`,
    ps: `/praktikum/${id}/sistem/${akun}/bupot/ps/create`,
    psd: `/praktikum/${id}/sistem/${akun}/bupot/psd/create`,
    bp21: `/praktikum/${id}/sistem/${akun}/bupot/bp21/create`,
    bp26: `/praktikum/${id}/sistem/${akun}/bupot/bp26/create`,
    bpa1: `/praktikum/${id}/sistem/${akun}/bupot/bpa1/create`,
    bpa2: `/praktikum/${id}/sistem/${akun}/bupot/bpa2/create`,
    bpbpt: `/praktikum/${id}/sistem/${akun}/bupot/bpbpt/create`,
  };

  const handlePublish = async () => {
    if (selectedItems.length === 0) {
      Swal.fire("Peringatan!", "Pilih item yang akan diterbitkan", "warning");
      return;
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Terbitkan BUPOT?",
      text: `Apakah Anda yakin ingin menerbitkan ${selectedItems.length} BUPOT yang dipilih?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, terbitkan!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsLoading(true);
    try {
      const url = `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/bupot/approval`;
      const response = await axios.post(
        url,
        {
          ids: selectedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Berhasil!", "BUPOT berhasil diterbitkan!", "success");
      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error) {
      console.error("Error publishing BUPOT:", error);
      Swal.fire(
        "Gagal!",
        error.response?.data?.message || "Gagal menerbitkan BUPOT",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedItems.length === 0) {
      Swal.fire("Peringatan!", "Pilih item yang akan dihapus", "warning");
      return;
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Hapus BUPOT?",
      text: `Apakah Anda yakin ingin menghapus ${selectedItems.length} BUPOT yang dipilih?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      dangerMode: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsLoading(true);
    try {
      const url = `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/bupot/refusal`;
      const response = await axios.post(
        url,
        {
          ids: selectedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Berhasil!", "BUPOT berhasil dihapus!", "success");
      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error) {
      console.error("Error deleting BUPOT:", error);
      Swal.fire(
        "Gagal!",
        error.response?.data?.message || "Gagal menghapus BUPOT",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Button config based on status
  const isDraft = status === "draft";
  const isPublished = status === "published";

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">
        {title || `EBUPOT ${type.toUpperCase()} NOT ISSUED`}
      </h1>
      <div className="flex space-x-2">
        {showCreateButton && isDraft && (
          <Link to={createPaths[type]}>
            <button className="bg-blue-700 text-white px-4 py-2 rounded">
              + Create eBupot {type.toUpperCase()}
            </button>
          </Link>
        )}

        {isDraft && (
          <>
            <button
              className={`px-4 py-2 rounded ${
                selectedItems.length > 0 && !isLoading
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={handlePublish}
              disabled={selectedItems.length === 0 || isLoading}
            >
              {isLoading ? "Menerbitkan..." : "Terbitkan"}
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedItems.length > 0 && !isLoading
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={handleDelete}
              disabled={selectedItems.length === 0 || isLoading}
            >
              {isLoading ? "Menghapus..." : "Hapus"}
            </button>
          </>
        )}

        {isPublished && (
          <button
            className={`px-4 py-2 rounded ${
              selectedItems.length > 0 && !isLoading
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={handleDelete}
            disabled={selectedItems.length === 0 || isLoading}
          >
            {isLoading ? "Menghapus..." : "Hapus"}
          </button>
        )}

        <button className="bg-white border px-4 py-2 rounded">
          XML Monitoring
        </button>
        <div className="relative">
          <button className="bg-white border px-4 py-2 rounded">
            Impor Data ▾
          </button>
        </div>
      </div>
    </div>
  );
};

export default BUPOTActionBar;
