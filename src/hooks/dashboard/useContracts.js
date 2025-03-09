import { dashboard_const } from "@/constant/dashboard";
import { getCookieToken } from "@/service";
import { getCsrf } from "@/service/getCsrf";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { RoutesApi } from "@/Routes";

export const getContracts = (url, cookie) =>
  useQuery({
    queryKey: [dashboard_const.contracts, url],
    queryFn: async () => {
      const data = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      // console.log(data.data);
      return data;
    },
  });
export const getOneContract = (url, cookie) =>
  useQuery({
    queryKey: [dashboard_const.contracts, url],
    queryFn: async () => {
      console.log(url);
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      console.log("one contract");
      console.log(data.data);
      return data;
    },
  });

export const testAlert = () => {
  Swal.fire("Berhasil!", "Kelas berhasil dihapus!", "success");
};

export const deleteContract = (cookie) =>
  useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      //   const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
      //     // withCredentials: true,
      //     headers: {
      //       "X-Requested-With": "XMLHttpRequest",
      //       Accept: "application/json",
      //     },
      //   });

      //   console.log(response.data.token);
      //   axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      //   console.log(cookie.token);
      const csrf = getCsrf();
      const data = await axios.delete(RoutesApi.contractAdmin + `/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrf,
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Kelas berhasil dihapus!", "success");

      window.location.reload();
      //   window.location.href = "/" + cookie.role;
    },

    onError: (error) => {
      console.log("hello!");
      console.log(error);
      Swal.fire("Gagal !", error.message, "error");
    },
  });
