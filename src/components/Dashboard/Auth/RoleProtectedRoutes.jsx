import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import ProtectedRoutes from "./ProtectedRoutes";
import SidebarAdmin from "../Admin/SidebarAdmin/SidebarAdmin";

export default function RoleProtectedRoutes({ allowedRoles, layout = "admin" }) {
  const [cookies] = useCookies(["role"]);
  const location = useLocation();
  const userRole = cookies.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={`/${userRole || ""}`} state={{ from: location }} replace />;
  }

  // Layouts configuration
  const layouts = {
    admin: (children) => (
      <div className="admin-layout">
        <SidebarAdmin />
        <div className="admin-content">
          {children}
        </div>
      </div>
    ),
    // Add other layouts as needed
    default: (children) => children
  };

  // Apply the selected layout or default
  const applyLayout = layouts[layout] || layouts.default;

  return (
    <ProtectedRoutes allowedRoles={allowedRoles}>
      {applyLayout(<Outlet />)}
    </ProtectedRoutes>
  );
}
