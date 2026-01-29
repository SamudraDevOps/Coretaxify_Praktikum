import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import BUPOTForm from "./shared/BUPOTForm";
import Swal from "sweetalert2";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";

// Form configurations for different BUPOT types
const formConfigs = {
  bppu: {
    title: "EBUPOT BPU",
    sections: ["informasiUmum", "pajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "BPPU",
    intent: "api.bupot.bppu.show",
  },
  bpnr: {
    title: "EBUPOT BPNR",
    sections: [
      "informasiUmum",
      "perhitunganPajakPenghasilan",
      "dokumenReferensi",
    ],
    sidebarTitle: "BPNR",
    intent: "api.bupot.bpnr.show",
  },
  ps: {
    title: "EBUPOT SP",
    sections: ["informasiUmum", "pajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "Penyetoran Sendiri",
    intent: "api.bupot.ps.show",
  },
  psd: {
    title: "EBUPOT CY",
    sections: ["informasiUmum", "pajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "Pemotongan Secara Digunggung",
    intent: "api.bupot.psd.show",
  },
  bp21: {
    title: "EBUPOT BP21",
    sections: ["informasiUmum", "pajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "BP 21 - Bukti Pemotongan Selain Pegawai Tetap",
    intent: "api.bupot.bp21.show",
  },
  bp26: {
    title: "EBUPOT BP26",
    sections: [
      "informasiUmum",
      "perhitunganPajakPenghasilan",
      "dokumenReferensi",
    ],
    sidebarTitle: "BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri",
    intent: "api.bupot.bp26.show",
  },
  bpa1: {
    title: "EBUPOT BPA1",
    sections: ["informasiUmum", "labaKotor", "pengurang", "perhitunganPph"],
    sidebarTitle: "BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir",
    intent: "api.bupot.bpa1.show",
  },
  bpa2: {
    title: "EBUPOT BPA2",
    sections: ["informasiUmum", "labaKotor", "pengurang", "perhitunganPph"],
    sidebarTitle: "BP A2 - Bukti Pemotongan A2 Masa Pajak Terakhir",
    intent: "api.bupot.bpa2.show",
  },
  bpbpt: {
    title: "EBUPOT MP",
    sections: ["informasiUmum", "fasilitasPerpajakan"],
    sidebarTitle: "Bukti Pemotongan Bulanan Pegawai Tetap",
    intent: "api.bupot.bpbpt.show",
  },
};

const BUPOTEditWrapper = () => {
  const { id, akun, type, bupotId } = useParams();
  // const navigate = useNavigate();
  const navigate = useNavigateWithParams();
  const [cookies] = useCookies(["token"]);

  // Get form config for this BUPOT type
  const config = formConfigs[type] || {};

  // Fetch existing BUPOT data
  const {
    data: existingData,
    isLoading: isLoadingData,
    error: fetchError,
  } = useQuery({
    queryKey: [`bupot-${type}-edit`, bupotId],
    queryFn: async () => {
      const response = await axios.get(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/bupot/${bupotId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: config.intent,
          },
        }
      );
      return response.data;
    },
  });

  // Mutation for updating the form
  // const { mutate, isLoading } = useMutation({
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;

      return await axios.put(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/bupot/${bupotId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
          },
          params: {
            intent: `api.bupot.${type}`,
          },
        }
      );
    },
    onSuccess: () => {
      Swal.fire("Berhasil!", "BUPOT berhasil diperbarui!", "success");
      navigate(`/praktikum/${id}/sistem/${akun}/bupot/${type}`);
    },
    onError: (error) => {
      console.log(error);
      if (error.response === undefined) {
        Swal.fire("Gagal!", error.message, "error");
        return;
      }
      Swal.fire("Gagal!", error.response.data.message, "error");
    },
  });

  // Get the correct loading state - try both properties
  const isLoading = mutation.isLoading || mutation.isPending || false;

  // Handle form submission
  const handleSubmit = (formData, action) => {
    // Prevent double submission
    if (isLoading) {
      console.log("Submission blocked due to loading state");
      return;
    }

    if (action === "cancel") {
      navigate(`/praktikum/${id}/sistem/${akun}/bupot/${type}`);
      return;
    }

    // Add any necessary transformations to the form data
    const submitData = {
      ...formData,
    };

    mutation.mutate(submitData);
  };

  if (isLoadingData) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        <ClipLoader color="#7502B5" size={50} />
        <p className="ml-3">Loading data...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="error-container p-5 text-center">
        <h1 className="text-red-600 text-xl">Error</h1>
        <p>{fetchError.message || "Error loading data"}</p>
      </div>
    );
  }

  return (
    <>
      <BUPOTForm
        type={type}
        title={config.title}
        sidebarTitle={config.sidebarTitle}
        sections={config.sections}
        onSubmit={handleSubmit}
        initialData={existingData?.data || {}}
        isEditing={true}
        isLoading={isLoading}
      />
    </>
  );
};

export default BUPOTEditWrapper;
