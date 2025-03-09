import { getCsrf } from "@/service/getCsrf";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import IntentEnum from "@/constant/intent";

export const getDosenPraktikumKelas = (url, id, cookie) =>
  useQuery({
    queryKey: ["praktikum", url],
    queryFn: async () => {
      const { data } = await axios.get(url + `/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
          Accept: "application/json",
        }, // params: {
        //   intent: RoutesApi.classGroup.intent,
        // },
      });
      console.log(data);
      return data;
    },
  });
export const getOneDosenPraktikumKelas = (url, id, idPraktikum, cookie) =>
  useQuery({
    queryKey: ["praktikum", idPraktikum],
    queryFn: async () => {
      if (idPraktikum == "") {
        return null;
      }
      const { data } = await axios.get(
        url + `/${id}` + `/assignments/${idPraktikum}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
            Accept: "application/json",
          }, // params: {
          //   intent: RoutesApi.classGroup.intent,
          // },
        }
      );
      console.log(data);
      return data;
    },
  });
export const updatePraktikumDosen = (
  cookies,
  class_id,
  formData,
  supporting_files
) =>
  useMutation({
    mutationFn: async (id) => {
      const csrf = await getCsrf();
      console.log("hello");
      console.log(formData.start_period.split("-").reverse().join("-"));
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf;
      const data = await axios.post(
        `${RoutesApi.url}api/lecturer/groups/${class_id}/assignments/${id}`,
        {
          name: formData.name,
          task_id: formData.task_id,
          start_period: formData.start_period,
          end_period: formData.end_period,
          // start_period: new Date(formData.start_period)
          //   .toISOString()
          //   .split(".")[0]
          //   .replace("T", " "),
          // end_period: new Date(formData.end_period)
          //   .toISOString()
          //   .split(".")[0]
          //   .replace("T", " "),
          supporting_file: supporting_files,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            _method: "PUT",
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Praktikum berhasil diubah!", "success");
      // window.location.reload();
    },
    onError: (error) => {
      console.log(error);
      Swal.fire("Gagal !", error.message, "error");
    },
  });

export const getTaskContract = (url, cookie) =>
  useQuery({
    queryKey: ["taskContract"],
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

export const createPraktikumDosen = (
  cookies,
  class_id,
  formData,
  supporting_files
) =>
  useMutation({
    mutationFn: async () => {
      const csrf = await getCsrf();
      console.log(supporting_files);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf;
      const data = await axios.post(
        `${RoutesApi.url}api/lecturer/groups/${class_id}/assignments`,
        {
          name: formData.name,
          task_id: formData.task_id,
          start_period: formData.start_period,
          end_period: formData.end_period,
          supporting_file: supporting_files,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_USER_CREATE_ASSIGNMENT,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Praktikum berhasil dibuat!", "success");
      // window.location.reload();
    },
    onError: (error) => {
      console.log(error);
      Swal.fire("Gagal !", error.message, "error");
    },
  });

export const deletePraktikumDosen = (cookies, class_id) =>
  useMutation({
    mutationFn: async (assignment_id) => {
      const csrf = await getCsrf();
      console.log(class_id);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf;
      const data = await axios.delete(
        `${RoutesApi.url}api/lecturer/groups/${class_id}/assignments/${assignment_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Praktikum berhasil dihapus!", "success");
      // window.location.reload();
    },
    onError: (error) => {
      console.log(error);
      Swal.fire("Gagal !", error.message, "error");
    },
  });
export const deleteMemberPraktikum = (cookies, class_id, assignment_id) =>
  useMutation({
    mutationFn: async (member_id) => {
      const csrf = await getCsrf();
      console.log(class_id);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf;
      const data = await axios.delete(
        `${RoutesApi.url}api/lecturer/groups/${class_id}/assignments/${assignment_id}/members/${member_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire("Berhasil!", "Mahasiswa berhasil dikeluarkan!", "success");
      // window.location.reload();
    },
    onError: (error) => {
      console.log(error);
      Swal.fire("Gagal !", error.message, "error");
    },
  });
