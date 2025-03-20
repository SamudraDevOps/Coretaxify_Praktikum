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
import PraktikumPsc from "./components/Dashboard/AdminPsc/Pengguna/Praktikum/PraktikumPsc";
import AssignmentPscMember from "./components/Dashboard/AdminPsc/Pengguna/Praktikum/Members/AssignmentPscMember";
// import UjianPsc from "./components/Dashboard/AdminPsc/Ujian/UjianPsc";
import EditMahasiswaPsc from "./components/Dashboard/AdminPsc/Pengguna/Mahasiswa/EditMahasiswaPsc";
import Header from "./components/Header/Header";
import Home from "./components/Header/Home";
import CoretaxifyList from "./components/Dashboard/Admin/Coretaxify/CoretaxifyList";
import CoretaxifySendDetail from "./components/Dashboard/Admin/Coretaxify/CoretaxifySendDetail";

//Route Praktikum Orang Pribadi
import DokumenSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/DokumenSaya";
import NotifikasiSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/NotifikasiSaya";
import KasusSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/KasusSaya";
import ProfilSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/ProfilSaya";
import InformasiSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/InformasiSaya";
import EditDataProfil from "./components/PraktikumPage/OrangPribadi/PortalSaya/EditDataProfil";
import AlamatSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/AlamatSaya";
import DetailKontak from "./components/PraktikumPage/OrangPribadi/PortalSaya/DetailKontak";
import PihakTerkait from "./components/PraktikumPage/OrangPribadi/PortalSaya/PihakTerkait";
import DetailBank from "./components/PraktikumPage/OrangPribadi/PortalSaya/DetailBank";
import ObjekPBB from "./components/PraktikumPage/OrangPribadi/PortalSaya/ObjekPBB";
import KlasifikasiLapanganUsaha from "./components/PraktikumPage/OrangPribadi/PortalSaya/KlasifikasiLapanganUsaha";
import DataUnitKeluarga from "./components/PraktikumPage/OrangPribadi/PortalSaya/DataUnitKeluarga";
import TempatKegiatanUsaha from "./components/PraktikumPage/OrangPribadi/PortalSaya/TempatKegiatanUsaha";
import NomorIdentifikasiEksternal from "./components/PraktikumPage/OrangPribadi/PortalSaya/NomorIdentifikasiEksternal";
import JenisPajak from "./components/PraktikumPage/OrangPribadi/PortalSaya/JenisPajak";
import WakilKuasaSaya from "./components/PraktikumPage/OrangPribadi/PortalSaya/WakilKuasaSaya";
import WajibPajakYangDiwakili from "./components/PraktikumPage/OrangPribadi/PortalSaya/WajibPajakYangDiwakili";
import TwoAuthentication from "./components/PraktikumPage/OrangPribadi/PortalSaya/TwoAuthentication";
import PermohonanTertunda from "./components/PraktikumPage/OrangPribadi/PortalSaya/PermohonanTertunda";
//Route Praktikum

// Route Badan
import DokumenSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/DokumenSaya";
import NotifikasiSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/NotifikasiSaya";
import KasusSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/KasusSaya";
import ProfilSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/ProfilSaya";
import InformasiSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/InformasiSaya";
import EditDataProfilBadan from "./components/PraktikumPage/Badan/PortalSaya/EditDataProfil";
import AlamatSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/AlamatSaya";
import DetailKontakBadan from "./components/PraktikumPage/Badan/PortalSaya/DetailKontak";
import PihakTerkaitBadan from "./components/PraktikumPage/Badan/PortalSaya/PihakTerkait";
import DetailBankBadan from "./components/PraktikumPage/Badan/PortalSaya/DetailBank";
import ObjekPBBBadan from "./components/PraktikumPage/Badan/PortalSaya/ObjekPBB";
import KlasifikasiLapanganUsahaBadan from "./components/PraktikumPage/Badan/PortalSaya/KlasifikasiLapanganUsaha";
import DataUnitKeluargaBadan from "./components/PraktikumPage/Badan/PortalSaya/DataUnitKeluarga";
import TempatKegiatanUsahaBadan from "./components/PraktikumPage/Badan/PortalSaya/TempatKegiatanUsaha";
import NomorIdentifikasiEksternalBadan from "./components/PraktikumPage/Badan/PortalSaya/NomorIdentifikasiEksternal";
import JenisPajakBadan from "./components/PraktikumPage/Badan/PortalSaya/JenisPajak";
import WakilKuasaSayaBadan from "./components/PraktikumPage/Badan/PortalSaya/WakilKuasaSaya";
import WajibPajakYangDiwakiliBadan from "./components/PraktikumPage/Badan/PortalSaya/WajibPajakYangDiwakili";
import TwoAuthenticationBadan from "./components/PraktikumPage/Badan/PortalSaya/TwoAuthentication";
import PermohonanTertundaBadan from "./components/PraktikumPage/Badan/PortalSaya/PermohonanTertunda";

