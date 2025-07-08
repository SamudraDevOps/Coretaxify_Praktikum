import { useEffect, useState } from "react";
import "./App.css";
import EditProfile from "./components/Dashboard/EditProfile/editProfile";
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
import UjianDosenMember from "./components/Dashboard/Dosen/Ujian/Members/UjianDosenMember";
import EditDosen from "./components/Dashboard/Admin/Pengguna/Dosen/EditDosen";
import PenilaianDosen from "./components/Dashboard/Dosen/Penilaian/PenilaianDosen";
import DetailPenilaian from "./components/Dashboard/Dosen/Penilaian/DetailPenilaianDosen";
import DetailTugasPenilaianDosen from "./components/Dashboard/Dosen/Penilaian/DetailTugasPenilaianDosen";
import EditMahasiswa from "./components/Dashboard/Admin/Pengguna/Mahasiswa/EditMahasiswa";
import EditAdmin from "./components/Dashboard/Admin/Pengguna/Admin/EditAdmin";
import EditKelas from "./components/Dashboard/Admin/Pengguna/Kelas/EditKelas";

// ADMIN
import AdminCoretaxify from "./components/Dashboard/Admin/Coretaxify/AdminCoretaxify";

// DOSEN
import DosenCoretaxify from "./components/Dashboard/Dosen/Coretaxify/DosenCoretaxify";

// PSC
import AdminPscCoretaxify from "./components/Dashboard/AdminPsc/Coretaxify/AdminPscCoretaxify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoleProtectedRoutes from "./components/Dashboard/Auth/RoleProtectedRoutes";
import NotFound from "./components/NotFound";
// import { BrowserRouter, Routes, Route, Router } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import EditArtikel from "./components/Dashboard/Admin/LandingPage/EditArtikel";
import EditUlasan from "./components/Dashboard/Admin/LandingPage/EditUlasan";
import Praktikum from "./components/Dashboard/Dosen/Praktikum/Praktikum";
// import Praktikum from "./components/Dashboard/Admin/Praktikum/Praktikum";
import Ujian from "./components/Dashboard/Admin/Praktikum/Ujian";
import AdminPraktikum from "./components/Dashboard/Admin/Praktikum/Praktikum";
import AdminPraktikumMember from "./components/Dashboard/Admin/Praktikum/Members/PraktikumMember";
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
import ExamPsc from "./components/Dashboard/AdminPsc/Ujian/ExamPsc";
import ExamPscMembers from "./components/Dashboard/AdminPsc/Ujian/Members/ExamPscMembers";
import EditMahasiswaPsc from "./components/Dashboard/AdminPsc/Pengguna/Mahasiswa/EditMahasiswaPsc";
import Header from "./components/Header/Header";
import Home from "./components/Header/Home";
import CoretaxifyList from "./components/Dashboard/Admin/Coretaxify/CoretaxifyList";
import CoretaxifySendDetail from "./components/Dashboard/Admin/Coretaxify/CoretaxifySendDetail";
import Notifikasi from "./components/PraktikumPage/Notifikasi";

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

// MAHASISWA-PSC
import MahasiswaPscKelas from "./components/Dashboard/MahasiswaPsc/Kelas/MahasiswaPscKelas";
import MahasiswaPscKelasPraktikum from "./components/Dashboard/MahasiswaPsc/Kelas/Praktikum/MahasiswaPscKelasPraktikum";
import MahasiswaPscPraktikum from "./components/Dashboard/MahasiswaPsc/Praktikum/MahasiswaPscPraktikum";
import MahasiswaPscUjian from "./components/Dashboard/MahasiswaPsc/Ujian/MahasiswaPscUjian";

// INSTRUKTUR
import InstrukturPraktikum from "./components/Dashboard/Instruktur/Praktikum/InstrukturPraktikum";
import BlankAssignment from "./components/Dashboard/Instruktur/Praktikum/Blank/BlankAssignment";
import FilledAssignment from "./components/Dashboard/Instruktur/Praktikum/Filled/FilledAssignment";

