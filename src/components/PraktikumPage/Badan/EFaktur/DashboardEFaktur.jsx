import React from "react";
import SideBarEFaktur from "./SideBarEFaktur";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useParams } from "react-router";

const DashboardEFaktur = ({ data, sidebar }) => {
  console.log(data.all_faktur);
  const { id, akun } = useParams();

  // Extract data directly from data object (not data.column)
  const chartData = data || {};
  const allFaktur = chartData.all_faktur || 0;
  const fakturKeluaranAmended = chartData.faktur_keluaran_amended || 0;
  const fakturKeluaranApproved = chartData.faktur_keluaran_approved || 0;
  const fakturKeluaranCanceled = chartData.faktur_keluaran_canceled || 0;
  const fakturKeluaranDraft = chartData.faktur_keluaran_draft || 0;
  const fakturMasukan = chartData.faktur_masukan || 0;

  // Calculate percentages
  const total = allFaktur || 1; // Avoid division by zero
  const amendedPercentage = ((fakturKeluaranAmended / total) * 100).toFixed(1);
  const approvedPercentage = ((fakturKeluaranApproved / total) * 100).toFixed(
    1
  );
  const canceledPercentage = ((fakturKeluaranCanceled / total) * 100).toFixed(
    1
  );
  const draftPercentage = ((fakturKeluaranDraft / total) * 100).toFixed(1);
  const masukanPercentage = ((fakturMasukan / total) * 100).toFixed(1);

  const pieData = {
    labels: [
      `Faktur Masukan (${masukanPercentage}%)`,
      `Faktur Keluaran Approved (${approvedPercentage}%)`,
      `Faktur Keluaran Draft (${draftPercentage}%)`,
      `Faktur Keluaran Amended (${amendedPercentage}%)`,
      `Faktur Keluaran Canceled (${canceledPercentage}%)`,
    ],
    datasets: [
      {
        data: [
          fakturMasukan,
          fakturKeluaranApproved,
          fakturKeluaranDraft,
          fakturKeluaranAmended,
          fakturKeluaranCanceled,
        ],
        backgroundColor: [
          "#28A745", // Green for Faktur Masukan
          "#007BFF", // Blue for Approved
          "#6C757D", // Gray for Draft
          "#FFC107", // Yellow for Amended
          "#DC3545", // Red for Canceled
        ],
        hoverBackgroundColor: [
          "#218838",
          "#0056B3",
          "#5A6268",
          "#E0A800",
          "#C82333",
        ],
      },
    ],
  };

  const barData = {
    labels: ["NORMAL"],
    datasets: [
      {
        label: "PPN",
        data: [60000000],
        backgroundColor: "#264de4",
      },
      {
        label: "PPnBM",
        data: [-20000000],
        backgroundColor: "#6C757D",
      },
    ],
  };

  return (
    <div className="flex h-screen">
      {/* badan */}
      <SideBarEFaktur
        nama_akun={sidebar.nama_akun}
        npwp_akun={sidebar.npwp_akun}
        akun={{ id: id, akun: akun }}
      />
      <div className="flex-1 pl-3 pt-6 h-[100%] w-[100%] ">
        <div className="bg-blue-900 text-white p-4 rounded-md mb-5 w-full ">
          <h2 className="text-xl font-bold">Dasbor e-Faktur</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-6 ">
          <div className="bg-gray-100 p-4 rounded-md shadow h-[100%] border-[1px] border-gray-300">
            <h3 className="font-bold mb-3">Dasbor Faktur Pajak</h3>
            <div className="h-[30rem]">
              <Pie data={pieData} className="mb-2 " />
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow h-[100%] border-[1px] border-gray-300">
            <h3 className="font-bold mb-3">
              Dasbor Pembayaran dan Pelaporan PPN
            </h3>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEFaktur;
