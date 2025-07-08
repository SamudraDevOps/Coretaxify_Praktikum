import React, { useEffect, useState } from "react";
import SideBarSPT from "./SideBarSPT";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams, useSearchParams } from "react-router";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getCsrf } from "@/service/getCsrf";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

const BuatKonsepSPT = ({ sidebar }) => {
  const { id, akun } = useParams();
  const [cookies] = useCookies(["token"]);

  const [selectedType, setSelectedType] = useState("");
  const [step, setStep] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedModelSPT, setSelectedModelSPT] = useState("");
  const [modelTouched, setModelTouched] = useState(false);
  const [queryData, setQueryData] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigateWithParams();

  const viewAsCompanyId = searchParams.get("viewAs");
  const generateQuery = () => {
    const query = {
      jenis_pajak: selectedType.toUpperCase(),
      masa_bulan: selectedMonth,
      masa_tahun: selectedYear,
      pic_id: akun,
    };

    setQueryData(query);

    // console.log(queryData);
    return query;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["konsep_spt", queryData],
    queryFn: async () => {
      const data = await axios.get(
        // RoutesApiReal.apiUrl + `student/assignments/${id}/sistem/${akun}`,
        RoutesApi.apiUrl +
          `student/assignments/${id}/sistem/${akun}/check-periode`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: queryData,
        }
      );
      // console.log("mamamiia");
      console.log(data.data);
      return data;
    },
    enabled: Object.keys(queryData).length > 0,
  });
  useEffect(() => {
    if (data && data.data) {
      console.log("Updating queryData with:", {
        model: data.data.model,
      });

      setQueryData((prevData) => ({
        ...prevData,
        model: data.data.model,
      }));
    }
  }, [data]);
  const createSpt = useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      console.log(queryData);
      const accountId = viewAsCompanyId ? viewAsCompanyId : akun;

      return axios.post(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${accountId}/spt`,
        queryData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data, variables) => {
      // console.log(data);
      // const successMessage = variables.isDraft
      //   ? "Draft Faktur berhasil dibuat"
      //   : "Faktur berhasil diupload";

      Swal.fire("Berhasil!", "Konsep SPT berhasil dibuat.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate(`/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt`);
            // window.location.href = `/praktikum/${id}/sistem/${akun}/surat-pemberitahuan-spt`;
          }
        }
      );
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });

  const getMonthNumber = (monthName) => {
    const months = {
      Januari: "01",
      Februari: "02",
      Maret: "03",
      April: "04",
      Mei: "05",
      Juni: "06",
      Juli: "07",
      Agustus: "08",
      September: "09",
      Oktober: "10",
      November: "11",
      Desember: "12",
    };
    return months[monthName] || "01";
  };
  const formatPeriodDisplay = () => {
    if (selectedMonth && selectedYear) {
      const monthNumber = getMonthNumber(selectedMonth);
      const date = new Date(`${selectedYear}-${monthNumber}-01`);
      return `${date.toLocaleString("id-ID", {
        month: "long",
      })} ${selectedYear}`;
    }
    return "Belum dipilih";
  };

  const showFormData = () => {
    const formData = {
      jenisSeleksi: selectedType
        ? taxTypes.find((t) => t.value === selectedType)?.label || selectedType
        : "Belum dipilih",
      langkah: step,
      bulan: selectedMonth
        ? new Date(`${selectedYear}-${selectedMonth}-01`).toLocaleString(
            "id-ID",
            { month: "long" }
          )
        : "Belum dipilih",
      tahun: selectedYear || "Belum dipilih",
      modelSPT: selectedModelSPT
        ? selectedModelSPT === "normal"
          ? "Normal"
          : "Pembetulan"
        : "Belum dipilih",
      periode:
        selectedMonth && selectedYear
          ? `${new Date(`${selectedYear}-${selectedMonth}-01`).toLocaleString(
              "id-ID",
              { month: "long" }
            )} ${selectedYear}`
          : selectedYear
          ? selectedYear
          : "Belum lengkap",
    };

    alert(
      "Form Data:\n" +
        Object.entries(formData)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
    );

    console.log("Form Data:", formData);
  };

  const taxTypes = [
    { label: "PPN", value: "ppn" },
    { label: "PPh Pasal 21/26", value: "pph" },
    { label: "PPh Unifikasi", value: "pphunifikasi" },
    { label: "PPh Badan", value: "badan" },
  ];

  const handleNext = () => {
    if (step === 1 && selectedType) {
      setStep(2);
    } else if (step === 2) {
      if (
        (selectedType === "ppn" && selectedMonth && selectedYear) ||
        (selectedType !== "ppn" && getSelectedPeriod())
      ) {
        generateQuery();
        setStep(3);
      }
    }
  };

  const modelSPTOptions = [
    { label: "Normal", value: "normal" },
    { label: "Pembetulan", value: "pembetulan" },
  ];

  // useEffect(() => {
  //   if (data && data.data && data.data.model) {
  //     // Convert model value to lowercase and set it
  //     setSelectedModelSPT(data.data.model.toLowerCase());
  //     setModelTouched(true);
  //   }
  // }, [data]);
  useEffect(() => {
    if (data && data.data) {
      if (data.data.code === 101) {
        setSelectedModelSPT(null);
      } else if (data.data.model) {
        // Convert model value to lowercase and set it
        setSelectedModelSPT(data.data.model.toLowerCase());
      }
      setModelTouched(true);
    }
  }, [data]);

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const getSelectedPeriod = () => {
    if (
      ["ppn", "pph", "pphunifikasi"].includes(selectedType) &&
      selectedMonth &&
      selectedYear
    ) {
      return `${selectedMonth}-${selectedYear}`;
    }
    if (selectedType === "badan" && selectedYear) {
      return selectedYear;
    }
    return null;
  };
  if (isLoading) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        <ClipLoader color="#7502B5" size={50} />
        <p className="ml-3">Data Loading ...</p>
      </div>
    );
  }

  const renderMonthYearForm = (label) => (
    <>
      <label className="block text-normal font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2">
        <div className="w-40">
          <label className="block text-normal font-medium text-gray-700">
            Bulan <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-40 border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 border-gray-300 "
          >
            <option value="">Pilih Bulan</option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
        </div>
        <div className="w-40">
          <label className="block text-normal font-medium text-gray-700">
            Tahun <span className="text-red-500">*</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-40 bg-white hover:bg-white text-black border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 border-gray-300">
                {selectedYear || "Pilih Tahun"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <DatePicker
                selected={
                  selectedYear ? new Date(parseInt(selectedYear), 0) : null
                }
                onChange={(date) =>
                  setSelectedYear(date.getFullYear().toString())
                }
                showYearPicker
                dateFormat="yyyy"
                className="w-full"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );

  const renderStep2Form = () => {
    switch (selectedType) {
      case "ppn":
        return renderMonthYearForm("Periode dan Tahun Pajak");
      case "pph":
        return renderMonthYearForm("Masa Pajak PPh Pasal 21/26");
      case "pphunifikasi":
        return renderMonthYearForm("Periode Unifikasi Pajak");
      case "badan":
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Tahun Pajak untuk PPh Badan{" "}
              <span className="text-red-500">*</span>
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-40 bg-white hover:bg-white text-black border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 border-gray-300">
                  {selectedYear || "Pilih Tahun"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <DatePicker
                  selected={
                    selectedYear ? new Date(parseInt(selectedYear), 0) : null
                  }
                  onChange={(date) =>
                    setSelectedYear(date.getFullYear().toString())
                  }
                  showYearPicker
                  dateFormat="yyyy"
                  className="w-full"
                />
              </PopoverContent>
            </Popover>
          </>
        );
      default:
        return null;
    }
  };

  const getRedirectUrl = () => {
    switch (selectedType) {
      case "ppn":
        return "/admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt";
      case "pasal":
        return "/admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt-pasal";
      case "unifikasi":
        return "/admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt-unifikasi";
      case "badan":
        return "/admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt-badan";
      default:
        return "/admin/praktikum/2/surat-pemberitahuan-(spt)/tambah-konsep-spt";
    }
  };

  return (
    <div className="flex bg-white h-screen">
      <SideBarSPT
        npwp_akun={sidebar.npwp_akun}
        nama_akun={sidebar.nama_akun}
        akun={{ id, akun }}
      />
      <div className="flex-1 p-3 bg-white rounded-md h-full">
        <Card className="w-full bg-gray-100 shadow-sm rounded-none mb-6">
          <CardContent className="flex items-center gap-2 py-4 px-6">
            <IoDocumentTextOutline className="text-2xl text-blue-900" />
            <h1 className="text-base md:text-lg font-semibold text-blue-900">
              Buat Konsep SPT
            </h1>
          </CardContent>
        </Card>

        <div className="flex-1 bg-white px-10 pt-6 overflow-y-auto h-full">
          <div className="relative flex justify-between items-center mb-10 px-2">
            {[1, 2, 3].map((num, index) => (
              <React.Fragment key={num}>
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300",
                      step >= num
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-300 text-white"
                    )}
                  >
                    {num}
                  </div>
                  <span
                    className={cn(
                      "text-sm mt-1 text-center transition-colors duration-300",
                      step === num ? "text-gray-800" : "text-gray-500"
                    )}
                  >
                    {num === 1
                      ? "Pilih Jenis Pajak"
                      : num === 2
                      ? "Pilih periode pelaporan SPT"
                      : "Pilih Jenis SPT"}
                  </span>
                </div>
                {index < 2 && (
                  <div className="absolute top-4 left-0 right-0 flex justify-between z-0 w-full px-5">
                    <div className="flex-grow h-1 bg-gray-300 relative overflow-hidden mx-2 rounded">
                      <div
                        className="h-full bg-yellow-400 absolute left-0 top-0 transition-all duration-500 ease-in-out"
                        style={{
                          width: `${
                            step > index + 1 ? 100 : step === index + 1 ? 50 : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Langkah 1 */}
          {step === 1 && (
            <div>
              <p className="text-normal text-gray-800 font-medium mb-4">
                <strong>Langkah 1.</strong> Pilih jenis SPT yang akan dilaporkan
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {taxTypes.map((type) => (
                  <Card
                    key={type.value}
                    className={cn(
                      " cursor-pointer hover:border-yellow-400",
                      selectedType === type.value ? "border-yellow-400" : ""
                    )}
                    onClick={() => {
                      setSelectedType(type.value);
                      setSelectedMonth("");
                      setSelectedYear("");
                    }}
                  >
                    <CardContent className="p-4 text-center text-normal font-medium text-gray-700">
                      {type.label}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Button
                  disabled={!selectedType}
                  onClick={handleNext}
                  className={cn(
                    "w-full md:w-auto text-normal",
                    selectedType
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : "bg-gray-400 cursor-not-allowed"
                  )}
                >
                  Lanjut
                </Button>
              </div>
            </div>
          )}

          {/* Langkah 2 */}
          {step === 2 && (
            <div>
              <p className="text-normal text-gray-800 font-medium mb-4">
                <strong>Langkah 2.</strong> Pilih periode pelaporan untuk jenis
                pajak{" "}
                <span className="font-bold text-yellow-500 uppercase">
                  {selectedType}
                </span>
              </p>
              <div className="space-y-4">{renderStep2Form()}</div>
              <div className="mt-6 flex justify-between text-normal">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="w-full md:w-auto text-normal"
                >
                  Kembali
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={
                    selectedType === "ppn"
                      ? !(selectedMonth && selectedYear)
                      : !getSelectedPeriod()
                  }
                  className={cn(
                    "bg-yellow-400 hover:bg-yellow-500 text-normal w-full md:w-auto",
                    selectedType === "ppn" &&
                      !(selectedMonth && selectedYear) &&
                      "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
                  )}
                >
                  Lanjut
                </Button>
              </div>
            </div>
          )}

          {/* Langkah 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <p className="text-normal font-medium text-gray-800">
                <strong>Langkah 3.</strong> Pilih Jenis SPT
              </p>

              {/* {data && data.data ? ( */}
              <>
                <div className="mb-4 text-normal space-y-2">
                  <div>
                    Jenis Surat Pemberitahuan Pajak :{" "}
                    <strong>
                      {selectedType === "ppn"
                        ? "SPT Masa PPN"
                        : "Jenis Pajak Lainnya"}
                    </strong>
                  </div>
                  <div>
                    Periode dan Tahun Pajak :{" "}
                    {/* <strong>
                      {selectedType === "ppn" && selectedMonth && selectedYear
                        ? `${new Date(
                            `${selectedYear}-${selectedMonth}-01`
                          ).toLocaleString("id-ID", {
                            month: "long",
                          })} ${selectedYear}`
                        : "Belum dipilih"}
                    </strong> */}
                    <strong>{formatPeriodDisplay()}</strong>
                  </div>
                </div>

                <div>
                  <label className="block text-normal font-medium text-gray-700 mb-1">
                    Model SPT <span className="text-red-500">*</span>
                  </label>
                  {selectedModelSPT !== null && (
                    <p
                      className={cn(
                        "w-52 border rounded px-4 py-2",
                        !selectedModelSPT && modelTouched
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      )}
                    >
                      {selectedModelSPT}
                    </p>
                  )}
                  {/* <p
                    className={cn(
                      "w-52 border rounded px-4 py-2",
                      !selectedModelSPT && modelTouched
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    )}
                  >
                    {selectedModelSPT}
                  </p> */}
                  {/* <select
                    value={selectedModelSPT}
                    onChange={(e) => {
                      setSelectedModelSPT(e.target.value);
                      setModelTouched(true);
                    }}
                    className={cn(
                      "w-52 border rounded px-4 py-2",
                      !selectedModelSPT && modelTouched
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    )}
                  >
                    <option value="">Pilih Jenis SPT</option>
                    {modelSPTOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select> */}
                  {/* {!selectedModelSPT && modelTouched && (
                    <p className="text-sm text-red-600 mt-1">
                      Kolom ini wajib diisi!
                    </p>
                  )} */}
                </div>

                <div className="mt-6 flex justify-between text-normal">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="w-full md:w-auto text-normal"
                  >
                    Kembali
                  </Button>
                  {/* <Button
                    disabled={!selectedModelSPT}
                    className={cn(
                      "w-full md:w-auto",
                      selectedModelSPT
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-gray-300 text-white cursor-not-allowed text-normal"
                    )}
                    // onClick={() => (window.location.href = getRedirectUrl())}
                    onClick={() => createSpt.mutate()}
                  >
                    Buat Konsep SPT
                  </Button> */}
                  {selectedModelSPT == null && (
                    <p className="text-sm text-red-600 mt-1">
                      SPT Sudah menjadi Konsep
                    </p>
                  )}
                  <Button
                    disabled={
                      selectedModelSPT === null ||
                      !selectedModelSPT ||
                      createSpt.isPending
                    }
                    className={cn(
                      "w-full md:w-auto",
                      selectedModelSPT && !createSpt.isPending
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-gray-300 text-white cursor-not-allowed text-normal"
                    )}
                    // onClick={() => (window.location.href = getRedirectUrl())}
                    onClick={() => createSpt.mutate()}
                  >
                    {createSpt.isPending ? "Membuat..." : "Buat Konsep SPT"}
                  </Button>

                  {/* <button onClick={showFormData}>form data test</button> */}
                </div>
              </>
              {/* ) : (
                <div className="text-center py-8 text-red-500 font-medium">
                  Data faktur tidak ditemukan
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuatKonsepSPT;
