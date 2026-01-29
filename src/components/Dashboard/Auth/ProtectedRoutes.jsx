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
        // First, check verification status
        const verificationResponse = await axios.get(RoutesApi.apiUrl + "verification-status", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          }
        });
        
        setIsVerified(verificationResponse.data.verified);
        
        // If not verified, store email for OTP verification
        if (!verificationResponse.data.verified) {
          localStorage.setItem("pendingVerificationEmail", verificationResponse.data.email);
        }

        // Next, fetch user profile to get current roles
        const profileResponse = await axios.get(RoutesApi.profile, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          }
        });

        // Extract user roles from profile - same way as in Login.jsx
        if (profileResponse.data.data.roles && profileResponse.data.data.roles.length > 0) {
          const role = profileResponse.data.data.roles[0].name;
          // Only update if different to avoid unnecessary cookie writes
          if (cookies.role !== role) {
            console.log("Updating role cookie to match backend:", role);
            setCookie("role", role, { path: "/" });
          }
        }
        
      } catch (error) {
        console.error("Error checking user status:", error);
        
        // If we get a 401 Unauthorized error, the token is invalid or expired
        if (error.response && error.response.status === 401) {
          console.log("Token is invalid or expired. Removing cookies...");
          // Remove the cookies
          removeCookie("token", { path: "/" });
          removeCookie("role", { path: "/" });
        }
        
        // Assume not verified
        setIsVerified(false);
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

  // User is authenticated and verified
  return children;
}