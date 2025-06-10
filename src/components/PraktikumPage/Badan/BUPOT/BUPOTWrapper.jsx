import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BUPOTRenderer from "./BUPOTRenderer";
import { Cookies } from "react-cookie";

// BUPOT type specific configurations
const typeConfigs = {
  bppu: {
    titles: {
      draft: "EBUPOT BPU NOT ISSUED",
      published: "EBUPOT BPU ISSUED",
      invalid: "EBUPOT BPU INVALID",
      sidebar: "BPPU",
    },
    intent: "api.bupot.bppu",
    showIntent: "api.bupot.bppu.show",
  },
  bpnr: {
    titles: {
      draft: "EBUPOT BPNR NOT ISSUED",
      published: "EBUPOT BPNR ISSUED",
      invalid: "EBUPOT BPNR INVALID",
      sidebar: "BPNR",
    },
    intent: "api.bupot.bpnr",
    showIntent: "api.bupot.bpnr.show",
  },
  ps: {
    titles: {
      draft: "EBUPOT SP NOT ISSUED",
      published: "EBUPOT SP ISSUED",
      invalid: "EBUPOT SP INVALID",
      sidebar: "Penyetoran Sendiri",
    },
    intent: "api.bupot.ps",
    showIntent: "api.bupot.ps.show",
  },
  psd: {
    titles: {
      draft: "EBUPOT CY NOT ISSUED",
      published: "EBUPOT CY ISSUED",
      invalid: "EBUPOT CY INVALID",
      sidebar: "Pemotongan Secara Digunggung",
    },
    intent: "api.bupot.psd",
    showIntent: "api.bupot.psd.show",
  },
  bp21: {
    titles: {
      draft: "EBUPOT BP21 NOT ISSUED",
      published: "EBUPOT BP21 ISSUED",
      invalid: "EBUPOT BP21 INVALID",
      sidebar: "BP 21 - Bukti Pemotongan Selain Pegawai Tetap",
    },
    intent: "api.bupot.bp21",
    showIntent: "api.bupot.bp21.show",
  },
  bp26: {
    titles: {
      draft: "EBUPOT BP26 NOT ISSUED",
      published: "EBUPOT BP26 ISSUED",
      invalid: "EBUPOT BP26 INVALID",
      sidebar: "BP 26 - Bukti Pemotongan Wajib Pajak Luar Negeri",
    },
    intent: "api.bupot.bp26",
    showIntent: "api.bupot.bp26.show",
  },
  bpa1: {
    titles: {
      draft: "EBUPOT BPA1 NOT ISSUED",
      published: "EBUPOT BPA1 ISSUED",
      invalid: "EBUPOT BPA1 INVALID",
      sidebar: "BP A1 - Bukti Pemotongan A1 Masa Pajak Terakhir",
    },
    intent: "api.bupot.bpa1",
    showIntent: "api.bupot.bpa1.show",
  },
  bpa2: {
    titles: {
      draft: "EBUPOT BPA2 NOT ISSUED",
      published: "EBUPOT BPA2 ISSUED",
      invalid: "EBUPOT BPA2 INVALID",
      sidebar: "BP A2 - Bukti Pemotongan A2 Masa Pajak Terakhir",
    },
    intent: "api.bupot.bpa2",
    showIntent: "api.bupot.bpa2.show",
  },
  bpbpt: {
    titles: {
      draft: "EBUPOT MP NOT ISSUED",
      published: "EBUPOT MP ISSUED",
      invalid: "EBUPOT MP INVALID",
      sidebar: "Bukti Pemotongan Bulanan Pegawai Tetap",
    },
    intent: "api.bupot.bpbpt",
    showIntent: "api.bupot.bpbpt.show",
  },
};

const BUPOTWrapper = (props) => {
  // Extract type from the URL
  // const { type } = useParams();
  const { type, status } = useParams(); // Access params from RoleBasedRenderer

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
      // draft={CustomdraftComponent}
      // published={published}
      // TidakValid={CustomTidakValidComponent}
    />
  );
};

export default BUPOTWrapper;
