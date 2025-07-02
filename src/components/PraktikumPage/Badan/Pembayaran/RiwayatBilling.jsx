import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { PDFViewer } from "@react-pdf/renderer";
import BillingCodePdf from "../../PDFTemplate/BillingCodeTemplate";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";
import { useParams } from "react-router";

const generateNTPN = () => {
  // 16 digit random number
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(
    ""
  );
};

const RiwayatBilling = ({ data, sidebar }) => {
  console.log(data);
  const [openNTPN, setOpenNTPN] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Add this to track selected item
  const [copied, setCopied] = useState(false);

  const handleLihatNTPNClick = (item) => {
    // Modified to accept item parameter
    setSelectedItem(item); // Store the selected item
    setOpenNTPN(true);
  };

  const handleCopy = (ntpn) => {
    navigator.clipboard.writeText(ntpn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const navigate = useNavigateWithParams();
  const { id, akun } = useParams();

  return (
    <div className="m-4 rounded-md">
      {/* Header */}
      <div className="flex items-center mb-2 pb-3 ">
        <IoDocumentTextOutline className="text-4xl text-blue-900" />
        <h1 className="text-lg font-bold text-blue-900 ml-2">
          Riwayat Pembayaran
        </h1>
      </div>

      {/* Table Headers */}
      <div className="flex flex-row mt-4 border-b p-3">
        <div className="font-semibold mr-2">{sidebar.npwp_akun}</div>
        <div className="font-semibold mr-2">-</div>
        <div className="font-normal">{sidebar.nama_akun}</div>
      </div>
      {/* <div className="flex flex-col items-end mt-3 p-3 border-t ml-auto w-fit">
                  <p>Total Pembayaran untuk Penagihan Aktif</p>
                  <p className="font-semibold mt-1">Rp 10.000.000</p>
              </div> */}
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
          {/* <tbody>
            <tr className="hover:bg-gray-100 ">
              <td className="py-4 px-4 border-b">Putri Nuril Wulan</td>
              <td className="py-4 px-4 border-b">38.128.371.972.378.12</td>
              <td className="py-4 px-4 border-b">BILLING-1234567890</td>
              <td className="py-4 px-4 border-b">SPT Masa PPN</td>
              <td className="py-4 px-4 border-b">IDR</td>
              <td className="py-4 px-4 border-b">Rp 10.000.000</td>
              <td className="py-4 px-4 border-b">25 Apr 2025 - 25 Mei 2025</td>
              <td className="py-4 px-4 border-b space-x-2">
                <button
                  className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:underline rounded px-3 py-1"
                  onClick={handleLihatClick}
                >
                  Lihat
                </button>
              </td>
            </tr>
          </tbody> */}
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-100">
                  <td className="py-4 px-4 border-b">{item.nama}</td>
                  <td className="py-4 px-4 border-b">{item.npwp}</td>
                  <td className="py-4 px-4 border-b">{item.kode_billing}</td>
                  <td className="py-4 px-4 border-b">
                    {item.kapKjs || "SPT Masa PPN"}
                  </td>
                  <td className="py-4 px-4 border-b">IDR</td>
                  <td className="py-4 px-4 border-b">
                    Rp {parseFloat(item.nilai).toLocaleString("id-ID")}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {item.masa_bulan} {item.masa_tahun}
                  </td>
                  {/* <td className="py-4 px-4 border-b">{item.ntpn}</td> */}
                  <td className="py-4 px-4 border-b space-x-2">
                    <AlertDialog open={openNTPN} onOpenChange={setOpenNTPN}>
                      <AlertDialogTrigger>
                        <button
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:underline rounded px-3 py-1"
                          onClick={() => handleLihatNTPNClick(item)} // Pass the item
                        >
                          Lihat NTPN
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Kode NTPN</AlertDialogTitle>
                          <AlertDialogDescription>
                            Berikut adalah kode NTPN pembayaran Anda:
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex items-center justify-between bg-gray-100 rounded px-3 py-2 my-4">
                          <span className="font-mono text-lg">
                            {selectedItem?.ntpn}
                          </span>{" "}
                          {/* Use selectedItem */}
                          <button
                            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => handleCopy(selectedItem?.ntpn)} // Use selectedItem
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

                    <button
                      onClick={() =>
                        navigate(
                          `/praktikum/${id}/sistem/${akun}/daftar-kode-billing-belum-dibayar/pdf/${item.id}`
                        )
                      }
                      className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:underline rounded px-3 py-1"
                    >
                      Lihat PDF
                    </button>
                    {/* <AlertDialog>
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
                    </AlertDialog> */}
                    {item.is_paid === 0 && (
                      <button className="bg-red-100 text-red-600 hover:bg-red-200 hover:underline rounded px-3 py-1">
                        Bayar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-8 px-4 text-center text-gray-500">
                  Tidak ada data pembayaran
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* AlertDialog NTPN */}
      {/* <AlertDialog open={openNTPN} onOpenChange={setOpenNTPN}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kode NTPN</AlertDialogTitle>
            <AlertDialogDescription>
              Berikut adalah kode NTPN pembayaran Anda:
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
      </AlertDialog> */}
    </div>
  );
};

export default RiwayatBilling;
