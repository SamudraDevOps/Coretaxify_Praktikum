import React, { useState } from "react";
import "./sidebar.css";
import {
  FaBars,
  FaBox,
  FaUsers,
  FaLaptopCode,
  FaChevronDown,
  FaUserCircle,
  FaFileAlt,
} from "react-icons/fa";
import { GiPieChart } from "react-icons/gi";
import Logo from "../../../../assets/images/7.png";
import ProfileIcon from "../../../../assets/images/wulan.png";
import { FaPencil } from "react-icons/fa6";
import { LuDatabaseBackup } from "react-icons/lu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { CookiesProvider, useCookies } from "react-cookie";

const SidebarAdmin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      const data = await axios.post(
        `${RoutesApi.login}`,
        {
          email: "admin@example.com",
          password: "password123",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      setCookie("token", data.data.token, { path: "/" });
      setCookie("role", data.data.user.roles[0].name, { path: "/" });
    },
  });

  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const logout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("role", { path: "/" });
    window.location.href = "/login";
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"} h-screen flex-col`}>
      {mutation.isPending ? (
        "logging in"
      ) : (
        <div className="admin-sidebar-header">
          {isOpen && (
            <img
              src={Logo}
              alt="CTaxify Logo"
              className="sidebar-logo"
              onClick={toggleSidebar}
            />
          )}
          <FaBars
            className={`menu-toggle w-full pr-6 mt-2 ${
              isOpen ? "hidden" : ""
            } `}
            onClick={toggleSidebar}
          />
        </div>
      )}
      <div className="flex-grow overflow-y-auto">
        <ul className="sidebar-menu">
          <li
            className={`menu-item ${
              cookies.role == "admin" ||
              cookies.role === "dosen" ||
              cookies.role === "psc"
                ? ""
                : "!hidden"
            }`}
            onClick={() => {
              window.location.href = "/admin";
            }}
          >
            <GiPieChart className="menu-icon" />
            {isOpen && <span>Dashboard</span>}
          </li>
          {cookies.role == "admin" ? (
            <li
              className="menu-item"
              onClick={() => {
                window.location.href = "/admin/kontrak";
              }}
            >
              <FaBox className="menu-icon" />
              {isOpen && <span>Kontrak</span>}
            </li>
          ) : (
            <></>
          )}
          <li
            className={`menu-item ${cookies.role === "dosen" ? "" : "!hidden"}`}
            onClick={() => {
              window.location.href = "/dosen/kelas";
            }}
          >
            <FaUsers className="menu-icon" />
            {isOpen && <span>Kelas</span>}
          </li>
          <div className={cookies.role === "mahasiswa" || cookies.role === "mahasiswa-psc" ? "" : "!hidden"}>
            <li
              className="menu-item"
              onClick={() => {
                window.location.href = `/${cookies.role}/kelas`;
              }}
            >
              <FaUsers className="menu-icon" />
              <span className={`text-[16px]`}>Kelas</span>
            </li>
          </div>
          <li
            className={cookies.role == "psc" || cookies.role == "instruktur" ? "!hidden " : `menu-item`}
            onClick={() => {
              if (cookies.role == "admin" || cookies.role == "dosen") {
                window.location.href = `/${cookies.role}/coretaxify`;
              } else {
                window.location.href = `/${cookies.role}/praktikum`;
              }
            }}
          >
            <FaLaptopCode className="menu-icon" />
            {isOpen && (
              <span>
                {cookies.role == "admin" || cookies.role == "dosen"
                  ? "Coretaxify"
                  : "Praktikum"}
              </span>
            )}
          </li>
          <li
            className={`menu-item ${
              cookies.role == "mahasiswa" || cookies.role === "dosen" || cookies.role === "mahasiswa-psc"
                ? ""
                : "!hidden"
            }`}
            onClick={() => {
              window.location.href = `/${cookies.role}/ujian`;
            }}
          >
            <FaPencil className="menu-icon" />
            {isOpen && <span>Ujian</span>}
          </li>
          <li
            className={`menu-item ${cookies.role === "dosen" ? "" : "!hidden"}`}
            onClick={() => {
              window.location.href = `/${cookies.role}/penilaian`;
            }}
          >
            <FaFileAlt className="menu-icon" />
            {isOpen && <span>Penilaian</span>}
          </li>
          <li
            className={`menu-item ${cookies.role == "admin" ? "" : "!hidden"}`}
            onClick={() => {
              window.location.href = "/admin/upload-soal";
            }}
          >
            <MdOutlineDriveFolderUpload className="menu-icon" />
            {isOpen && <span>Upload Soal</span>}
          </li>
          <li
            className={`menu-item ${cookies.role == "psc" ? "" : "!hidden"}`}
            onClick={() => {
              window.location.href = "/psc/master-soal";
            }}
          >
            <MdOutlineDriveFolderUpload className="menu-icon" />
            {isOpen && <span>Master Soal</span>}
          </li>
          <div
            className={
              cookies.role == "admin" || cookies.role == "psc" ? "" : "!hidden"
            }
          >
            <Accordion type="single" className="pl-4" collapsible>
              <AccordionItem
                value="item-1"
                className="border-none hover:no-underline"
              >
                <AccordionTrigger className="w-full ">
                  <div className="flex">
                    <FaUsers className="menu-icon" />
                    <span className={`text-[16px] ${isOpen ? "" : "hidden"}`}>
                      Data Pengguna
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`${isOpen ? "" : "hidden"}`}>
                  <ul className="">
                    <li
                      className={`dropdown-item  ${
                        cookies.role == "psc" || cookies.role == "admin"
                          ? ""
                          : "!hidden"
                      }`}
                      onClick={() => {
                        window.location.href = `/${cookies.role}/edit-kelas`;
                      }}
                    >
                      Kelas
                    </li>
                    <li
                      className={`dropdown-item  ${
                        cookies.role == "admin" ? "" : "!hidden"
                      }`}
                      onClick={() => {
                        window.location.href = `/${cookies.role}/edit-dosen`;
                      }}
                    >
                      Dosen
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = `/${cookies.role}/edit-mahasiswa`;
                      }}
                    >
                      Mahasiswa
                    </li>
                    <li
                      className={`dropdown-item  ${
                        cookies.role == "psc" ? "" : "!hidden"
                      }`}
                      onClick={() => {
                        window.location.href = "/psc/edit-pengajar";
                      }}
                    >
                      Pengajar
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = `/${cookies.role}/praktikum`;
                      }}
                    >
                      {isOpen && <span>Praktikum</span>}
                    </li>
                    <li
                      className={`dropdown-item  ${
                        cookies.role == "admin" ? "" : "!hidden"
                      }`}
                      onClick={() => {
                        window.location.href = "/admin/ujian";
                      }}
                    >
                      Ujian
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <li
              className={cookies.role != "psc" ? "!hidden " : `menu-item`}
              onClick={() => {
                window.location.href = `/psc/praktikum`;
              }}
            >
              <FaLaptopCode className="menu-icon" />
              {isOpen && <span>Coretaxify</span>}
            </li>
            <li
              className={`menu-item ${
                cookies.role == "psc" ? "" : "!hidden"
              }`}
              onClick={() => {
                window.location.href = `/${cookies.role}/ujian`;
              }}
            >
              <FaPencil className="menu-icon" />
              {isOpen && <span>Ujian</span>}
            </li>
            <li
              className={`menu-item ${cookies.role === "psc" ? "" : "!hidden"}`}
              onClick={() => {
                window.location.href = `/${cookies.role}/penilaian`;
              }}
            >
              <FaFileAlt className="menu-icon" />
              {isOpen && <span>Penilaian</span>}
            </li>
          </div>
          <div className={cookies.role == "admin" ? "" : "!hidden"}>
            <Accordion type="single" collapsible className="pl-4">
              <AccordionItem
                value="item-1"
                className="border-none hover:no-underline"
              >
                <AccordionTrigger className="w-full ">
                  <div className="flex">
                    <FaLaptopCode className="menu-icon" />
                    <span className={`text-[16px] ${isOpen ? "" : "hidden "}`}>
                      Landing Page
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`${isOpen ? "" : "hidden"}`}>
                  <ul className="">
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = "/admin/edit-artikel";
                      }}
                    >
                      Edit Artikel
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = "/admin/edit-ulasan";
                      }}
                    >
                      Edit Ulasan
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = "/admin/edit-landing-page/fitur";
                      }}
                    >
                      Fitur
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = "/admin/edit-landing-page/artikel";
                      }}
                    >
                      Artikel
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = "/admin/edit-landing-page/ulasan";
                      }}
                    >
                      Ulasan
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="pl-4">
              <AccordionItem
                value="item-1"
                className="border-none hover:no-underline"
              >
                <AccordionTrigger className="w-full ">
                  <div className="flex">
                    <LuDatabaseBackup className="menu-icon" />
                    <span className={`text-[16px] ${isOpen ? "" : "hidden "}`}>
                      Backup Data
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`${isOpen ? "" : "hidden"}`}>
                  <ul className="">
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = "/admin/kontrak-backup";
                      }}
                    >
                      Backup Kontrak
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = "/admin/praktikum-backup";
                      }}
                    >
                      Backup Praktikum
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className={cookies.role == "instruktur" ? "" : "!hidden"}>
            <Accordion type="single" collapsible className="pl-4">
              <AccordionItem
                value="item-1"
                className="border-none hover:no-underline"
              >
                <AccordionTrigger className="w-full ">
                  <div className="flex">
                    <FaLaptopCode className="menu-icon" />
                    <span className={`text-[16px] ${isOpen ? "" : "hidden "}`}>
                      Praktikum
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`${isOpen ? "" : "hidden"}`}>
                  <ul className="">
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = `/${cookies.role}/praktikum-kosong`;
                      }}
                    >
                      Praktikum Kosong
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        window.location.href = `/${cookies.role}/praktikum-terisi`;
                      }}
                    >
                      Praktikum Terisi
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ul>
      </div>

      <div className="sidebar-profile mt-auto">
        <div className="profile-header" onClick={toggleProfileDropdown}>
          <img src={ProfileIcon} alt="Profile" className="profile-icon" />
          {isOpen && (
            <>
              <span>Profile</span>
              <FaChevronDown
                className={`dropdown-icon ${
                  isProfileDropdownOpen ? "rotate" : ""
                }`}
              />
            </>
          )}
        </div>
        {isProfileDropdownOpen && isOpen && (
          <ul className="w-full mt-2 p-0">
            <li
              className="dropdown-item"
              onClick={() => {
                window.location.href = "/edit-profile";
              }}
            >
              Edit Profile
            </li>
            <li className="dropdown-item" onClick={logout}>
              Logout
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default SidebarAdmin;
