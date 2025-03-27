import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import CTaxifyLogo from "../../../../assets/images/4.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showRegistrationCode, setShowRegistrationCode] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");
  const [registrationCodeError, setRegistrationCodeError] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    contract_code: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email dibutuhkan.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email tidak valid.";
    }

    if (!formData.name) {
      newErrors.username = "Username dibutuhkan.";
    }

    if (!formData.password) {
      newErrors.password = "Password dibutuhkan.";
    } else if (formData.password.length < 4) {
      newErrors.password = "Panjang password minimal 4 karakter.";
    }

    if (formData.password !== repeatPassword) {
      newErrors.password = "Password tidak cocok.";
    }

    if (showRegistrationCode && !formData.contract_code.trim()) {
      newErrors.registrationCode = "Kode registrasi wajib diisi.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("button clicked");

      formData.password_confirmation = repeatPassword;

      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      const data = await axios.post(
        RoutesApi.register,
        formData,
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
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      
      // Store email for OTP verification
      localStorage.setItem("pendingVerificationEmail", formData.email);
      
      // Store token from registration response
      if (data.data && data.data.token) {
        setCookie("token", data.data.token, { path: "/" });
        
        // Store role if available
        if (data.data.user && data.data.user.roles && data.data.user.roles.length > 0) {
          const role = data.data.user.roles[0].name;
          setCookie("role", role, { path: "/" });
        }
      }
      
      Swal.fire({
        title: "Registrasi Berhasil!",
        text: "Silakan verifikasi email Anda dengan kode OTP yang telah dikirim.",
        icon: "success",
        confirmButtonText: "Verifikasi Sekarang",
      }).then(() => {
        navigate("/confirm-otp");
      });
    },
    onError: (error) => {
      console.log("Registration error: ", error);

      const errorMessage = error.response?.data?.message || error.message;
      Swal.fire("Registrasi Gagal!", errorMessage, "error");
    },
  });

  const handleEmailChange = (event) => {
    const { name, value } = event.target;
    setEmail(value);
    setFormData({ ...formData, [name]: value });
    
    // Clear email errors when user types
    setEmailError("");
    if (errors.email) {
      setErrors({...errors, email: ""});
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPassword(value);
    setFormData({ ...formData, [name]: value });
    
    // Clear password errors when user types
    setPasswordError("");
    if (errors.password) {
      setErrors({...errors, password: ""});
    }
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    
    // Clear password errors when user types
    setPasswordError("");
    if (errors.password) {
      setErrors({...errors, password: ""});
    }
  };

  const handleRegistrationCodeChange = (event) => {
    const { name, value } = event.target;
    setRegistrationCode(value);
    setFormData({ ...formData, [name]: value });
    
    // Clear registration code errors when user types
    setRegistrationCodeError("");
    if (errors.registrationCode) {
      setErrors({...errors, registrationCode: ""});
    }
  };

  const handleUsernameChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear username errors when user types
    // Clear username errors when user types
    if (errors.username) {
      setErrors({...errors, username: ""});
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Only validate when form is submitted
    if (validate()) {
      mutation.mutate();
    }
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="name"
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Masukkan username"
              // required
              onChange={handleUsernameChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Masukkan email"
              // required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Masukkan password"
                // required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="repeat-password"
              className="block text-sm font-medium text-gray-700"
            >
              Ulangi Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="repeat-password"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Ulangi password"
                // required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {!showRegistrationCode ? (
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Mendaftar..." : "Coba Gratis 14 Hari"}
              </button>
              <button
                type="button"
                className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950"
                onClick={() => setShowRegistrationCode(true)}
              >
                Premium
              </button>
            </div>
          ) : (
            <div>
              <label
                htmlFor="registration-code"
                className="block text-sm font-medium text-gray-700"
              >
                Kode Registrasi
              </label>
              <input
                type="text"
                id="registration-code"
                value={registrationCode}
                onChange={handleRegistrationCodeChange}
                name="contract_code"
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Masukkan Kode Registrasi"
                // required
              />
              {errors.registrationCode && (
                <p className="text-red-500 text-sm">{errors.registrationCode}</p>
              )}
              {registrationCodeError && (
                <p className="text-red-500 text-sm">{registrationCodeError}</p>
              )}
              <button
                type="submit"
                className="mt-4 w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Mendaftar..." : "Daftar Sekarang"}
              </button>
            </div>
          )}

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          {mutation.isError && !passwordError && !emailError && !registrationCodeError && (
            <p className="text-red-500 text-sm">
              {mutation.error.response?.data?.message || mutation.error.message}
            </p>
          )}
        </form>
        <p className="text-center text-sm text-black-600 mt-4">
          Memiliki akun?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-900 hover:underline"
          >
            Silahkan Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;    
