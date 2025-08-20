import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "../../../Routes";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfile = () => {
  const defaultProfile =
    "https://ui-avatars.com/api/?name=User&background=random&size=128";

  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
    photoUrl: defaultProfile,
    instansi: "",
    status: "",
    unique_id: "",
  });
  const [originalProfile, setOriginalProfile] = useState({
    id: "",
    name: "",
    email: "",
    photoUrl: defaultProfile,
    instansi: "",
    status: "",
    unique_id: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const [cookies, , removeCookie] = useCookies(["token", "role"]);
  const navigate = useNavigate();
  const [isPsc, setIsPsc] = useState(false);


  // Prepare headers if token exists
  const headers = cookies.token
    ? {
      Authorization: `Bearer ${cookies.token}`,
      Accept: "application/json",
    }
    : {};

  // GET PROFILE DATA
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["profile", RoutesApi.profile],
    queryFn: async () => {
      const res = await axios.get(RoutesApi.profile, {
        headers: {
          ...headers,
        },
      });
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
  });

  // Handle data loading when query succeeds
  useEffect(() => {
    if (data?.data) {
      // Backend returns user data wrapped in 'data' object
      const user = data.data;
      const rolesArr = Array.isArray(user.roles) ? user.roles : [];
      const hasPscRole =
        rolesArr.some(r => String(r?.id) === "4" || String(r?.name).toLowerCase() === "psc") ||
        (cookies.role && (String(cookies.role) === "4" || String(cookies.role).toLowerCase() === "psc"));

      setIsPsc(!!hasPscRole);

      const photoUrl = user.image_path
        ? `${RoutesApi.url}storage/${user.image_path}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name || "User"
        )}&background=random&size=128`;

      const profileData = {
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        photo: null,
        photoUrl,
        instansi: user.instansi || "",
        status: user.status || "",
        unique_id: user.unique_id || "",
      };

      setProfile(profileData);
      setOriginalProfile({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        photoUrl,
        instansi: user.instansi || "",
        status: user.status || "",
        unique_id: user.unique_id || "",
      });
    }
  }, [data]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (profile.photoUrl && profile.photoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profile.photoUrl);
      }
    };
  }, [profile.photoUrl]);

  // UPDATE PROFILE
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(RoutesApi.profile_update, formData, {
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

      // invalidate all profile queries
      queryClient.invalidateQueries(["profile"]);
      queryClient.invalidateQueries(["sidebar-profile"]);

      // Exit edit mode
      setIsEditMode(false);

      // Reset password fields
      setProfile((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
        photo: null,
      }));

      // Logout otomatis
      removeCookie("token", { path: "/" });
      removeCookie("role", { path: "/" });
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      let errorMessage = "Gagal memperbarui profile. Silakan cek data Anda.";

      // Handle validation errors
      if (error?.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = [];

        if (errors.name) errorMessages.push(`Nama: ${errors.name[0]}`);
        if (errors.email) errorMessages.push(`Email: ${errors.email[0]}`);
        if (errors.password)
          errorMessages.push(`Password: ${errors.password[0]}`);
        if (errors.image) errorMessages.push(`Gambar: ${errors.image[0]}`);

        if (errorMessages.length > 0) {
          errorMessage = errorMessages.join("\n");
        }
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage,
      });
    },
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB = 2048KB)
      if (file.size > 2048 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Terlalu Besar",
          text: "Ukuran file maksimal 2MB",
        });
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Format File Tidak Didukung",
          text: "Hanya file JPG, JPEG, dan PNG yang diperbolehkan",
        });
        return;
      }

      // Clean up previous object URL if it exists
      if (profile.photoUrl && profile.photoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profile.photoUrl);
      }

      setProfile({
        ...profile,
        photo: file,
        photoUrl: URL.createObjectURL(file),
      });
    }
  };

  const handlePhotoClick = () => {
    if (isEditMode) {
      fileInputRef.current.click();
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    // Clean up any blob URLs from photo changes
    if (profile.photoUrl && profile.photoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(profile.photoUrl);
    }

    // Reset to original data
    setProfile({
      ...originalProfile,
      password: "",
      confirmPassword: "",
      photo: null,
    });
    setIsEditMode(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validasi password hanya jika BUKAN PSC dan user memang mengisi password
    if (!isPsc && profile.password) {
      if (profile.password !== profile.confirmPassword) {
        Swal.fire({ icon: "error", title: "Gagal", text: "Password dan konfirmasi password tidak sama." });
        return;
      }
      if (profile.password.length < 4) {
        Swal.fire({ icon: "error", title: "Gagal", text: "Password minimal 4 karakter." });
        return;
      }
    }

    // ✅ Validasi email hanya jika BUKAN PSC dan email diubah
    const isEmailChanged = profile.email !== originalProfile.email;
    if (!isPsc && isEmailChanged) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profile.email)) {
        Swal.fire({ icon: "error", title: "Gagal", text: "Format email tidak valid." });
        return;
      }
    }

    const formData = new FormData();

    // name boleh diubah semua role
    if (profile.name !== originalProfile.name) {
      formData.append("name", profile.name);
    }

    // ✅ Email hanya dikirim jika BUKAN PSC & memang berubah
    if (!isPsc && isEmailChanged) {
      formData.append("email", profile.email);
    }

    // ✅ Password hanya dikirim jika BUKAN PSC & user mengisi
    if (!isPsc && profile.password) {
      formData.append("password", profile.password);
      formData.append("password_confirmation", profile.confirmPassword);
    }

    // Foto boleh diubah semua role
    if (profile.photo) {
      formData.append("image", profile.photo);
    }

    // (Opsional) kalau tidak ada perubahan sama sekali
    if ([...formData.keys()].length === 0) {
      Swal.fire({ icon: "info", title: "Tidak ada perubahan", text: "Tidak ada data yang diubah." });
      return;
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            401 Unauthorized
          </h2>
          <p className="mb-4">
            Anda belum login atau sesi Anda sudah habis. Silakan login ulang.
          </p>
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
                onError={(e) => {
                  e.target.src = defaultProfile;
                }}
              />
              {isEditMode && (
                <button
                  type="button"
                  className="absolute bottom-3 right-3 bg-[#7502B5] text-white rounded-full p-3 shadow-lg hover:bg-[#5e0291] transition"
                  onClick={handlePhotoClick}
                  title="Ganti Foto"
                  disabled={mutation.isLoading}
                >
                  <FaCamera />
                </button>
              )}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                ref={fileInputRef}
                className="hidden"
                onChange={handlePhotoChange}
                disabled={!isEditMode || mutation.isLoading}
              />
            </div>

            {/* Info nama & email */}
            <div className="mt-4 text-center">
              <div className="font-semibold text-lg text-[#7502B5]">
                {profile.name || "Loading..."}
              </div>
              <div className="text-gray-600 text-sm">
                {profile.email || "Loading..."}
              </div>
              {profile.instansi && (
                <div className="text-gray-500 text-xs mt-1">
                  {profile.instansi}
                </div>
              )}
            </div>

            {isEditMode && (
              <span className="text-xs text-gray-500 mt-3">
                JPG, JPEG, PNG, maksimal 2MB
              </span>
            )}
          </div>

          {/* Right: Profile Info / Form */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[#7502B5]">
                {isEditMode ? "Edit Profile" : "Profile Saya"}
              </h2>

              {!isEditMode && (
                <button
                  onClick={handleEditClick}
                  className="bg-[#7502B5] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5e0291] transition flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>

            {!isEditMode ? (
              // View Mode
              <div className="space-y-6">
                {/* Nama */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nama Lengkap
                  </label>
                  <div className="bg-gray-50 border rounded-lg px-4 py-3 text-gray-800">
                    {profile.name || "-"}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <div className="bg-gray-50 border rounded-lg px-4 py-3 text-gray-800">
                    {profile.email || "-"}
                  </div>
                </div>

                {/* Instansi */}
                {profile.instansi && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Instansi
                    </label>
                    <div className="bg-gray-50 border rounded-lg px-4 py-3 text-gray-800">
                      {profile.instansi}
                    </div>
                  </div>
                )}

                {/* Status */}
                {profile.status && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Status
                    </label>
                    <div className="bg-gray-50 border rounded-lg px-4 py-3 text-gray-800">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${profile.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {profile.status === "ACTIVE" ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Unique ID */}
                {profile.unique_id && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      ID Unik
                    </label>
                    <div className="bg-gray-50 border rounded-lg px-4 py-3 text-gray-800 font-mono">
                      {profile.unique_id}
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <div className="bg-gray-50 border rounded-lg px-4 py-3 text-gray-800">
                    ••••••••
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama */}
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="name"
                  >
                    Nama Lengkap <span className="text-red-500">*</span>
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
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7502B5] bg-white"
                      required
                      autoComplete="name"
                      disabled={mutation.isLoading}
                      minLength={1}
                    />
                  </div>
                </div>

                {/* Email */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7502B5] bg-white"
                  required
                  autoComplete="email"
                  disabled={mutation.isLoading || isPsc} // <-- tambah ini
                  minLength={4}
                />
                {isPsc && (
                  <p className="text-xs text-amber-600 mt-1">
                    Akun PSC tidak dapat mengubah email & password.
                  </p>
                )}


                {/* Password Baru */}
                {!isPsc && (
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
                        className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#7502B5] bg-white"
                        placeholder="Kosongkan jika tidak ingin mengubah"
                        autoComplete="new-password"
                        disabled={mutation.isLoading}
                        minLength={4}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 focus:outline-none"
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={mutation.isLoading}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password minimal 4 karakter</p>
                  </div>
                )}

                {!isPsc && (
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
                        className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#7502B5] bg-white"
                        placeholder="Ulangi password baru"
                        autoComplete="new-password"
                        disabled={mutation.isLoading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 focus:outline-none"
                        tabIndex={-1}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        disabled={mutation.isLoading}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}


                {/* Tombol */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center gap-2"
                    onClick={handleCancel}
                    disabled={mutation.isLoading}
                  >
                    <FaTimes />
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-[#7502B5] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#5e0291] transition flex items-center justify-center gap-2"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      <>
                        <FaSave />
                        Simpan
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
