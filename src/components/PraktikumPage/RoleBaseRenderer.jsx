import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { getCookie } from "@/service";
import { getCsrf } from "@/service/getCsrf";
import { CookiesProvider, useCookies } from "react-cookie";
import { getCookieToken } from "@/service";
import Header from "../Header/Header";

export default function RoleBasedRenderer({ OrangPribadi, Badan }) {
  const { id, akun } = useParams();
  const [cookies, setCookie] = useCookies(["user"]);
  const token = getCookieToken();
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["account", id],
  //   queryFn: async () => {
  //     console.log(cookies.token);
  //     const { data } = await axios.get(
  //       `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}`,
  //       // "http://127.0.0.1:8000/api/student/assignments/1/sistem/1",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookies.token}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     console.log(data);
  //     return data;
  //   },
  // });
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["getportal", id],
    queryFn: async () => {
      const response = await axios.get(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            intent: "api.get.sistem.ikhtisar.profil",
          },
        }
      );

      // Check if response data exists
      if (!response.data) {
        throw new Error("No data returned from API");
      }

      return response.data.data;
    },
    enabled: !!id && !!token,
  });

  if (isLoading) {
    console.log("loading");
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className="">
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  console.log(data);
  // const user = data.find((user) => id === parseInt(akun));
  // console.log(user);
  const isOrangPribadi = data.tipe_akun === "Orang Pribadi";
  return (
    <>
      {isOrangPribadi ? (
        <>
          <Header></Header>
          <OrangPribadi data={data} />
        </>
      ) : (
        <>
          <Header></Header>
          <Badan data={data} />
        </>
      )}
    </>
  );
}