// Route Badan
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
    // <userContext.js>
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
          path="/dosen/kelas/:id/praktikum/:idpraktikum"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <DosenPraktikumKelasMember></DosenPraktikumKelasMember>
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
        {/* <Route
          path="/psc/edit-kelas/1"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <EditMahasiswaPscKelas></EditMahasiswaPscKelas>
              </div>
            </div>
          }
        /> */}
        <Route 
          path="/psc/kelas/:groupId/mahasiswa" 
          element={
            <div className="admin-layout">
            <SidebarAdmin />
            <div className="admin-content">
              <EditMahasiswaPscKelas></EditMahasiswaPscKelas>
            </div>
          </div>
        } />
        {/* <Route 
          path="/psc/kelas/:groupId/mahasiswa/:memberId" 
          element={
            <div className="admin-layout">
            <SidebarAdmin />
            <div className="admin-content">
              <MemberDetailPage></MemberDetailPage>
            </div>
          </div>
        } /> */}
        <Route
          path="/psc/praktikum"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                <PraktikumPsc></PraktikumPsc>
              </div>
            </div>
          }
        />
        <Route 
          path="/psc/praktikum/:assignmentId/members" 
          element={
            <div className="admin-layout">
            <SidebarAdmin />
            <div className="admin-content">
            <AssignmentPscMember></AssignmentPscMember>
            </div>
          </div>
        } />
        <Route
          path="/psc/ujian"
          element={
            <div className="admin-layout">
              <SidebarAdmin />
              <div className="admin-content">
                {/* <UjianPsc></UjianPsc> */}
              </div>
            </div>
          }
        />
        <Route
          path="/psc/edit-mahasiswa"
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

          {/* Praktikum  Orang Pribadi*/}
          <Route
            path="/admin/praktikum/1/prak1"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/dokumen-saya"
            element={
              <>
                <Header />
                <DokumenSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/notifikasi-saya"
            element={
              <>
                <Header />
                <NotifikasiSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/dokumen-saya"
            element={
              <>
                <Header />
                <DokumenSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/notifikasi-saya"
            element={
              <>
                <Header />
                <NotifikasiSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/kasus-saya"
            element={
              <>
                <Header />
                <KasusSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya"
            element={
              <>
                <Header />
                <ProfilSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/informasi-umum"
            element={
              <>
                <Header />
                <InformasiSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/informasi-umum/edit-data-profil"
            element={
              <>
                <Header />
                <EditDataProfil />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/alamat"
            element={
              <>
                <Header />
                <AlamatSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/detail-kontak"
            element={
              <>
                <Header />
                <DetailKontak />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/pihak-terkait"
            element={
              <>
                <Header />
                <PihakTerkait />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/detail-bank"
            element={
              <>
                <Header />
                <DetailBank />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/objek-pajak-bumi-dan-bangunan-(pbb)"
            element={
              <>
                <Header />
                <ObjekPBB />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/klasifikasi-lapangan-usaha-(klu)"
            element={
              <>
                <Header />
                <KlasifikasiLapanganUsaha />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/data-unit-keluarga"
            element={
              <>
                <Header />
                <DataUnitKeluarga />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/tempat-kegiatan-usaha/sub-unit"
            element={
              <>
                <Header />
                <TempatKegiatanUsaha />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/nomor-identifikasi-eksternal"
            element={
              <>
                <Header />
                <NomorIdentifikasiEksternal />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/jenis-pajak"
            element={
              <>
                <Header />
                <JenisPajak />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/wakil-kuasa-saya"
            element={
              <>
                <Header />
                <WakilKuasaSaya />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/wajib-pajak-yang-diwakili"
            element={
              <>
                <Header />
                <WajibPajakYangDiwakili />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/verifikasi-dua-langkah"
            element={
              <>
                <Header />
                <TwoAuthentication />
              </>
            }
          />
          <Route
            path="/admin/praktikum/1/profil-saya/permohonan-tertunda"
            element={
              <>
                <Header />
                <PermohonanTertunda />
              </>
            }
          />
          {/* Praktikum Orang Pribadi*/}


          {/* Praktikum  Orang Badan*/}
          <Route
            path="/admin/praktikum/2/prak1"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/dokumen-saya"
            element={
              <>
                <Header />
                <DokumenSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/notifikasi-saya"
            element={
              <>
                <Header />
                <NotifikasiSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/dokumen-saya"
            element={
              <>
                <Header />
                <DokumenSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/notifikasi-saya"
            element={
              <>
                <Header />
                <NotifikasiSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/kasus-saya"
            element={
              <>
                <Header />
                <KasusSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya"
            element={
              <>
                <Header />
                <ProfilSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/informasi-umum"
            element={
              <>
                <Header />
                <InformasiSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/informasi-umum/edit-data-profil"
            element={
              <>
                <Header />
                <EditDataProfilBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/alamat"
            element={
              <>
                <Header />
                <AlamatSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/detail-kontak"
            element={
              <>
                <Header />
                <DetailKontakBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/pihak-terkait"
            element={
              <>
                <Header />
                <PihakTerkaitBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/detail-bank"
            element={
              <>
                <Header />
                <DetailBankBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/objek-pajak-bumi-dan-bangunan-(pbb)"
            element={
              <>
                <Header />
                <ObjekPBBBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/klasifikasi-lapangan-usaha-(klu)"
            element={
              <>
                <Header />
                <KlasifikasiLapanganUsahaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/data-unit-keluarga"
            element={
              <>
                <Header />
                <DataUnitKeluargaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/tempat-kegiatan-usaha/sub-unit"
            element={
              <>
                <Header />
                <TempatKegiatanUsahaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/nomor-identifikasi-eksternal"
            element={
              <>
                <Header />
                <NomorIdentifikasiEksternalBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/jenis-pajak"
            element={
              <>
                <Header />
                <JenisPajakBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/wakil-kuasa-saya"
            element={
              <>
                <Header />
                <WakilKuasaSayaBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/wajib-pajak-yang-diwakili"
            element={
              <>
                <Header />
                <WajibPajakYangDiwakiliBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/verifikasi-dua-langkah"
            element={
              <>
                <Header />
                <TwoAuthenticationBadan />
              </>
            }
          />
          <Route
            path="/admin/praktikum/2/profil-saya/permohonan-tertunda"
            element={
              <>
                <Header />
                <PermohonanTertundaBadan />
              </>
            }
          />
          {/* Praktikum Orang Pribadi*/}
      </Routes>
    </Router>
    // </BrowserRouter>
  );
};

export default Main;
