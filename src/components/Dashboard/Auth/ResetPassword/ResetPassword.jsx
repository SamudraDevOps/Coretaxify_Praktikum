import React, { useState } from "react";
import CTaxifyLogo from "../../../../assets/images/4.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!email.includes("@")) {
        throw new Error("Email harus mengandung @");
      }
      
      // Get CSRF token
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      
      // Request password reset
      const data = await axios.post(
        RoutesApi.reset_password,
        {
          email: email,
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
    },
    // In the onSuccess handler of the mutation
    onSuccess: (data) => {
      console.log("Password reset email sent:", data);
      
      Swal.fire({
        title: "Email Terkirim!",
        text: "Instruksi reset password telah dikirim ke email Anda.",
        icon: "success",
        confirmButtonText: "Kembali ke Login",
      }).then(() => {
        navigate("/login");
      });
    },
    onError: (error) => {
      console.error("Password reset error:", error);
      
      if (error.message === "Email harus mengandung @") {
        setEmailError(error.message);
      } else {
        Swal.fire(
          "Reset Password Gagal!",
          error.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi.",
          "error"
        );
      }
    },
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <img src={CTaxifyLogo} alt="CTaxify Logo" className="w-50 mx-auto mb-4" />
        <p className="text-center text-gray-600 mb-6">
          Bergabunglah bersama kami untuk menjadi insan yang taat pajak
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Lupa Password
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Masukkan email Anda"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Memproses..." : "Konfirmasi"}
          </button>
          
          {mutation.isError && !emailError && (
            <p className="text-red-500 text-sm">
              {mutation.error.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi."}
            </p>
          )}
        </form>

        <p className="text-center text-sm text-black-600 mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="font-semibold text-purple-900 hover:underline">
            Daftar Disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