import DashboardEFakturOP from "./components/PraktikumPage/OrangPribadi/EFaktur/DashboardEFaktur";
import PajakKeluaranOP from "./components/PraktikumPage/OrangPribadi/EFaktur/PajakKeluaran";
import TambahFakturKeluaranOP from "./components/PraktikumPage/OrangPribadi/EFaktur/TambahFakturKeluaran";
import PajakMasukanOP from "./components/PraktikumPage/OrangPribadi/EFaktur/PajakMasukan";

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
import DashboardEFaktur from "./components/PraktikumPage/Badan/EFaktur/DashboardEFaktur";
import PajakKeluaran from "./components/PraktikumPage/Badan/EFaktur/PajakKeluaran";
import TambahFakturKeluaran from "./components/PraktikumPage/Badan/EFaktur/TambahFakturKeluaran";
import TambahFakturKeluaranDokumenLain from "./components/PraktikumPage/Badan/EFaktur/TambahFakturKeluaranDokumenLain";
import PajakMasukan from "./components/PraktikumPage/Badan/EFaktur/PajakMasukan";
import PajakKeluaranDokumenLain from "./components/PraktikumPage/Badan/EFaktur/PajakKeluaranDokumenLain";
import KonsepSPT from "./components/PraktikumPage/Badan/SPT/KonsepSPT";
import BuatKonsepSPT from "./components/PraktikumPage/Badan/SPT/BuatKonsepSPT";
import CreateKonsepSPT from "./components/PraktikumPage/Badan/SPT/CreateKonsepSPT";
import CreateKonsepPasal from "./components/PraktikumPage/Badan/SPT/CreateKonsepPasal";
import CreateKonsepUnifikasi from "./components/PraktikumPage/Badan/SPT/CreateKonsepUnifikasi";
import BupotBulananPegawaiTetap from "./components/PraktikumPage/Badan/BUPOT/BupotBulananPegawaiTetap";
import BupotBulananPegawaiTetapTelahTerbit from "./components/PraktikumPage/Badan/BUPOT/BupotBulananPegawaiTetapTelahTerbit";
import BupotBulananPegawaiTetapTidakValid from "./components/PraktikumPage/Badan/BUPOT/BupotBulananPegawaiTetapTidakValid";
import BppuBelumTerbit from "./components/PraktikumPage/Badan/BUPOT/BPPU/BppuBelumTerbit";
import CreateEbupot from "./components/PraktikumPage/Badan/BUPOT/CreateEbupot";
import CreateBppu from "./components/PraktikumPage/Badan/BUPOT/BPPU/CreateBppu";
import BppuTelahTerbit from "./components/PraktikumPage/Badan/BUPOT/BPPU/BppuTelahTerbit";
import BppuTidakValid from "./components/PraktikumPage/Badan/BUPOT/BPPU/BppuTidakValid";
import BpnrBelumTerbit from "./components/PraktikumPage/Badan/BUPOT/BPNR/BpnrBelumTerbit";
import CreateBpnr from "./components/PraktikumPage/Badan/BUPOT/BPNR/CreateBpnr";
import BpnrTelahTerbit from "./components/PraktikumPage/Badan/BUPOT/BPNR/BpnrTelahTerbit";
import BpnrTidakValid from "./components/PraktikumPage/Badan/BUPOT/BPNR/BpnrTidakValid";
import SelfBilling from "./components/PraktikumPage/Badan/Pembayaran/SelfBilling";
import DaftarKodeBilingBelumBayar from "./components/PraktikumPage/Badan/Pembayaran/DaftarKodeBilingBelumBayar";
import RiwayatBilling from "./components/PraktikumPage/Badan/Pembayaran/RiwayatBilling";
import RiwayatPembatalanBilling from "./components/PraktikumPage/Badan/Pembayaran/RiwayatPembatalanBilling";
import PembuatanKodeBillingAtasPajak from "./components/PraktikumPage/Badan/Pembayaran/PembuatanKodeBillingAtasPajak";
import PermohonanPemindahBukuan from "./components/PraktikumPage/Badan/Pembayaran/PermohonanPemindahbukuan";
// Route Badan

