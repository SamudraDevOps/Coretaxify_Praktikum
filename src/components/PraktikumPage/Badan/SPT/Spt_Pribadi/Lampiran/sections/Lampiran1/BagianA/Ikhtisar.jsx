import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { formatRupiah } from "../../../utils/formatCurrency";

const Ikhtisar = () => {
  const data = [
    {
      deskripsi: "JUMLAH HARTA PADA AKHIR TAHUN PAJAK",
      hargaPerolehan: 100000,
      nilaiSaatIni: 200000000,
    },
  ];

  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table-auto text-sm text-left border overflow-hidden">
        <thead className="bg-purple-700 text-white text-center">
          <tr>
            <th className="p-2 border-b min-w-[200px]">DESKRIPSI</th>
            <th className="p-2 border-b min-w-[200px]">HARGA PEROLEHAN</th>
            <th className="p-2 border-b min-w-[200px]">NILAI SAAT INI</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="border border-gray-300 py-2 px-3 text-left font-medium">
                {item.deskripsi}
              </td>
              <td className="border border-gray-300 py-2 px-3 text-right font-semibold text-gray-800">
                <span>
                  {formatRupiah(item.hargaPerolehan)}
                </span>
              </td>
              <td className="border border-gray-300 py-2 px-3 text-right font-semibold text-gray-800">
                {formatRupiah(item.nilaiSaatIni)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ikhtisar;
