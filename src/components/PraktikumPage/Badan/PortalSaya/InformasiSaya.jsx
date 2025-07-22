import React, { useState, useEffect } from "react";
import SidebarProfilSayaBadan from "./SidebarProfilSaya";
import { BsFiletypeXls } from "react-icons/bs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useSearchParams } from "react-router-dom";
import { useUserType } from "@/components/context/userTypeContext";
import { useParams } from "react-router";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const InformasiSayaBadan = ({ data, sidebar }) => {
  const [activeTab, setActiveTab] = useState("general");
  const { userType } = useUserType();
  const [userTypeFromStorage, setUserTypeFromStorage] = useState("");
  const { id, akun } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("user_id");

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserTypeFromStorage(storedUserType);
    }
  }, []);

  const getUserTypePath = () => {
    const type = userType || userTypeFromStorage;
    return type === "Orang Pribadi" ? 1 : 2;
  };

  console.log("halo");
  console.log(data, sidebar);
  const navigate = useNavigateWithParams();
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProfilSayaBadan
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id, akun }}
      />
      <main className="flex-auto p-3 bg-white rounded-md h-full min-w-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Informasi Umum Wajib Pajak</h2>
          {/* <a href={`/praktikum/${id}/sistem/${akun}/edit-informasi-umum`}> */}
          <button
            className={userId ? "hidden" : "px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-blue-900 rounded-md"}
            // onClick={() =>
            //   (window.location.href = `/admin/praktikum/${getUserTypePath()}/profil-saya/informasi-umum/edit-data-profil`)
            // }
            onClick={() =>
              navigate(`/praktikum/${id}/sistem/${akun}/edit-informasi-umum`)
            }
          >
            Edit
          </button>
          {/* </a> */}
        </div>

        <div className="w-full p-2 ml-0 border-t">
          <Tabs
            defaultValue="general"
            onValueChange={(val) => setActiveTab(val)}
          >
            <TabsList className="flex justify-start gap-2 text-blue-700">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="taxplayer">Taxplayer Tags</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
                <div className="space-y-2">
                  {[
                    ["Nomor Pokok Wajib Pajak", data.npwp_akun],
                    ["Nomor Identitas Kependudukan", data.npwp_akun],
                    ["Bentuk Badan Hukum", data.tipe_akun],
                    ["Nomor Keputusan Pengesahan", "Orang Pribadi"],
                    ["Nama", data.nama_akun],
                    ["Tanggal Keputusan Pengesahan", ""],
                    ["Nomor Akta Pendirian", ""],
                    ["Tempat Pendirian", ""],
                    ["Tempat Perubahan", ""],
                    ["Tanggal Pendirian", ""],
                    ["Akta Perubahan", ""],
                    ["NIK Notaris", ""],
                    ["Tanggal Perubahan", ""],
                    [
                      "Nama Notaris/Pejabat Penandatangan Nama Notaris/Pejabat Penandatangan",
                      "",
                    ],
                    ["Jenis Perusahaan/Modal", ""],
                    ["Modal Dasar", ""],
                    ["Modal Ditempatkan", ""],
                    ["Modal Disetor", ""],
                    ["Participating Interest", ""],
                    ["Status Operator", ""],
                    ["Merek Dagang/usaha", ""],
                    ["Memiliki Karyawan", ""],
                    ["Jumlah Karyawan", ""],
                    ["Metode Pembukuan/Pencatatatan", ""],
                    ["Mata Uang Pembukuan", ""],
                    ["Periode Pembukuan", ""],
                    ["Tanggal Pendaftaran", ""],
                    ["Omset Per tahun", ""],
                    ["Jumlah Peredaran Bruto", ""],
                    ["Tanggal Aktivasi", ""],
                    ["Status Wajib Pajak", ""],
                    [
                      "Tanggal Pengukuhan Pengusaha Kena Pajak",
                      "",
                    ],
                    [
                      "Penonaktifan Akses Pembuatan Faktur Pajak",
                      "",
                    ],
                  ].map(([label, value], index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[minmax(0,_1fr)_auto_minmax(0,_1.5fr)] items-start gap-x-2"
                    >
                      <p className="font-bold text-gray-800 break-words">{label}</p>
                      <p>:</p>
                      <p className="break-words">{value || "-"}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 h-full">
                  {[
                    ["Pemungut PPN eCommerce", "X"],
                    ["Penghasilan atau Pemotong atau Pemungut PPN", "X"],
                    ["PPN yang dianggap", "X"],
                    ["Pengembalian PPN", "X"],
                    ["Lembaga Keuangan Pelapor", "X"],
                    ["Pemungut Bea Materai", "X"],
                    ["Pembayaran Non Kas", "X"],
                    ["PMK-131/PMK.03/2017", "X"],
                    ["Perusahaan Tercatat", "X"],
                    ["Badan Usaha Milik Negara", "X"],
                    ["Bahasa yang Dipilih", "X"],
                    ["Kantor Wilayah", "X"],
                    ["Kantor Pelayanan Pajak", "X"],
                    ["Nomor Telepon Seluler Utama", "X"],
                    ["Alamat Surat Elektronik Utama", "X"],
                    ["Seksi Pengawasan", "Coretaxify"],
                  ].map(([label, value], index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[minmax(0,_1fr)_auto_minmax(0,_1.5fr)] items-start gap-x-2"
                    >
                      <p className="font-bold text-gray-800 break-words">{label}</p>
                      <p>:</p>
                      <p className="break-words">{value || ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="taxplayer" className="p-4 min-w-full ">
              <div className="flex justify-between mb-4 border-b pb-3">
                <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                  <BsFiletypeXls className="text-2xl text-white" />
                </button>
              </div>


              <div className="overflow-x-auto">
                <table className="table-auto border border-gray-300 w-full">
                  <thead className="bg-purple-700 text-white">
                    <tr>
                      {[
                        "Jenis Bendera",
                        "Jenis Surat Pemberitahuan Pajak",
                        "Masa Pajak",
                        "Tanggal Penunjukan",
                        "Nomor Penunjukkan",
                        "Nomor Kasus",
                        "Berlaku Sejak",
                        "Tanggal Berakhir",
                      ].map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 border text-left"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Array(8)
                        .fill()
                        .map((_, index) => (
                          <td key={index} className="px-4 py-2 border">
                            <input
                              type="text"
                              className="px-2 w-full h-8 border rounded"
                            />
                          </td>
                        ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default InformasiSayaBadan;
