import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { getCookieToken } from "@/service";
import { useCookies } from "react-cookie";
import Header from "../Header/Header";

export default function RoleBasedRenderer({
  OrangPribadi,
  Badan,
  url,
  intent,
  query,
}) {
  const params = useParams();
  const [cookies] = useCookies(["user"]);
  const [currentPage, setCurrentPage] = useState(1);

  function fillPath(template, params) {
    return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      return params[key] !== undefined ? params[key] : `:${key}`;
    });
  }
  const path = fillPath(url, params);

  // First query - get user data
  const {
    data: userData,
    isLoading: userLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["account", params.id, params.akun],
    queryFn: async () => {
      const { data } = await axios.get(
        `${RoutesApi.apiUrl}student/assignments/${params.id}/sistem/${params.akun}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
          params: {
            intent: "api.get.sistem.ikhtisar.profil",
          },
        }
      );
      return data;
    },
  });

  // Second query - get specific data with pagination
  const {
    data: contentData,
    isLoading: contentLoading,
    isError: contentError,
    error: contentErrorDetails,
  } = useQuery({
    queryKey: [query, params.id, params.akun, path, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(path, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: intent,
          page: currentPage, // Add page parameter
        },
      });
      return data;
    },
  });

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Show loading state
  if (userLoading || contentLoading) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        <ClipLoader color="#7502B5" size={50} />
        <p className="ml-3">Loading data...</p>
      </div>
    );
  }

  // Show error state
  if (isUserError || contentError) {
    const errorMessage = isUserError
      ? userError?.message || "Error loading user data"
      : contentErrorDetails?.message || "Error loading content data";

    return (
      <div className="error-container p-5 text-center">
        <h1 className="text-red-600 text-xl">Error</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  // Ensure data exists
  if (!userData?.data || !contentData?.data) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        <ClipLoader color="#7502B5" size={50} />
        <p className="ml-3">Data not available</p>
      </div>
    );
  }

  // Determine which component to render based on account type
  const isOrangPribadi = userData.data.tipe_akun.includes("Orang Pribadi");

  return (
    <>
      <Header />
      {isOrangPribadi ? (
        <OrangPribadi
          data={contentData.data}
          sidebar={userData.data}
          pagination={contentData} // Pass the whole response for links
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ) : (
        <Badan
          data={contentData.data}
          sidebar={userData.data}
          pagination={contentData} // Pass the whole response for links
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
