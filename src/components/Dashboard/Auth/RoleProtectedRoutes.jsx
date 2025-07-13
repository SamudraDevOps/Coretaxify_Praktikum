import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import ProtectedRoutes from "./ProtectedRoutes";
import SidebarAdmin from "../Admin/SidebarAdmin/SidebarAdmin";
import { ClipLoader } from "react-spinners";

export default function RoleProtectedRoutes({ allowedRoles, layout = "admin" }) {
  const [cookies] = useCookies(["role", "token"]);
  const location = useLocation();
  const userRole = cookies.role;

  // Fetch user data
  const { data: userRouteData, isLoading: userRouteLoading, error: userRouteError } = useQuery({
    queryKey: ['current_user'],
    queryFn: async () => {
      const { data } = await axios.get(RoutesApi.profile, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      return data;
    },
    enabled: !!cookies.token,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={`/${userRole || ""}`} state={{ from: location }} replace />;
  }

  if (userRouteLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  if (userRouteError) {
    console.error('Error fetching user:', userError);
    // Optionally handle user fetch error
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
      {applyLayout(<Outlet context={{ user: userRouteData }}/>)}
    </ProtectedRoutes>
  );
}
