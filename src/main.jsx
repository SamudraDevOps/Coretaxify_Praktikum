import { useEffect, useState } from "react";
import "./App.css";
import SidebarAdmin from "./components/Dashboard/Admin/SidebarAdmin/SidebarAdmin";
import Login from "./components/Dashboard/Dashboard/Auth/Login/Login";
import Register from "./components/Dashboard/Auth/Register/Register";
import ResetPassword from "./components/Dashboard/Auth/ResetPassword/ResetPassword";
import DashboardAdmin from "./components/Dashboard/Admin/Dashboard/DashboardAdmin";
import Kontrak from "./components/Dashboard/Admin/Kontrak/Kontrak";
import DashboardDosen from "./components/Dashboard/Dosen/Dashboard/DashboardDosen";
import DosenTugas from "./components/Dashboard/Dosen/Kelas/DosenKelas";
import DosenCardKelas from "./components/Dashboard/Dosen/Kelas/DosenCardKelas";
import UjianDosen from "./components/Dashboard/Dosen/Ujian/UjianDosen";
import EditDosen from "./components/Dashboard/Admin/Pengguna/Dosen/EditDosen";
import PenilaianDosen from "./components/Dashboard/Dosen/Penilaian/PenilaianDosen";
import DetailPenilaian from "./components/Dashboard/Dosen/Penilaian/DetailPenilaianDosen";
import DetailTugasPenilaianDosen from "./components/Dashboard/Dosen/Penilaian/DetailTugasPenilaianDosen";
import EditMahasiswa from "./components/Dashboard/Admin/Pengguna/Mahasiswa/EditMahasiswa";
import EditAdmin from "./components/Dashboard/Admin/Pengguna/Admin/EditAdmin";
import EditKelas from "./components/Dashboard/Admin/Pengguna/Kelas/EditKelas";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import EditArtikel from "./components/Dashboard/Admin/LandingPage/EditArtikel";
import EditUlasan from "./components/Dashboard/Admin/LandingPage/EditUlasan";
import Praktikum from "./components/Dashboard/Admin/Praktikum/Praktikum";
import Ujian from "./components/Dashboard/Admin/Praktikum/Ujian";
import UploadSoal from "./components/Dashboard/Admin/Praktikum/UploadSoal";
import KontrakBackup from "./components/Dashboard/Admin/Kontrak/KontrakBackup";
import PraktikumBackup from "./components/Dashboard/Admin/Praktikum/PraktikumBackup";
import MahsiswaKelas from "./components/Dashboard/Mahasiswa/Kelas/MahasiswaKelas";
import MahasiswaPraktikum from "./components/Dashboard/Mahasiswa/Praktikum/MahasiswaPraktikum";
import MahasiswaUjian from "./components/Dashboard/Mahasiswa/Praktikum/MahasiswaUjian";
import EditPengajar from "./components/Dashboard/AdminPsc/Pengguna/Pengajar/EditPengajar";
import EditKelasPsc from "./components/Dashboard/AdminPsc/Pengguna/Kelas/EditKelasPsc";
import UjianPsc from "./components/Dashboard/AdminPsc/Pengguna/Praktikum/UjianPsc";
import EditMahasiswaPsc from "./components/Dashboard/AdminPsc/Pengguna/Mahasiswa/EditMahasiswaPsc";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
  return loading ? (
    <div className="loading">
      <ClipLoader color="#7502B5" size={50} />
    </div>
  ) : (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/admin"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DashboardAdmin />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/kontrak"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Kontrak />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-dosen"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditDosen />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/upload-soal"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <UploadSoal></UploadSoal>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/praktikum"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Praktikum></Praktikum>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Ujian></Ujian>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-admin"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditAdmin />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-kelas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditKelas />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-mahasiswa"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditMahasiswa />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-artikel"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditArtikel></EditArtikel>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/edit-ulasan"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditUlasan></EditUlasan>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/kontrak-backup"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <KontrakBackup></KontrakBackup>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/praktikum-backup"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <PraktikumBackup></PraktikumBackup>
              </div>
            </div>
          }
        />
        <Route
          path="/admin/praktikum"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Praktikum></Praktikum>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DashboardDosen />
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/kelas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DosenCardKelas></DosenCardKelas>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/kelas/tugas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DosenTugas />
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/penilaian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <PenilaianDosen></PenilaianDosen>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/penilaian/detail-tugas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DetailTugasPenilaianDosen></DetailTugasPenilaianDosen>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/penilaian/detail-tugas/detail-penilaian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DetailPenilaian></DetailPenilaian>
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <UjianDosen></UjianDosen>
              </div>
            </div>
          }
        />
        <Route
          path="/mahasiswa/kelas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <MahsiswaKelas></MahsiswaKelas>
              </div>
            </div>
          }
        />
        <Route
          path="/mahasiswa/praktikum"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <MahasiswaPraktikum></MahasiswaPraktikum>
              </div>
            </div>
          }
        />
        <Route
          path="/mahasiswa/ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <MahasiswaUjian></MahasiswaUjian>
              </div>
            </div>
          }
        />
        <Route
          path="/admin-psc/edit-pengajar"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditPengajar></EditPengajar>
              </div>
            </div>
          }
        />
        <Route
          path="/admin-psc/edit-kelas"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditKelasPsc></EditKelasPsc>
              </div>
            </div>
          }
        />
        <Route
          path="/admin-psc/edit-ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <UjianPsc></UjianPsc>
              </div>
            </div>
          }
        />
        <Route
          path="/admin-psc/edit-mahasiswa"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditMahasiswaPsc></EditMahasiswaPsc>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default Main;
