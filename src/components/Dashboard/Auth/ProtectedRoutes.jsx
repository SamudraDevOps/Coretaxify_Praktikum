import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";

export default function ProtectedRoutes({ children, allowedRoles = [] }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);
  const [isVerified, setIsVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // If no token, we don't need to check verification status
    if (!cookies.token) {
      setIsLoading(false);
      return;
    }

    // Check verification status and sync role with backend
    const checkUserStatus = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        };

        const [verificationResponse, profileResponse] = await Promise.all([
          axios.get(RoutesApi.apiUrl + "verification-status", { headers }),
          axios.get(RoutesApi.profile, { headers }),
        ]);

        const verified = verificationResponse.data?.verified ?? false;
        const email = verificationResponse.data?.email ?? null;
        setIsVerified(verified);

        if (!verified && email) {
          localStorage.setItem("pendingVerificationEmail", email);
        }

        const roles = profileResponse.data?.data?.roles || [];
        if (roles && roles.length > 0) {
          const role = roles[0].name;
          if (cookies.role !== role) {
            setCookie("role", role, { path: "/", maxAge: 7 * 24 * 60 * 60 });
          }
        }
      } catch (error) {
        if (axios.isCancel(error)) return;

        console.error(
          "Error checking user status:",
          error.response?.data || error.message
        );

        // If we get a 401 Unauthorized error, the token is invalid or expired
        if (error.response && error.response.status === 401) {
          console.log("Token is invalid or expired. Removing cookies...");
          // Remove the cookies
          removeCookie("token", { path: "/" });
          removeCookie("role", { path: "/" });
        }

        setIsVerified(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [cookies.token, setCookie, removeCookie]);

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  // If no token, redirect to login
  if (!cookies.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If not verified, redirect to OTP verification
  if (isVerified === false) {
    return <Navigate to="/confirm-otp" state={{ from: location }} replace />;
  }

  if (isVerified === null) { if (isVerified === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-600 mb-4">Gagal memverifikasi akun. Silakan coba lagi nanti.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
        >
          Coba Lagi
        </button>
      </div>
    );
  }
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-600 mb-4">
          Gagal memverifikasi akun. Silakan coba lagi nanti.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // User is authenticated and verified
  return children;
}