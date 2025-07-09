import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserType } from "../../../context/UserTypeContext";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const SideBarEFakturOP = ({ nama_akun, npwp_akun, akun }) => {
  const { userType } = useUserType();
  const location = useLocation(); // ambil path sekarang
  const userTypeId = userType === "Orang Pribadi" ? 1 : 2;
  // praktikum/1/sistem/2/e-faktur
  const efakturItems = [
    {
      label: "Pajak Keluaran",
      link: `/praktikum/${akun?.id}/sistem/${akun?.akun}/e-faktur/pajak-keluaran`,
    },
    {
      label: "Pajak Masukan",
      link: `/praktikum/${akun?.id}/sistem/${akun?.akun}/e-faktur/pajak-masukan`,
    },
    {
      label: "Retur Pajak Keluaran",
      link: `/praktikum/${akun?.id}/sistem/${akun?.akun}/e-faktur/retur-pajak-keluaran`,
    },
    {
      label: "Retur Pajak Masukan",
      link: `/praktikum/${akun?.id}/sistem/${akun?.akun}/e-faktur/retur-pajak-masukan`,
    },
  ];

  const dokumenLainItems = [
    { label: "Pajak Keluaran", link: "pajak-keluaran" },
    { label: "Pajak Masukan", link: "pajak-masukan" },
    {
      label: "Retur Dokumen Lain Keluaran",
      link: "retur-dokumen-lain-keluaran",
    },
    { label: "Retur Dokumen Lain Masukan", link: "retur-dokumen-lain-masukan" },
  ];

  const dashboardPath = `/admin/praktikum/${userTypeId}/e-faktur`;
  const isDashboard = location.pathname === dashboardPath;
  const navigate = useNavigateWithParams();

  return (
    <aside className="w-64 flex-shrink-0 text-blue-900 px-5 py-5 h-screen bg-white">
      <div className="mb-5 bg-blue-900 text-white p-2 text-center rounded-md">
        <h2 className="text-lg font-bold mb-5">{npwp_akun}</h2>
        <h3 className="text-md font-semibold mb-5">{nama_akun}</h3>
      </div>
      <nav className="border border-gray-200 rounded-md text-left text-blue-900 overflow-hidden">
        <ul className="divide-gray-200">
          <li
            className={`p-2 rounded-md cursor-pointer border-b border-gray-200 ${isDashboard
              ? "bg-blue-900 text-white"
              : "hover:bg-blue-700 hover:text-white"
              }`}
          >
            <Link to={dashboardPath} className="block w-full p-2">
              <strong>Dashboard</strong>
            </Link>
          </li>

          <li className="font-bold text-lg mt-4 mb-2 text-start pl-2">e-Faktur</li>
          {efakturItems.map((item, index) => {
            const currentPath = location.pathname;
            const linkPath = item.link.split('?')[0];
            const isActive = currentPath === linkPath || location.pathname.includes(`/${item.link}`);
            // const formattedItem = item.replace(/ /g, "-").toLowerCase();
            // const path = `/admin/praktikum/${userTypeId}/e-faktur/${formattedItem}`;
            console.log(location.pathname, item.link);
            return (
              <li
                key={index}
                className={`border-t border-gray-200 p-3 rounded-sm cursor-pointer hover:bg-blue-700 hover:text-white ${isActive
                  ? "bg-blue-900 text-white"
                  : "hover:bg-blue-700 hover:text-white"
                  }`}
                onClick={() => navigate(item.link)}
              >
                {item.label}
                {/* <Link to={item.link} className="block w-full p-2">
                  {item.label}
                </Link> */}
              </li>
            );
          })}

          <li className="font-bold text-lg border-t border-gray-200 text-start flex items-center py-4 px-2">Dokumen Lain</li>
          {dokumenLainItems.map((item, index) => {
            const currentPath = location.pathname;
            const linkPath = item.link.split('?')[0];
            // const formattedItem = item.replace(/ /g, "-").toLowerCase();
            // const path = `/admin/praktikum/${userTypeId}/e-faktur/dokumen-lain/${formattedItem}`;
            const isActive = location.pathname.includes(`/${item.link}tify`);

            return (
              <li
                key={index}
                className={`p-2 rounded-sm cursor-pointer hover:bg-blue-700 hover:text-white border-t border-gray-200 ${isActive
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-700 hover:text-white"
                  }`}
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

export default SideBarEFakturOP;
