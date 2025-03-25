import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { RoutesApi } from '@/Routes';
import { useCookies } from 'react-cookie';
import { IntentEnum } from '@/enums/IntentEnum';
import Swal from 'sweetalert2';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RxCross1 } from "react-icons/rx";

const JoinPraktikum = ({ isOpen, setIsOpen, onSuccess }) => {
  const [cookies] = useCookies(['token']);
  const [praktikumCode, setPraktikumCode] = useState('');

  const joinPraktikumMutation = useMutation({
    mutationFn: async () => {
      // Get CSRF token
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });

      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      
      // Join praktikum API call
      return await axios.post(
        RoutesApi.student_psc.assignments.url,
        {
          assignment_code: praktikumCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
          params: {
            intent: IntentEnum.API_USER_JOIN_ASSIGNMENT,
          },
        }
      );
    },
    onSuccess: (data) => {
      setIsOpen(false);
      setPraktikumCode('');
      Swal.fire({
        title: "Berhasil!",
        text: "Anda berhasil bergabung dengan praktikum!",
        icon: "success",
        confirmButtonText: "OK",
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error(error);
      setIsOpen(false);
      setPraktikumCode('');
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat bergabung dengan praktikum.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (!praktikumCode.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Kode praktikum tidak boleh kosong!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    joinPraktikumMutation.mutate();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-full flex justify-end">
            <AlertDialogCancel className="border-none shadow-none">
              <RxCross1 className="text-2xl text-black hover:cursor-pointer" />
            </AlertDialogCancel>
          </div>
          <AlertDialogTitle>Gabung Praktikum</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-4">Masukkan kode praktikum untuk bergabung dengan praktikum.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="praktikumCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Kode Praktikum
                </label>
                <input
                  type="text"
                  id="praktikumCode"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Masukkan kode praktikum"
                  value={praktikumCode}
                  onChange={(e) => setPraktikumCode(e.target.value)}
                  required
                />
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-700">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
            disabled={joinPraktikumMutation.isPending}
          >
            {joinPraktikumMutation.isPending ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Gabung"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default JoinPraktikum;