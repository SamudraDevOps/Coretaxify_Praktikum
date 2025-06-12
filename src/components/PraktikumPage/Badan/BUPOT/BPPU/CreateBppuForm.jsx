import React from "react";
import BUPOTForm from "../shared/BUPOTForm";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { RoutesApi } from "@/Routes";

const CreateBppuForm = (props) => {
  const { id, akun } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  // BPPU-specific mutation
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return axios.post(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/bupot/bppu`,
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
      navigate(`/praktikum/${id}/sistem/${akun}/bupot/bppu`);
    },
  });

  // BPPU-specific form submission handler
  const handleSubmit = (formData, action) => {
    if (action === "cancel") {
      navigate(`/praktikum/${id}/sistem/${akun}/bupot/bppu`);
      return;
    }

    // Any BPPU-specific data transformations
    const submitData = {
      ...formData,
      isDraft: action === "draft",
      bupotType: "bppu",
    };

    mutate(submitData);
  };

  return (
    <BUPOTForm
      type="bppu"
      title="EBUPOT BPU"
      sections={["informasiUmum", "fasilitasPerpajakan", "dokumenReferensi"]}
      onSubmit={handleSubmit}
      initialData={props.data?.formData || {}}
    />
  );
};

export default CreateBppuForm;
