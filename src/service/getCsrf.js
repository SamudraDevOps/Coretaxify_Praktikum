import { RoutesApi } from "@/Routes";
import axios from "axios";

export const getCsrf = async () => {
  const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
    // withCredentials: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
    },
  });
  axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
  return response.data.token;
};
