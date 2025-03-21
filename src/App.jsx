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
import RoleProtectedRoutes from "./components/Dashboard/Auth/RoleProtectedRoutes";
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
import PraktikumPsc from "./components/Dashboard/AdminPsc/Pengguna/Praktikum/PraktikumPsc";
import AssignmentPscMember from "./components/Dashboard/AdminPsc/Pengguna/Praktikum/Members/AssignmentPscMember";
// import UjianPsc from "./components/Dashboard/AdminPsc/Ujian/UjianPsc";
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
import JenisPajak from "./components/PraktikumPage/PortalSaya/JenisPajak";
import WakilKuasaSaya from "./components/PraktikumPage/PortalSaya/WakilKuasaSaya";
import WajibPajakYangDiwakili from "./components/PraktikumPage/PortalSaya/WajibPajakYangDiwakili";
import TwoAuthentication from "./components/PraktikumPage/PortalSaya/TwoAuthentication";
import PermohonanTertunda from "./components/PraktikumPage/PortalSaya/PermohonanTertunda";
//Route Praktikum
import ProtectedRoutes from "./components/Dashboard/Auth/ProtectedRoutes";
import MahasiswaPraktikumKelas from "./components/Dashboard/Mahasiswa/Kelas/MahasiswaPraktikumKelas";
import DashboardPsc from "./components/Dashboard/AdminPsc/Dashboard/DashboardPsc";
import UploadSoalPsc from "./components/Dashboard/AdminPsc/Upload Soal/UploadSoal";
import EditMahasiswaPscKelas from "./components/Dashboard/AdminPsc/Pengguna/Kelas/Mahasiswa/EditMahasiswaPscKelas";
import DosenPraktikumKelas from "./components/Dashboard/Dosen/Kelas/DosenPraktikumKelas";
import { CookiesProvider, useCookies } from "react-cookie";
import DosenPraktikumKelasMember from "./components/Dashboard/Dosen/Kelas/DosenPraktikumKelasMember";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["token, role"]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  // In the useEffect that validates the token
  useEffect(() => {
    const validateToken = async () => {
      if (cookies.token) {
        try {
          // Try to get user profile to validate token
          await axios.get(RoutesApi.profile, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
              Accept: "application/json",
            }
          });
          // Token is valid, check verification status
          try {
            const verificationResponse = await axios.get(RoutesApi.apiUrl + "verification-status", {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
                Accept: "application/json",
              }
            });
            
            // If not verified, store email for OTP verification
            if (!verificationResponse.data.verified) {
              localStorage.setItem("pendingVerificationEmail", verificationResponse.data.email);
            }
          } catch (verificationError) {
            console.error("Verification status check error:", verificationError);
          }
        } catch (error) {
          console.error("Token validation error:", error);
          // If token is invalid, clear cookies and redirect to login
          if (error.response?.status === 401) {
            setCookie("token", "", { path: "/", expires: new Date(0) });
            setCookie("role", "", { path: "/", expires: new Date(0) });
            window.location.href = "/login";
          }
        }
      }
    };

    validateToken();
  }, [cookies.token, setCookie]);

  return loading ? (
    <div className="loading">
      <ClipLoader color="#7502B5" size={50} />
    </div>
  ) : (
    // <BrowserRouter>
    <Router>
      <Routes>

        {/* ROOT REDIRECT */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Navigate to={`/${cookies.role}`} replace />
            </ProtectedRoutes>
          }
        />

        {/* AUTHENTICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-otp" element={<ConfirmOTP />} />
        
        {/* ADMIN ROUTE */}
        <Route element={<RoleProtectedRoutes allowedRoles={["admin"]} layout="admin" />}>
          <Route path="/admin" element={<DashboardAdmin />}/>
          <Route path="/admin/kontrak" element={<Kontrak />} />
          <Route path="/admin/coretaxify" element={<CoretaxifyList />} />
          <Route path="/admin/edit-dosen" element={<EditDosen />} />
          <Route path="/admin/upload-soal" element={<UploadSoal />} />
          <Route path="/admin/praktikum" element={<Praktikum />} />
          <Route path="/admin/coretaxify/coretaxify-send" element={ <CoretaxifySendDetail />} />
          <Route path="/admin/ujian" element={<Ujian />} />
          <Route path="/admin/edit-admin" element={<EditAdmin />} />
          <Route path="/admin/edit-kelas" element={<EditKelas />} />
          <Route path="/admin/edit-mahasiswa" element={<EditMahasiswa />} />
          <Route path="/admin/edit-artikel" element={<EditArtikel />} />
          <Route path="/admin/edit-ulasan" element={<EditUlasan />} />
          <Route path="/admin/kontrak-backup" element={<KontrakBackup />} />
          <Route path="/admin/praktikum-backup" element={<PraktikumBackup />} />
          <Route path="/admin/praktikum" element={<Praktikum />} />
        </Route>

        {/* DOSEN ROUTE */}
        <Route element={<RoleProtectedRoutes allowedRoles={["dosen"]} layout= "admin" />}>
          <Route path="/dosen" element={<DashboardDosen />} />
          <Route path="/dosen/kelas" element={<DosenKelas />} />
          <Route path="/dosen/kelas/praktikum/:id" element={<DosenPraktikumKelas />} />
          <Route path="/dosen/kelas/:id/praktikum/:idpraktikum" element={<DosenPraktikumKelasMember />} />
          <Route path="/dosen/praktikum" element={<Praktikum />} />
          <Route path="/dosen/penilaian" element={<PenilaianDosen />} />
          <Route path="/dosen/penilaian/detail-tugas" element={<DetailTugasPenilaianDosen />} />
          <Route path="/dosen/penilaian/detail-tugas/detail-penilaian" element={<DetailPenilaian />} />
          <Route path="/dosen/ujian" element={<UjianDosen />} />
        </Route>
        
        {/* MAHASISWA ROUTE */}
        <Route element={<RoleProtectedRoutes allowedRoles={["mahasiswa"]} layout= "admin" />}>
          <Route path="/mahasiswa/kelas" element={<MahasiswaKelas />} />
          <Route path="/mahasiswa/kelas/:id" element={<MahasiswaPraktikumKelas />} />
          <Route path="/mahasiswa" element={<Navigate to="/mahasiswa/kelas" replace />} />
          <Route path="/mahasiswa/praktikum" element={<MahasiswaPraktikum />} />
          <Route path="/mahasiswa/ujian" element={<MahasiswaUjian />} />
        </Route>

        {/* PSC ROUTE */}
        <Route element={<RoleProtectedRoutes allowedRoles={["psc"]} layout= "admin" />}>
          <Route path="/psc/" element={<DashboardPsc />} />
          <Route path="/psc/master-soal" element={<UploadSoalPsc />} />
          <Route path="/psc/edit-pengajar" element={<EditPengajar />} />
          <Route path="/psc/edit-kelas" element={<EditKelasPsc />} />
          {/* <Route path="/psc/edit-kelas/1" element={<EditMahasiswaPscKelas />} /> */}
          <Route path="/psc/kelas/:groupId/mahasiswa" element={<EditMahasiswaPscKelas />} />
          {/* <Route path="/psc/kelas/:groupId/mahasiswa/:memberId" element={<MemberDetailPage />} /> */}
          <Route path="/psc/praktikum" element={<PraktikumPsc />} />
          <Route path="/psc/praktikum/:assignmentId/members" element={<AssignmentPscMember />} />
          <Route path="/psc/ujian" element={{/* <UjianPsc /> */}} />
          <Route path="/psc/edit-mahasiswa" element={<EditMahasiswaPsc />} />
        </Route>

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
        <Route
            path="/admin/praktikum/profil-saya/jenis-pajak"
          element={
            <>
              <Header />
              <JenisPajak />
            </>
          }
        />
        <Route
          path="/admin/praktikum/profil-saya/wakil-kuasa-saya"
          element={
            <>
              <Header />
              <WakilKuasaSaya />
            </>
          }
        />
        <Route
            path="/admin/praktikum/profil-saya/wajib-pajak-yang-diwakili"
          element={
            <>
              <Header />
              <WajibPajakYangDiwakili />
            </>
          }
        />
        <Route
            path="/admin/praktikum/profil-saya/verifikasi-dua-langkah"
          element={
            <>
              <Header />
              <TwoAuthentication />
            </>
          }
        />
        <Route
            path="/admin/praktikum/profil-saya/permohonan-tertunda"
          element={
            <>
              <Header />
              <PermohonanTertunda />
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
