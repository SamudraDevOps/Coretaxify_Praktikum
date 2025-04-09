import React, { useState, useRef, useEffect } from "react";
import CTaxifyLogo from "../../../../assets/images/4.png";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { RoutesApi } from "@/Routes";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

const ConfirmOTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const [cookies, setCookie] = useCookies(["token", "role"]);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Get user email from token or localStorage
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        if (cookies.token) {
          // If user is logged in, get email from verification status endpoint
          const response = await axios.get(RoutesApi.verification_status, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
              Accept: "application/json",
            }
          });
          setUserEmail(response.data.email);
        } else {
          // If not logged in, get email from localStorage (from registration)
          const storedEmail = localStorage.getItem("pendingVerificationEmail");
          if (!storedEmail) {
            // No email found, redirect to login
            Swal.fire({
              title: "Error",
              text: "No email found for verification. Please log in again.",
              icon: "error",
              confirmButtonText: "Go to Login",
            }).then(() => {
              navigate("/login");
            });
            return;
          }
          setUserEmail(storedEmail);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
        // Try to get from localStorage as fallback
        const storedEmail = localStorage.getItem("pendingVerificationEmail");
        if (storedEmail) {
          setUserEmail(storedEmail);
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to get user information. Please log in again.",
            icon: "error",
            confirmButtonText: "Go to Login",
          }).then(() => {
            navigate("/login");
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEmail();
  }, [cookies.token, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  useEffect(() => {
    setOtp(["", "", "", ""]);
  }, [userEmail]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const verifyMutation = useMutation({
    mutationFn: async () => {
      // Get CSRF token
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      
      // Prepare headers
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": response.data.token,
      };
      
      // Add Authorization header only if token exists
      if (cookies.token) {
        headers.Authorization = `Bearer ${cookies.token}`;
      }
      
      // Verify OTP
      const data = await axios.post(
        RoutesApi.verify_otp,
        {
          email: userEmail,
          otp: otp.join(""),
        },
        { headers }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("OTP verification successful:", data);
      
      // If token is provided in the response, store it
      if (data.data && data.data.token) {
        setCookie("token", data.data.token, { path: "/" });
        
        // If user object contains role, store it
        if (data.data.user && data.data.user.roles && data.data.user.roles.length > 0) {
          const role = data.data.user.roles[0].name;
          setCookie("role", role, { path: "/" });
        }
      }
      
      // Clear pending verification email
      localStorage.removeItem("pendingVerificationEmail");
      
      Swal.fire({
        title: "Verifikasi Berhasil!",
        text: "Email Anda telah berhasil diverifikasi.",
        icon: "success",
        confirmButtonText: "Lanjutkan",
      }).then(() => {
        // Check if we have both token and role
        if (cookies.token && cookies.role) {
          // Redirect to the appropriate dashboard based on role
          navigate(`/${cookies.role}`);
        } else {
          // If we don't have both token and role, try to get them from the response
          if (data.data && data.data.token && data.data.user && data.data.user.roles && data.data.user.roles.length > 0) {
            const role = data.data.user.roles[0].name;
            // Redirect to the appropriate dashboard based on role from response
            navigate(`/${role}`);
          } else {
            // If we still don't have role information, redirect to login
            navigate("/login");
          }
        }
      });
    },
    onError: (error) => {
      console.error("OTP verification error:", error);
      
      let errorMessage = "Kode OTP tidak valid.";
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
          // Clear any existing token
          setCookie("token", "", { path: "/", expires: new Date(0) });
          // Redirect to login after showing error
          setTimeout(() => navigate("/login"), 2000);
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      Swal.fire("Verifikasi Gagal!", errorMessage, "error");
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      // Get CSRF token
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      
      // Resend OTP
      const data = await axios.post(
        RoutesApi.resend_otp,
        {
          email: userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: cookies.token ? `Bearer ${cookies.token}` : undefined,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      setOtp(["", "", "", ""]);
      setTimer(30);
      setResendDisabled(true);
      Swal.fire(
        "OTP Terkirim!",
        "Kode OTP baru telah dikirim ke email Anda.",
        "success"
      );
    },
    onError: (error) => {
      console.error("Resend OTP error:", error);
      Swal.fire(
        "Gagal Mengirim OTP!",
        error.response?.data?.message || "Gagal mengirim kode OTP baru.",
        "error"
      );
    },
  });

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (!userEmail) {
      Swal.fire("Error", "Email tidak ditemukan", "error");
      return;
    }
    resendMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <ClipLoader color="#7502B5" size={50} />
        <p className="mt-4 text-gray-600">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <img
          src={CTaxifyLogo}
          alt="CTaxify Logo"
          className="w-50 mx-auto mb-4"
        />
        <p className="text-center text-gray-600 mb-2">
          Silahkan masukkan kode OTP yang telah dikirim melalui email anda.
        </p>
        <p className="text-center font-medium text-purple-900 mb-6">
          {userEmail}
        </p>
        <div>
          <div className="flex justify-center space-x-4 m-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <button
            className="bg-purple-900 hover:bg-purple-950 text-white py-2 px-4 rounded w-full mb-4"
            onClick={() => verifyMutation.mutate()}
            disabled={verifyMutation.isPending || otp.join("").length !== 4}
          >
            {verifyMutation.isPending ? "Memverifikasi..." : "Konfirmasi OTP"}
          </button>
          <p className="text-center text-gray-600">
            Tidak Menerima Kode OTP?{" "}
            <button
              onClick={handleResend}
              disabled={resendDisabled || resendMutation.isPending}
              className={`text-blue-500 ${
                resendDisabled || resendMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:underline"
              }`}
            >
              {resendMutation.isPending 
                ? "Mengirim..." 
                : `Kirim ulang kode ${resendDisabled ? `(${timer}s)` : ""}`}
            </button>
          </p>
          
          {(verifyMutation.isError || resendMutation.isError) && (
            <p className="text-red-500 text-sm text-center mt-2">
              {verifyMutation.error?.response?.data?.message || 
               resendMutation.error?.response?.data?.message || 
               "Terjadi kesalahan. Silakan coba lagi."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmOTP;