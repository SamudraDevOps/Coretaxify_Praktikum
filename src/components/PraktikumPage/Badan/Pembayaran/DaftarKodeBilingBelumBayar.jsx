import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { getCsrf } from "@/service/getCsrf";
import { useMutation } from "@tanstack/react-query";
import { RoutesApi } from "@/Routes";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { PDFViewer } from "@react-pdf/renderer";
import BillingCodePdf from "../../PDFTemplate/BillingCodeTemplate";

const generateNTPN = () => {
  // 16 digit random number
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(
    ""
  );
};

const DaftarKodeBilingBelumBayar = ({ data, sidebar }) => {
  const { id, akun } = useParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openNTPN, setOpenNTPN] = useState(false);
  const [ntpn, setNtpn] = useState("");
  const [copied, setCopied] = useState(false); // Tambahkan state untuk pesan copy

  console.log(data);
  const handleBayarClick = () => {
    setOpenConfirm(true);
  };

  const handleSetuju = () => {
    const ntpnBaru = generateNTPN();
    setNtpn(ntpnBaru);
    setOpenConfirm(false);
    setTimeout(() => setOpenNTPN(true), 200); // Delay to avoid dialog overlap
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ntpn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Pesan hilang setelah 2 detik
  };
  const [cookies] = useCookies(["token"]);
  const paySpt = useMutation({
    mutationFn: async (idSpt) => {
      const csrf = await getCsrf();
      return axios.put(
        `${RoutesApi.url}api/student/assignments/${id}/sistem/${akun}/pembayaran/${idSpt}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrf,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: (data, variables) => {
      console.log("success data", data);
      // const successMessage = variables.isDraft
      //   ? "Draft Faktur berhasil dibuat"
      //   : "Faktur berhasil diupload";

      Swal.fire(
        "Berhasil!",
        `Pembayaran SPT berhasil .\n\n Berikut kode NTPN anda "<b>${data.data.ntpn}</b>"`,
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    },
  });
  const totalPembayaran =
    data && data.length > 0
      ? data.reduce((total, item) => total + (parseFloat(item.nilai) || 0), 0)
      : 0;
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="m-4 rounded-md">
      {/* Header */}
      <div className="flex items-center mb-2 pb-3 ">
        <IoDocumentTextOutline className="text-4xl text-blue-900" />
        <h1 className="text-lg font-bold text-blue-900 ml-2">
          Daftar Kode Billing Belum Bayar
        </h1>
      </div>

      {/* Table Headers */}
      <div className="flex flex-row mt-4 border-b p-3">
        <div className="font-semibold mr-2">{sidebar.npwp_akun}</div>
        <div className="font-semibold mr-2">-</div>
        <div className="font-normal">{sidebar.nama_akun}</div>
      </div>
      <div className="flex flex-col items-end mt-3 p-3 border-t ml-auto w-fit">
        <p>Total Pembayaran untuk Penagihan Aktif</p>
        <p className="font-semibold mt-1">{formatCurrency(totalPembayaran)}</p>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-yellow-400 text-white">
            <tr>
              <th className="py-2 px-4 border-b text-center">
                Nama Wajib Pajak
              </th>
              <th className="py-2 px-4 border-b text-center">NPWP</th>
              <th className="py-2 px-4 border-b text-center">Kode Billing</th>
              <th className="py-2 px-4 border-b text-center">
                Returnsheet Type
              </th>
              <th className="py-2 px-4 border-b text-center">Mata Uang</th>
              <th className="py-2 px-4 border-b text-center">Jumlah Total</th>
              <th className="py-2 px-4 border-b text-center">Masa Aktif</th>
              <th className="py-2 px-4 border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data
                .filter((item) => item.is_paid === 0) // Only show unpaid bills
                .map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-100">
                    <td className="py-4 px-4 border-b">{item.nama || "-"}</td>
                    <td className="py-4 px-4 border-b">{item.npwp}</td>
                    <td className="py-4 px-4 border-b">
                      {item.kode_billing || "-"}
                    </td>
                    <td className="py-4 px-4 border-b">{item.kapKjs}</td>
                    <td className="py-4 px-4 border-b">IDR</td>
                    <td className="py-4 px-4 border-b">{item.nilai}</td>
                    <td className="py-4 px-4 border-b">
                      {item.masa_bulan} {item.masa_tahun}
                    </td>
                    <td className="py-4 px-4 border-b space-x-2">
                      {/* <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:underline rounded px-3 py-1">
                        Lihat
                      </button> */}
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:underline rounded px-3 py-1">
                            Lihat PDF
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Preview Dokumen -{" "}
                              {item.kode_billing || "Kode Billing"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Detail dokumen untuk NPWP: {item.npwp}
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <div className="flex flex-col items-center space-y-4">
                            <PDFViewer
                              style={{
                                width: "100%",
                                height: "50vh",
                                border: "none",
                                backgroundColor: "hsl(var(--background))",
                              }}
                            >
                              <BillingCodePdf data={item}></BillingCodePdf>
                            </PDFViewer>
                          </div>

                          <AlertDialogFooter>
                            <AlertDialogCancel
                            // onClick={() => setOpenPdfPreview(false)}
                            >
                              Tutup
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <button className="bg-red-100 text-red-600 hover:bg-red-200 hover:underline rounded px-3 py-1">
                            Bayar
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Konfirmasi Pembayaran
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin melakukan pembayaran untuk
                              kode billing ini?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                            // onClick={() => setOpenConfirm(false)}
                            >
                              Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => paySpt.mutate(item.id)}
                            >
                              Setuju
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="8" className="py-8 px-4 text-center text-gray-500">
                  Tidak ada data kode billing yang belum dibayar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* AlertDialog Konfirmasi Pembayaran */}

      {/* AlertDialog NTPN */}
      <AlertDialog open={openNTPN} onOpenChange={setOpenNTPN}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kode NTPN</AlertDialogTitle>
            <AlertDialogDescription>
              Pembayaran berhasil! Berikut adalah kode NTPN Anda:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center justify-between bg-gray-100 rounded px-3 py-2 my-4">
            <span className="font-mono text-lg">{ntpn}</span>
            <button
              className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
          {copied && (
            <div className="text-green-600 text-sm text-center mb-2">
              kode NTPN berhasil di copy
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenNTPN(false)}>
              Tutup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DaftarKodeBilingBelumBayar;
