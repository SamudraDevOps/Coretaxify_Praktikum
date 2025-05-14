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
    sections: ["informasiUmum", "fasilitasPerpajakan", "dokumenReferensi"],
    // Any BPPU-specific form config
  },
  bpnr: {
    title: "EBUPOT BPNR",
    sections: ["informasiUmum", "fasilitasPerpajakan"],
    // Any BPNR-specific form config
  },
  "bukti-pemotongan-bulanan-pegawai-tetap": {
    title: "EBUPOT MP",
    sections: ["informasiUmum", "fasilitasPerpajakan"],
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
      <Header />
      <BUPOTForm
        type={type}
        title={config.title}
        sections={config.sections}
        onSubmit={handleSubmit}
        initialData={props.data?.formData || {}} // Use data from RoleBasedRenderer if available
      />
    </>
  );
};

export default BUPOTCreateWrapper;
