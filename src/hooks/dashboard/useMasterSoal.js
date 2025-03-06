import { dashboard_const } from "@/constant/dashboard";
import { getCookieToken } from "@/service";
import { getCsrf } from "@/service/getCsrf";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { RoutesApi } from "@/Routes";

export const getMasterSoal = (url, cookie) =>
  useQuery({
    queryKey: [dashboard_const.master_soal, url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
          Accept: "application/json",
        },
      });
      console.log(data);
      return data;
    },
  });

export const mutationSoal = (cookie, formData, action) =>
  useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      const csrf = getCsrf();
      //   axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookie.token);
      if (action === "update" && id) {
        const data = await axios.post(
          RoutesApi.tasksAdmin + "/" + id,
          {
            name: formData.name,
            import_file: formData.file,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              "X-CSRF-TOKEN": response.data.token,
              Authorization: `Bearer ${cookie.token}`,
            },
            params: {
              _method: "PUT",
            },
          }
        );
        return data;
      } else if (action === "delete" && id) {
        const data = await axios.delete(RoutesApi.tasksAdmin + `/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookie.token}`,
          },
        });
        return data;
      }
      const data = await axios.post(
        RoutesApi.tasksAdmin,
        {
          name: formData.name,
          import_file: formData.file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const createMasterSoal = (cookie, formData) =>
  useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      const csrf = getCsrf();
      //   axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookie.token);
      const data = await axios.post(
        RoutesApi.tasksAdmin,
        {
          name: formData.name,
          import_file: formData.file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export const deleteMasterSoal = (cookie, formData) =>
  useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookie.token);
      const data = await axios.post(
        RoutesApi.tasksAdmin,
        {
          name: formData.name,
          import_file: formData.file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
