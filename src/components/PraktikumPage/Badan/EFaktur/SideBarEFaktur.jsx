import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserType } from "../../../context/UserTypeContext";

const SideBarEFaktur = ({ nama_akun, npwp_akun }) => {
  const { userType } = useUserType();
  const location = useLocation();
  const userTypeId = userType === "Orang Pribadi" ? 1 : 2;

  // Hard-coded pattern for routes
  // Assuming the pattern is /praktikum/{userTypeId}/sistem/{systemId}/e-faktur/...
  // Let's extract the system ID from the URL if possible
  let systemId = "3"; // Default system ID
  const match = location.pathname.match(/\/praktikum\/\d+\/sistem\/(\d+)/);
  if (match && match[1]) {
    systemId = match[1];
  }

  // Create fixed base routes
  const rootPath = `/praktikum/${userTypeId}/sistem/${systemId}`;
  const dashboardPath = `${rootPath}/e-faktur`;

  const efakturItems = [
    { label: "Pajak Keluaran", link: "pajak-keluaran" },
    { label: "Pajak Masukan", link: "pajak-masukan" },
    { label: "Retur Pajak Keluaran", link: "retur-pajak-keluaran" },
    { label: "Retur Pajak Masukan", link: "retur-pajak-masukan" },
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

  // Function to check if a path is active
  const isPathActive = (path) => location.pathname === path;

  return (
    <aside className="w-1/6 text-blue-900 px-5 py-5 h-screen bg-white">
      <div className="mb-5 bg-blue-900 text-white p-2 text-center">
        <h2 className="text-lg font-bold mb-5">{npwp_akun}</h2>
        <h3 className="text-md font-semibold mb-5">{nama_akun}</h3>
      </div>
      <nav>
        <ul className="space-y-1">
          <li
            className={`p-2 rounded-md cursor-pointer ${
              isPathActive(dashboardPath)
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-700 hover:text-white"
            }`}
          >
            <Link to={dashboardPath} className="block w-full p-2">
              <strong>Dashboard</strong>
            </Link>
          </li>

          <li className="font-bold text-lg mt-4 mb-2 text-start">e-Faktur</li>
          {efakturItems.map((item, index) => {
            // Completely fixed path
            const itemPath = `${rootPath}/e-faktur/${item.link}`;

            return (
              <li
                key={index}
                className={`p-2 rounded-md cursor-pointer ${
                  isPathActive(itemPath)
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`}
              >
                {/* Use replace to ensure clean navigation */}
                <Link to={itemPath} replace className="block w-full p-2">
                  {item.label}
                </Link>
              </li>
            );
          })}

          <li className="font-bold text-lg mt-4 mb-2">Dokumen Lain</li>
          {dokumenLainItems.map((item, index) => {
            // Completely fixed path for dokumen lain
            const itemPath = `${rootPath}/e-faktur/dokumen-lain/${item.link}`;

            return (
              <li
                key={index}
                className={`p-2 rounded-md cursor-pointer ${
                  isPathActive(itemPath)
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`}
              >
                {/* Use replace to ensure clean navigation */}
                <Link to={itemPath} replace className="block w-full p-2">
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

export default SideBarEFaktur;