import ProtectedRoutes from "./components/Dashboard/Auth/ProtectedRoutes";
import MahasiswaPraktikumKelas from "./components/Dashboard/Mahasiswa/Kelas/MahasiswaPraktikumKelas";
import DashboardPsc from "./components/Dashboard/AdminPsc/Dashboard/DashboardPsc";
import UploadSoalPsc from "./components/Dashboard/AdminPsc/Upload Soal/UploadSoal";
import EditMahasiswaPscKelas from "./components/Dashboard/AdminPsc/Pengguna/Kelas/Mahasiswa/EditMahasiswaPscKelas";
import DosenPraktikumKelas from "./components/Dashboard/Dosen/Kelas/DosenPraktikumKelas";
import { CookiesProvider, useCookies } from "react-cookie";
import DosenPraktikumKelasMember from "./components/Dashboard/Dosen/Kelas/DosenPraktikumKelasMember";
import RoleBasedRenderer from "./components/PraktikumPage/RoleBaseRenderer";
import { useParams } from "react-router";
import { RoutesApi } from "@/Routes";
import EditFakturKeluaran from "./components/PraktikumPage/Badan/EFaktur/EditFakturKeluaran";
import { ViewerPDF } from "./components/PraktikumPage/PDFTemplate/PDFViewer";
import FakturPajakKeluaranPdf from "./components/PraktikumPage/PDFTemplate/FakturKeluaran";
import BpeSptPdf from "./components/PraktikumPage/PDFTemplate/BPESPTTemplate";
import BillingCodePdf from "./components/PraktikumPage/PDFTemplate/BillingCodeTemplate";
import SptMasaPph21Pdf from "./components/PraktikumPage/PDFTemplate/SPTMasaPPH";

