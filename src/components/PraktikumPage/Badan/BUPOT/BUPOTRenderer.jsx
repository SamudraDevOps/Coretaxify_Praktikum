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
      const url = `${
        RoutesApi.apiUrl
      }student/assignments/${id}/sistem/${akun}/${
        apiEndpoint || `bupot/${type}`
      }`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          status: currentStatus,
        },
      });
      return data;
    },
    // Skip the query if data is provided directly
    enabled: !data,
  });

  // Use provided data or fetched data
  const bupotData = data || fetchedData;

  if (isLoading && !data) {
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

  if (error && !data) {
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
