import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { RoutesApi } from "@/Routes";
import { useParams } from "react-router";

export const useNpwp = () => {
  const [npwp, setNpwp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["token"]);
  const { id, akun, faktur } = useParams();

  useEffect(() => {

    const fetchNpwp = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${RoutesApi.apiUrl}student/assignments/${id}/sistem/${akun}/getAkun`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );

        console.log("NPWP Response:", data);
        setNpwp(data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch npwp");
        console.error("Error fetching npwp:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNpwp();
  }, [cookies.token]);

  return { npwp, loading, error };
};
