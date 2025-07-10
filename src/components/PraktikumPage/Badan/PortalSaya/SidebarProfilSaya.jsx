import React from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useUserType } from "../../../context/userTypeContext";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const SidebarProfilSayaBadan = ({ nama_akun, npwp_akun, akun }) => {
  const { userType } = useUserType();
  const userTypeId = userType === "Orang Pribadi" ? 1 : 2;
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");
  const location = useLocation();
  const navigate = useNavigateWithParams();

  const menuItems = [
    {
      label: "Ikhtisar Profil Wajib Pajak",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/profil-saya`,
    },
    {
      label: "Informasi Umum",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/informasi-umum`,
    },
    {
      label: "Alamat",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/alamat`,
    },
    {
      label: "Detail Kontak",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/detail-kontak`,
    },
    {
      label: "Pihak Terkait",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/pihak-terkait`,
    },
    {
      label: "Objek Pajak Bumi dan Bangunan (PBB)",
      link: `/objek-pajak-bumi-dan-bangunan-pbb`,
    },
    {
      label: "Klasifikasi Lapangan Usaha (KLU)",
      link: `/klasifikasi-lapangan-usaha-klu`,
    },
    {
      label: "Detail Bank",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/detail-bank`,
    },
    {
      label: "Data Unit Keluarga",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/data-unit-keluarga`,
    },
    {
      label: "Tempat Kegiatan Usaha/Sub Unit",
      link: `/tempat-kegiatan-usaha-sub-unit`,
    },
    {
      label: "Nomor Identifikasi Eksternal",
      link: `/nomor-identifikasi-eksternal`,
    },
    {
      label: "Jenis Pajak",
      link: `/jenis-pajak`,
    },
    {
      label: "Wakil Kuasa Saya",
      link: `/wakil-kuasa-saya`,
    },
    {
      label: "Wajib Pajak yang Diwakili",
      link: `/wajib-pajak-yang-diwakili`,
    },
    {
      label: "Verifikasi Dua Langkah",
      link: `/verifikasi-dua-langkah`,
    },
    {
      label: "Permohonan Tertunda",
      link: `/permohonan-tertunda`,
    },
    {
      label: "Semua Permohonan",
      link: `/semua-permohonan`,
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 text-blue-900 px-5 py-5 h-screen bg-white">
      <div className="mb-5 bg-blue-900 text-white p-2 text-center rounded-md">
        <h2 className="text-lg font-bold mb-5">{npwp_akun}</h2>
        <h3 className="text-md font-semibold mb-5">{nama_akun}</h3>
      </div>

      <nav className="border border-gray-200 rounded-md text-left text-blue-900 overflow-hidden">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const currentPath = location.pathname;
            const linkPath = item.link.split('?')[0];
            const isActive = currentPath === linkPath;
            
            return (
              <li
                key={index}
                className={`border-t border-gray-200 p-1 rounded-sm cursor-pointer ${
                  isActive
                    ? "bg-blue-900 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`}
              >
                <div onClick={() => navigate(item.link)} className="block w-full p-2">
                  {item.label}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarProfilSayaBadan;
