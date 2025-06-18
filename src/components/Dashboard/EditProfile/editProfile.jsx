import React, { useState, useRef } from "react";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "../../../Routes";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const EditProfile = () => {
  const defaultProfile = "https://ui-avatars.com/api/?name=User&background=random&size=128";
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
    photoUrl: defaultProfile,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const [cookies, , removeCookie] = useCookies(["token", "role"]);
  const navigate = useNavigate();

  // Prepare headers if token exists
  const headers = cookies.token
    ? {
        Authorization: `Bearer ${cookies.token}`,
        Accept: "application/json",
      }
    : {};

  // GET PROFILE DATA
  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get(RoutesApi.profile, {
        withCredentials: true,
        headers,
      });
      return res.data;
    },
    onSuccess: (data) => {
      const user = data.user;
      // Cek apakah image_path ada
      const photoUrl = user.image_path
        ? `${process.env.REACT_APP_API_URL || "http://localhost:8000"}/storage/${user.image_path}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=random&size=128`;

      setProfile((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        photo: null,
        photoUrl, // <-- ini yang dipakai di <img src=... />
      }));
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
  });

  // UPDATE PROFILE
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(RoutesApi.profile_update, formData, {
        withCredentials: true,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: async (res) => {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Profile berhasil diperbarui! Anda akan logout otomatis.",
        timer: 1500,
        showConfirmButton: false,
      });
      // invalidate all profile queries (for sidebar, etc)
      queryClient.invalidateQueries(["profile"]);
      queryClient.invalidateQueries(["sidebar-profile"]);
      setProfile((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        photo: null,
        photoUrl: res.data.data?.image_path
          ? res.data.data.image_path + "?t=" + Date.now()
          : prev.photoUrl,
      }));
      // Logout otomatis
      removeCookie("token", { path: "/" });
      removeCookie("role", { path: "/" });
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          error?.response?.data?.message ||
          "Gagal memperbarui profile. Silakan cek data Anda.",
      });
    },
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        photo: file,
        photoUrl: URL.createObjectURL(file),
      });
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
    if (data) {
      setProfile({
        name: data.name || "",
        email: data.email || "",
        password: "",
        confirmPassword: "",
        photo: null,
        photoUrl: data.image_path
          ? data.image_path + "?t=" + Date.now()
          : defaultProfile,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profile.password && profile.password !== profile.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password dan konfirmasi password tidak sama.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    if (profile.password) {
      formData.append("password", profile.password);
      formData.append("password_confirmation", profile.confirmPassword);
    }
    if (profile.photo) {
      formData.append("image", profile.photo);
    }
    mutation.mutate(formData);
  };

  // Show loading or error
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7fb]">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }
  if (isError && error?.response?.status === 401) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7fb]">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">401 Unauthorized</h2>
          <p className="mb-4">Anda belum login atau sesi Anda sudah habis. Silakan login ulang.</p>
          <a
            href="/login"
            className="inline-block bg-[#7502B5] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5e0291] transition"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f7fb]">
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-12 flex flex-col lg:flex-row gap-12">
          {/* Left: Foto Profil */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0 lg:pr-8">
            <div className="relative group">
              <img
                src={profile.photoUrl}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-[#7502B5] shadow"
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 bg-[#7502B5] text-white rounded-full p-3 shadow-lg hover:bg-[#5e0291] transition"
                onClick={handlePhotoClick}
                title="Ganti Foto"
                disabled={isLoading || mutation.isLoading}
              >
                <FaCamera />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handlePhotoChange}
                disabled={isLoading || mutation.isLoading}
              />
            </div>
            {/* Info nama & email */}
            <div className="mt-4 text-center">
              <div className="font-semibold text-lg text-[#7502B5]">{profile.name}</div>
              <div className="text-gray-600 text-sm">{profile.email}</div>
            </div>
            <span className="text-xs text-gray-500 mt-3">
              JPG, PNG, maksimal 2MB
            </span>
          </div>
          {/* Right: Form */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8 text-[#7502B5]">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7502B5] bg-gray-50"
                    required
                    autoComplete="name"
                    disabled={isLoading || mutation.isLoading}
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7502B5] bg-gray-50"
                    required
                    autoComplete="email"
                    disabled={isLoading || mutation.isLoading}
                  />
                </div>
              </div>
              {/* Password Baru */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                  Password Baru
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={profile.password}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#7502B5] bg-gray-50"
                    placeholder="Kosongkan jika tidak ingin mengubah"
                    autoComplete="new-password"
                    disabled={isLoading || mutation.isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 focus:outline-none"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isLoading || mutation.isLoading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {/* Konfirmasi Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="confirmPassword">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={profile.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#7502B5] bg-gray-50"
                    placeholder="Ulangi password baru"
                    autoComplete="new-password"
                    disabled={isLoading || mutation.isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 focus:outline-none"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    disabled={isLoading || mutation.isLoading}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {/* Tombol */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={handleCancel}
                  disabled={isLoading || mutation.isLoading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#7502B5] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#5e0291] transition flex items-center justify-center"
                  disabled={isLoading || mutation.isLoading}
                >
                  {(isLoading || mutation.isLoading) ? <ClipLoader color="#fff" size={20} /> : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;