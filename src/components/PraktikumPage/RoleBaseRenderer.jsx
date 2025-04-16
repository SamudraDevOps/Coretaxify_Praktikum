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

export default function RoleBasedRenderer({
  OrangPribadi,
  Badan,
  url,
  intent,
  query,
}) {
  // const { id, akun } = useParams();
  const params = useParams();
  const [cookies, setCookie] = useCookies(["user"]);
  const token = getCookieToken();

  function fillPath(template, params) {
    return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      return params[key] !== undefined ? params[key] : `:${key}`;
    });
  }
  const path = fillPath(url, params);
  // return (
  //   <>
  //     <p>{path}</p>
  //   </>
  // );
  const {
    data: user,
    isLoading: userLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["account", params.id],
    queryFn: async () => {
      console.log(cookies.token);
      const { data } = await axios.get(
        `${RoutesApi.apiUrl}student/assignments/${params.id}/sistem/${params.akun}`,
        // "http://127.0.0.1:8000/api/student/assignment/1/sistem/1",
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
      console.log(data);
      return data;
      h;
    },
  });
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [query, params.id],
    queryFn: async () => {
      console.log(cookies.token);
      const { data } = await axios.get(
        path,
        // "http://127.0.0.1:8000/api/student/assignment/1/sistem/1",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
          params: {
            intent: intent,
          },
        }
      );
      // console.log(data);
      return data;
    },
  });
  console.log(path, intent);
  // const { isLoading, isError, data, error, refetch } = useQuery({
  //   queryKey: ["getportal", id],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       url,
  //       // `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           intent: "api.get.sistem.ikhtisar.profil",
  //         },
  //       }
  //     );

  //     // Check if response data exists
  //     if (!response.data) {
  //       throw new Error("No data returned from API");
  //     }

  //     return response.data.data;
  //   },
  //   enabled: !!id && !!token,
  // });

  if (isLoading || userLoading) {
    console.log("loading");
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
    );
  }

  if (isError || isUserError) {
    console.log(error);
    return (
      <div className="">
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  // console.log(data);
  // const user = data.find((user) => id === parseInt(akun));
  // console.log(user);
  // console.log(user.data.tipe_akun);
  console.log(user.data);
  const isOrangPribadi = user.data.tipe_akun.includes("Orang Pribadi");
  console.log(isOrangPribadi);
  return (
    <>
      {isOrangPribadi ? (
        <>
          <Header></Header>
          <OrangPribadi data={data.data} sidebar={user.data} />
        </>
      ) : (
        <>
          badan
          <Header></Header>
          <Badan data={data.data} sidebar={user.data} />
        </>
      )}
    </>
  );
}
