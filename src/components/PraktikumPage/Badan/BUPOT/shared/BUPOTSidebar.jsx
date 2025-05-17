import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const BUPOTSidebar = ({ type, title }) => {
  const location = useLocation();
  const { id, akun } = useParams(); // Get current assignment parameters

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
    <div className="w-64 bg-white shadow-md p-4 min-h-screen">
      <div className="bg-blue-900 h-10 w-full mb-4 rounded-md"></div>
      <h2 className="text-lg font-semibold mb-4">
        {title || type.toUpperCase()}
      </h2>
      <ul className="space-y-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={index}
              className={`p-2 rounded-md cursor-pointer ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
            >
              <Link to={item.path} className="block w-full p-2">
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BUPOTSidebar;
