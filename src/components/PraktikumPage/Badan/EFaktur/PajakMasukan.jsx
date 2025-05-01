import React from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";

const PajakMasukan = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  const [cookies] = useCookies(["token"]);

  console.log(data);
  return (
    <div className="flex h-screen">
      <SideBarEFaktur
        npwp_akun={sidebar.npwp_akun}
        nama_akun={sidebar.nama_akun}
        akun={{ id, akun }}
      />
      <div className="flex-1 p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Pajak Masukan
            </h1>
          </div>
        </div>
        <div className="flex justify-between mb-4 border-b pb-3">
          <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded text-sm">
            Import Excel
          </button>
          <div className="flex items-center gap-3 ">
            <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm">
              Kreditan Faktur
            </button>
            <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm">
              Tidak Kreditan Faktur
            </button>
            <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded text-sm">
              Kembali Ke Status Approved
            </button>
          </div>
        </div>
        <div className="w-[1100px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <table className="table-auto border border-gray-300 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 border">No</th>
                <th className="px-8 py-2 border">Checklist</th>
                <th className="px-4 py-2 border">Aksi</th>
                <th className="px-4 py-2 border">NPWP Pembeli</th>
                <th className="px-4 py-2 border">Nama Pembeli</th>
                <th className="px-4 py-2 border">Kode Transaksi</th>
                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                <th className="px-4 py-2 border">Masa Pajak</th>
                <th className="px-4 py-2 border">Tahun</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-2 border">{index + 1}</td>
                    <td className="px-8 py-2 border">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                      />
                    </td>
                    <td className="px-4 py-2 border">
                      {/* <div className="flex space-x-2">
                        <a
                          href={`/praktikum/${id}/sistem/${akun}/e-faktur/pajak-keluaran/edit-faktur-keluaran/${item.id}`}
                        >
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs">
                            Edit
                          </button>
                        </a>
                        <button
                          //   onClick={() => deleteFaktur.mutate(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Hapus
                        </button>
                      </div> */}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.akun_penerima_id.npwp_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.akun_penerima_id.nama_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.kode_transaksi || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.nomor_faktur_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.tanggal_faktur_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.masa_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">{item.tahun || "-"}</td>
                    {/* <td className="px-4 py-2 border">
                      {item.esign_status || "-"}
                    </td>
                    <td className="px-4 py-2 border">{item.dpp || "-"}</td>
                    <td className="px-4 py-2 border">{item.dpp_lain || "-"}</td>
                    <td className="px-4 py-2 border">{item.ppn || "-"}</td>
                    <td className="px-4 py-2 border">{item.ppnbm || "-"}</td>
                    <td className="px-4 py-2 border">
                      {item.penandatangan || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.referensi || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.dilaporkan_penjual == 1 ? "Ya" : "Tidak"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.dilaporkan_pemungut == 1 ? "Ya" : "Tidak"}
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="text-center p-4 border">
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PajakMasukan;
