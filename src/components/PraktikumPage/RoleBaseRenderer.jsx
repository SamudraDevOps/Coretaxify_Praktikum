import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the viewAs parameter if it exists, otherwise use the account ID
  const viewAsCompanyId = searchParams.get("viewAs");
  const effectiveCompanyId = viewAsCompanyId || params.akun;

  function fillPath(template, params) {
    return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      // Special handling for 'akun' to use the effective company ID
      if (key === "akun") {
        return effectiveCompanyId;
      }
      return params[key] !== undefined ? params[key] : `:${key}`;
    });
  }

  // Update the path using the effective company ID
  const path = fillPath(url, params);
  console.log("Path after processing:", path);
  console.log("View as company ID:", viewAsCompanyId);
  console.log("Effective company ID:", effectiveCompanyId);

  // First query - get user data (always for the actual user, not the viewed company)
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

  // Query to get represented companies this user can act as
  const { data: representedCompanies, isLoading: companiesLoading } = useQuery({
    queryKey: ["representedCompanies", params.id, params.akun],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${RoutesApi.apiUrl}student/assignments/${params.id}/sistem/${params.akun}/represented-companies`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
              Accept: "application/json",
            },
          }
        );
        return data;
      } catch (error) {
        console.error("Error fetching represented companies:", error);
        return { data: [] };
      }
    },
    enabled: !!params.id && !!params.akun && !!cookies.token,
  });

  // Content data query using the effective company ID
  const {
    data: contentData,
    isLoading: contentLoading,
    isError: contentError,
    error: contentErrorDetails,
  } = useQuery({
    queryKey: [query, params.id, effectiveCompanyId, path, currentPage],
    queryFn: async () => {
      const { data } = await axios.get(path, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
        params: {
          intent: intent,
          page: currentPage,
        },
      });
      console.log("Response data:", data);
      return data;
    },
  });

  // Function to handle switching between companies
  const handleCompanyChange = (companyId) => {
    if (companyId === params.akun) {
      // If switching to the user's own account, remove the viewAs parameter
      searchParams.delete("viewAs");
      setSearchParams(searchParams);
    } else {
      // Otherwise set the viewAs parameter to the selected company ID
      searchParams.set("viewAs", companyId);
      setSearchParams(searchParams);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Show loading state
  if (userLoading || contentLoading || companiesLoading) {
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

  // Determine which component to render based on the type of account being viewed
  const isViewingOrangPribadi = viewAsCompanyId
    ? false
    : userData.data.tipe_akun.includes("Orang Pribadi");

  return (
    <>
      <Header />
      {isViewingOrangPribadi ? (
        <OrangPribadi
          data={contentData.data}
          sidebar={userData.data}
          pagination={contentData}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          onCompanyChange={handleCompanyChange}
          representedCompanies={representedCompanies?.data || []}
        />
      ) : (
        <Badan
          data={contentData.data}
          sidebar={userData.data} // We might need to fetch Badan-specific sidebar data
          pagination={contentData}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          onCompanyChange={handleCompanyChange}
          representedCompanies={representedCompanies?.data || []}
          isViewingAsRepresentative={!!viewAsCompanyId}
        />
      )}
    </>
  );
}
