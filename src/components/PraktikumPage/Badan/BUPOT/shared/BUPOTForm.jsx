import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useParams } from "react-router";
import countryData from "../../../../../../src/all.json";
// import Select from "react-select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import BUPOTSidebar from "./BUPOTSidebar"; // Assuming you have a sidebar component
import { useObjekPajak } from "@/hooks/bupot/useObjekPajak";
import { useNpwp } from "@/hooks/bupot/useNpwp";

const BUPOTForm = ({
  type,
  title,
  sections = ["informasiUmum", "fasilitasPerpajakan", "dokumenReferensi"],
  onSubmit,
  sidebarTitle,
  initialData = {},
}) => {
  // State for accordion sections
  const [openSections, setOpenSections] = useState({
    informasiUmum: true,
    pajakPenghasilan: true,
    perhitunganPajakPenghasilan: true,
    fasilitasPerpajakan: true,
    dokumenReferensi: true,
    labaKotor: true,
    pengurang: true,
    perhitunganPph: true,
  });

  const [countries, setCountries] = useState(
    countryData.sort((a, b) => a.name.common.localeCompare(b.name.common))
  );

  const getBupot = () => {
    if (location.pathname.includes("/bppu")) return "BPPU";
    if (location.pathname.includes("/bpnr")) return "BPNR";
    if (location.pathname.includes("/ps")) return "Penyetoran Sendiri";
    if (location.pathname.includes("/psd"))
      return "Pemotongan Secara Digunggung";
    if (location.pathname.includes("/bp21")) return "BP 21";
    if (location.pathname.includes("/bp26")) return "BP 26";
    if (location.pathname.includes("/bpa1")) return "BP A1";
    if (location.pathname.includes("/bpa2")) return "BP A2";
    if (location.pathname.includes("/bpbpt")) return "BPBPT";
    // if (location.pathname.includes("/dsbp")) return "DSBP";
    return "DSBP";
  };

  const currentBupot = getBupot();

  const { objekPajak, loading: loadingObjekPajak } =
    useObjekPajak(currentBupot);

  const { npwp, loading: loadingNpwp } = useNpwp();

  // Helper to update multiple form fields
  const updateMultipleFields = (updates) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updates,
    }));
  };

  // Form data state
  const [formData, setFormData] = useState(initialData);

  // 2nd Form data state
  const [supportingFormData, setSupportingFormData] = useState({});

  // State for month options
  const [monthOption, setMonthOption] = useState([]);

  // Generate month option for the past 5 years
  useEffect(() => {
    const options = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // generate option for 5 years (60 months)
    for (let i = 0; i < 60; i++) {
      const targetMonth = currentMonth - i;

      // calculate the correct year and month
      const yearOffset = Math.floor(Math.abs(targetMonth) / 12);
      const adjustedYear =
        targetMonth < 0
          ? currentYear - yearOffset - 1
          : currentYear - Math.floor(i / 12);
      const adjustedMonth =
        targetMonth < 0
          ? 12 + (targetMonth % 12)
          : (currentMonth - (i % 12) + 12) % 12;

      // create date object for the first day of the month
      const date = new Date(adjustedYear, adjustedMonth, 1);

      // format display : "MONTH - YEAR"
      const monthName = date.toLocaleString("default", { month: "long" });
      const displayValue = `${monthName} ${adjustedYear}`;

      // format for value
      const month = String(adjustedMonth + 1).padStart(2, "0");
      const valueDate = `${adjustedYear}-${month}-01`;

      options.push({
        value: valueDate,
        label: displayValue,
      });
    }

    setMonthOption(options);
  }, []);

  // get url id for pembuat
  const getIdFromUrl = () => {
    // First check for viewAs parameter
    const urlParams = new URLSearchParams(window.location.search);
    const viewAsParam = urlParams.get("viewAs");

    if (viewAsParam) {
      return viewAsParam;
    }

    // If no viewAs parameter, extract the akun value from the URL path
    // URL pattern: /praktikum/:id/sistem/:akun/bupot/:type
    const pathMatch = window.location.pathname.match(/\/sistem\/([^/]+)/);
    if (pathMatch && pathMatch[1]) {
      return pathMatch[1];
    }

    return null;
  };

  // Helper to toggle sections
  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  // Helper to update form data
  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const updateSupportingFormData = (field, value) => {
    setSupportingFormData({
      ...supportingFormData,
      [field]: value,
    });
  };

  // Handle submitting the form
  const handleSubmit = (action) => {
    if (action === "save") {
      const updatedFormData = {
        ...formData,
        ["tipe_bupot"]: currentBupot,
        ["pembuat_id"]: getIdFromUrl(),
        ["status_penerbitan"]: "draft",
        ["status"]: "valid",
      };
      setFormData(updatedFormData); // Update the state for future renders
      console.log(updatedFormData); // Log the updated data
      onSubmit(updatedFormData, action); // Send the updated data
    }

    if (action === "draft") {
      const updatedFormData = {
        ...formData,
        ["tipe_bupot"]: currentBupot,
        ["pembuat_id"]: getIdFromUrl(),
        ["status_penerbitan"]: "draft",
        ["status"]: "invalid",
      };
      setFormData(updatedFormData);
      console.log(updatedFormData);
      onSubmit(updatedFormData, action);
    }
  };

  // Format rupiah helper
  const formatRupiah = (value) => {
    // Handle both string and number inputs
    if (value === null || value === undefined || value === "") {
      return "";
    }

    // Convert to string first, then extract numbers
    const stringValue = String(value);
    const numberString = stringValue?.replace(/[^\d]/g, "") || "";
    return new Intl.NumberFormat("id-ID").format(numberString);
  };

  const { id, akun, faktur } = useParams();

  // set nitku_dokumen to current
  useEffect(() => {
    const currentAkun = npwp.find((obj) => (obj.id = akun));
    updateFormData(
      "nitku_dokumen",
      currentAkun?.npwp_akun + "000000 - " + currentAkun?.nama_akun
    );
  }, [formData.jenis_dokumen]);

  // ✅ Alternative: Single useEffect with switch
  useEffect(() => {
    switch (currentBupot) {
      case "BPPU":
        const bppuCalculation =
          formData.dasar_pengenaan_pajak * (formData.tarif_pajak / 100);
        updateFormData("pajak_penghasilan", bppuCalculation);
        break;

      case "BPNR":
        const taxedRevenue =
          formData.dasar_pengenaan_pajak *
          (formData.persentase_penghasilan_bersih / 100);
        const bpnrCalculation = taxedRevenue * (formData.tarif_pajak / 100);
        updateFormData("pajak_penghasilan", bpnrCalculation);
        break;

      case "Penyetoran Sendiri":
        if (formData.kode_objek_pajak !== "28-411-01") {
          const psCalculation =
            formData.dasar_pengenaan_pajak * (formData.tarif_pajak / 100);
          updateFormData("pajak_penghasilan", psCalculation);
        } else {
          const dppIndo = parseFloat(supportingFormData.dpp_indo) || 0;
          const dppLn = parseFloat(supportingFormData.dpp_ln) || 0;
          const dpp = dppIndo + dppLn;
          
          const penghasilanIndo = parseFloat(supportingFormData.penghasilan_indo) || 0;
          const penghasilanLn = parseFloat(supportingFormData.penghasilan_ln) || 0;
          const penghasilan = penghasilanIndo + penghasilanLn;
          
          const penghasilanKredit = parseFloat(supportingFormData.penghasilan_kredit) || 0;
          const penghasilanDipotong = parseFloat(supportingFormData.penghasilan_dipotong) || 0;
          const pengurangan = penghasilanKredit + penghasilanDipotong;
          
          const total = penghasilan - pengurangan;
          updateMultipleFields({
            dasar_pengenaan_pajak: dpp,
            pajak_penghasilan: total,
          })
          updateSupportingFormData("penghasilan_dibayar", total);
        }
        break;

      case "Pemotongan Secara Digunggung":
        
        break;
      
      default:
        // Handle other BUPOT types or do nothing
        break;
    }
  }, [
    currentBupot,
    formData.dasar_pengenaan_pajak,
    formData.tarif_pajak,
    formData.persentase_penghasilan_bersih,
    formData.kode_objek_pajak,
    supportingFormData.dpp_indo,
    supportingFormData.dpp_ln,
    supportingFormData.penghasilan_indo,
    supportingFormData.penghasilan_ln,
    supportingFormData.penghasilan_kredit,
    supportingFormData.penghasilan_dipotong,
  ]);

  // set status
  useEffect(() => {
    updateFormData(
      "status",
      location.pathname.includes("/create") ? "normal" : "pembetulan"
    );
  }, [formData.masa_awal]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Include Sidebar */}
      {/* <BUPOTSidebar
        type={type}
        title={sidebarTitle || `${type.toUpperCase()}`}
        activePath="create" // Mark create as active
      /> */}

      <div className="flex-auto p-3 bg-white rounded-md h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-light text-yellow-500 mt-4">
            {title || `EBUPOT ${type.toUpperCase()}`}
          </h2>
        </div>

        {/* Render sections based on config */}
        {sections.includes("informasiUmum") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("informasiUmum")}
            >
              <h3 className="text-lg font-semibold">Informasi Umum</h3>
              {openSections.informasiUmum ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openSections.informasiUmum && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Informasi Umum */}

                {/* Bekerja di Lebih dari Satu Pemberi Kerja */}
                {(currentBupot === "BPBPT" || currentBupot === "BP A1") && (
                  <>
                    <div className="mt-4 flex justify-between gap-4">
                      <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                        Bekerja di Lebih dari Satu Pemberi Kerja
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-64 flex-auto border p-2 rounded appearance-none"
                        value={
                          formData.bekerja_di_lebih_dari_satu_pemberi_kerja ||
                          ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "bekerja_di_lebih_dari_satu_pemberi_kerja",
                            e.target.value
                          )
                        }
                        placehoder="Please Select"
                      >
                        <option value="">Please Select</option>
                        <option value="true">Ya</option>
                        <option value="false">Tidak</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Masa Awal Pajak / Masa Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    {/* {currentBupot === "BP A1" || currentBupot === "BP A2"
                      ? "Masa Awal Pajak"
                      : "Masa Pajak"} */}
                    {currentBupot === "BP A1"
                      ? "Masa Awal Periode Penghasilan"
                      : currentBupot === "BP A2"
                      ? "Masa Pajak Awal"
                      : "Masa Pajak"}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    value={
                      formData.masa_awal
                        ? formData.masa_awal.substring(0, 7)
                        : ""
                    }
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    placeholder="Tanggal Lahir"
                    onChange={(e) => {
                      // Append "-01" to make it a valid date in YYYY-MM-DD format
                      const selectedMonth = e.target.value;
                      const formattedDate = selectedMonth
                        ? `${selectedMonth}-01`
                        : "";
                      updateFormData("masa_awal", formattedDate);
                    }}
                  />
                </div>

                {/* Masa Akhir Pajak */}
                {(currentBupot === "BP A1" || currentBupot === "BP A2") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      {currentBupot === "BP A1"
                        ? "Masa Akhir Periode Penghasilan"
                        : "Masa Pajak Akhir"}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={
                        formData.masa_akhir
                          ? formData.masa_akhir.substring(0, 7)
                          : ""
                      }
                      className="w-64 flex-auto border p-2 rounded appearance-none"
                      placeholder="Tanggal Lahir"
                      onChange={(e) => {
                        // Append "-01" to make it a valid date in YYYY-MM-DD format
                        const selectedMonth = e.target.value;
                        const formattedDate = selectedMonth
                          ? `${selectedMonth}-01`
                          : "";
                        updateFormData("masa_akhir", formattedDate);
                      }}
                    />
                  </div>
                )}

                {/* STATUS */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Status
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.status || ""}
                    onChange={(e) => updateFormData("status", e.target.value)}
                    // placehoder="Please Select"
                    disabled={true}
                  >
                    <option value="">Please Select</option>
                    <option value="normal">Normal</option>
                    <option value="pembetulan">Pembetulan</option>
                  </select>
                </div>

                {/* Pegawai Asing */}
                {(currentBupot === "BPBPT" || currentBupot === "BP A1") && (
                  <>
                    <div className="mt-4 flex justify-between gap-4">
                      <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                        Pegawai Asing
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-64 flex-auto border p-2 rounded appearance-none"
                        value={formData.pegawai_asing || ""}
                        onChange={(e) =>
                          updateFormData("pegawai_asing", e.target.value)
                        }
                        placehoder="Please Select"
                      >
                        <option value="">Please Select</option>
                        <option value="true">Ya</option>
                        <option value="false">Tidak</option>
                      </select>
                    </div>
                  </>
                )}

                {/* NPWP */}
                {(currentBupot === "BPPU" ||
                  currentBupot === "BP 21" ||
                  currentBupot === "BP A1" ||
                  currentBupot === "BP A2" ||
                  currentBupot === "BPBPT") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      NPWP
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-64 flex-auto border p-2 rounded appearance-none"
                      value={formData.npwp_akun || ""}
                      onChange={(e) => {
                        const selectedValue = e.target.value;

                        const selectedObject = npwp.find(
                          (obj) => obj.npwp_akun === selectedValue
                        );

                        if (selectedObject) {
                          updateMultipleFields({
                            npwp_akun: selectedObject.npwp_akun,
                            nama_akun: selectedObject.nama_akun,
                            nitku:
                              selectedObject.npwp_akun +
                              "000000 - " +
                              selectedObject.nama_akun,
                          });
                        } else {
                          updateFormData("npwp_akun", e.target.value);
                        }
                      }}
                      disabled={loadingNpwp}
                    >
                      <option value="">Please Select</option>
                      {npwp.map((obj) => (
                        <option key={obj.id} value={obj.npwp_akun}>
                          {obj.npwp_akun}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Nama */}
                {(currentBupot === "BPPU" ||
                  currentBupot === "BP 21" ||
                  currentBupot === "BP A1" ||
                  currentBupot === "BP A2" ||
                  currentBupot === "BPBPT") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Nama
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Nama"
                      value={formData.nama_akun || ""}
                      onChange={(e) => {
                        updateFormData("nama_akun", e.target.value);
                      }}
                      readOnly={true}
                    />
                  </div>
                )}

                {/* Alamat */}
                {(currentBupot === "BPBPT" ||
                  currentBupot === "BP A1" ||
                  currentBupot === "BP A2") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Alamat
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Alamat"
                      value={formData.alamat_utama_akun || ""}
                      onChange={(e) => {
                        updateFormData("alamat_utama_akun", e.target.value);
                      }}
                      readOnly={true}
                    />
                  </div>
                )}

                {/* Nomor Paspor */}
                {(currentBupot === "BPBPT" || currentBupot === "BP A1") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Nomor Paspor
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Nomor Paspor"
                      value={
                        formData.pegawai_asing === "true"
                          ? formData.nomor_paspor_akun || ""
                          : ""
                      }
                      onChange={(e) => {
                        updateFormData("nomor_paspor_akun", e.target.value);
                      }}
                      readOnly={
                        formData.pegawai_asing === "true" ? false : true
                      }
                    />
                  </div>
                )}

                {/* Negara */}
                {(currentBupot === "BPBPT" || currentBupot === "BP A1") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Negara
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-64 flex-auto border p-2 rounded appearance-none"
                      value={
                        formData.pegawai_asing === "true"
                          ? formData.negara_akun || ""
                          : ""
                      }
                      onChange={(e) =>
                        updateFormData("negara_akun", e.target.value)
                      }
                      placehoder="Please Select"
                      readOnly={
                        formData.pegawai_asing === "true" ? false : true
                      }
                    >
                      <option value="">Please Select</option>
                      {countries.map((country) => (
                        <option key={country.cca3} value={country.name.common}>
                          {country.name.common}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* NIP/NRP */}
                {currentBupot === "BP A2" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      NIP/NRP
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="NIP/NRP"
                      value={formData.nip_akun || ""}
                      onChange={(e) => {
                        updateFormData("nip_akun", e.target.value);
                      }}
                      readOnly={true}
                    />
                  </div>
                )}

                {/* Jenis Kelamin */}
                {(currentBupot === "BP A1" || currentBupot === "BP A2") && (
                  <>
                    <div className="mt-4 flex justify-between gap-4">
                      <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                        Jenis Kelamin
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-64 flex-auto border p-2 rounded appearance-none"
                        value={formData.jenis_kelamin_akun || ""}
                        onChange={(e) =>
                          updateFormData("jenis_kelamin_akun", e.target.value)
                        }
                        placehoder="Please Select"
                      >
                        <option value="">Please Select</option>
                        <option value="Laki-Laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Pangkat/Golongan */}
                {currentBupot === "BP A2" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Pangkat/Golongan
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Pangkat/Golongan"
                      value={formData.pangkat_golongan_akun || ""}
                      onChange={(e) => {
                        updateFormData("pangkat_golongan_akun", e.target.value);
                      }}
                      readOnly={true}
                    />
                  </div>
                )}

                {/* Status PTKP */}
                {(currentBupot === "BPBPT" ||
                  currentBupot === "BP A1" ||
                  currentBupot === "BP A2") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Status PTKP
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-64 flex-auto border p-2 rounded appearance-none"
                      value={formData.ptkp_akun || ""}
                      onChange={(e) =>
                        updateFormData("ptkp_akun", e.target.value)
                      }
                      placehoder="Please Select"
                    >
                      <option value="">Please Select</option>
                      <option value="K/0">K/0</option>
                      <option value="K/1">K/1</option>
                      <option value="K/2">K/2</option>
                      <option value="K/3">K/3</option>
                      <option value="TK/0">TK/0</option>
                      <option value="TK/1">TK/1</option>
                      <option value="TK/2">TK/2</option>
                      <option value="TK/3">TK/3</option>
                    </select>
                  </div>
                )}

                {/* Posisi */}
                {(currentBupot === "BPBPT" ||
                  currentBupot === "BP A1" ||
                  currentBupot === "BP A2") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Posisi
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Posisi"
                      value={formData.posisi_akun || ""}
                      onChange={(e) => {
                        updateFormData("posisi_akun", e.target.value);
                      }}
                      readOnly={true}
                    />
                  </div>
                )}

                {/* Nama Objek Pajak */}
                {(currentBupot === "BP A1" || currentBupot === "BP A2") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Nama Objek Pajak (Under Construction)
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-64 flex-auto border p-2 rounded appearance-none"
                      value={formData.nama_objek_pajak || ""}
                      onChange={(e) =>
                        updateFormData("nama_objek_pajak", e.target.value)
                      }
                      placehoder="Please Select"
                    >
                      <option value="">Please Select</option>
                      <option value="objek1">objek1</option>
                      <option value="objek2">objek2</option>
                      <option value="objek3">objek3</option>
                    </select>
                  </div>
                )}

                {/* Jenis Pajak */}
                {(currentBupot === "BP A1" || currentBupot === "BP A2") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Jenis Pajak
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Jenis Pajak"
                      value={formData.jenis_pajak || ""}
                      onChange={(e) => {
                        updateFormData("jenis_pajak", e.target.value);
                      }}
                    />
                  </div>
                )}

                {/* Kode Objek Pajak */}
                {(currentBupot === "BP A1" || currentBupot === "BP A2") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Kode Objek Pajak
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Kode Objek Pajak"
                      value={formData.kode_objek_pajak || ""}
                      onChange={(e) => {
                        updateFormData("kode_objek_pajak", e.target.value);
                      }}
                    />
                  </div>
                )}

                {/* Jenis Pemotongan */}
                {(currentBupot === "BP A1" || currentBupot === "BP A2") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Jenis Pemotongan
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-64 flex-auto border p-2 rounded appearance-none"
                      value={formData.jenis_pemotongan || ""}
                      onChange={(e) =>
                        updateFormData("jenis_pemotongan", e.target.value)
                      }
                      placehoder="Please Select"
                    >
                      <option value="">Please Select</option>
                      <option value="Kurang dari Setahun">
                        Kurang dari Setahun
                      </option>
                      <option value="Kurang dari Setahun yang Penghasilannya Disetahunkan">
                        Kurang dari Setahun yang Penghasilannya Disetahunkan
                      </option>
                      <option value="Setahun Penuh">Setahun Penuh</option>
                    </select>
                  </div>
                )}

                {/* NITKU */}
                {(currentBupot === "BPPU" || currentBupot === "BP 21") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      NITKU
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Nama"
                      value={formData.nitku || ""}
                      onChange={(e) => {
                        updateFormData("nitku", e.target.value);
                      }}
                      readOnly={true}
                    />
                  </div>
                )}
                {/* Other Informasi Umum fields */}
                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("pajakPenghasilan") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("pajakPenghasilan")}
            >
              <h3 className="text-lg font-semibold">Pajak Penghasilan</h3>
              {openSections.pajakPenghasilan ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.pajakPenghasilan && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Informasi Umum */}
                {/* ... */}

                {/* Status PTKP */}
                {currentBupot === "BP 21" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Status PTKP
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-64 flex-auto border p-2 rounded appearance-none"
                      value={formData.ptkp_akun || ""}
                      onChange={(e) =>
                        updateFormData("ptkp_akun", e.target.value)
                      }
                      placehoder="Please Select"
                    >
                      <option value="">Please Select</option>
                      <option value="K/0">K/0</option>
                      <option value="K/1">K/1</option>
                      <option value="K/2">K/2</option>
                      <option value="K/3">K/3</option>
                      <option value="TK/0">TK/0</option>
                      <option value="TK/1">TK/1</option>
                      <option value="TK/2">TK/2</option>
                      <option value="TK/3">TK/3</option>
                    </select>
                  </div>
                )}

                {/* Fasilitas Pajak Yang Dimiliki oleh Penerima Penghasilan */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Fasilitas Pajak Yang Dimiliki oleh Penerima Penghasilan
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.fasilitas_pajak || ""}
                    onChange={(e) =>
                      updateMultipleFields({
                        fasilitas_pajak: e.target.value,
                        nama_objek_pajak: "",
                        jenis_pajak: "",
                        kode_objek_pajak: "",
                        tarif_pajak: "",
                        sifat_pajak_penghasilan: "",
                      })
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    <option value="fasilitas_lainnya">Fasilitas Lainnya</option>
                    <option value="pph_ditanggung_pemerintah">
                      Pph Ditanggung Pemerintah (DTP)
                    </option>
                    <option value="tanpa_fasilitas">Tanpa Fasilitas</option>
                  </select>
                </div>

                {/* Nama Objek Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nama Objek Pajak (Under Construction)
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.nama_objek_pajak || ""}
                    onChange={(e) => {
                      const selectedValue = e.target.value;

                      const selectedObject = objekPajak.find(
                        (obj) => obj.nama_objek_pajak === selectedValue
                      );

                      if (selectedObject) {
                        updateMultipleFields({
                          nama_objek_pajak: selectedObject.nama_objek_pajak,
                          jenis_pajak: selectedObject.jenis_pajak,
                          kode_objek_pajak: selectedObject.kode_objek_pajak,
                          tarif_pajak: selectedObject.tarif_pajak,
                          sifat_pajak_penghasilan:
                            selectedObject.sifat_pajak_penghasilan,
                          kap: selectedObject.kap,
                        });
                      } else {
                        updateFormData("nama_objek_pajak", e.target.value);
                      }
                    }}
                    disabled={loadingObjekPajak}
                  >
                    <option value="">Please Select</option>
                    {objekPajak.map((obj) => (
                      <option key={obj.id} value={obj.nama_objek_pajak}>
                        {obj.nama_objek_pajak}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Jenis Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jenis Pajak
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Jenis Pajak"
                    value={formData.jenis_pajak || ""}
                    onChange={(e) => {
                      updateFormData("jenis_pajak", e.target.value);
                    }}
                  />
                </div>

                {/* Kode Objek Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Kode Objek Pajak
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Kode Objek Pajak"
                    value={formData.kode_objek_pajak || ""}
                    onChange={(e) => {
                      updateFormData("kode_objek_pajak", e.target.value);
                    }}
                  />
                </div>

                {/* Sifat Pajak Penghasilan */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Sifat Pajak Penghasilan
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Sifat Pajak Penghasilan"
                    value={formData.sifat_pajak_penghasilan || ""}
                    onChange={(e) => {
                      updateFormData("sifat_pajak_penghasilan", e.target.value);
                    }}
                  />
                </div>

                {/* Untuk 21-401-0 dan 21-401-02 */}
                {(formData.kode_objek_pajak === "21-401-01" ||
                  formData.kode_objek_pajak === "21-401-02") && (
                  <>
                    <div className="mt-4 flex justify-between gap-4">
                      Pendapatan Bruto yang Telah Dibayar Sebelumnya (Khusus
                      untuk Kode Objek Pajak 21-401-01 dan 21-401-02) jika
                      terdapat pembayaran lebih dari sekali dalam periode 2
                      tahun
                    </div>
                    <div className="mt-4 flex justify-between gap-4">
                      <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                        Jumlah
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-64 flex-auto border p-2 rounded"
                        placeholder="Jumlah"
                        value={formData.bruto_2_tahun || ""}
                        onChange={(e) => {
                          updateFormData("bruto_2_tahun", e.target.value);
                        }}
                      />
                    </div>
                  </>
                )}

                {currentBupot === "Penyetoran Sendiri" &&
                  formData.kode_objek_pajak === "28-411-01" && (
                    <>
                      {/* ROW 1 */}
                      <div className="mt-4 flex justify-end gap-4">
                        <div className="w-64 flex-none block text-sm font-medium text-gray-700"></div>
                        <label className="w-64 flex-auto text-right">
                          Dasar Pengenaan Pajak
                        </label>
                        <label className="w-64 flex-auto text-right">
                          Pajak Penghasilan (Rp)
                        </label>
                      </div>

                      {/* ROW 2 */}
                      <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                          Penghasilan Dari Indonesia
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-64 flex-auto border p-2 rounded"
                          placeholder="Dasar Pengenaan Pajak Indonesia"
                          value={
                            formatRupiah(supportingFormData.dpp_indo) || ""
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^\d]/g,
                              ""
                            );
                            updateSupportingFormData("dpp_indo", rawValue);
                          }}
                        />
                        <input
                          type="text"
                          className="w-64 flex-auto border p-2 rounded"
                          placeholder="Pajak Penghasilan Indonesia"
                          value={
                            formatRupiah(supportingFormData.penghasilan_indo) ||
                            ""
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^\d]/g,
                              ""
                            );
                            updateSupportingFormData(
                              "penghasilan_indo",
                              rawValue
                            );
                          }}
                        />
                      </div>

                      {/* ROW 3 */}
                      <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                          Penghasilan Dari Luar Negeri
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-64 flex-auto border p-2 rounded"
                          placeholder="Dasar Pengenaan Pajak Luar Negeri"
                          value={formatRupiah(supportingFormData.dpp_ln) || ""}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^\d]/g,
                              ""
                            );
                            updateSupportingFormData("dpp_ln", rawValue);
                          }}
                        />
                        <input
                          type="text"
                          className="w-64 flex-auto border p-2 rounded"
                          placeholder="Pajak Penghasilan Luar NEgeri"
                          value={
                            formatRupiah(supportingFormData.penghasilan_ln) ||
                            ""
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^\d]/g,
                              ""
                            );
                            updateSupportingFormData(
                              "penghasilan_ln",
                              rawValue
                            );
                          }}
                        />
                      </div>

                      {/* ROW 4 */}
                      <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                          Pajak Penghasilan Pasal 24 yang dapat dikreditkan
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="w-64 flex-auto"></div>
                        <input
                          type="text"
                          className="w-64 flex-auto border p-2 rounded"
                          placeholder="Pajak Penghasilan Pasal 24 yang dapat dikreditkan"
                          value={
                            formatRupiah(
                              supportingFormData.penghasilan_kredit
                            ) || ""
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^\d]/g,
                              ""
                            );
                            updateSupportingFormData(
                              "penghasilan_kredit",
                              rawValue
                            );
                          }}
                        />
                      </div>

                      {/* ROW 5 */}
                      <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                          Pajak Penghasilan yang Dipotong oleh Pihak Lain
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="w-64 flex-auto"></div>
                        <input
                          type="text"
                          className="w-64 flex-auto border p-2 rounded"
                          placeholder="Pajak Penghasilan yang Dipotong oleh Pihak Lain"
                          value={
                            formatRupiah(
                              supportingFormData.penghasilan_dipotong
                            ) || ""
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^\d]/g,
                              ""
                            );
                            updateSupportingFormData(
                              "penghasilan_dipotong",
                              rawValue
                            );
                          }}
                        />
                      </div>

                      {/* ROW 6 */}
                      <div className="mt-4 flex justify-between gap-4">
                        <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                          Pajak Penghasilan yang dibayar sendiri
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="w-64 flex-auto"></div>
                        <input
                          type="text"
                          className="w-64 flex-auto border p-2 rounded"
                          placeholder="Pajak Penghasilan yang dibayar sendiri"
                          value={
                            formatRupiah(
                              supportingFormData.penghasilan_dibayar
                            ) || ""
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^\d]/g,
                              ""
                            );
                            updateSupportingFormData(
                              "penghasilan_dibayar",
                              rawValue
                            );
                          }}
                          readOnly={true}
                        />
                      </div>
                    </>
                  )}

                {/* Penghasilan Bruto / Dasar Pengenaan Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    {currentBupot === "BP 21"
                      ? "Penghasilan Bruto (Rp)"
                      : "Dasar Pengenaan Pajak"}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Dasar Pengenaan Pajak"
                    value={formatRupiah(formData.dasar_pengenaan_pajak) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("dasar_pengenaan_pajak", rawValue);
                    }}
                    readOnly={
                      formData.kode_objek_pajak === "28-411-01" ? true : false
                    }
                  />
                </div>

                {/* DPP (%) Khusus BP21 */}
                {currentBupot === "BP 21" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      DPP (%)
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="DPP (%)"
                      value={formData.persentase_penghasilan_bersih || ""}
                      onChange={(e) => {
                        updateFormData(
                          "persentase_penghasilan_bersih",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                )}

                {/* Tarif (%) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Tarif (%)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Tarif (%)"
                    value={formData.tarif_pajak || ""}
                    onChange={(e) => {
                      updateFormData("tarif_pajak", e.target.value);
                    }}
                    readOnly={
                      formData.fasilitas_pajak === "fasilitas_lainnya"
                        ? false
                        : true
                    }
                  />
                </div>

                {/* Pajak Penghasilan (Rp) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Pajak Penghasilan (Rp)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Pajak Penghasilan (Rp)"
                    value={formatRupiah(formData.pajak_penghasilan) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("pajak_penghasilan", rawValue);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* KAP */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    KAP
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="KAP"
                    value={formData.kap || ""}
                    onChange={(e) => {
                      updateFormData("kap", e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {sections.includes("perhitunganPajakPenghasilan") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("perhitunganPajakPenghasilan")}
            >
              <h3 className="text-lg font-semibold">
                Perhitungan Pajak Penghasilan
              </h3>
              {openSections.perhitunganPajakPenghasilan ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.perhitunganPajakPenghasilan && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Perhitungan Pajak Penghasilan */}
                {/* ... */}

                {/* Nama Fasilitas */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nama Fasilitas
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.fasilitas_pajak || ""}
                    onChange={(e) =>
                      updateMultipleFields({
                        fasilitas_pajak: e.target.value,
                        nama_objek_pajak: "",
                        jenis_pajak: "",
                        kode_objek_pajak: "",
                        tarif_pajak: "",
                        sifat_pajak_penghasilan: "",
                        recipient_number: "",
                      })
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    <option value="fasilitas_lainnya">Fasilitas Lainnya</option>
                    {currentBupot === "BP 26" && (
                      <option value="pph_ditanggung_pemerintah">
                        Pph Ditanggung Pemerintah (DTP)
                      </option>
                    )}
                    <option value="surat_keterangan_domisili">
                      Surat Keterangan Domisili (SKD)
                    </option>
                    <option value="tanpa_fasilitas">Tanpa Fasilitas</option>
                  </select>
                </div>

                {/* Recipient Number only if fasilitas_pajak = skd */}
                {(currentBupot === "BPNR" && formData.fasilitas_pajak === "surat_keterangan_domisili") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Recipient Number
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Recipient Number"
                      value={formData.recipient_number || ""}
                      onChange={(e) => {
                        updateFormData("recipient_number", e.target.value);
                      }}
                    />
                  </div>
                )}

                {/* NPWP */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    NPWP
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.npwp_akun || ""}
                    onChange={(e) => {
                      const selectedValue = e.target.value;

                      const selectedObject = npwp.find(
                        (obj) => obj.npwp_akun === selectedValue
                      );

                      if (selectedObject) {
                        updateMultipleFields({
                          npwp_akun: selectedObject.npwp_akun,
                          nama_akun: selectedObject.nama_akun,
                          alamat_utama_akun: selectedObject.alamat_utama_akun,
                          nitku:
                            selectedObject.npwp_akun +
                            "000000 - " +
                            selectedObject.nama_akun,
                        });
                      } else {
                        updateFormData("npwp_akun", e.target.value);
                      }
                    }}
                    disabled={loadingNpwp}
                  >
                    <option value="">Please Select</option>
                    {npwp.map((obj) => (
                      <option key={obj.id} value={obj.npwp_akun}>
                        {obj.npwp_akun}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nama */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nama
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Nama"
                    value={formData.nama_akun || ""}
                    onChange={(e) => {
                      updateFormData("nama_akun", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Alamat */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Alamat
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Alamat"
                    value={formData.alamat_utama_akun || ""}
                    onChange={(e) => {
                      updateFormData("alamat_utama_akun", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Negara */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Negara
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.negara_akun || ""}
                    onChange={(e) =>
                      updateFormData("negara_akun", e.target.value)
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    {countries.map((country) => (
                      <option key={country.cca3} value={country.name.common}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tanggal Lahir */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Tanggal Lahir
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Tanggal Lahir"
                    value={formData.tanggal_lahir_akun || ""}
                    onChange={(e) => {
                      updateFormData("tanggal_lahir_akun", e.target.value);
                    }}
                  />
                </div>

                {/* Tempat Lahir */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Tempat Lahir
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Tempat Lahir"
                    value={formData.tempat_lahir_akun || ""}
                    onChange={(e) =>
                      updateFormData("tempat_lahir_akun", e.target.value)
                    }
                  />
                </div>

                {/* Nomor Paspor */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nomor Paspor
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Nomor Paspor"
                    value={formData.nomor_paspor_akun || ""}
                    onChange={(e) => {
                      updateFormData("nomor_paspor_akun", e.target.value);
                    }}
                  />
                </div>

                {/* Nomor KITAS / KITAP */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nomor KITAS / KITAP
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Nomor KITAS / KITAP"
                    value={formData.nomor_kitas_kitap_akun || ""}
                    onChange={(e) => {
                      updateFormData("nomor_kitas_kitap_akun", e.target.value);
                    }}
                  />
                </div>

                {/* Nama Objek Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nama Objek Pajak (Under Construction)
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.nama_objek_pajak || ""}
                    onChange={(e) => {
                      const selectedValue = e.target.value;

                      const selectedObject = objekPajak.find(
                        (obj) => obj.nama_objek_pajak === selectedValue
                      );

                      if (selectedObject) {
                        updateMultipleFields({
                          nama_objek_pajak: selectedObject.nama_objek_pajak,
                          jenis_pajak: selectedObject.jenis_pajak,
                          kode_objek_pajak: selectedObject.kode_objek_pajak,
                          tarif_pajak: selectedObject.tarif_pajak,
                          sifat_pajak_penghasilan:
                            selectedObject.sifat_pajak_penghasilan,
                          persentase_penghasilan_bersih:
                            selectedObject.persentase_penghasilan_bersih,
                          kap: selectedObject.kap,
                        });
                      } else {
                        updateFormData("nama_objek_pajak", e.target.value);
                      }
                    }}
                    disabled={loadingObjekPajak}
                  >
                    <option value="">Please Select</option>
                    {objekPajak.map((obj) => (
                      <option key={obj.id} value={obj.nama_objek_pajak}>
                        {obj.nama_objek_pajak}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Jenis Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jenis Pajak
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Jenis Pajak"
                    value={formData.jenis_pajak || ""}
                    onChange={(e) => {
                      updateFormData("jenis_pajak", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Kode Objek Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Kode Objek Pajak
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Kode Objek Pajak"
                    value={formData.kode_objek_pajak || ""}
                    onChange={(e) => {
                      updateFormData("kode_objek_pajak", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Sifat Pajak Penghasilan */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Sifat Pajak Penghasilan
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Sifat Pajak Penghasilan"
                    value={formData.sifat_pajak_penghasilan || ""}
                    onChange={(e) => {
                      updateFormData("sifat_pajak_penghasilan", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Penghasilan Bruto (Rp) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Penghasilan Bruto (Rp)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Penghasilan Bruto (Rp)"
                    value={formatRupiah(formData.dasar_pengenaan_pajak) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("dasar_pengenaan_pajak", rawValue);
                    }}
                  />
                </div>

                {/* Tingkat Penghasilan Neto yang Dianggap (%) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Tingkat Penghasilan Neto yang Dianggap (%)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Tingkat Penghasilan Neto yang Dianggap (%)"
                    value={formData.persentase_penghasilan_bersih || ""}
                    onChange={(e) => {
                      updateFormData(
                        "persentase_penghasilan_bersih",
                        e.target.value
                      );
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Tax Rate (%) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Tax Rate (%)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Tax Rate (%)"
                    value={formData.tarif_pajak || ""}
                    onChange={(e) => {
                      updateFormData("tarif_pajak", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Pajak Penghasilan (Rp) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Pajak Penghasilan (Rp)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Pajak Penghasilan (Rp)"
                    value={formatRupiah(formData.pajak_penghasilan) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("pajak_penghasilan", rawValue);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* KAP */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    KAP
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="KAP"
                    value={formData.kap || ""}
                    onChange={(e) => {
                      updateFormData("kap", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Fasilitas Lainnya */}
              </div>
            )}
          </>
        )}

        {sections.includes("labaKotor") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("labaKotor")}
            >
              <h3 className="text-lg font-semibold">Laba Kotor</h3>
              {openSections.labaKotor ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openSections.labaKotor && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Laba Kotor */}

                {/* Gaji Pokok Pensiun */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Gaji Pokok Pensiun
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Gaji Pokok Pensiun"
                    value={formatRupiah(formData.gaji_pokok_pensiun) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("gaji_pokok_pensiun", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Pembulatan Kotor */}
                {currentBupot === "BP A1" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Pembulatan Kotor
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Pembulatan Kotor"
                      value={formatRupiah(formData.pembulatan_kotor) || ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData("pembulatan_kotor", rawValue);
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Tunjangan PPH */}
                {currentBupot === "BP A1" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Tunjangan PPH
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Tunjangan PPH"
                      value={formatRupiah(formData.tunjangan_pph) || ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData("tunjangan_pph", rawValue);
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Tunjangan Istri */}
                {currentBupot === "BP A2" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Tunjangan Istri
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Tunjangan Istri"
                      value={formatRupiah(formData.tunjangan_istri) || ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData("tunjangan_istri", rawValue);
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Tunjangan Anak */}
                {currentBupot === "BP A2" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Tunjangan Anak
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Tunjangan Anak"
                      value={formatRupiah(formData.tunjangan_anak) || ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData("tunjangan_anak", rawValue);
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Tunjangan Perbaikan Penghasilan */}
                {currentBupot === "BP A2" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Tunjangan Perbaikan Penghasilan
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Tunjangan Perbaikan Penghasilan"
                      value={
                        formatRupiah(
                          formData.tunjangan_perbaikan_penghasilan
                        ) || ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData(
                          "tunjangan_perbaikan_penghasilan",
                          rawValue
                        );
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Tunjangan Struktural/Fungsional */}
                {currentBupot === "BP A2" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Tunjangan Struktural/Fungsional
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Tunjangan Struktural/Fungsional"
                      value={
                        formatRupiah(
                          formData.tunjungan_struktural_fungsional
                        ) || ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData(
                          "tunjungan_struktural_fungsional",
                          rawValue
                        );
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Tunjangan Beras */}
                {currentBupot === "BP A2" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Tunjangan Beras
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Tunjangan Beras"
                      value={formatRupiah(formData.tunjangan_beras) || ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData("tunjangan_beras", rawValue);
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Tunjangan Lainnya, Uang Lembur, dan Sebagainya */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Tunjangan Lainnya, Uang Lembur, dan Sebagainya
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Tunjangan Lainnya, Uang Lembur, dan Sebagainya"
                    value={formatRupiah(formData.tunjangan_lainnya) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("tunjangan_lainnya", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Penghasilan Tetap dan Teratur Lainnya yang Pembayarannya Terpisah dari Pembayaran Gaji */}
                {currentBupot === "BP A2" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Penghasilan Tetap dan Teratur Lainnya yang Pembayarannya
                      Terpisah dari Pembayaran Gaji
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Wajib Diisi"
                      value={
                        formatRupiah(formData.penghasilan_tetap_lainnya) || ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData("penghasilan_tetap_lainnya", rawValue);
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Honorarium dan Imbalan Lain Sejenisnya */}
                {currentBupot === "BP A1" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Honorarium dan Imbalan Lain Sejenisnya
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Honorarium dan Imbalan Lain Sejenisnya"
                      value={
                        formatRupiah(formData.honorarium_imbalan_lainnya) || ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData("honorarium_imbalan_lainnya", rawValue);
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Premi Asuransi yang Dibayar Pemberi Kerja */}
                {currentBupot === "BP A1" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Premi Asuransi yang Dibayar Pemberi Kerja
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Premi Asuransi yang Dibayar Pemberi Kerja"
                      value={
                        formatRupiah(formData.premi_asuransi_pemberi_kerja) ||
                        ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData(
                          "premi_asuransi_pemberi_kerja",
                          rawValue
                        );
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Penerimaan Dalam Bentuk Natura dan Kenikmatan Lainnya yang Dikenakan Pemotongan PPh Pasal 21 */}
                {currentBupot === "BP A1" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Penerimaan Dalam Bentuk Natura dan Kenikmatan Lainnya yang
                      Dikenakan Pemotongan PPh Pasal 21
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Wajib Diisi"
                      value={formatRupiah(formData.natura_pph_pasal_21) || ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData("natura_pph_pasal_21", rawValue);
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Tantiem, Bonus, Gratifikasi, Jasa Produksi, dan THR */}
                {currentBupot === "BP A1" && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      Tantiem, Bonus, Gratifikasi, Jasa Produksi, dan THR
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-64 flex-auto border p-2 rounded"
                      placeholder="Wajib Diisi"
                      value={
                        formatRupiah(
                          formData.tantiem_bonus_gratifikasi_jasa_thr
                        ) || ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        updateFormData(
                          "tantiem_bonus_gratifikasi_jasa_thr",
                          rawValue
                        );
                        // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                )}

                {/* Jumlah Penghasilan Bruto (RP) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jumlah Penghasilan Bruto (RP)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Masukkan Jumlah Penghasilan Bruto"
                    value={formatRupiah(formData.dasar_pengenaan_pajak) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("dasar_pengenaan_pajak", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("pengurang") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("pengurang")}
            >
              <h3 className="text-lg font-semibold">Pengurang</h3>
              {openSections.pengurang ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {openSections.pengurang && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Pengurang */}

                {/* Biaya Jabatan / Biaya Pensiun */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Biaya Jabatan / Biaya Pensiun
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Biaya Jabatan / Biaya Pensiun"
                    value={formatRupiah(formData.biaya_jabatan) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("biaya_jabatan", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Iuran Terkait Pensiun atau Hari Tua */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Iuran Terkait Pensiun atau Hari Tua
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Iuran Terkait Pensiun atau Hari Tua"
                    value={formatRupiah(formData.iuran_pensiun) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("iuran_pensiun", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Zakat atau Sumbangan Keagamaan yang Bersifat Wajib yang Dibayarkan Melalui Pemberi Kerja */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Zakat atau Sumbangan Keagamaan yang Bersifat Wajib yang
                    Dibayarkan Melalui Pemberi Kerja
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(
                        formData.sumbangan_keagamaan_pemberi_kerja
                      ) || ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData(
                        "sumbangan_keagamaan_pemberi_kerja",
                        rawValue
                      );
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Jumlah Pengurangan */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jumlah Pengurangan
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Jumlah Pengurangan"
                    value={formatRupiah(formData.jumlah_pengurangan) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("jumlah_pengurangan", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("perhitunganPph") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("perhitunganPph")}
            >
              <h3 className="text-lg font-semibold">Perhitungan PPH</h3>
              {openSections.perhitunganPph ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.perhitunganPph && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Common Information Section */}
                {/* Form fields for Perhitungan PPH */}

                {/* Jumlah Penghasilan Neto */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jumlah Penghasilan Neto
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Jumlah Penghasilan Neto"
                    value={formatRupiah(formData.jumlah_penghasilan_neto) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("jumlah_penghasilan_neto", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Nomor Bukti Pemotongan BPA1 dan Pemberi Kerja Sebelumnya (Apabila Ada) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nomor Bukti Pemotongan BPA1 dan Pemberi Kerja Sebelumnya
                    (Apabila Ada)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Bupot A1 Sebelumnya"
                    value={formData.nomor_bpa1_sebelumnya || ""}
                    onChange={(e) => {
                      updateFormData("nomor_bpa1_sebelumnya", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* Penghasilan Neto dari Pemotongan Sebelumnya */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Penghasilan Neto dari Pemotongan Sebelumnya
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(formData.penghasilan_neto_sebelumnya) || ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("penghasilan_neto_sebelumnya", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Jumlah Penghasilan Neto Untuk Perhitungan PPh Pasal 21 (Setahun/Disetahunkan) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jumlah Penghasilan Neto Untuk Perhitungan PPh Pasal 21
                    (Setahun/Disetahunkan)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(formData.penghasilan_neto_pph_pasal_21) || ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("penghasilan_neto_pph_pasal_21", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Penghasilan Tidak Kena Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Penghasilan Tidak Kena Pajak
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(formData.penghasilan_tidak_kena_pajak) || ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("penghasilan_tidak_kena_pajak", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Penghasilan Kena Pajak Setahun / Disetahunkan */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Penghasilan Kena Pajak Setahun / Disetahunkan
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={formatRupiah(formData.penghasilan_kena_pajak) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("penghasilan_kena_pajak", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* PPh Pasal 21 atas Penghasilan Kena Pajak Setahun/Disetahunkan */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    PPh Pasal 21 atas Penghasilan Kena Pajak
                    Setahun/Disetahunkan
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(
                        formData.pph_pasal_21_penghasilan_kena_pajak
                      ) || ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData(
                        "pph_pasal_21_penghasilan_kena_pajak",
                        rawValue
                      );
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* PPh Pasal 21 Terutang */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    PPh Pasal 21 Terutang
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={formatRupiah(formData.pph_pasal_21_terutang) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("pph_pasal_21_terutang", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* PPh Pasal 21 Dipotong Dari Bukti Pemotongan Sebelumnya */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    PPh Pasal 21 Dipotong Dari Bukti Pemotongan Sebelumnya
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(
                        formData.pph_pasal_21_potongan_bpa1_sebelumnya
                      ) || ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData(
                        "pph_pasal_21_potongan_bpa1_sebelumnya",
                        rawValue
                      );
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* PPh Pasal 21 Terutang pada Bukti Pemotongan Ini (Dapat Dikreditkan Pada SPT Tahunan) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    PPh Pasal 21 Terutang pada Bukti Pemotongan Ini (Dapat
                    Dikreditkan Pada SPT Tahunan)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(formData.pph_pasal_21_terutang_bupot_ini) ||
                      ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData(
                        "pph_pasal_21_terutang_bupot_ini",
                        rawValue
                      );
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* PPh Pasal 21 yang Dipotong/Ditanggung Pemerintah */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    PPh Pasal 21 yang Dipotong/Ditanggung Pemerintah
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(
                        formData.pph_pasal_21_ditanggung_pemerintah
                      ) || ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData(
                        "pph_pasal_21_ditanggung_pemerintah",
                        rawValue
                      );
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* PPh Pasal 21 Kurang (Lebih) Dipotong pada Masa Pajak Desember / Masa Pajak Terakhir */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    PPh Pasal 21 Kurang (Lebih) Dipotong pada Masa Pajak
                    Desember / Masa Pajak Terakhir
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Wajib Diisi"
                    value={
                      formatRupiah(formData.pph_pasal_21_masa_pajak_terakhir) ||
                      ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData(
                        "pph_pasal_21_masa_pajak_terakhir",
                        rawValue
                      );
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Jenis Fasilitas pada Masa Pajak Desember / Masa Pajak Terakhir */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jenis Fasilitas pada Masa Pajak Desember / Masa Pajak
                    Terakhir
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded"
                    value={formData.fasilitas_pajak || ""}
                    onChange={(e) =>
                      updateFormData("fasilitas_pajak", e.target.value)
                    }
                  >
                    <option value="">Please Select</option>
                    <option value="fasilitas_lainnya">Fasilitas Lainnya</option>
                    <option value="pph_ditanggung_pemerintah">
                      Pph Ditanggung Pemerintah (DTP)
                    </option>
                    <option value="tanpa_fasilitas">Tanpa Fasilitas</option>
                  </select>
                </div>

                {/* KAP */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    KAP
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="KAP"
                    value={formData.kap || ""}
                    onChange={(e) => {
                      updateFormData("kap", e.target.value);
                    }}
                  />
                </div>

                {/* NITKU */}
                {(currentBupot === "BPPU" || currentBupot === "BP 21") && (
                  <div className="mt-4 flex justify-between gap-4">
                    <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                      NITKU
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-64 flex-auto border p-2 rounded appearance-none"
                      value={formData.nitku || ""}
                      onChange={(e) => updateFormData("nitku", e.target.value)}
                      placehoder="Please Select"
                    >
                      <option value="">Please Select</option>
                      <option value="NITKU1">NITKU1</option>
                      <option value="NITKU2">NITKU2</option>
                    </select>
                  </div>
                )}

                {/* ... */}
              </div>
            )}
          </>
        )}

        {sections.includes("fasilitasPerpajakan") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("fasilitasPerpajakan")}
            >
              <h3 className="text-lg font-semibold">Fasilitas Perpajakan</h3>
              {openSections.fasilitasPerpajakan ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.fasilitasPerpajakan && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Fasilitas Perpajakan Fields */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Fasilitas Pajak yang dimiliki penyetor
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded"
                    value={formData.fasilitas_pajak || ""}
                    onChange={(e) =>
                      updateFormData("fasilitas_pajak", e.target.value)
                    }
                  >
                    <option value="">Please Select</option>
                    <option value="fasilitas_lainnya">Fasilitas Lainnya</option>
                    <option value="pph_ditanggung_pemerintah">
                      Pph Ditanggung Pemerintah (DTP)
                    </option>
                    <option value="tanpa_fasilitas">Tanpa Fasilitas</option>
                  </select>
                </div>

                {/* Nama Objek Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nama Objek Pajak (Under Construction)
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.nama_objek_pajak || ""}
                    onChange={(e) =>
                      updateFormData("nama_objek_pajak", e.target.value)
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    <option value="objek1">objek1</option>
                    <option value="objek2">objek2</option>
                    <option value="objek3">objek3</option>
                  </select>
                </div>

                {/* Jenis Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jenis Pajak
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Jenis Pajak"
                    value={formData.jenis_pajak || ""}
                    onChange={(e) => {
                      updateFormData("jenis_pajak", e.target.value);
                    }}
                  />
                </div>

                {/* Kode Objek Pajak */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Kode Objek Pajak
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Kode Objek Pajak"
                    value={formData.kode_objek_pajak || ""}
                    onChange={(e) => {
                      updateFormData("kode_objek_pajak", e.target.value);
                    }}
                  />
                </div>

                {/* Penghasilan Bruto (RP) */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Penghasilan Bruto (RP)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Masukkan Penghasilan Bruto"
                    value={formatRupiah(formData.dasar_pengenaan_pajak) || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      updateFormData("dasar_pengenaan_pajak", rawValue);
                      // updateFormData("penghasilan_bruto_raw", Number(rawValue));
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* KAP */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    KAP
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="KAP"
                    value={formData.kap || ""}
                    onChange={(e) => {
                      updateFormData("kap", e.target.value);
                    }}
                  />
                </div>

                {/* NITKU */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    NITKU
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.nitku || ""}
                    onChange={(e) => updateFormData("nitku", e.target.value)}
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    <option value="NITKU1">NITKU1</option>
                    <option value="NITKU2">NITKU2</option>
                  </select>
                </div>

                {/* More fields as needed */}
              </div>
            )}
          </>
        )}

        {sections.includes("dokumenReferensi") && (
          <>
            <div
              className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
              onClick={() => toggleSection("dokumenReferensi")}
            >
              <h3 className="text-lg font-semibold">Dokumen Referensi</h3>
              {openSections.dokumenReferensi ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {openSections.dokumenReferensi && (
              <div className="border rounded-md p-4 mb-2 bg-white">
                {/* Jenis Dokumen */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Jenis Dokumen <span className="text-red-500">*</span>
                  </label>
                  {/* <Select
                    placeholder="Pilih Jenis Dokumen"
                    className="w-full"
                    value={formData.jenisDokumen}
                    onChange={(selected) =>
                      updateFormData("jenisDokumen", selected)
                    }
                    options={[
                      { value: "Akta Perjanjian", label: "Akta Perjanjian" },
                      { value: "Bukti Pembayaran", label: "Bukti Pembayaran" },
                      { value: "Dokumen Lainnya", label: "Dokumen Lainnya" },
                      // Additional options...
                    ]}
                  /> */}
                  <select
                    className="w-64 flex-auto border p-2 rounded appearance-none"
                    value={formData.jenis_dokumen || ""}
                    onChange={(e) =>
                      updateFormData("jenis_dokumen", e.target.value)
                    }
                    placehoder="Please Select"
                  >
                    <option value="">Please Select</option>
                    <option value="Akta Perjanjian">Akta Perjanjian</option>
                    {currentBupot === "BP 21" || currentBupot === "BP 26" ? (
                      ""
                    ) : (
                      <option value="Rapat Umum Pemegang Saham">
                        Rapat Umum Pemegang Saham
                      </option>
                    )}
                    <option value="Bukti Pembayaran">Bukti Pembayaran</option>
                    <option value="Dokumen Ketentuan Peraturan Perpajakan">
                      Dokumen Ketentuan Peraturan Perpajakan
                    </option>
                    <option value="Dokumen Lainnya">Dokumen Lainnya</option>
                    <option value="Dokumen Pemberi Fasilitas Lainnya">
                      Dokumen Pemberi Fasilitas Lainnya
                    </option>
                    <option value="Faktur Pajak">Faktur Pajak</option>
                    <option value="Jasa Giro">Jasa Giro</option>
                    <option value="Kontrak">Kontrak</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Surat Keputusan">Surat Keputusan</option>
                    <option value="Surat Pernyataan">Surat Pernyataan</option>
                    <option value="Surat Tagihan">Surat Tagihan</option>
                    <option value="Trade Confirmation">
                      Trade Confirmation
                    </option>
                  </select>
                </div>

                {/* Nomor Dokumen */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Nomor Dokumen
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Nomor Dokumen"
                    value={formData.nomor_dokumen || ""}
                    onChange={(e) => {
                      updateFormData("nomor_dokumen", e.target.value);
                    }}
                  />
                </div>

                {/* Tanggal Dokumen */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    Tanggal Dokumen
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="Tanggal Dokumen"
                    value={formData.tanggal_dokumen || ""}
                    onChange={(e) => {
                      updateFormData("tanggal_dokumen", e.target.value);
                    }}
                  />
                </div>

                {/* NITKU/Nomor Identitas Sub Unit Organisasi */}
                <div className="mt-4 flex justify-between gap-4">
                  <label className="w-64 flex-none block text-sm font-medium text-gray-700">
                    NITKU/Nomor Identitas Sub Unit Organisasi
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-64 flex-auto border p-2 rounded"
                    placeholder="NITKU Dokumen"
                    value={formData.nitku_dokumen || ""}
                    onChange={(e) => {
                      updateFormData("nitku_dokumen", e.target.value);
                    }}
                    readOnly={true}
                  />
                </div>

                {/* More document reference fields */}
              </div>
            )}
          </>
        )}

        {/* Action buttons */}
        <div className="flex justify-end mt-4">
          {location.pathname.includes("/create") && (
            <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => handleSubmit("save")}
              >
                Simpan
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  handleSubmit("draft");
                }}
              >
                Simpan Draft
              </button>
            </>
          )}
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={() => handleSubmit("cancel")}
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default BUPOTForm;
