import React, { useState } from "react";
import { Bell, UserCircle, ChevronDown, FileText, LogOut, ChevronRight } from "lucide-react";
import Logo from "../../assets/images/5.png";
import { useUserType } from "../context/userTypeContext";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [subDropdownOpen, setSubDropdownOpen] = useState(null);
    const { userType, setUserType } = useUserType();
    console.log("User Type Context (Saat Render):", userType);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = (menu) => {
        setDropdownOpen(dropdownOpen === menu ? null : menu);
    };

    const toggleSubDropdown = (submenu) => {
        setSubDropdownOpen(subDropdownOpen === submenu ? null : submenu);
    };

    const navigateTo = (path) => {
        const userTypeId = userType === "Orang Pribadi" ? 1 : 2;
        window.location.href = `/admin/praktikum/${userTypeId}/${path.replace(/\s+/g, "-").toLowerCase()}`;
    };

    return (
        <div className="w-full">
            <header className="bg-slate-100 text-blue-900 flex justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 py-3 shadow-md w-full overflow-x-auto">
                <div className="flex items-center space-x-4 -mx-14">
                    <img src={Logo} alt="DJP Logo" className="h-10" />
                    <h1 className="text-lg font-bold">CORETAXIFY</h1>
                </div>
                <div className="flex items-center space-x-6 mr-1">
                    <FileText className="w-6 h-6 cursor-pointer" />
                    <Bell className="w-6 h-6 cursor-pointer" />
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <button
                            className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded-md shadow-md relative"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <UserCircle className="w-8 h-8" />
                            <span className="hidden md:inline">{userType}</span>
                            <ChevronDown className="w-5 h-5" />
                        </button>
                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <ul className="absolute right-14 top-14 mt-2 w-64 bg-white border rounded-md shadow-lg py-1 px-2">
                                <li
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        setUserType("Orang Pribadi");
                                        console.log("User Type Berubah ke:", "Orang Pribadi");
                                        setIsDropdownOpen(false);
                                        window.location.href = "/admin/praktikum/1/prak1";
                                    }}
                                >
                                    Orang Pribadi
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        setUserType("Badan");
                                        console.log("User Type Berubah ke:", "Badan");
                                        setIsDropdownOpen(false);
                                        window.location.href = "/admin/praktikum/2/prak1";
                                    }}
                                >
                                    Badan
                                </li>
                            </ul>
                        )}
                    </div>
                    <LogOut className="w-6 h-6 cursor-pointer text-red-600 font-bold" />
                </div>
            </header>
            <div className="w-full bg-purple-900 pt-1">
                <nav className="w-full bg-purple-900 pb-2 px-4">
                    <ul className="flex space-x-6 text-white flex-wrap">
                        {[
                            { label: "Portal Saya", submenu: ["Dokumen Saya", "Notifikasi Saya", "Kasus Saya", "Kasus Berjalan Saya", "Profil Saya", "Pengukuhan PKP", "Pendaftaran Objek Pajak PBB P5L", { label: "Perubahan Data", submenu: ["Perubahan Data", "Pengukuhan PKP", "Pendaftaran Objek Pajak PBB P5L"] }, { label: "Perubahan Status", submenu: ["Penetapan Wajib Pajak Nonaktif", "Pengaktifan Kembali Wajib Pajak Nonaktif", "Penunjuk Pemungut PMSE Dalam Negeri", "Penetapan Pemungut Bea Materai", "Pencabutan Pemungut Bea Materai", "Penunjukan Pemotong atau Pemungut PPh/PPN", "Pencabutan Pemotong atau Pemungut PPh/PPN", "Pencabutan Pemungut PPN PMSE", "Lembaga Keuangan Pelapor - Penetapan", "Lembaga Keuangan Pelapor - Pencabutan", "Lembaga Keuangan Pelapor - Perubahan Data"] }, "Pengahpusan & Pencabutan", "Profil Institusi Finansial"] },
                            { label: "E-Faktur", submenu: [] },
                            { label: "e-Bupot", submenu: ["BPPU", "BPNR", "Penyetoran Sendiri", "Pemotongan Secara Digunggung", "BP 21 - Bukti Pemotongan Selain Pegawai Tetap", "BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri", "BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir", "BP A2 - Bukti Pemotongan A1 Masa Pajak Terakhir", "Bukti Pemotongan Bulanan Pegawai Tetap", "Unggah Dokumen Yang Dipersamakan dengan Bukti Pemotongan/Pemungutan"] },
                            { label: "Surat Pemberitahuan(SPT)", submenu: ["Surat Pemberitahuan (SPT)", "Pencatatan", "Dasbor Kompensasi", "Pengungkapan Ketidakbenaran SPT"] },
                            { label: "Pembayaran", submenu: ["Permohonan Pemindahbukuan", "Layanan Mandiri Kode Billing", "Pembuatan Kode Billing atas Tagihan Pajak", "Daftar Kode Billing Belum Dibayar", "Formulir Restitusi Pajak", "Permohonan Pemberian Imbalan Bunga", "Permohonan PPh DTP atas Penghasilan PDAM", "Riwayat Pembayaran", "Riwayat Pembatalan"] },
                            { label: "Buku Besar", submenu: [] },
                        ].map((item, index) => (
                            <li key={index} className="relative">
                                {item.submenu.length > 0 ? (
                                    <button
                                        className="px-4 py-2 flex items-center hover:bg-yellow-500 hover:text-white rounded-md"
                                        onClick={() => toggleDropdown(item.label)}
                                    >
                                        {item.label} <ChevronDown className="w-4 h-4 ml-2" />
                                    </button>
                                ) : (
                                    <button
                                        className="px-4 py-2 flex items-center hover:bg-yellow-500 hover:text-white rounded-md"
                                        onClick={() => navigateTo(item.label)}
                                    >
                                        {item.label}
                                    </button>
                                )}
                                {item.submenu.length > 0 && dropdownOpen === item.label && (
                                    <ul className="absolute left-0 mt-3 min-w-max bg-blue-900 text-white shadow-md rounded-md">
                                        {item.submenu.map((sub, subIndex) => (
                                            <li key={subIndex} className="relative px-4 py-4 hover:bg-yellow-500 cursor-pointer whitespace-nowrap">
                                                {typeof sub === "string" ? (
                                                    <button onClick={() => navigateTo(sub)}>{sub}</button>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="flex items-center w-full"
                                                            onClick={() => toggleSubDropdown(sub.label)}
                                                        >
                                                            {sub.label} <ChevronRight className="w-4 h-4 ml-2" />
                                                        </button>
                                                        {sub.submenu && subDropdownOpen === sub.label && (
                                                            <ul className="absolute left-full mx-1 top-0 mt-0 min-w-max bg-blue-900 text-white shadow-md rounded-md text-left">
                                                                {sub.submenu.map((nestedSub, nestedIndex) => (
                                                                    <li key={nestedIndex} className="px-4 py-2 hover:bg-yellow-500 cursor-pointer whitespace-nowrap">
                                                                        <button onClick={() => navigateTo(nestedSub)}>{nestedSub}</button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
  return (
    <div className="w-full">
      <header className="bg-slate-100 text-blue-900 flex justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 py-3 shadow-md w-full overflow-x-auto">
        <div className="flex items-center space-x-4 -mx-14">
          <img src={Logo} alt="DJP Logo" className="h-10" />
          <h1 className="text-lg font-bold">CORETAXIFY</h1>
        </div>
        <div className="flex items-center space-x-6 mr-1">
          <FileText className="w-6 h-6 cursor-pointer" />
          <Bell className="w-6 h-6 cursor-pointer" />
          {representedCompanies &&
            representedCompanies.data &&
            representedCompanies.data.length > 0 && (
              <div className="flex items-center space-x-2 cursor-pointer ">
                <button
                  className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded-md shadow-md"
                  onClick={() =>
                    setIsCompanyDropdownOpen(!isCompanyDropdownOpen)
                  }
                >
                  <FileText className="w-6 h-6" />
                  <span className="hidden md:inline">
                    {viewAsCompanyId ? getActiveCompanyName() : "Pribadi"}
                  </span>
                  <ChevronDown className="w-5 h-5" />
                </button>

                {/* Dropdown menu for represented companies */}
                {isCompanyDropdownOpen && (
                  <ul className="absolute right-96 top-14 mt-2 w-64 bg-white border rounded-md shadow-lg py-1 px-2 z-50">
                    {representedCompanies.data.map((item) => (
                      <li
                        key={item.id}
                        className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                          viewAsCompanyId === item.id
                            ? "bg-gray-100 font-bold"
                            : ""
                        }`}
                        onClick={() =>
                          handleCompanyChange(
                            item.id,
                            item.nama_akun,
                            item.tipe_akun
                          )
                        }
                      >
                        {item.nama_akun}
                      </li>
                    ))}

                    <li
                      className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                        !viewAsCompanyId ? "bg-gray-100 font-bold" : ""
                      }`}
                      onClick={() => handleCompanyChange(null)}
                    >
                      Pribadi
                    </li>
                  </ul>
                )}
              </div>
            )}

          <div className="flex items-center space-x-2 cursor-pointer">
            <button
              className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded-md shadow-md relative"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <UserCircle className="w-8 h-8" />
              <span className="hidden md:inline">
                {(data && data.find((item) => item.id == akun)?.nama_akun) ||
                  "Pilih Akun Terlebih Dahulu"}
              </span>
              <ChevronDown className="w-5 h-5" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <ul className="absolute right-14 top-14 mt-2 w-64 bg-white border rounded-md shadow-lg py-1 px-2 z-50">
                <li className="px-4 py-1 mt-2 text-gray-500 text-sm font-semibold border-b">
                  Orang Pribadi
                </li>
                {data
                  .filter((item) => item.tipe_akun !== "Badan")
                  .map((item) => (
                    <li
                      key={item.id}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        // When switching accounts, remove viewAs parameter and navigate
                        const newPath = `/praktikum/${id}/sistem/${item.id}/profil-saya`;
                        navigate(newPath);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.nama_akun}
                    </li>
                  ))}
                {/* Badan accounts section */}
                <li className="px-4 py-1 text-gray-500 text-sm font-semibold border-b">
                  Badan
                </li>
                {data
                  .filter((item) => item.tipe_akun === "Badan")
                  .map((item) => (
                    <li
                      key={item.id}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        // When switching accounts, remove viewAs parameter and navigate
                        const newPath = `/praktikum/${id}/sistem/${item.id}/profil-saya`;
                        navigate(newPath);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.nama_akun}
                    </li>
                  ))}

                {/* Non-Badan accounts section */}
              </ul>
            )}
          </div>
          <AlertDialog>
            <AlertDialogTrigger>
              <LogOut className="w-6 h-6 cursor-pointer text-red-600 font-bold" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah anda yakin ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Setelah anda logout, anda akan kembali ke halaman login.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Kembali</AlertDialogCancel>
                <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      <div className="w-full bg-purple-700 pt-1">
        <nav className="w-full bg-purple-700 pb-2 px-4">
          <ul className="flex space-x-6 text-white">
            {[
              {
                label: "Portal Saya",
                submenu: [
                  "Dokumen Saya",
                  "Notifikasi Saya",
                  "Kasus Saya",
                  "Kasus Berjalan Saya",
                  {
                    label: "Profil Saya",
                    links: `/praktikum/${id}/sistem/${akun}/profil-saya`,
                  },
                  "Pengukuhan PKP",
                  "Pendaftaran Objek Pajak PBB P5L",
                  {
                    label: "Perubahan Data",
                    submenu: [
                      "Perubahan Data",
                      "Pengukuhan PKP",
                      "Pendaftaran Objek Pajak PBB P5L",
                    ],
                  },
                  {
                    label: "Perubahan Status",
                    submenu: [
                      "Penetapan Wajib Pajak Nonaktif",
                      "Pengaktifan Kembali Wajib Pajak Nonaktif",
                      "Penunjuk Pemungut PMSE Dalam Negeri",
                      "Penetapan Pemungut Bea Materai",
                      "Pencabutan Pemungut Bea Materai",
                      "Penunjukan Pemotong atau Pemungut PPh/PPN",
                      "Pencabutan Pemotong atau Pemungut PPh/PPN",
                      "Pencabutan Pemungut PPN PMSE",
                      "Lembaga Keuangan Pelapor - Penetapan",
                      "Lembaga Keuangan Pelapor - Pencabutan",
                      "Lembaga Keuangan Pelapor - Perubahan Data",
                    ],
                  },
                  "Pengahpusan & Pencabutan",
                  "Profil Institusi Finansial",
                ],
              },
              {
                label: "E-Faktur",
                links: `e-faktur`,
                submenu: [],
              },
              // {
              //   label: "e-Bupot",
              //   submenu: [
              //     "BPPU",
              //     "BPNR",
              //     "Penyetoran Sendiri",
              //     "Pemotongan Secara Digunggung",
              //     "BP 21 - Bukti Pemotongan Selain Pegawai Tetap",
              //     "BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri",
              //     "BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir",
              //     "BP A2 - Bukti Pemotongan A1 Masa Pajak Terakhir",
              //     "Bukti Pemotongan Bulanan Pegawai Tetap",
              //     "Unggah Dokumen Yang Dipersamakan dengan Bukti Pemotongan/Pemungutan",
              //   ],
              // },
              {
                label: "e-Bupot",
                submenu: [
                  {
                    label: "BPPU",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/bppu`,
                  },
                  {
                    label: "BPNR",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/bpnr`,
                  },
                  {
                    label: "Penyetoran Sendiri",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/ps`,
                  },
                  {
                    label: "Pemotongan Secara Digunggung",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/psd`,
                  },
                  {
                    label: "BP 21 - Bukti Pemotongan Selain Pegawai Tetap",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/bp21`,
                  },
                  {
                    label: "BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/bp26`,
                  },
                  {
                    label: "BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/bpa1`,
                  },
                  {
                    label: "BP A2 - Bukti Pemotongan A2 Masa Pajak Terakhir",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/bpa2`,
                  },
                  {
                    label: "Bukti Pemotongan Bulanan Pegawai Tetap",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/bpbpt`,
                  },
                  {
                    label:
                      "Unggah Dokumen Yang Dipersamakan dengan Bukti Pemotongan/Pemungutan",
                    links: `/praktikum/${id}/sistem/${akun}/bupot/dsbp`,
                  },
                ],
              },
              {
                label: "Surat Pemberitahuan(SPT)",
                submenu: [
                  {
                    label: "Surat Pemberitahuan (SPT)",
                    links: `/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt`,
                  },
                  "Pencatatan",
                  "Dasbor Kompensasi",
                  "Pengungkapan Ketidakbenaran SPT",
                ],
              },
              {
                label: "Pembayaran",
                submenu: [
                  "Permohonan Pemindahbukuan",
                  {
                    label: "Layanan Mandiri Kode Billing",
                    links: `/praktikum/${id}/sistem/${akun}/layanan-mandiri-kode-billing`,
                  },
                  // "Daftar Kode Billing Belum Dibayar",
                  "Pembuatan Kode Billing atas Tagihan Pajak",
                  {
                    label: "Daftar Kode Billing Belum Dibayar",
                    links: `/praktikum/${id}/sistem/${akun}/daftar-kode-billing-belum-dibayar`,
                  },
                  "Formulir Restitusi Pajak",
                  "Permohonan Pemberian Imbalan Bunga",
                  "Permohonan PPh DTP atas Penghasilan PDAM",
                  {
                    label: "Riwayat Pembayaran",
                    links: `/praktikum/${id}/sistem/${akun}/riwayat-pembayaran`,
                  },
                ],
              },
              { label: "Buku Besar", submenu: [] },
            ].map((item, index) => (
              <li
                key={index}
                className="relative"
                onClick={() => toggleDropdown(item.label)}
              >
                {item.submenu.length > 0 ? (
                  <button
                    ref={(el) => (buttonRefs.current[index] = el)}
                    className="px-4 py-2 flex items-center hover:bg-yellow-500 hover:text-white rounded-md"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label} <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 flex items-center hover:bg-yellow-500 hover:text-white rounded-md"
                    onClick={() => navigateTo(item.links)}
                  >
                    {item.label}
                  </button>
                )}
                {item.submenu.length > 0 && dropdownOpen === item.label && (
                  <ul
                    ref={(el) => (dropdownRefs.current[index] = el)}
                    className="absolute left-0 mt-3 min-w-max bg-purple-700 text-white shadow-md rounded-md z-50"
                  >
                    {item.submenu.map((sub, subIndex) => (
                      <li
                        key={subIndex}
                        className="relative px-4 py-4 hover:bg-yellow-500 cursor-pointer whitespace-nowrap"
                        onClick={() => {
                          const newPath = sub.links;
                          if (viewAsCompanyId) {
                            navigate(`${newPath}?viewAs=${viewAsCompanyId}`);
                          } else {
                            navigate(newPath);
                          }
                        }}
                      >
                        {typeof sub === "string" ? (
                          <button onClick={() => navigateTo(sub)}>{sub}</button>
                        ) : sub.links ? (
                          <button className="w-full text-left">
                            {sub.label}
                          </button>
                        ) : (
                          <>
                            <button
                              className="flex items-center w-full"
                              onClick={() => toggleSubDropdown(sub.label)}
                            >
                              {sub.label}{" "}
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                            {sub.submenu && subDropdownOpen === sub.label && (
                              <ul className="absolute left-full mx-1 top-0 mt-0 min-w-max bg-blue-900 text-white shadow-md rounded-md text-left z-50">
                                {sub.submenu.map((nestedSub, nestedIndex) => (
                                  <li
                                    key={nestedIndex}
                                    className="px-4 py-2 hover:bg-yellow-500 cursor-pointer whitespace-nowrap"
                                  >
                                    <button
                                      onClick={() => navigateTo(nestedSub)}
                                    >
                                      {nestedSub}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;