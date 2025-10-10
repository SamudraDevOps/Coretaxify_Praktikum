import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { formatRupiah } from "../../../utils/formatCurrency";

const TablePenghasilan = ({ data, onEdit, onDelete }) => {
  const getJenisPenghasilan = (value) => {
    switch (value) {
      case "28-423-01":
        return "Gaji, Upah, Honorarium, Tunjangan dan Imbalan Lainnya";
      case "28-423-99":
        return "PPh final sesuai PP-55/2022 (Disetor Sendiri)";
      case "28-404-01":
        return "bunga tabungan dan bunga deposito yang ditempatkan di DN (selain dari DHE)";
      case "28-401-01":
        return "Bunga Obligasi, SUN, atau Obligasi Daerah yang Diterima WP DN dan BUT";
      case "28-406-01":
        return "Transaksi Penjualan Saham di Bursa Efek (Bukan Saham Pendiri)";
      case "21-401-01":
        return "Uang Pesangon yang Dibayarkan Sekaligus";
      case "21-402-02":
        return "Honor atau Imbalan Lain APBN atau APBD yang Diterima PNS/TNI/POLRI dan Pensiunannya";
      case "28-417-02":
        return "Bunga Simpanan yang Dibayarkan oleh Koperasi kepada Anggota WP OP";
      case "28-419-01":
        return "Dividen yang Diterima/Diperoleh WP OP DN";
      case "28-402-01":
        return "Pengalihan Hak atas Tanah dan/atau Bangunan";
      case "28-403-02":
        return "Persewaan Tanah dan/atau Bangunan";
      case "28-409-10":
        return "Jasa Konstruksi Berupa Jasa Pelaksanaan Konstruksi (Kualifikasi Usaha Kecil)";
      case "28-499-99":
        return "Penghasilan Istri dari Satu Pemberi Kerja yang Hak dan Kewajiban Perpajakannya Dilaksanakan oleh Kepala Keluarga";
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
            <th className="p-2 border-b min-w-[200px]"> Nama Pemotong /Pemumut PPh</th>
            <th className="p-2 border-b min-w-[200px]">NPWP Pemotong / Pemumut PPh</th>
            <th className="p-2 border-b min-w-[200px]"> Kode</th>
            <th className="p-2 border-b min-w-[150px]"> Jenis Penghasilan</th>
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
                <td className="p-2 border-b">{item.kode || "-"}</td>
                <td className="p-2 border-b">{getJenisPenghasilan(item.jenis) || "-"}</td>
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

export default TablePenghasilan;
