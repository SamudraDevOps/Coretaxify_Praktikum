import React from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const BUPOTSidebar = ({ type, title, sidebar }) => {
  const location = useLocation();
  const { id, akun } = useParams(); // Get current assignment parameters
  const navigate = useNavigateWithParams();

  // Map of BUPOT type to its route path
  const typeToPath = {
    bppu: "bppu",
    bpnr: "bpnr",
    ps: "ps",
    psd: "psd",
    bp21: "bp21",
    bp26: "bp26",
    bpa1: "bpa1",
    bpa2: "bpa2",
    bpbpt: "bpbpt",
  };

  // Get the base path for this BUPOT type
  const basePath = `/praktikum/${id}/sistem/${akun}/bupot/${typeToPath[type]}`;

  // Common menu items for all BUPOT types
  const menuItems = [
    { label: "Belum Terbit", path: basePath },
    { label: "Telah Terbit", path: `${basePath}/telah-terbit` },
    { label: "Tidak Valid", path: `${basePath}/tidak-valid` },
  ];

  return (
    <aside className="w-64 flex-shrink-0 text-blue-900 px-5 py-5 h-screen bg-white">
      <div className="mb-5 bg-blue-900 text-white p-2 text-center rounded-md">
        <h2 className="text-lg font-bold mb-5">{sidebar.nama_akun}</h2>
        <h3 className="text-md font-semibold mb-5">{sidebar.npwp_akun}</h3>
      </div>
      <nav className="border border-gray-200 rounded-md text-left text-blue-900 overflow-hidden">
        <ul className="divide-gray-200">
          <li className="font-bold text-md mt-4 mb-2 text-start pl-2">
            {title || type.toUpperCase()}
          </li>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
         return (
              <li
                key={index}
                className={`border-t border-gray-200 p-2 rounded-sm cursor-pointer hover:bg-blue-700 hover:text-white ${
                  isActive
                    ? "bg-blue-900 text-white"
                    : "hover:bg-blue-700 hover:text-white"
                }`}
                onClick={() => navigate(item.path)}
              >
                <Link to={item.path} className="block w-full p-2">
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

export default BUPOTSidebar;
