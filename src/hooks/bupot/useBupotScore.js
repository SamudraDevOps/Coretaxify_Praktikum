import { useState } from "react";
import axios from "axios";
import { RoutesApi } from "@/Routes";

export const useBupotScore = (
  cookies,
  assignmentId,
  akun,
  userId,
  sistemId,
  tipeBupot
) => {
  const [scoreData, setScoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchScore = async () => {
    if (!userId || !sistemId || !tipeBupot) return;

    setIsLoading(true);
    try {
      const url = `${RoutesApi.apiUrl}student/assignments/${assignmentId}/sistem/${akun}/penilaian/bupot-scores`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        },
        params: {
          column_filters: {
            sistem_id: sistemId,
            tipe_bupot: tipeBupot,
          },
        },
      });

      console.log("Response data:", response.data);

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setScoreData(response.data.data[0]);
      } else {
        setScoreData(null);
      }
    } catch (error) {
      console.error("Error fetching score:", error);
      setScoreData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createScore = async (scorePayload) => {
    console.log("scorePayload:", scorePayload);
    setIsCreating(true);
    try {
      const csrfResponse = await axios.get(`${RoutesApi.apiUrl}csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      const csrfToken = csrfResponse.data.token;
      const url = `${RoutesApi.apiUrl}student/assignments/${assignmentId}/sistem/${akun}/penilaian/bupot-scores`;
      const response = await axios.post(
        url,
        {
          ...scorePayload,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      fetchScore();
    } catch (error) {
      console.error("Error creating score:", error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const updateScore = async (scoreId, scorePayload) => {
    console.log("updateScore called with scoreId:", scoreId);
    console.log("scorePayload:", scorePayload);
    setIsUpdating(true);
    try {
      const csrfResponse = await axios.get(`${RoutesApi.apiUrl}csrf-token`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      const csrfToken = csrfResponse.data.token;
      const url = `${RoutesApi.apiUrl}student/assignments/${assignmentId}/sistem/${akun}/penilaian/bupot-scores/${scoreId}`;
      const response = await axios.put(
        url,
        {
          ...scorePayload,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      fetchScore();
    } catch (error) {
      console.error("Error updating score:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    scoreData,
    isLoading,
    isCreating,
    isUpdating,
    fetchScore,
    createScore,
    updateScore,
  };
};
