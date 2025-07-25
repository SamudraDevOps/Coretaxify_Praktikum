import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams, useSearchParams } from "react-router-dom";
import { useFakturScore } from "@/hooks/faktur/useFakturScore";
import Swal from "sweetalert2";

const FakturPenilaian = ({tipeFaktur}) => {
  const { id, akun } = useParams();
  const [cookies] = useCookies(["token"]);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");

  const [score, setScore] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    scoreData,
    isLoading,
    fetchScore,
    createScore,
    updateScore,
    isCreating,
    isUpdating,
  } = useFakturScore(cookies, id, akun, tipeFaktur);

  useEffect(() => {
    if (tipeFaktur) {
      fetchScore();
    }
  }, [tipeFaktur]);

  useEffect(() => {
    if (scoreData) {
      setScore(scoreData.score || "");
    }
  }, [scoreData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!score || score < 0 || score > 100) {
      Swal.fire("Peringatan!", "Masukkan nilai antara 0-100", "warning");
      return;
    }

    const scorePayload = {
      sistem_id: akun,
      tipe_faktur: tipeFaktur,
      score: parseFloat(score),
    };

    try {
      if (scoreData?.id) {
        // Update existing score
        await updateScore(scoreData.id, scorePayload);
        Swal.fire("Berhasil!", "Nilai berhasil diperbarui!", "success");
      } else {
        // Create new score
        await createScore(scorePayload);
        Swal.fire("Berhasil!", "Nilai berhasil disimpan!", "success");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving score:", error);
      Swal.fire(
        "Gagal!",
        error.response?.data?.message || "Gagal menyimpan nilai",
        "error"
      );
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form if no existing data
    if (!scoreData) {
      setScore("");
    }
  };

  // Don't render if required props are missing
  if (!userId || !tipeFaktur) {
    return null;
  }

  // Get current score display
  const getCurrentScore = () => {
    if (isLoading) return "Loading...";
    if (scoreData && (scoreData.score || scoreData.nilai)) {
      return `${scoreData.score || scoreData.nilai}/100`;
    }
    return "Belum dinilai";
  };

  // Get score color based on value
  const getScoreColor = () => {
    if (isLoading) return "text-gray-500";
    if (!scoreData || (!scoreData.score && !scoreData.nilai)) return "text-red-500";
    
    const currentScore = scoreData.score || scoreData.nilai;
    if (currentScore >= 80) return "text-green-600";
    if (currentScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        {/* Current Score Display */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 mb-1">Nilai Saat Ini</span>
          <span className={`font-semibold text-sm ${getScoreColor()}`}>
            {getCurrentScore()}
          </span>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : scoreData ? "Edit Nilai" : "Beri Nilai"}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {scoreData ? "Edit Nilai" : "Beri Nilai"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nilai (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isCreating || isUpdating
                    ? "Menyimpan..."
                    : scoreData
                    ? "Update Nilai"
                    : "Simpan Nilai"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FakturPenilaian;
