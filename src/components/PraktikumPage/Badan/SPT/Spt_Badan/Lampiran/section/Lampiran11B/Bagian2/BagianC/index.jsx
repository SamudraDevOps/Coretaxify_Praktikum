import React from "react";
import { formatNumber } from "@utils/formatCurrency";

export default function PerhitunganDer({ totalRataRataUtang = 0, totalRataRataModal = 0 }) {
  // Rumus untuk Rasio Dasar: Utang / Modal
  const ratio = totalRataRataModal === 0 ? null : totalRataRataUtang / totalRataRataModal;

  const formatResult = () => {
    if (totalRataRataUtang === 0 || ratio === null || !Number.isFinite(ratio)) {
      return "N/A";
    }

    // Hitung rasio terbalik (Modal / Utang)
    const ratioX = totalRataRataModal / totalRataRataUtang;
    const formattedRatioX = ratioX.toFixed(2).replace(".", ",");

    return `1 : ${formattedRatioX}`;
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-4">
        <h3 className="text-xl font-bold text-white tracking-wide uppercase text-center">
          Perhitungan DER (Debt to Equity Ratio)
        </h3>
      </div>

      <div className="px-8 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 text-center max-w-xs">
                Jumlah Saldo Rata-Rata Utang
              </span>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl px-8 py-4 shadow-lg">
                <span className="text-3xl font-bold tabular-nums">
                  {formatNumber(totalRataRataUtang)}
                </span>
              </div>
            </div>

            <div className="w-32 border-t-4 border-gray-400 rounded-full"></div>

            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl px-8 py-4 shadow-lg">
                <span className="text-3xl font-bold tabular-nums">
                  {formatNumber(totalRataRataModal)}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide mt-2 text-center max-w-xs">
                Jumlah Saldo Rata-Rata Modal
              </span>
            </div>
          </div>

          <div className="text-5xl font-bold text-gray-400 select-none hidden lg:block">=</div>
          <div className="text-3xl font-bold text-gray-400 select-none lg:hidden">↓</div>

          <div className="flex flex-col items-center space-y-3">
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Hasil Perhitungan
            </span>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl px-12 py-6 shadow-2xl transform transition hover:scale-105">
              <span className="text-4xl font-extrabold tabular-nums tracking-tight">
                {formatResult()}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">Rasio DER</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          DER menunjukkan perbandingan antara total utang dengan total modal perusahaan
        </p>
      </div>
    </div>
  );
}
