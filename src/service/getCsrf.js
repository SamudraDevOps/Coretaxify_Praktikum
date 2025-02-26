import { RoutesApi } from "@/Routes";
import axios from "axios";

export const  getCsrf = async () =>{
  const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      return response.data.token;
}