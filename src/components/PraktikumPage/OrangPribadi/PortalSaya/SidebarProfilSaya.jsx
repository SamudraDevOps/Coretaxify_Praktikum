import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useUserType } from "../../../context/UserTypeContext";

const SidebarProfilSaya = ({ nama_akun, npwp_akun, akun }) => {
  const { userType } = useUserType();
  const userTypeId = userType === "Orang Pribadi" ? 1 : 2;
  const [searchParams, setSearchParams] = useSearchParams();
  const viewAsCompanyId = searchParams.get("viewAs");

  const menuItems = [
    {
      label: "Ikhtisar Profil Wajib Pajak",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/profil-saya${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Informasi Umum",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/informasi-umum${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Alamat",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/alamat${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Detail Kontak",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/detail-kontak${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Pihak Terkait",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/pihak-terkait${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Objek Pajak Bumi dan Bangunan (PBB)",
      link: `/objek-pajak-bumi-dan-bangunan-pbb${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Klasifikasi Lapangan Usaha (KLU)",
      link: `/klasifikasi-lapangan-usaha-klu${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Detail Bank",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/detail-bank${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Data Unit Keluarga",
      link: `/praktikum/${akun.id}/sistem/${akun.akun}/data-unit-keluarga${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Tempat Kegiatan Usaha/Sub Unit",
      link: `/tempat-kegiatan-usaha-sub-unit${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Nomor Identifikasi Eksternal",
      link: `/nomor-identifikasi-eksternal${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Jenis Pajak",
      link: `/jenis-pajak${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Wakil Kuasa Saya",
      link: `/wakil-kuasa-saya${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Wajib Pajak yang Diwakili",
      link: `/wajib-pajak-yang-diwakili${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Verifikasi Dua Langkah",
      link: `/verifikasi-dua-langkah${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Permohonan Tertunda",
      link: `/permohonan-tertunda${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
    {
      label: "Semua Permohonan",
      link: `/semua-permohonan${
        viewAsCompanyId ? `?viewAs=${viewAsCompanyId}` : ""
      }`,
    },
  ];

  return (
     <aside className="w-1/6 text-blue-900 px-2 py-5 bg-white">
      <div className="mb-5 bg-blue-900 text-white p-2 text-center rounded-md">
        <h2 className="text-lg font-bold mb-5">{npwp_akun}</h2>
        <h3 className="text-md font-semibold mb-5">{nama_akun}</h3>
      </div>

      <nav>
              <ul className="space-y-1">
                {menuItems.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="p-2 hover:bg-blue-700 hover:text-white rounded-md cursor-pointer"
                    >
                      <Link to={item.link} className="block w-full p-2">
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
    </aside>
  );
};

export default SidebarProfilSaya;
