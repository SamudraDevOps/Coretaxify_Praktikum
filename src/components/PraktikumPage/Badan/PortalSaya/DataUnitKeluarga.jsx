import React, { useState } from "react";
import SidebarProfilSaya from "./SidebarProfilSaya";
import { BsFiletypeXls } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import { RoutesApi } from "@/Routes";
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
const DataUnitKeluarga = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const userId = searchParams.get("user_id");
  const [familyUnitFormData, setFamilyUnitFormData] = useState({
    nik_anggota_keluarga: "",
    jenis_kelamin: "Pria",
    tempat_lahir: "",
    nomor_kartu_keluarga: "",
    nama_anggota_keluarga: "",
    tanggal_lahir: "",
    status_hubungan_keluarga: "",
    pekerjaan: "",
    status_unit_perpajakan: "tanggungan",
    status_ptkp: "K/0",
    tanggal_mulai: "",
    tanggal_berakhir: "",
  });
  const handleFamilyUnitChange = (e) => {
    const { name, value } = e.target;
    setFamilyUnitFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateFamilyUnit = useMutation({
    mutationFn: async (familyId) => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/unit-pajak-keluarga/${familyId}`,
        familyUnitFormData,
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
        "Data unit pajak keluarga berhasil diperbarui!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error updating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui data.", "error");
    },
  });

  const deleteFamilyUnit = useMutation({
    mutationFn: async (familyId) => {
      const csrf = await getCsrf();
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;
      return axios.delete(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/unit-pajak-keluarga/${familyId}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Data keluarga berhasil dihapus!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error deleting data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
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
              Unit Pajak Keluarga
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
                <th className="border border-gray-300 px-4 py-2">
                  Nomor Kartu Keluarga
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Anggota Keluarga Sesuai NIK
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Nama Anggota Keluarga
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Tanggal Lahir
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Status Hubungan Keluarga
                </th>
                <th className="border border-gray-300 px-4 py-2">Pekerjaan</th>
                <th className="border border-gray-300 px-4 py-2">
                  Status Unit Perpajakan
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Status PTKP
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Apakah Data Dukcapil
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Tanggal Berakhir
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data && data.length > 0 ? (
                data.map((family, index) => (
                  <tr key={index} className="bg-gray-100">
                    <td className="px-1 py-4 border">
                      <AlertDialog>
                        <AlertDialogTrigger
                          onClick={() => setFamilyUnitFormData(family)}
                          className={userId ? "hidden" : "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"}
                        >
                          Edit
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white !min-w-[1000px] rounded-lg shadow-lg">
                          <div className="grid gap-4 overflow-auto h-96">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                NIK Anggota Keluarga
                              </label>
                              <input
                                type="text"
                                name="nik_anggota_keluarga"
                                value={familyUnitFormData.nik_anggota_keluarga}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded-md mt-1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Jenis Kelamin
                              </label>
                              <select
                                name="jenis_kelamin"
                                value={familyUnitFormData.jenis_kelamin}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              >
                                <option value="Pria">Pria</option>
                                <option value="Wanita">Wanita</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Tempat Lahir
                              </label>
                              <input
                                type="text"
                                name="tempat_lahir"
                                value={familyUnitFormData.tempat_lahir}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Nomor Kartu Keluarga
                              </label>
                              <input
                                type="text"
                                name="nomor_kartu_keluarga"
                                value={familyUnitFormData.nomor_kartu_keluarga}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Nama Anggota Keluarga
                              </label>
                              <input
                                type="text"
                                name="nama_anggota_keluarga"
                                value={familyUnitFormData.nama_anggota_keluarga}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Tanggal Lahir
                              </label>
                              <input
                                type="date"
                                name="tanggal_lahir"
                                value={familyUnitFormData.tanggal_lahir}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Status Hubungan
                              </label>
                              <input
                                type="text"
                                name="status_hubungan_keluarga"
                                value={
                                  familyUnitFormData.status_hubungan_keluarga
                                }
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Pekerjaan
                              </label>
                              <input
                                type="text"
                                name="pekerjaan"
                                value={familyUnitFormData.pekerjaan}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Status Unit Perpajakan
                              </label>
                              <select
                                name="status_unit_perpajakan"
                                value={
                                  familyUnitFormData.status_unit_perpajakan
                                }
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              >
                                <option value="tanggungan">Tanggungan</option>
                                <option value="kepala unit kepala keluarga lain HB">
                                  Kepala Unit Keluarga Lain (HB)
                                </option>
                                <option value="kepala unit kepala keluarga lain OP">
                                  Kepala Unit Keluarga Lain (OP)
                                </option>
                                <option value="kepala unit keluarga">
                                  Kepala Unit Keluarga
                                </option>
                                <option value="kepala unit keluarga lain MT">
                                  Kepala Unit Kepala Lain (MT)
                                </option>
                                <option value="bukan tanggungan">
                                  Bukan Tanggungan
                                </option>
                                <option value="kepala unit keluarga lain PH">
                                  Kepala Unit Keluarga Lain (PH)
                                </option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Status PTKP
                              </label>
                              <select
                                name="status_ptkp"
                                value={familyUnitFormData.status_ptkp}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              >
                                <option value="K/0">K/0</option>
                                <option value="K/1">K/1</option>
                                <option value="K/2">K/2</option>
                                <option value="K/3">K/3</option>
                                <option value="TK/0">TK/0</option>
                                <option value="TK/1">TK/1</option>
                                <option value="TK/2">TK/2</option>
                                <option value="TK/3">TK/3</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Tanggal Mulai
                              </label>
                              <input
                                type="date"
                                name="tanggal_mulai"
                                value={familyUnitFormData.tanggal_mulai}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Tanggal Selesai
                              </label>
                              <input
                                type="date"
                                name="tanggal_berakhir"
                                value={familyUnitFormData.tanggal_berakhir}
                                onChange={handleFamilyUnitChange}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                              Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => updateFamilyUnit.mutate(family.id)}
                              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
                            >
                              Simpan
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Hapus data keluarga?",
                            text: "Data akan dihapus secara permanen!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Ya, hapus!",
                            cancelButtonText: "Batal",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteFamilyUnit.mutate(family.id);
                            }
                          });
                        }}
                        className={userId ? "hidden" : "bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded ml-2"}
                      >
                        Hapus
                      </button>
                    </td>
                    <td className="px-4 py-4 border">
                      {family.nik_anggota_keluarga}
                    </td>
                    <td className="px-4 py-4 border">
                      {family.nomor_kartu_keluarga}
                    </td>
                    <td className="px-4 py-4 border">
                      {family.nama_anggota_keluarga}
                    </td>
                    <td className="px-4 py-4 border">{family.tanggal_lahir}</td>
                    <td className="px-4 py-4 border">
                      {family.status_hubungan_keluarga}
                    </td>
                    <td className="px-4 py-4 border">{family.pekerjaan}</td>
                    <td className="px-4 py-4 border">
                      {family.status_unit_perpajakan}
                    </td>
                    <td className="px-4 py-4 border">{family.status_ptkp}</td>
                    <td className="px-4 py-4 border">{family.tanggal_mulai}</td>
                    <td className="px-4 py-4 border">
                      {family.tanggal_berakhir}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-4 border">
                    Belum ada data unit pajak keluarga
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

export default DataUnitKeluarga;
