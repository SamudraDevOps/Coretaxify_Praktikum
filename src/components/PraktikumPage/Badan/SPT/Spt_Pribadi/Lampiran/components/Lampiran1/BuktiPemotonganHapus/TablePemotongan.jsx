import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";

const TablePemotongan = ({ data, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table-auto text-sm text-left border overflow-hidden">
        <thead className="bg-purple-700 text-white text-center">
          <tr>
            <th className="p-2 border-b">No</th>
            <th className="p-2 border-b min-w-[200px]"> Nama Pemotong /Pemumut PPh</th>
            <th className="p-2 border-b min-w-[200px]">NPWP Pemotong / Pemumut PPh</th>
            <th className="p-2 border-b min-w-[200px]"> Nomor Bukti Pemotongan / Pemumutan</th>
            <th className="p-2 border-b min-w-[150px]">Tanggal Pemotongan</th>
            <th className="p-2 border-b min-w-[150px]">Jenis Pajak</th>
            <th className="p-2 border-b min-w-[150px]">Dasar Pengenaan Pajak</th>
            <th className="p-2 border-b min-w-[150px]"> PPh Yang Dipotong / Dipungut</th>

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
              <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-2 border-b text-center">{index + 1}</td>
                <td className="p-2 border-b">{item.namaPemotong || "-"}</td>

                <td className="p-2 border-b">{item.npwpPemotong || "-"}</td>
                <td className="p-2 border-b">{item.nomorBuktiPemotongan || "-"}</td>
                <td className="p-2 border-b">{item.tanggalPemotongan || "-"}</td>
                <td className="p-2 border-b">{item.jenisPajak || "-"}</td>
                <td className="p-2 border-b">{formatRupiah(item.dasarPengenaanPajak) || "-"}</td>
                <td className="p-2 border-b">{formatRupiah(item.pphdipotong) || "-"}</td>

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

        {/* Footer dengan total */}
        {/* {data.length > 0 && (
           <tfoot className="text-gray-800 font-semibold bg-gray-100">
             <tr>
               <td className="p-2 text-right" colSpan={6}>
                 Total Penghasilan Bruto:
               </td>
               <td className="p-2 text-center">
                 {formatRupiah(calculateTotalPenghasilanBruto())}
               </td>
               <td className="p-2 text-center">
                 {formatRupiah(calculateTotalPajakPenghasilan())}
               </td>
               <td className="p-2" colSpan={6}></td>
             </tr>
             <tr>
               <td className="p-2 text-right" colSpan={13}>
                 <span className="text-blue-600">
                   Jumlah Data: {data.length} item
                 </span>
               </td>
               <td className="p-2"></td>
             </tr>
           </tfoot>
         )} */}
      </table>
    </div>
  );
};

export default TablePemotongan;
