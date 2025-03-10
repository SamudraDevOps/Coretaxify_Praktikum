import { useEffect, useState } from "react";
import "./App.css";
import SidebarAdmin from "./components/Dashboard/Admin/SidebarAdmin/SidebarAdmin";
import Login from "./components/Dashboard/Auth/Login/Login";
import Register from "./components/Dashboard/Auth/Register/Register";
import ConfirmOTP from "./components/Dashboard/Auth/ConfirmEmail/ConfirmOTP";
import ResetPassword from "./components/Dashboard/Auth/ResetPassword/ResetPassword";
import DashboardAdmin from "./components/Dashboard/Admin/Dashboard/DashboardAdmin";
import Kontrak from "./components/Dashboard/Admin/Kontrak/Kontrak";
import DashboardDosen from "./components/Dashboard/Dosen/Dashboard/DashboardDosen";
// import DosenTugas from "./components/Dashboard/Dosen/Kelas/DosenKelas";
import DosenKelas from "./components/Dashboard/Dosen/Kelas/DosenKelas";
// import DosenCardKelas from "./components/Dashboard/Dosen/Kelas/DosenCardKelas";
import UjianDosen from "./components/Dashboard/Dosen/Ujian/UjianDosen";
import EditDosen from "./components/Dashboard/Admin/Pengguna/Dosen/EditDosen";
import PenilaianDosen from "./components/Dashboard/Dosen/Penilaian/PenilaianDosen";
import DetailPenilaian from "./components/Dashboard/Dosen/Penilaian/DetailPenilaianDosen";
import DetailTugasPenilaianDosen from "./components/Dashboard/Dosen/Penilaian/DetailTugasPenilaianDosen";
import EditMahasiswa from "./components/Dashboard/Admin/Pengguna/Mahasiswa/EditMahasiswa";
import EditAdmin from "./components/Dashboard/Admin/Pengguna/Admin/EditAdmin";
import EditKelas from "./components/Dashboard/Admin/Pengguna/Kelas/EditKelas";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { BrowserRouter, Routes, Route, Router } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import EditArtikel from "./components/Dashboard/Admin/LandingPage/EditArtikel";
import EditUlasan from "./components/Dashboard/Admin/LandingPage/EditUlasan";
import Praktikum from "./components/Dashboard/Dosen/Praktikum/Praktikum";
import Ujian from "./components/Dashboard/Admin/Praktikum/Ujian";
import UploadSoal from "./components/Dashboard/Admin/Praktikum/UploadSoal";
import KontrakBackup from "./components/Dashboard/Admin/Kontrak/KontrakBackup";
import PraktikumBackup from "./components/Dashboard/Admin/Praktikum/PraktikumBackup";
import MahasiswaKelas from "./components/Dashboard/Mahasiswa/Kelas/MahasiswaKelas";
import MahasiswaPraktikum from "./components/Dashboard/Mahasiswa/Praktikum/MahasiswaPraktikum";
import MahasiswaUjian from "./components/Dashboard/Mahasiswa/Praktikum/MahasiswaUjian";
import EditPengajar from "./components/Dashboard/AdminPsc/Pengguna/Pengajar/EditPengajar";
import EditKelasPsc from "./components/Dashboard/AdminPsc/Pengguna/Kelas/EditKelasPsc";
import UjianPsc from "./components/Dashboard/AdminPsc/Pengguna/Praktikum/UjianPsc";
import EditMahasiswaPsc from "./components/Dashboard/AdminPsc/Pengguna/Mahasiswa/EditMahasiswaPsc";
import Header from "./components/Header/Header";
import Home from "./components/Header/Home";
import CoretaxifyList from "./components/Dashboard/Admin/Coretaxify/CoretaxifyList";
import CoretaxifySendDetail from "./components/Dashboard/Admin/Coretaxify/CoretaxifySendDetail";
//Route Praktikum
import DokumenSaya from "./components/PraktikumPage/PortalSaya/DokumenSaya";
import NotifikasiSaya from "./components/PraktikumPage/PortalSaya/NotifikasiSaya";
import KasusSaya from "./components/PraktikumPage/PortalSaya/KasusSaya";
import ProfilSaya from "./components/PraktikumPage/PortalSaya/ProfilSaya";
import InformasiSaya from "./components/PraktikumPage/PortalSaya/InformasiSaya";
import EditDataProfil from "./components/PraktikumPage/PortalSaya/EditDataProfil";
import AlamatSaya from "./components/PraktikumPage/PortalSaya/AlamatSaya";
import DetailKontak from "./components/PraktikumPage/PortalSaya/DetailKontak";
import PihakTerkait from "./components/PraktikumPage/PortalSaya/PihakTerkait";
import DetailBank from "./components/PraktikumPage/PortalSaya/DetailBank";
import ObjekPBB from "./components/PraktikumPage/PortalSaya/ObjekPBB";
import KlasifikasiLapanganUsaha from "./components/PraktikumPage/PortalSaya/KlasifikasiLapanganUsaha";
import DataUnitKeluarga from "./components/PraktikumPage/PortalSaya/DataUnitKeluarga";
import TempatKegiatanUsaha from "./components/PraktikumPage/PortalSaya/TempatKegiatanUsaha";
import NomorIdentifikasiEksternal from "./components/PraktikumPage/PortalSaya/NomorIdentifikasiEksternal";
//Route Praktikum
import ProtectedRoutes from "./components/Dashboard/Auth/ProtectedRoutes";
import MahasiswaPraktikumKelas from "./components/Dashboard/Mahasiswa/Kelas/MahasiswaPraktikumKelas";
import DashboardPsc from "./components/Dashboard/AdminPsc/Dashboard/DashboardPsc";
import UploadSoalPsc from "./components/Dashboard/AdminPsc/Upload Soal/UploadSoal";
import EditMahasiswaPscKelas from "./components/Dashboard/AdminPsc/Pengguna/Kelas/Mahasiswa/EditMahasiswaPscKelas";
import DosenPraktikumKelas from "./components/Dashboard/Dosen/Kelas/DosenPraktikumKelas";
import { CookiesProvider, useCookies } from "react-cookie";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies([""]);

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
    // <BrowserRouter>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Navigate to={`/${cookies.role}`} replace />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-otp" element={<ConfirmOTP />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <div className="admin-layout">
                <SidebarAdmin />
                <div className="admin-content">
                  <DashboardAdmin />
                </div>
              </div>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/kontrak"
          element={
            <ProtectedRoutes>
              <div className="admin-layout">
                <SidebarAdmin />
                <div className="admin-content">
                  <Kontrak />
                </div>
              </div>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/coretaxify"
          element={
            <ProtectedRoutes>
              <div className="admin-layout">
                <SidebarAdmin />
                <div className="admin-content">
                  <CoretaxifyList />
                </div>
              </div>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/edit-dosen"
          element={
            <ProtectedRoutes>
              <div className="admin-layout">
                <SidebarAdmin />
                <div className="admin-content">
                  <EditDosen />
                </div>
              </div>
            </ProtectedRoutes>
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
            <ProtectedRoutes>
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <Praktikum></Praktikum>
              </div>
            </div>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/coretaxify/coretaxify-send"
          element={
            <ProtectedRoutes>
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <CoretaxifySendDetail></CoretaxifySendDetail>
              </div>
            </div>
            </ProtectedRoutes>
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
                <DosenKelas></DosenKelas>
                {/* <DosenCardKelas></DosenCardKelas> */}
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/kelas/praktikum/:id"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DosenPraktikumKelas></DosenPraktikumKelas>
                {/* <DosenCardKelas></DosenCardKelas> */}
              </div>
            </div>
          }
        />
        <Route
          path="/dosen/praktikum"
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
                <MahasiswaKelas></MahasiswaKelas>
              </div>
            </div>
          }
        />
        <Route
          path="/mahasiswa/kelas/:id"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <MahasiswaPraktikumKelas></MahasiswaPraktikumKelas>
              </div>
            </div>
          }
        />
        <Route
          path="/mahasiswa"
          element={<Navigate to="/mahasiswa/kelas" replace />}
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
          path="/psc/"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DashboardPsc></DashboardPsc>
              </div>
            </div>
          }
        />
        <Route
          path="/psc/master-soal"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <UploadSoalPsc></UploadSoalPsc>
              </div>
            </div>
          }
        />
        <Route
          path="/psc/edit-pengajar"
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
          path="/psc/edit-kelas"
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
          path="/psc/edit-kelas/1"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditMahasiswaPscKelas></EditMahasiswaPscKelas>
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

        {/* Praktikum */}
        <Route
          path="/admin/praktikum/prak1"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/admin/praktikum/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/dokumen-saya"
          element={
            <>
              <Header />
              <DokumenSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/notifikasi-saya"
          element={
            <>
              <Header />
              <NotifikasiSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/kasus-saya"
          element={
            <>
              <Header />
              <KasusSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya"
          element={
            <>
              <Header />
              <ProfilSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/informasi-umum"
          element={
            <>
              <Header />
              <InformasiSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/informasi-umum/edit-data-profil"
          element={
            <>
              <Header />
              <EditDataProfil />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/alamat"
          element={
            <>
              <Header />
              <AlamatSaya />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/detail-kontak"
          element={
            <>
              <Header />
              <DetailKontak />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/pihak-terkait"
          element={
            <>
              <Header />
              <PihakTerkait />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/detail-bank"
          element={
            <>
              <Header />
              <DetailBank />
            </>
          }
        />
        <Route
            path="/admin/praktikum/profil-saya/objek-pajak-bumi-dan-bangunan-(pbb)"
          element={
            <>
              <Header />
              <ObjekPBB />
            </>
          }
        />
        <Route
            path="/admin/praktikum/profil-saya/klasifikasi-lapangan-usaha-(klu)"
          element={
            <>
              <Header />
              <KlasifikasiLapanganUsaha />
            </>
          }
        />
        <Route
            path="/admin/praktikum/profil-saya/data-unit-keluarga"
          element={
            <>
              <Header />
              <DataUnitKeluarga />
            </>
          }
        />
        <Route
            path="/admin/praktikum/profil-saya/tempat-kegiatan-usaha/sub-unit"
          element={
            <>
              <Header />
              <TempatKegiatanUsaha />
            </>
          }
        />
        <Route
            path="/admin/praktikum/profil-saya/nomor-identifikasi-eksternal"
          element={
            <>
              <Header />
              <NomorIdentifikasiEksternal />
            </>
          }
        />
        {/* Praktikum */}
      </Routes>
    </Router>
    // </BrowserRouter>
  );
};

export default Main;
