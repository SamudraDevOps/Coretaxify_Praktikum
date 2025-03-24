import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import CTaxifyLogo from "../../../../assets/images/4.png";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [cookies, setCookie] = useCookies(["token"]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    console.log(username);
    if (!username) {
      newErrors.username = "Email dibutuhkan.";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = "Email tidak valid.";
    }

    if (!password) {
      newErrors.password = "Password dibutuhkan.";
    } else if (password.length < 4) {
      newErrors.password = "Panjang password minimal 4 karakter.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  useEffect(() => {
    validate();
  }, [username, password]);
  const [cookies, setCookie] = useCookies(["token", "role"]);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    if (cookies.token && cookies.role) {
      navigate(`/${cookies.role}`);
    }
  }, [cookies.token, cookies.role, navigate]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      // Get CSRF token
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      
      try {
        // Login
        const data = await axios.post(
          RoutesApi.login,
          {
            email: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
            },
          }
        );
        return data;
      } catch (error) {
        // Check if this is a 403 with verification_required flag
        if (error.response && 
            error.response.status === 403 && 
            error.response.data.verification_required) {
          // This is not a real error, but a signal that verification is needed
          return {
            status: 403,
            data: error.response.data,
            needsVerification: true
          };
        }
        // For other errors, rethrow
        throw error;
      }
    },
    onSuccess: (response) => {
      console.log("Login response:", response);
      
      // Check if verification is required
      if (response.status === 403 && response.needsVerification) {
        // Store token for verification
        setCookie("token", response.data.token, { path: "/" });
        
        // Store user email for verification
        localStorage.setItem("pendingVerificationEmail", username);
        
        // Extract and store role information if available
        if (response.data.user && response.data.user.roles && response.data.user.roles.length > 0) {
          const role = response.data.user.roles[0].name;
          setCookie("role", role, { path: "/" });
        }
        
        // Redirect to OTP verification
        Swal.fire({
          title: "Verifikasi Email Diperlukan",
          text: "Silakan verifikasi email Anda terlebih dahulu.",
          icon: "info",
          confirmButtonText: "Verifikasi Sekarang",
        }).then(() => {
          navigate("/confirm-otp");
        });
        return;
      }
      
      // Normal login flow for verified users
      const role = response.data.user.roles[0].name;
      setCookie("token", response.data.token, { path: "/" });
      setCookie("role", role, { path: "/" });
      
      // Redirect to dashboard
      navigate(`/${role}`);
    },
    onError: (error) => {
      console.error("Login error:", error);
      Swal.fire(
        "Login Gagal!",
        error.response?.data?.message || "Email atau password salah.",
        "error"
      );
    },
  });  

  const handleLogin = (e) => {
    e.preventDefault();
    // if (validate()) {
    mutation.mutate();
    // }

    // console.log("Username:", username);
    // console.log("Password:", password);
    // alert("Login berhasil!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <img
          src={CTaxifyLogo}
          alt="CTaxify Logo"
          className="w-50 mx-auto mb-4"
        />
        <p className="text-center text-gray-600 mb-6">
          Mari gabung dengan kami menjadi masa depan sadar pajak
        </p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="username"
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Masukkan email Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
          </div>

          <div className="text-right">
            <Link
              to="/reset-password"
              className="font-medium text-purple-900 text-sm"
            >
              Lupa Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950 h-10"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Memproses..." : "Login"}
          </button>
          
          {mutation.isError && (
            <div className="text-xs mt-2 text-red-700">
              {mutation.error.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi."}
            </div>
          )}
        </form>

        <p className="text-center text-sm text-black-600 mt-4">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-semibold text-purple-900 hover:underline"
          >
            Daftar Disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;