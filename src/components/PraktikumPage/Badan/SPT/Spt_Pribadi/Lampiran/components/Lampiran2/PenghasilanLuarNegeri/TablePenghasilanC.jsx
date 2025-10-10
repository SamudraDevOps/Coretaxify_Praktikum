import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { formatRupiah } from "../../../utils/formatCurrency";

const TablePenghasilanC = ({ data, onEdit, onDelete }) => {
  const getJenisPenghasilan = (value) => {
    switch (value) {
      case "101":
        return "Penghasilan dari pekerjaan dalam hubungan kerja";
      case "102":
        return "Penghasilan dari usaha dan/atau pekerjaan bebas";
      case "103":
        return "Penghasilan dari modal (dividen, bunga, royalti)";
      case "104":
        return "Penghasilan dari pekerjaan bebas (profesi luar negeri)";
      case "105":
        return "PPenghasilan dari pengalihan harta (capital gain)";
      case "106":
        return "Penghasilan lainnya (hadiah, pensiun, dan sebagainya)";

      default:
        return "-";
    }
  };
  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table-auto text-sm text-left border overflow-hidden">
        <thead className="bg-purple-700 text-white text-center">
          <tr>
            <th className="p-2 border-b">No</th>
            <th className="p-2 border-b min-w-[200px]"> Nama Pemberi Penghasilan </th>
            <th className="p-2 border-b min-w-[200px]">Nama Negara</th>
            <th className="p-2 border-b min-w-[200px]"> Tanggal pemotongan</th>
            <th className="p-2 border-b min-w-[150px]"> Jenis Penghasilan</th>
            <th className="p-2 border-b min-w-[150px]">Kode</th>
            <th className="p-2 border-b min-w-[150px]">Penghasilan Neto</th>
            <th className="p-2 border-b min-w-[150px]">
              {" "}
              Pajak yang Dibayar/Dipotong/Terutang di Luar Negeri dalam Mata Uang Asing /
            </th>
            <th className="p-2 border-b min-w-[150px]">Mata Uang</th>
            <th className="p-2 border-b min-w-[150px]">
              {" "}
              Pajak yang Dibayar/Dipotong/Terutang di Luar Negeri dalam Mata Uang Rupiah{" "}
            </th>
            <th className="p-2 border-b min-w-[150px]"> Kredit yang dapat diperhitungkan</th>
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
                <td className="p-2 border-b">{item.namaPemberi || "-"}</td>
                <td className="p-2 border-b">{item.negara || "-"}</td>
                <td className="p-2 border-b">{item.tanggalPemotongan || "-"}</td>
                <td className="p-2 border-b">{getJenisPenghasilan(item.jenis) || "-"}</td>
                <td className="p-2 border-b">{item.kode || "-"}</td>
                <td className="p-2 border-b">{formatRupiah(item.penghasilanNeto) || "-"}</td>
                <td className="p-2 border-b">{formatRupiah(item.pajakDibayarLuarNegeri) || "-"}</td>
                <td className="p-2 border-b">{item.mataUang || "-"}</td>
                <td className="p-2 border-b">{formatRupiah(item.pajakDibayarRupiah) || "-"}</td>
                <td className="p-2 border-b">
                  {formatRupiah(item.kreditYangDapatDiperhitungkan) || "-"}
                </td>

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

export default TablePenghasilanC;
