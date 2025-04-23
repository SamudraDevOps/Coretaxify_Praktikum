import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { ClipLoader } from "react-spinners";
import { getCookie } from "@/service";
import { getCsrf } from "@/service/getCsrf";
import { CookiesProvider, useCookies } from "react-cookie";

export default function RoleBasedRenderer({ OrangPribadi, Badan }) {
  const { id, akun } = useParams();
  const [cookies, setCookie] = useCookies(["user"]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["account", id],
    queryFn: async () => {
      console.log(cookies.token);
      const { data } = await axios.get(
        `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}`,
        // "http://127.0.0.1:8000/api/student/assignments/1/sistem/1",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(data);
      return data;
    },
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

  // const user = data.find((user) => id === parseInt(akun));
  // console.log(user);
  const isOrangPribadi = data.data.tipe_akun === "Orang Pribadi";
  // console.log(data.data);
  return <>{isOrangPribadi ? <OrangPribadi /> : <Badan />}</>;
}
