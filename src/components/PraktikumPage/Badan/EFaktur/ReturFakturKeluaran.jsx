import React, { useState, useRef } from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaEdit, FaFilePdf } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { useParams, useSearchParams } from "react-router";
import FakturPenilaian from "./FakturPenilaian";

const ReturFakturKeluaran = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const userId = searchParams.get("user_id");
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarEFaktur
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <div className="flex-auto p-3 bg-white rounded-md h-full w-min-0">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Retur Pajak Keluaran
            </h1>
          </div>
          {userId ? (
            <FakturPenilaian
              tipeFaktur="Retur Faktur Keluaran"
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-end mb-4 border-b pb-3">
          <button className={userId ? "hidden" : "flex items-center bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-2 rounded"}>
            <TiDeleteOutline className="text-2xl text-white mr-2" />
            Batalkan Retur
          </button>
        </div>
        <div className="w-[1040px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mx-4">
          <table className="table-auto border border-gray-300 overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-1 py-2">No</th>
                <th className="px-4 py-2 border">NPWP Pembeli</th>
                <th className="px-4 py-2 border">Nama Pembeli</th>
                <th className="px-4 py-2 border">Kode Transaksi</th>
                <th className="px-4 py-2 border">Nomor Faktur Pajak</th>
                <th className="px-4 py-2 border">Tanggal Faktur Pajak</th>
                <th className="px-4 py-2 border">Masa Pajak</th>
                <th className="px-4 py-2 border">Tahun</th>
                <th className="px-4 py-2 border">Status Faktur</th>
                <th className="px-4 py-2 border">ESignStatus</th>
                <th className="px-4 py-2 border">
                  Harga Jual / Penggantian / DPP
                </th>
                <th className="px-4 py-2 border">DPP Nilai Lain / DPP</th>
                <th className="px-4 py-2 border">PPN</th>
                <th className="px-4 py-2 border">PPnMB</th>
                <th className="px-4 py-2 border">Penandatanganan</th>
                <th className="px-4 py-2 border">Referensi</th>
                <th className="px-4 py-2 border">Dilaporkan Oleh Pengguna</th>
                <th className="px-4 py-2 border">
                  Dilaporkan Oleh Pemungut PPN
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-1 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.akun_penerima_id?.npwp_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.akun_penerima_id?.nama_akun || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.kode_transaksi || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.nomor_faktur_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.masa_pajak || "-"}
                    </td>
                    <td className="px-4 py-2 border">{item.tahun || "-"}</td>
                    <td className="px-4 py-2 border">{item.status || "-"}</td>
                    <td className="px-4 py-2 border">
                      {item.esign_status || "-"}
                    </td>
                    <td className="px-4 py-2 border text-right">
                      {item.dpp
                        ? Number(item.dpp).toLocaleString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border text-right">
                      {item.dpp_lain_retur
                        ? Number(item.dpp_lain_retur).toLocaleString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border text-right">
                      {item.ppn_retur
                        ? Number(item.ppn_retur).toLocaleString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border text-right">
                      {item.ppnbm_retur
                        ? Number(item.ppnbm_retur).toLocaleString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.penandatangan || "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.referensi || "-"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.dilaporkan_oleh_penjual ? "Ya" : "Tidak"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.dilaporkan_oleh_pemungut_ppn ? "Ya" : "Tidak"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={18}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Tidak ada data
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

export default ReturFakturKeluaran;
