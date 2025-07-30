import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const NotFound = () => {
  const [cookies] = useCookies(["token", "role"]);
  const userRole = cookies.role;
  const { id, akun } = useParams();
  const navigate = useNavigateWithParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-6">
          Maaf, halaman yang Anda cari tidak ditemukan.
        </p>
        {cookies.role && cookies.token ? (
          // <Link
          //   to={`mahasiswa/praktikum`}
          //   className="inline-block bg-purple-900 text-white py-2 px-6 rounded-md hover:bg-purple-950"
          // >
          //   Kembali ke Dashboard
          // </Link>
          <button
            onClick={() => navigate(`/mahasiswa/praktikum`)}
            className="inline-block bg-purple-900 text-white py-2 px-6 rounded-md hover:bg-purple-950"
          >
            Kembali ke Dashboard
          </button>
        ) : (
          <Link
            to="/login"
            className="inline-block bg-purple-900 text-white py-2 px-6 rounded-md hover:bg-purple-950"
          >
            Kembali ke Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
