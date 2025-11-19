import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const TableUtang = ({ data, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table-auto text-sm text-left border overflow-hidden">
        <thead className="bg-purple-700 text-white text-center">
          {/* ===== Baris Header 1 ===== */}
          <tr>
            <th rowSpan={2} className="p-2 border-b">
              No
            </th>
            <th rowSpan={2} className="p-2 border-b min-w-[200px]">
              Kode
            </th>
            <th rowSpan={2} className="p-2 border-b min-w-[200px]">
              Deskripsi
            </th>
            <th colSpan={2} className="p-2 border-b min-w-[250px]">
              Pemberi Pinjaman
            </th>
            <th rowSpan={2} className="p-2 border-b min-w-[150px]">
              Negara
            </th>
            <th rowSpan={2} className="p-2 border-b min-w-[150px]">
              Tahun Perolehan
            </th>
            <th rowSpan={2} className="p-2 border-b min-w-[150px]">
              Saldo
            </th>
            <th rowSpan={2} className="p-2 border-b min-w-[150px]">
              Keterangan
            </th>
            <th rowSpan={2} className="p-2 border-b min-w-[100px]">
              Aksi
            </th>
          </tr>

          {/* ===== Baris Header 2 (Sub-header) ===== */}
          <tr>
            <th className="p-2 border-b min-w-[150px]">NPWP</th>
            <th className="p-2 border-b min-w-[150px]">Nama</th>
          </tr>
        </thead>

        <tbody className="text-gray-600 text-center">
          {data.length === 0 ? (
            <tr>
              <td colSpan="14" className="p-4 text-center text-gray-500">
                Belum ada data. Klik "Tambah Data" untuk menambah data baru.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-2 border-b text-center">{index + 1}</td>
                <td className="p-2 border-b">{item.kode || "-"}</td>
                <td className="p-2 border-b">{item.deskripsi?.replace(/^\d{4}:\s*/, "") || "-"}</td>

                {/* NPWP dan Nama di bawah grup Pemberi Pinjaman */}
                <td className="p-2 border-b">{item.npwpKreditur || "-"}</td>
                <td className="p-2 border-b">
                  {item.namaKreditur || item.penerimaPinjaman || "-"}
                </td>

                <td className="p-2 border-b">{item.negara || "-"}</td>
                <td className="p-2 border-b">
                  {item.tahunPerolehan || item.tahunPeminjaman || "-"}
                </td>
                <td className="p-2 border-b">{formatRupiah(item.saldo) || "-"}</td>
                <td className="p-2 border-b">{item.keterangan || "-"}</td>

                <td className="p-2 border-b">
                  <div className="flex gap-1 justify-center">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                      title="Edit Data"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      title="Hapus Data"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUtang;
