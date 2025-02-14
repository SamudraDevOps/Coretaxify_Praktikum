import React, { useState } from "react";
import { Bell, UserCircle, ChevronDown, FileText, LogOut } from "lucide-react";
import Logo from "../../assets/images/5.png";

const Header = () => {
          const [dropdownOpen, setDropdownOpen] = useState(null);

          const toggleDropdown = (menu) => {
                    setDropdownOpen(dropdownOpen === menu ? null : menu);
          };

          return (
                    <div>
                              <header className="bg-white text-blue-900 flex justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 py-3 shadow-md w-full">
                                        <div className="flex items-center space-x-4">
                                                  <img src={Logo} alt="DJP Logo" className="h-10" />
                                                  <h1 className="text-lg font-bold">CORETAXIFY</h1>
                                        </div>
                                        <div className="flex items-center space-x-6 mr-1">
                                                  <FileText className="w-6 h-6 cursor-pointer" />
                                                  <Bell className="w-6 h-6 cursor-pointer" />
                                                  <div className="flex items-center space-x-2 cursor-pointer">
                                                            <UserCircle className="w-8 h-8" />
                                                            <span className="hidden md:inline">3510145XXXXXXX</span>
                                                            <ChevronDown className="w-5 h-5" />
                                                  </div>
                                                  <LogOut className="w-6 h-6 cursor-pointer text-red-600 font-bold" />
                                        </div>
                              </header>

                              <div className="w-full bg-blue-900 pt-1">
                                        <nav className="w-full bg-blue-900 pb-2 px-4">
                                                  <ul className="flex space-x-6 text-white">
                                                            {[
                                                                      { label: "Portal Saya", submenu: ["Dokumen Saya", "Notifikasi Saya", "Kasus Saya", "Kasus Berjalan Saya", "Profil Saya"] },
                                                                      { label: "E-Faktur" },
                                                                      { label: "e-Bupot", submenu: ["Lihat Bupot", "Buat Bupot"] },
                                                                      { label: "Surat Pemberitahuan(SPT)", submenu: ["SPT Tahunan", "SPT Masa"] },
                                                                      { label: "Pembayaran", submenu: ["Cek Pembayaran", "Riwayat"] },
                                                                      { label: "Buku Besar" },
                                                            ].map((item, index) => (
                                                                      <li key={index} className="relative">
                                                                                <button
                                                                                          className="px-4 py-2 flex items-center hover:bg-white hover:text-blue-900 rounded-md"
                                                                                          onClick={() => toggleDropdown(item.label)}
                                                                                >
                                                                                          {item.label} <ChevronDown className="w-4 h-4 ml-2" />
                                                                                </button>
                                                                                {item.submenu && dropdownOpen === item.label && (
                                                                                          <ul className="absolute left-0 mt-2 w-48 bg-white text-black shadow-md rounded-md">
                                                                                                    {item.submenu.map((sub, subIndex) => (
                                                                                                              <li key={subIndex} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                                                                                        {sub}
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
