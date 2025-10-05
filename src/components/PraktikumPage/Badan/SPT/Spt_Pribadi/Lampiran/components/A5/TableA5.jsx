import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { formatRupiah } from "../../utils/formatCurrency";

const TableA5 = ({ data, onEdit, onDelete }) => {

    const getKepemilikanText = (value) => {
    switch(value) {
      case "1": return "Warisan";
      case "2": return "Hasil Sendiri";
      case "3": return "Utang";
      case "4": return "Hibah";
      case "5": return "Hadiah";
      case "6": return "Sumber Lainnya";
      default: return "-";
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="table-auto text-sm text-left border overflow-hidden">
        <thead className="bg-purple-700 text-white text-center">
          <tr>
            <th className="p-2 border-b">No</th>
            <th className="p-2 border-b min-w-[200px]">Kode</th>
            <th className="p-2 border-b min-w-[200px]">Deskripsi</th>
            <th className="p-2 border-b min-w-[200px]">Lokasi Harta</th>
            <th className="p-2 border-b min-w-[200px]">
              Ukuran Properti - Tanah (m2)
            </th>
            <th className="p-2 border-b min-w-[150px]">Ukuran Properti - Bangunan (m2)</th>
            <th className="p-2 border-b min-w-[150px]"> Sumber Kepemilikan</th>
            <th className="p-2 border-b min-w-[150px]">Nomor Sertifikat</th>
            <th className="p-2 border-b min-w-[150px]">Tahun Perolehan</th>
            <th className="p-2 border-b min-w-[150px]">Biaya Perolehan</th>
            <th className="p-2 border-b min-w-[150px]">Nilai Saat ini</th>
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
                </td>
                {/* <td className="p-2 border-b">{item.deskripsi  || "-"}</td> */}
                <td className="p-2 border-b">{item.lokasiHarta || "-"}</td>
                <td className="p-2 border-b">{item.ukuranTanah || "-"}</td>
                <td className="p-2 border-b">{item.ukuranBangunan || "-"}</td>
                <td className="p-2 border-b">{getKepemilikanText(item.sumberKepemilikan)}</td>
                <td className="p-2 border-b">{item.nomorSertifikat || "-"}</td>
                <td className="p-2 border-b">{item.tahunPerolehan}</td>
                <td className="p-2 border-b">
                  {formatRupiah(item.biayaPerolehan)}
                </td>
                <td className="p-2 border-b">
                  {formatRupiah(item.nilaiSaatIni)}
                </td>
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

export default TableA5;