// BUPOT PRAKTIKUM
import BUPOTWrapper from "./components/PraktikumPage/Badan/BUPOT/BUPOTWrapper";
import BUPOTCreateWrapper from "./components/PraktikumPage/Badan/BUPOT/BUPOTCreateWrapper";
import BUPOTEditWrapper from "./components/PraktikumPage/Badan/BUPOT/BUPOTEditWrapper";
import BukuBesar from "./components/PraktikumPage/PortalSaya/BukuBesar";
import MasterAkun from "./components/PraktikumPage/PortalSaya/MasterAkun";
import FakturViewPDF from "./components/PraktikumPage/Badan/EFaktur/FakturViewPDF";
import KodeBillingViewPDF from "./components/PraktikumPage/Badan/Pembayaran/KodeBillingViewPDF";
import SptPpnPdf from "./components/PraktikumPage/PDFTemplate/SPTPPN";
import SPTViewPDF from "./components/PraktikumPage/Badan/SPT/SPTViewPDF";
import SPTPPHViewPDF from "./components/PraktikumPage/Badan/SPT/SPTPPHViewPDF";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["token, role"]);
  // const { id, akun } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  // In the useEffect that validates the token
  // useEffect(() => {
  //   const validateToken = async () => {
  //     if (cookies.token) {
  //       try {
  //         // Try to get user profile to validate token
  //         await axios.get(RoutesApi.profile, {
  //           headers: {
  //             Authorization: `Bearer ${cookies.token}`,
  //             Accept: "application/json",
  //           }
  //         });
  //         // Token is valid, check verification status
  //         try {
  //           const verificationResponse = await axios.get(RoutesApi.apiUrl + "verification-status", {
  //             headers: {
  //               Authorization: `Bearer ${cookies.token}`,
  //               Accept: "application/json",
  //             }
  //           });

  //           // If not verified, store email for OTP verification
  //           if (!verificationResponse.data.verified) {
  //             localStorage.setItem("pendingVerificationEmail", verificationResponse.data.email);
  //           }
  //         } catch (verificationError) {
  //           console.error("Verification status check error:", verificationError);
  //         }
  //       } catch (error) {
  //         console.error("Token validation error:", error);
  //         // If token is invalid, clear cookies and redirect to login
  //         if (error.response?.status === 401) {
  //           setCookie("token", "", { path: "/", expires: new Date(0) });
  //           setCookie("role", "", { path: "/", expires: new Date(0) });
  //           window.location.href = "/login";
  //         }
  //       }
  //     }
  //   };

  //   validateToken();
  // }, [cookies.token, setCookie]);

  return loading ? (
    <div className="loading">
      <ClipLoader color="#7502B5" size={50} />
    </div>
  ) : (
    // <BrowserRouter>
    // <userContext.js>
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

        {/* EDIT PROFILE ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes
              allowedRoles={[
                "dosen",
                "admin",
                "psc",
                "mahasiswa",
                "instruktur",
                "mahasiswa-psc",
              ]}
              layout="admin"
            />
          }
        >
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>

        {/* ADMIN ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes allowedRoles={["admin"]} layout="admin" />
          }
        >
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/kontrak" element={<Kontrak />} />
          <Route path="/admin/coretaxify" element={<AdminCoretaxify />} />
          <Route path="/admin/edit-dosen" element={<EditDosen />} />
          <Route path="/admin/upload-soal" element={<UploadSoal />} />
          <Route path="/admin/praktikum" element={<AdminPraktikum />} />
          <Route
            path="/admin/praktikum/:assignmentId/members"
            element={<AdminPraktikumMember />}
          />
          <Route
            path="/admin/coretaxify/coretaxify-send"
            element={<CoretaxifySendDetail />}
          />
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
        <Route
          element={
            <RoleProtectedRoutes allowedRoles={["dosen"]} layout="admin" />
          }
        >
          <Route path="/dosen" element={<DashboardDosen />} />
          <Route path="/dosen/kelas" element={<DosenKelas />} />
          <Route
            path="/dosen/kelas/praktikum/:id"
            element={<DosenPraktikumKelas />}
          />
          <Route
            path="/dosen/kelas/:id/praktikum/:idpraktikum"
            element={<DosenPraktikumKelasMember />}
          />
          <Route path="/dosen/praktikum" element={<Praktikum />} />
          <Route path="/dosen/coretaxify" element={<DosenCoretaxify />} />
          <Route path="/dosen/penilaian" element={<DosenKelas />} />
          <Route
            path="/dosen/penilaian/kelas/:id"
            element={<DosenPraktikumKelas />}
          />
          <Route
            path="/dosen/penilaian/:id/praktikum/:idpraktikum"
            element={<DosenPraktikumKelasMember />}
          />
          <Route path="/dosen/ujian" element={<UjianDosen />} />
          <Route
            path="/dosen/ujian/:examId/members"
            element={<UjianDosenMember />}
          />
        </Route>

        {/* MAHASISWA ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes allowedRoles={["mahasiswa"]} layout="admin" />
          }
        >
          <Route path="/mahasiswa/kelas" element={<MahasiswaKelas />} />
          <Route
            path="/mahasiswa/kelas/:id"
            element={<MahasiswaPraktikumKelas />}
          />
          <Route
            path="/mahasiswa"
            element={<Navigate to="/mahasiswa/kelas" replace />}
          />
          <Route path="/mahasiswa/praktikum" element={<MahasiswaPraktikum />} />
          <Route path="/mahasiswa/ujian" element={<MahasiswaUjian />} />
        </Route>

        {/* PSC ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes allowedRoles={["psc"]} layout="admin" />
          }
        >
          <Route path="/psc/" element={<DashboardPsc />} />
          <Route path="/psc/coretaxify" element={<AdminPscCoretaxify />} />
          <Route path="/psc/master-soal" element={<UploadSoalPsc />} />
          <Route path="/psc/edit-pengajar" element={<EditPengajar />} />
          <Route path="/psc/edit-kelas" element={<EditKelasPsc />} />
          {/* <Route path="/psc/edit-kelas/1" element={<EditMahasiswaPscKelas />} /> */}
          <Route
            path="/psc/kelas/:groupId/mahasiswa"
            element={<EditMahasiswaPscKelas />}
          />
          {/* <Route path="/psc/kelas/:groupId/mahasiswa/:memberId" element={<MemberDetailPage />} /> */}
          <Route path="/psc/praktikum" element={<PraktikumPsc />} />
          <Route
            path="/psc/praktikum/:assignmentId/members"
            element={<AssignmentPscMember />}
          />
          <Route path="/psc/ujian" element={<ExamPsc />} />
          <Route
            path="/psc/ujian/:examId/members"
            element={<ExamPscMembers />}
          />
          <Route path="/psc/edit-mahasiswa" element={<EditMahasiswaPsc />} />
        </Route>
        {/* MAHASISWA-PSC ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes
              allowedRoles={["mahasiswa-psc"]}
              layout="admin"
            />
          }
        >
          <Route
            path="/mahasiswa-psc"
            element={<Navigate to="/mahasiswa-psc/kelas" replace />}
          />
          <Route path="/mahasiswa-psc/kelas" element={<MahasiswaPscKelas />} />
          <Route
            path="/mahasiswa-psc/kelas/:id/praktikum"
            element={<MahasiswaPscKelasPraktikum />}
          />
          {/* <Route path="/mahasiswa-psc/kelas/:id/praktikum/:idpraktikum" element={<MahasiswaPscPraktikumKelasMember />} /> */}
          <Route
            path="/mahasiswa-psc/praktikum"
            element={<MahasiswaPscPraktikum />}
          />
          <Route path="/mahasiswa-psc/ujian" element={<MahasiswaPscUjian />} />
        </Route>
        {/* PENGAJAR ROUTE */}
        <Route
          element={
            <RoleProtectedRoutes allowedRoles={["instruktur"]} layout="admin" />
          }
        >
          <Route
            path="/instruktur"
            element={<Navigate to="/instruktur/praktikum" replace />}
          />
          <Route
            path="/instruktur/praktikum"
            element={<InstrukturPraktikum />}
          />
          <Route
            path="/instruktur/praktikum/terisi"
            element={<FilledAssignment />}
          />
          <Route
            path="/instruktur/praktikum/kosong"
            element={<BlankAssignment />}
          />
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
        {/* <Route
          path="/admin/praktikum/profil-saya/informasi-umum/edit-data-profil"
          element={
            <>
              <Header />
              <EditDataProfil />
            </>
          }
        /> */}
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
              {/* query={} */}
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
        {/* <Route
          path="/admin/praktikum/1/prak1"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        /> */}
        <Route
          path="/praktikum/:id/"
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
          path="/praktikum/:id/sistem/:akun/profil-saya"
          element={
            <>
              {/* <p>12</p> */}
              {/* <Header />
              <ProfilSaya /> */}
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun`}
                OrangPribadi={ProfilSaya}
                Badan={ProfilSayaBadan}
                intent={"api.get.sistem.ikhtisar.profil"}
                query={"profil"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/alamat"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun`}
                OrangPribadi={AlamatSaya}
                Badan={AlamatSayaBadan}
                intent={"api.get.sistem.ikhtisar.profil"}
                query={"alamat"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/detail-kontak"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/detail-kontak`}
                OrangPribadi={DetailKontak}
                Badan={DetailKontakBadan}
                intent={"api.get.sistem.ikhtisar.profil"}
                query={"detail-kontak"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/pihak-terkait"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/pihak-terkait`}
                intent={""}
                OrangPribadi={PihakTerkait}
                Badan={PihakTerkaitBadan}
                query={"pihak-terkait"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/detail-bank"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/detail-bank`}
                intent={""}
                OrangPribadi={DetailBank}
                Badan={DetailBankBadan}
                query={""}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/data-unit-keluarga"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/unit-pajak-keluarga`}
                intent={""}
                OrangPribadi={DataUnitKeluarga}
                Badan={DataUnitKeluargaBadan}
                query={""}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/informasi-umum"
          // path="/admin/praktikum/1/profil-saya/informasi-umum"
          element={
            <>
              {/* <Header />
              <InformasiSaya /> */}
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun`}
                intent={"api.get.sistem.informasi.umum"}
                OrangPribadi={InformasiSaya}
                Badan={InformasiSayaBadan}
                query={"info"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/edit-informasi-umum"
          // path="/admin/praktikum/1/profil-saya/informasi-umum/edit-data-profil"
          element={
            <>
              {/* <Header />
              <EditDataProfil /> */}
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun`}
                intent={"api.get.sistem.edit.informasi.umum"}
                OrangPribadi={EditDataProfil}
                Badan={EditDataProfilBadan}
                query={"edit-info"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/e-faktur"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun`}
                intent={"api.get.sistem.edit.informasi.umum"}
                OrangPribadi={DashboardEFakturOP}
                Badan={DashboardEFaktur}
                query={"edit-info"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/e-faktur/pajak-keluaran"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/faktur`}
                intent={"api.get.faktur.pengirim"}
                OrangPribadi={PajakKeluaranOP}
                Badan={PajakKeluaranOP}
                query={"edit-info"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/e-faktur/pdf/:faktur"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/faktur/:faktur`}
                intent={""}
                OrangPribadi={FakturViewPDF}
                Badan={FakturViewPDF}
                query={""}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/e-faktur/pajak-keluaran/tambah-faktur-keluaran"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun`}
                intent={"api.get.sistem.edit.informasi.umum"}
                OrangPribadi={TambahFakturKeluaran}
                Badan={TambahFakturKeluaran}
                query={"edit-info"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/e-faktur/pajak-keluaran/edit-faktur-keluaran/:faktur"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun`}
                intent={"api.get.sistem.edit.informasi.umum"}
                OrangPribadi={EditFakturKeluaran}
                Badan={EditFakturKeluaran}
                query={"edit-info"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/e-faktur/pajak-masukan"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/faktur`}
                intent={"api.get.faktur.penerima"}
                OrangPribadi={PajakMasukanOP}
                Badan={PajakMasukan}
                query={"edit-info"}
              ></RoleBasedRenderer>
            </>
          }
        />
        {/* SPT */}

        <Route
          path="/praktikum/:id/sistem/:akun/surat-pemberitahuan-spt"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/spt`}
                intent={""}
                OrangPribadi={KonsepSPT}
                Badan={KonsepSPT}
                query={""}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/buat-konsep-spt"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={``}
                intent={""}
                OrangPribadi={BuatKonsepSPT}
                Badan={BuatKonsepSPT}
                query={""}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/buat-konsep-spt/:idSpt"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/spt/:idSpt`}
                intent={""}
                OrangPribadi={CreateKonsepSPT}
                Badan={CreateKonsepSPT}
                query={""}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/spt/pdf/:idSpt"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/spt/:idSpt`}
                intent={""}
                OrangPribadi={SPTViewPDF}
                Badan={SPTViewPDF}
                query={""}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/buat-konsep-spt-pph/:idSpt"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/spt/:idSpt`}
                intent={""}
                OrangPribadi={CreateKonsepPasal}
                Badan={CreateKonsepPasal}
                query={""}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/spt-pph/pdf/:idSpt"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/spt/:idSpt`}
                intent={""}
                OrangPribadi={SPTPPHViewPDF}
                Badan={SPTPPHViewPDF}
                query={""}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/buat-konsep-spt-unifikasi/:idSpt"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/spt/:idSpt`}
                intent={""}
                OrangPribadi={CreateKonsepUnifikasi}
                Badan={CreateKonsepUnifikasi}
                query={"buat-konsep-spt-unifikasi"}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/layanan-mandiri-kode-billing"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                // url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/spt`}
                url={`${RoutesApi.apiUrl}kap-kjs`}
                intent={""}
                // ppn: parseInt("12%".replace(/\D/g, ""), 10) || 0,
                OrangPribadi={SelfBilling}
                Badan={SelfBilling}
                query={"layanan-mandiri-kode-billing"}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/daftar-kode-billing-belum-dibayar"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/pembayaran`}
                intent={""}
                OrangPribadi={DaftarKodeBilingBelumBayar}
                Badan={DaftarKodeBilingBelumBayar}
                query={"daftar-kode-billing-belum-dibayar"}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/daftar-kode-billing-belum-dibayar/pdf/:billing"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/pembayaran/:billing`}
                intent={""}
                OrangPribadi={KodeBillingViewPDF}
                Badan={KodeBillingViewPDF}
                query={"pdf-billing"}
              ></RoleBasedRenderer>
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/riwayat-pembayaran"
          // path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/pembayaran`}
                intent={"api.get.sudah.pembayaran"}
                OrangPribadi={RiwayatBilling}
                Badan={RiwayatBilling}
                query={"riwayat-pembayaran"}
              ></RoleBasedRenderer>
            </>
            // <>
            //   <Header />
            //   <KonsepSPT />
            // </>
          }
        />
        <Route
          path="/pdf/faktur-keluaran"
          element={
            <>
              <div className="w-full h-screen">
                <ViewerPDF document={<FakturPajakKeluaranPdf />} />
              </div>
            </>
          }
        />
        <Route
          path="/pdf/bpespt"
          element={
            <>
              <div className="w-full h-screen">
                <ViewerPDF document={<BpeSptPdf />} />
              </div>
            </>
          }
        />
        <Route
          path="/pdf/sptppn"
          element={
            <>
              <div className="w-full h-screen">
                <ViewerPDF document={<SptPpnPdf />} />
              </div>
            </>
          }
        />
        <Route
          path="/pdf/billing-code"
          element={
            <>
              <div className="w-full h-screen">
                <ViewerPDF document={<BillingCodePdf />} />
              </div>
            </>
          }
        />
        <Route
          path="/pdf/sptmasa"
          element={
            <>
              <div className="w-full h-screen">
                <ViewerPDF document={<SptMasaPph21Pdf />} />
              </div>
            </>
          }
        />

        <Route
          path="/praktikum/:id/sistem/:akun/bupot/:type"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/bupot`}
                OrangPribadi={BUPOTWrapper}
                Badan={BUPOTWrapper}
                intent={"dynamic"}
                query={"bupot"}
              ></RoleBasedRenderer>
            </>
          }
        />

        <Route
          path="/praktikum/:id/sistem/:akun/bupot/:type/:status"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/bupot`}
                OrangPribadi={BUPOTWrapper}
                Badan={BUPOTWrapper}
                intent={"dynamic"}
                query={"bupot"}
              />
            </>
          }
        />

        {/* BUPOT Creation Routes */}
        <Route
          path="/praktikum/:id/sistem/:akun/bupot/:type/create"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/bupot`}
                OrangPribadi={BUPOTCreateWrapper}
                Badan={BUPOTCreateWrapper}
                intent={"dynamic"}
                query={"bupot-create"}
              />
            </>
          }
        />

        {/* BUPOT Editing Routes */}
        <Route
          path="/praktikum/:id/sistem/:akun/bupot/:type/:bupotId/edit"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/bupot`}
                OrangPribadi={BUPOTEditWrapper}
                Badan={BUPOTEditWrapper}
                intent={"dynamic"}
                query={"bupot-edit"}
              />
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/buku-besar"
          element={
            <>
              {/* <Header />
              <BukuBesar /> */}
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun`}
                OrangPribadi={BukuBesar}
                Badan={BukuBesar}
                intent={""}
                query={""}
              />
            </>
          }
        />
        <Route
          path="/praktikum/:id/sistem/:akun/master-akun"
          element={
            <>
              <RoleBasedRenderer
                url={`${RoutesApi.apiUrl}student/assignments/:id/sistem/:akun/sistem-tambahan`}
                OrangPribadi={MasterAkun}
                Badan={MasterAkun}
                intent={""}
                query={""}
              />
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
        <Route
          path="/admin/praktikum/1/e-faktur"
          element={
            <>
              <Header />
              <DashboardEFakturOP />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/e-faktur/pajak-keluaran"
          element={
            <>
              <Header />
              <PajakKeluaranOP />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/e-faktur/pajak-keluaran/tambah-faktur-keluaran"
          element={
            <>
              <Header />
              <TambahFakturKeluaranOP />
            </>
          }
        />
        <Route
          path="/admin/praktikum/1/e-faktur/pajak-masukan"
          element={
            <>
              <Header />
              <PajakMasukanOP />
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
          path="/tes/:id/:akun"
          element={
            <>
              <RoleBasedRenderer
                OrangPribadi={DashboardAdmin}
                Badan={DetailKontakBadan}
              ></RoleBasedRenderer>
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
        <Route
          path="/admin/praktikum/2/e-faktur"
          element={
            <>
              <Header />
              <DashboardEFaktur />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-keluaran"
          element={
            <>
              <Header />
              <PajakKeluaran />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/dokumen-lain/pajak-keluaran"
          element={
            <>
              <Header />
              <PajakKeluaranDokumenLain />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-keluaran/tambah-faktur-keluaran"
          element={
            <>
              <Header />
              <TambahFakturKeluaran />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/dokumen-lain/pajak-keluaran/tambah-faktur-keluaran"
          element={
            <>
              <Header />
              <TambahFakturKeluaranDokumenLain />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/e-faktur/pajak-masukan"
          element={
            <>
              <Header />
              {/* <PajakMasukan /> */}
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/surat-pemberitahuan-(spt)"
          element={
            <>
              <Header />
              <KonsepSPT />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/surat-pemberitahuan-(spt)/buat-konsep-spt"
          element={
            <>
              <Header />
              <BuatKonsepSPT />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt"
          element={
            <>
              <Header />
              <CreateKonsepSPT />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bukti-pemotongan-bulanan-pegawai-tetap"
          element={
            <>
              <Header />
              <BupotBulananPegawaiTetap />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bukti-pemotongan-bulanan-pegawai-tetap/telah-terbit"
          element={
            <>
              <Header />
              <BupotBulananPegawaiTetapTelahTerbit />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bukti-pemotongan-bulanan-pegawai-tetap/tidak-valid"
          element={
            <>
              <Header />
              <BupotBulananPegawaiTetapTidakValid />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bukti-pemotongan-bulanan-pegawai-tetap/tambah-bukti-pemotongan-bulanan-pegawai-tetap"
          element={
            <>
              <Header />
              <CreateEbupot />
            </>
          }
        />
        <Route
          path="admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt-pasal"
          element={
            <>
              <Header />
              <CreateKonsepPasal />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bppu"
          element={
            <>
              <Header />
              <BppuBelumTerbit />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bppu/tambah-bppu"
          element={
            <>
              <Header />
              <CreateBppu />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bppu/telah-terbit"
          element={
            <>
              <Header />
              <BppuTelahTerbit />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bppu/tidak-valid"
          element={
            <>
              <Header />
              <BppuTidakValid />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bpnr"
          element={
            <>
              <Header />
              <BpnrBelumTerbit />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bpnr/tambah-bpnr"
          element={
            <>
              <Header />
              <CreateBpnr />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bpnr/telah-terbit"
          element={
            <>
              <Header />
              <BpnrTelahTerbit />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/bpnr/tidak-valid"
          element={
            <>
              <Header />
              <BpnrTidakValid />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/layanan-mandiri-kode-billing"
          element={
            <>
              <Header />
              <SelfBilling />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/daftar-kode-billing-belum-dibayar"
          element={
            <>
              <Header />
              <DaftarKodeBilingBelumBayar />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/riwayat-pembayaran"
          element={
            <>
              <Header />
              <RiwayatBilling />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/riwayat-pembatalan"
          element={
            <>
              <Header />
              <RiwayatPembatalanBilling />
            </>
          }
        />

        {/* ROUTE BARU BELUM DIMASUKIN */}
        <Route
          path="/admin/praktikum/2/unifikasi"
          element={
            <>
              <Header />
              <CreateKonsepUnifikasi />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/notifikasi"
          element={
            <>
              <Header />
              <Notifikasi />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/kode-billing-atas-tagihan-pajak"
          element={
            <>
              <Header />
              <PembuatanKodeBillingAtasPajak />
            </>
          }
        />
        <Route
          path="/admin/praktikum/2/permohonan-pemindahbukuan"
          element={
            <>
              <Header />
              <PermohonanPemindahBukuan />
            </>
          }
        />
        {/* NOT FOUND ROUTE - LAST REGISTERED ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    // </BrowserRouter>
  );
};

export default Main;
