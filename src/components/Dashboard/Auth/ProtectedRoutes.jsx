import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";

export default function ProtectedRoutes({ children }) {
  const [cookies] = useCookies(["token", "role"]);
  const [isVerified, setIsVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // If no token, we don't need to check verification status
    if (!cookies.token) {
      setIsLoading(false);
      return;
    }

    // Check verification status
    const checkVerification = async () => {
      try {
        const response = await axios.get(RoutesApi.apiUrl + "verification-status", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          }
        });
        
        setIsVerified(response.data.verified);
        
        // If not verified, store email for OTP verification
        if (!response.data.verified) {
          localStorage.setItem("pendingVerificationEmail", response.data.email);
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
        // If we can't check verification, assume not verified
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkVerification();
  }, [cookies.token]);

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