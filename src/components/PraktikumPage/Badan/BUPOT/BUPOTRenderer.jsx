import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { RoutesApi } from "@/Routes";
import Header from "@/components/Header/Header";

// Import our shared components
import BUPOTLayout from "./shared/BUPOTLayout";

const BUPOTRenderer = ({
  type,
  BelumTerbit,
  TelahTerbit,
  TidakValid,
  apiEndpoint,
  queryKey,
  titles = {},
  data = null, // For when data is passed from RoleBasedRenderer
}) => {
  const { id, akun, status } = useParams();
  const [cookies] = useCookies(["token"]);
  const location = useLocation();

  const getBupot = () => {
    if (location.pathname.includes("/bppu")) return "BPPU";
    if (location.pathname.includes("/bpnr")) return "BPNR";
    if (location.pathname.includes("/ps")) return "Penyetoran Sendiri";
    if (location.pathname.includes("/psd")) return "Pemotongan Secara Digunggung";
    if (location.pathname.includes("/bp21")) return "BP 21";
    if (location.pathname.includes("/bp26")) return "BP 26";
    if (location.pathname.includes("/bpa1")) return "BP A1";
    if (location.pathname.includes("/bpa2")) return "BP A2";
    if (location.pathname.includes("/bpbpt")) return "BPBPT";
    // if (location.pathname.includes("/dsbp")) return "DSBP";
    return "DSBP";
  };

  const currentBupot = getBupot();

  console.log("Current BUPOT:", currentBupot);

  // Determine which status we're viewing
  const getStatus = () => {
    if (location.pathname.includes("/telah-terbit")) return "published";
    if (location.pathname.includes("/tidak-valid")) return "invalid";
    return "draft";
  };

  const currentStatus = getStatus();

  // Only fetch data if it wasn't provided via props (from RoleBasedRenderer)
  const {
    data: fetchedData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [queryKey || `bupot-${type}`, id, akun, currentStatus],
    queryFn: async () => {
      const url = `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/bupot`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          intent: `api.bupot.${type}`,
          column_filters: {
            status_penerbitan: currentStatus,
            tipe_bupot: currentBupot,
          },
        },
      });
      console.log("BUPOT Response:", data);
      return data;
    },
    // Skip the query if data is provided directly
    // enabled: !data,
  });

  // Use provided data or fetched data
  const bupotData = fetchedData;

  if (isLoading && !fetchedData) {
    return (
      <>
        {/* <Header /> */}
        <div className="loading flex items-center justify-center h-screen">
          <ClipLoader color="#7502B5" size={50} />
          <p className="ml-3">Loading data...</p>
        </div>
      </>
    );
  }

  if (error && !fetchedData) {
    return (
      <>
        {/* <Header /> */}
        <div className="error-container p-5 text-center">
          <h1 className="text-red-600 text-xl">Error</h1>
          <p>{error.message || "Error loading data"}</p>
        </div>
      </>
    );
  }

  // Determine which component to render based on status
  const renderContent = () => {
    switch (currentStatus) {
      case "published":
        return TelahTerbit ? (
          <TelahTerbit data={bupotData?.data || []} />
        ) : (
          <BUPOTLayout
            type={type}
            status={currentStatus}
            data={bupotData?.data || []}
            tableTitle={
              titles.published || `EBUPOT ${type.toUpperCase()} ISSUED`
            }
            sidebarTitle={titles.sidebar || type.toUpperCase()}
          />
        );
      case "invalid":
        return TidakValid ? (
          <TidakValid data={bupotData?.data || []} />
        ) : (
          <BUPOTLayout
            type={type}
            status={currentStatus}
            data={bupotData?.data || []}
            tableTitle={
              titles.invalid || `EBUPOT ${type.toUpperCase()} INVALID`
            }
            sidebarTitle={titles.sidebar || type.toUpperCase()}
          />
        );
      default:
        return BelumTerbit ? (
          <BelumTerbit data={bupotData?.data || []} />
        ) : (
          <BUPOTLayout
            type={type}
            status={currentStatus}
            data={bupotData?.data || []}
            tableTitle={
              titles.belumTerbit || `EBUPOT ${type.toUpperCase()} NOT ISSUED`
            }
            sidebarTitle={titles.sidebar || type.toUpperCase()}
          />
        );
    }
  };

  return (
    <>
      {/* <Header /> */}
      {renderContent()}
    </>
  );
};

export default BUPOTRenderer;
