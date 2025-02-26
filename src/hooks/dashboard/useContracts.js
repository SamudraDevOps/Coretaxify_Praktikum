import { dashboard_const } from "@/constant/dashboard";
import { getCookieToken } from "@/service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useContracts = (url,cookie) =>
  useQuery({
    queryKey: [dashboard_const.contracts, url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      console.log(data.data);
      return data;
    },
  });
