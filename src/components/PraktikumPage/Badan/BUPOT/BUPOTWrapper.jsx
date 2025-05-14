import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BUPOTRenderer from "./BUPOTRenderer";
import { Cookies } from "react-cookie";

// BUPOT type specific configurations
const typeConfigs = {
  bppu: {
    titles: {
      belumTerbit: "EBUPOT BPU NOT ISSUED",
      telahTerbit: "EBUPOT BPU ISSUED",
      tidakValid: "EBUPOT BPU INVALID",
      sidebar: "BPPU",
    },
    intent: "api.bupot.bppu",
    showIntent: "api.bupot.bppu.show",
  },
  bpnr: {
    titles: {
      belumTerbit: "EBUPOT BPNR NOT ISSUED",
      telahTerbit: "EBUPOT BPNR ISSUED",
      tidakValid: "EBUPOT BPNR INVALID",
      sidebar: "BPNR",
    },
    intent: "api.bupot.bpnr",
    showIntent: "api.bupot.bpnr.show",
  },
  "bukti-pemotongan-bulanan-pegawai-tetap": {
    titles: {
      belumTerbit: "EBUPOT MP NOT ISSUED",
      telahTerbit: "EBUPOT MP ISSUED",
      tidakValid: "EBUPOT MP INVALID",
      sidebar: "Bukti Pemotongan Bulanan Pegawai Tetap",
    },
    intent: "api.bupot.bpbpt",
    showIntent: "api.bupot.bpbpt.show",
  },
};

const BUPOTWrapper = (props) => {
  // Extract type from the URL
  // const { type } = useParams();
  const { type, status } = props.params; // Access params from RoleBasedRenderer

  // Get the configuration for this BUPOT type
  const config = typeConfigs[type] || {};

  // Determine which intent to use based on the current operation
  const getIntent = () => {
    // if (status === "create") return config.createIntent;
    if (status && !["telah-terbit", "tidak-valid"].includes(status))
      return config.showIntent;
    return config.intent;
  };

  // Get the appropriate intent for this operation
  const currentIntent = getIntent();

  // Modified API call with intent
  const fetchData = async () => {
    const { data } = await axios.get(props.path,  {
      headers: {
        Authorization: `Bearer ${Cookies.token}`,
        Accept: "application/json",
      },
      params: {
        intent: currentIntent, // Use the type-specific intent
        page: props.currentPage,
      },
    });
    return data;
  };

  return (
    <BUPOTRenderer
      type={type}
      data={props.data} // Data from RoleBasedRenderer
      titles={config.titles}
      intent={currentIntent}
      fetchData={fetchData} // Optional custom data fetching function
      
      // You can pass custom components when needed
      // BelumTerbit={CustomBelumTerbitComponent}
      // TelahTerbit={CustomTelahTerbitComponent}
      // TidakValid={CustomTidakValidComponent}
    />
  );
};

export default BUPOTWrapper;
