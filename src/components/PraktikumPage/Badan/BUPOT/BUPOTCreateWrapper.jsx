import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { RoutesApi } from "@/Routes";
import Header from "@/components/Header/Header";
import BUPOTForm from "./shared/BUPOTForm";

// Form configurations for different BUPOT types
const formConfigs = {
  bppu: {
    title: "EBUPOT BPU",
    sections: ["informasiUmum", "pajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "BPPU",
    // Any BPPU-specific form config
  },
  bpnr: {
    title: "EBUPOT BPNR",
    sections: ["informasiUmum", "perhitunganPajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "BPNR",
    // Any BPNR-specific form config
  },
  ps: {
    title: "EBUPOT SP",
    sections: ["informasiUmum", "pajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "Penyetoran Sendiri",
    // Any SP-specific form config
  },
  psd: {
    title: "EBUPOT CY",
    sections: ["informasiUmum", "pajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "Pemotongan Secara Digunggung",
    // Any CY-specific form config
  },
  bp21: {
    title: "EBUPOT BP21",
    sections: ["informasiUmum", "pajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "BP 21 - Bukti Pemotongan Selain Pegawai Tetap",
    // Any BP21-specific form config
  },
  bp26: {
    title: "EBUPOT BP26",
    sections: ["informasiUmum", "perhitunganPajakPenghasilan", "dokumenReferensi"],
    sidebarTitle: "BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri",
    // Any BP26-specific form config
  },
  bpa1: {
    title: "EBUPOT BPA1",
    sections: ["informasiUmum", "labaKotor", "pengurang", "perhitunganPph"],
    sidebarTitle: "BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir",
    // Any BPA1-specific form config
  },
  bpa2: {
    title: "EBUPOT BPA2",
    sections: ["informasiUmum", "labaKotor", "pengurang", "perhitunganPph"],
    sidebarTitle: "BP A2 - Bukti Pemotongan A2 Masa Pajak Terakhir",
    // Any BPA2-specific form config
  },
  bpbpt: {
    title: "EBUPOT MP",
    sections: ["informasiUmum", "fasilitasPerpajakan"],
    sidebarTitle: "Bukti Pemotongan Bulanan Pegawai Tetap",
    // Any MP-specific form config
  },
};

const BUPOTCreateWrapper = (props) => {
  const { id, akun, type } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  // Get form config for this BUPOT type
  const config = formConfigs[type] || {};

  // Mutation for submitting the form
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      return axios.post(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/bupot/${type}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
            intent: `api.bupot.${type}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Redirect back to the list page on success
      navigate(`/praktikum/${id}/sistem/${akun}/bupot/${type}`);
    },
  });

  // Handle form submission
  const handleSubmit = (formData, action) => {
    if (action === "cancel") {
      navigate(`/praktikum/${id}/sistem/${akun}/bupot/${type}`);
      return;
    }

    // Add any necessary transformations to the form data
    const submitData = {
      ...formData,
      isDraft: action === "draft",
    };

    mutate(submitData);
  };

  return (
    <>
      {/* <Header /> */}
      <BUPOTForm
        type={type}
        title={config.title}
        sidebarTitle={config.sidebarTitle}
        sections={config.sections}
        onSubmit={handleSubmit}
        initialData={props.data?.formData || {}} // Use data from RoleBasedRenderer if available
      />
    </>
  );
};

export default BUPOTCreateWrapper;
