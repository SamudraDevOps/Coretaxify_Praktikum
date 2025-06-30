import React, { useState, useEffect } from "react";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import {
          Chart as ChartJS,
          CategoryScale,
          LinearScale,
          BarElement,
          Title,
          Tooltip,
          Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./dashboardAdmin.css";
import { FaUsers } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MOCK_LABELS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const MOCK_DATA_MAHASISWA = [10, 12, 15, 14, 16, 18, 20, 22, 21, 19, 17, 15];
const MOCK_DATA_PEMBIMBING = [5, 6, 7, 7, 8, 9, 10, 10, 9, 8, 7, 6];

const DashboardAdmin = () => {
          const [userData, setUserData] = useState({
            totalPengguna: 0,
            pembimbing: 0,
            mahasiswa: 0,
          });

          const [chartData, setChartData] = useState({
            labels: [],
            datasets: [],
          });

          const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
          const [loading, setLoading] = useState(true);

          useEffect(() => {
            // Fetch summary user data
            const fetchUserData = async () => {
              try {
                const res = await axios.get(`${RoutesApi.apiUrl}user-stats`);
                setUserData({
                  totalPengguna: res.data.totalPengguna,
                  pembimbing: res.data.pembimbing,
                  mahasiswa: res.data.mahasiswa,
                });
              } catch (error) {
                // fallback mock
                setUserData({
                  totalPengguna: 100,
                  pembimbing: 40,
                  mahasiswa: 60,
                });
              }
            };

            // Fetch chart data
            const fetchChartData = async () => {
              setLoading(true);
              try {
                const res = await axios.get(`${RoutesApi.apiUrl}user-stats-chart`, {
                  params: { year: selectedYear },
                });
                setChartData({
                  labels: res.data.labels,
                  datasets: [
                    { label: "Total Pengguna", data: res.data.total, backgroundColor: "skyblue" },
                    { label: "Pembimbing", data: res.data.pembimbing, backgroundColor: "royalblue" },
                    { label: "Mahasiswa", data: res.data.mahasiswa, backgroundColor: "mediumblue" },
                  ],
                });
              } catch (error) {
                // fallback mock
                setChartData({
                  labels: MOCK_LABELS,
                  datasets: [
                    {
                      label: "Total Pengguna",
                      data: MOCK_DATA_MAHASISWA.map((v, i) => v + MOCK_DATA_PEMBIMBING[i]),
                      backgroundColor: "skyblue",
                    },
                    {
                      label: "Pembimbing",
                      data: MOCK_DATA_PEMBIMBING,
                      backgroundColor: "royalblue",
                    },
                    {
                      label: "Mahasiswa",
                      data: MOCK_DATA_MAHASISWA,
                      backgroundColor: "mediumblue",
                    },
                  ],
                });
              }
              setLoading(false);
            };

            fetchUserData();
            fetchChartData();
          }, [selectedYear]);

          const options = {
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
              title: {
                display: true,
                text: `Statistik Pertumbuhan Data Tahun ${selectedYear}`,
              },
            },
            scales: {
              x: { stacked: true },
              y: { stacked: true },
            },
          };

          const handleYearChange = (e) => {
            setSelectedYear(parseInt(e.target.value));
          };

          if (loading || !chartData.labels.length) {
            return (
              <div className="loading">
                <ClipLoader color="#7502B5" size={50} />
              </div>
            );
          }

          return (
            <div className="dashboard-container">
              <div className="card-container">
                <div className="card">
                  <FaUsers className="card-icon" />
                  <h2>Total Pengguna</h2>
                  <p>{userData.totalPengguna}</p>
                  <p>Dari Sebelumnya 1000</p>
                </div>
                <div className="card">
                  <FaUsers className="card-icon" />
                  <h2>Pembimbing</h2>
                  <p>{userData.pembimbing}</p>
                  <p>Dari Sebelumnya 1000</p>
                </div>
                <div className="card">
                  <FaUsers className="card-icon" />
                  <h2>Mahasiswa</h2>
                  <p>{userData.mahasiswa}</p>
                  <p>Dari Sebelumnya 1000</p>
                </div>
              </div>
              <div className="filter-container">
                <label htmlFor="year-select">Pilih Tahun:</label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="year-dropdown"
                >
                  {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="chart-container">
                <Bar options={options} data={chartData} />
              </div>
            </div>
          );
};

export default DashboardAdmin;
