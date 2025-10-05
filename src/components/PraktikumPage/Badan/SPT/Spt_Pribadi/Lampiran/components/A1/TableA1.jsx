import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { formatRupiah } from "../../utils/formatCurrency";

const TableA1 = ({ data, onEdit, onDelete }) => {

  // Function untuk menghitung total saldo
  const calculateTotalSaldo = () => {
    return data.reduce(
      (total, item) => total + (item.saldo || 0),
      0
    );
  };


  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table-auto text-sm text-left border overflow-hidden">
        <thead className="bg-purple-700 text-white text-center">
          <tr>
            <th className="p-2 border-b">No</th>
            <th className="p-2 border-b min-w-[200px]">Kode</th>
            <th className="p-2 border-b min-w-[150px]">Deskripsi</th>
            <th className="p-2 border-b min-w-[150px]">
              Bukti Kepemilikan/Nomor Akun
            </th>
            <th className="p-2 border-b min-w-[150px]">Atas Nama</th>
            <th className="p-2 border-b min-w-[150px]">Nama Bank/Institusi</th>
            <th className="p-2 border-b min-w-[150px]">Lokasi Harta</th>
            <th className="p-2 border-b min-w-[150px]">Tahun Perolehan</th>
            <th className="p-2 border-b min-w-[150px]">Saldo (Rp)</th>
            <th className="p-2 border-b min-w-[150px]">Keterangan</th>
            <th className="p-2 border-b min-w-[100px]">Aksi</th>
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
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2 border-b text-center">{index + 1}</td>
                <td className="p-2 border-b">{item.kode || "-"}</td>
                <td className="p-2 border-b">
                  {item.deskripsi.replace(/^\d{4}:\s*/, "") || "-"}
                </td>{" "}
                <td className="p-2 border-b">{item.buktikepemilikan || "-"}</td>
                <td className="p-2 border-b">{item.atasnama || "-"}</td>
                <td className="p-2 border-b">{item.namabank || "-"}</td>
                <td className="p-2 border-b">{item.lokasiharta || "-"}</td>
                <td className="p-2 border-b">{item.tahunperolehan || "-"}</td>
                <td className="p-2 border-b">{formatRupiah(item.saldo)}</td>
                <td className="p-2 border-b">{item.keterangan || "-"}</td>
                {/* <td className="p-2 border-b">
                  {item.status && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Aktif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </td> */}
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

           {/* Footer dengan total saldo */}
        {data.length > 0 && (
          <tfoot className="text-gray-800 font-semibold bg-gray-100">
            <tr>
              <td className="p-2 text-right" colSpan={8}> 
                Total Saldo:
              </td>
              <td className="p-2 text-center bg-green-100"> 
                {formatRupiah(calculateTotalSaldo())}
              </td>
              <td className="p-2" colSpan={2}></td> 
            </tr>
            <tr>
              <td className="p-2 text-right" colSpan={10}> 
                <span className="text-blue-600">
                  Jumlah Data: {data.length} item
                </span>
              </td>
              <td className="p-2"></td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default TableA1;
