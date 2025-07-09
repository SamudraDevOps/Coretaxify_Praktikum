import React, { useState } from "react";
import SidebarProfilSaya from "./SidebarProfilSaya";
import { BsFiletypeXls } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { getCsrf } from "@/service/getCsrf";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const DetailBank = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const [cookies] = useCookies(["token"]);
  const userId = searchParams.get("user_id");
  const [bankFormData, setBankFormData] = useState({
    nama_bank: "",
    nomor_rekening_bank: "",
    jenis_rekening_bank: "akun-bisnis",
    nama_pemilik_bank: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
  });
  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateDetailBank = useMutation({
    mutationFn: async (bank_id) => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/detail-bank/${bank_id}`,
        bankFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data detail bank berhasil disimpan!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const deleteDetailBank = useMutation({
    mutationFn: async (bank_id) => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      return axios.delete(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/detail-bank/${bank_id}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire(
        "Berhasil!",
        "Data bank terkait berhasil dihapus!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSaya
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div className="flex items-center">
            <IoDocumentTextOutline className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Detail Bank
            </h1>
          </div>
        </div>
        <div className="flex justify-between mb-4 border-b pb-3 ">
          <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
            <BsFiletypeXls className="text-2xl text-white" />
          </button>
        </div>
        <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
          <table className="table-auto border border-gray-300 overflow-hidden">
            <thead>
              <tr>
                <th className="border border-gray-300 px-1 py-2">Aksi</th>
                <th className="border border-gray-300 px-4 py-2">Nama Bank</th>
                <th className="border border-gray-300 px-4 py-2">
                  Nomor Rekening
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Jenis Rekening Bank
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Nama Rekening Bank
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Tanggal Mulai
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Tanggal Berakhir
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((bank) => (
                  <tr className="bg-gray-100">
                    <td className="px-1 py-4 border">
                      <AlertDialog>
                        <AlertDialogTrigger
                          onClick={() => setBankFormData(bank)}
                          className={userId ? "hidden" : "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"}
                        >
                          Edit
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg ">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-bold">
                              Tambahkan Tempat Kegiatan Baru
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <div className="grid gap-4 overflow-auto h-96">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Bank *
                              </label>
                              <select
                                className="w-full p-2 border rounded"
                                name="nama_bank"
                                value={bankFormData.nama_bank}
                                onChange={handleBankChange}
                              >
                                <option value="">Pilih Bank</option>
                                <option value="PT BANK MANDIRI (PERSERO) Tbk">
                                  PT BANK MANDIRI (PERSERO) Tbk
                                </option>
                                <option value="PT BANK CENTRAL ASIA Tbk">
                                  PT BANK CENTRAL ASIA Tbk
                                </option>
                                <option value="PT BANK RAKYAT INDONESIA (PERSERO) Tbk">
                                  PT BANK RAKYAT INDONESIA (PERSERO) Tbk
                                </option>
                                <option value="PT BANK NEGARA INDONESIA (PERSERO) Tbk">
                                  PT BANK NEGARA INDONESIA (PERSERO) Tbk
                                </option>
                                <option value="PT BANK BUKOPIN Tbk">
                                  PT BANK BUKOPIN Tbk
                                </option>
                                <option value="PT BANK BTPN Tbk">
                                  PT BANK BTPN Tbk
                                </option>
                                <option value="PT BANK CIMB NIAGA Tbk">
                                  PT BANK CIMB NIAGA Tbk
                                </option>
                                <option value="PT BANK DANAMON Tbk">
                                  PT BANK DANAMON Tbk
                                </option>
                                <option value="PT BANK MAYBANK Tbk">
                                  PT BANK MAYBANK Tbk
                                </option>
                                <option value="PT BANK MEGA Tbk">
                                  PT BANK MEGA Tbk
                                </option>
                                <option value="PT BANK PERMATA Tbk">
                                  PT BANK PERMATA Tbk
                                </option>
                                <option value="PT BANK PANIN Tbk">
                                  PT BANK PANIN Tbk
                                </option>
                                <option value="PT BANK PANIN SYARIAH Tbk">
                                  PT BANK PANIN SYARIAH Tbk
                                </option>
                                <option value="PT BANK MAYBANK SYARIAH Tbk">
                                  PT BANK MAYBANK SYARIAH Tbk
                                </option>
                                <option value="PT BANK SYARIAH INDONESIA Tbk">
                                  PT BANK SYARIAH INDONESIA Tbk
                                </option>
                                <option value="PT BANK SYARIAH INDONESIA SYARIAH Tbk">
                                  PT BANK SYARIAH INDONESIA SYARIAH Tbk
                                </option>
                                <option value="PT BANK CENTRAL ASIA SYARIAH Tbk">
                                  PT BANK CENTRAL ASIA SYARIAH Tbk
                                </option>
                                <option value="PT BANK RAKYAT INDONESIA SYARIAH Tbk">
                                  PT BANK RAKYAT INDONESIA SYARIAH Tbk
                                </option>
                                <option value="PT BANK NEGARA INDONESIA SYARIAH Tbk">
                                  PT BANK NEGARA INDONESIA SYARIAH Tbk
                                </option>
                                <option value="PT BANK BUKOPIN SYARIAH Tbk">
                                  PT BANK BUKOPIN SYARIAH Tbk
                                </option>
                                <option value="PT BANK BTPN SYARIAH Tbk">
                                  PT BANK BTPN SYARIAH Tbk
                                </option>
                                <option value="PT BANK CIMB NIAGA SYARIAH Tbk">
                                  PT BANK CIMB NIAGA SYARIAH Tbk
                                </option>
                                <option value="PT BANK DANAMON SYARIAH Tbk">
                                  PT BANK DANAMON SYARIAH Tbk
                                </option>
                                <option value="PT BANK MAYBANK SYARIAH Tbk">
                                  PT BANK MAYBANK SYARIAH Tbk
                                </option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Nomor Rekening
                              </label>
                              <input
                                type="text"
                                name="nomor_rekening_bank"
                                value={bankFormData.nomor_rekening_bank}
                                onChange={handleBankChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Jenis Rekening Bank
                              </label>
                              <select
                                name="jenis_rekening_bank"
                                value={bankFormData.jenis_rekening_bank}
                                onChange={handleBankChange}
                                className="w-full p-2 border rounded"
                              >
                                <option value="akun-bisnis">Akun Bisnis</option>
                                <option value="akun-pribadi">
                                  Akun Pribadi
                                </option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Nama Pemilik Bank
                              </label>
                              <textarea
                                name="nama_pemilik_bank"
                                value={bankFormData.nama_pemilik_bank}
                                onChange={handleBankChange}
                                className="w-full p-2 border rounded"
                              ></textarea>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Tanggal Mulai
                              </label>
                              <input
                                type="date"
                                name="tanggal_mulai"
                                value={bankFormData.tanggal_mulai}
                                onChange={handleBankChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Tanggal Berakhir
                              </label>
                              <input
                                type="date"
                                name="tanggal_berakhir"
                                value={bankFormData.tanggal_berakhir}
                                onChange={handleBankChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                          </div>
                          <AlertDialogFooter className="flex justify-end mt-6 space-x-2">
                            <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                              Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => updateDetailBank.mutate(bank.id)}
                              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                            >
                              Simpan
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <button
                        onClick={() => deleteDetailBank.mutate(bank.id)}
                        className={userId ? "hidden" : "bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ml-2"}
                      >
                        Hapus
                      </button>
                    </td>
                    <td className="px-4 py-4 border">{bank.nama_bank}</td>
                    <td className="px-4 py-4 border">
                      {bank.nomor_rekening_bank}
                    </td>
                    <td className="px-4 py-4 border">
                      {bank.nama_pemilik_bank}
                    </td>
                    <td className="px-4 py-4 border">
                      {bank.jenis_rekening_bank}
                    </td>
                    <td className="px-4 py-4 border">{bank.tanggal_mulai}</td>
                    <td className="px-4 py-4 border">
                      {bank.tanggal_berakhir}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
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

export default DetailBank;
