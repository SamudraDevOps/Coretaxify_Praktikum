import { dashboard_const } from "@/constant/dashboard";
import { getCookieToken } from "@/service";
import { getCsrf } from "@/service/getCsrf";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { RoutesApi } from "@/Routes";

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
