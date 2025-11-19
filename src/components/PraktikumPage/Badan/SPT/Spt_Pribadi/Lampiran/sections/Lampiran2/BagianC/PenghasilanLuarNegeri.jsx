import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatNumber, parseFormattedNumber, formatRupiah } from "@utils/formatCurrency";
import GlobalModal from "@shared/GlobalModal";

const PenghasilanLuarNegeri = ({ config }) => {
  const {
    baseFields = [
      "namaPemotong",
      "npwpPemotong",
      "kode",
      "jenis",
      "namaPemberi",
      "negara",
      "tanggalPemotongan",
      "penghasilanNeto",
      "pajakDibayarLuarNegeri",
      "mataUang",
      "pajakDibayarRupiah",
      "kreditYangDapatDiperhitungkan",
    ],
    customChildren = [],
    defaultData = {
      namaPemotong: "PT. Contoh Perusahaan",
      npwpPemotong: "",
      kode: "",
      jenis: "",
      namaPemberi: "",
      negara: "",
      tanggalPemotongan: "",
      penghasilanNeto: "",
      pajakDibayarLuarNegeri: "",
      mataUang: "",
      pajakDibayarRupiah: "",
      kreditYangDapatDiperhitungkan: "",
    },
  } = config || {};

  const [dataPenghasilan, setDataPenghasilan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);

  // Open modal untuk add
  const openAddModal = () => {
    setSelected({ ...defaultData });
    setEditingId(null);
    setShowModal(true);
  };

  // Open modal untuk edit
  const openEditModal = (item) => {
    setSelected(item);
    setEditingId(item.id);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSelected(null);
  };

  // Save data
  const saveData = (values) => {
    console.log("Saved values:", values);
    if (editingId) {
      setDataPenghasilan((prev) =>
        prev.map((item) => (item.id === editingId ? { ...values, id: editingId } : item))
      );
    } else {
      setDataPenghasilan((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    closeModal();
  };

  // Delete data
  const deleteData = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setDataPenghasilan((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Tambah Data
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto text-sm text-left border overflow-hidden">
          <thead className="bg-purple-700 text-white text-center">
            <tr>
              <th className="p-2 border-b">No</th>
              <th className="p-2 border-b min-w-[200px]"> Nama Pemberi Penghasilan </th>
              <th className="p-2 border-b min-w-[200px]">Nama Negara</th>
              <th className="p-2 border-b min-w-[200px]"> Tanggal pemotongan</th>
              <th className="p-2 border-b min-w-[150px]"> Jenis Penghasilan</th>
              <th className="p-2 border-b min-w-[150px]">Kode</th>
              <th className="p-2 border-b min-w-[150px]">Penghasilan Neto</th>
              <th className="p-2 border-b min-w-[150px]">
                {" "}
                Pajak yang Dibayar/Dipotong/Terutang di Luar Negeri dalam Mata Uang Asing /
              </th>
              <th className="p-2 border-b min-w-[150px]">Mata Uang</th>
              <th className="p-2 border-b min-w-[150px]">
                {" "}
                Pajak yang Dibayar/Dipotong/Terutang di Luar Negeri dalam Mata Uang Rupiah{" "}
              </th>
              <th className="p-2 border-b min-w-[150px]"> Kredit yang dapat diperhitungkan</th>
              <th className="p-2 border-b uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-center">
            {dataPenghasilan.length === 0 ? (
              <tr>
                <td colSpan="14" className="p-4 text-center text-gray-500">
                  Belum ada data. Klik "Tambah Data" untuk menambah data baru.
                </td>
              </tr>
            ) : (
              dataPenghasilan.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2 border-b text-center">{index + 1}</td>
                  <td className="p-2 border-b">{item.namaPemberi || "-"}</td>
                  <td className="p-2 border-b">{item.negara || "-"}</td>
                  <td className="p-2 border-b">{item.tanggalPemotongan || "-"}</td>
                  <td className="p-2 border-b max-w-xs truncate">
                    {customChildren
                      ?.find((f) => f.key === "jenis")
                      ?.options?.find((opt) => opt.value === item.jenis)?.label || item.jenis}
                  </td>
                  <td className="p-2 border-b">{item.kode || "-"}</td>
                  <td className="p-2 border-b">{formatRupiah(item.penghasilanNeto) || "-"}</td>
                  <td className="p-2 border-b">
                    {formatRupiah(item.pajakDibayarLuarNegeri) || "-"}
                  </td>
                  <td className="p-2 border-b">{item.mataUang || "-"}</td>
                  <td className="p-2 border-b">{formatRupiah(item.pajakDibayarRupiah) || "-"}</td>
                  <td className="p-2 border-b">
                    {formatRupiah(item.kreditYangDapatDiperhitungkan) || "-"}
                  </td>

                  <td className="p-2 border-b">
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit Data"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteData(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Hapus Data"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

          {/* Footer dengan total */}
          {/* {data.length > 0 && (
                     <tfoot className="text-gray-800 font-semibold bg-gray-100">
                       <tr>
                         <td className="p-2 text-right" colSpan={6}>
                           Total Penghasilan Bruto:
                         </td>
                         <td className="p-2 text-center">
                           {formatRupiah(calculateTotalPenghasilanBruto())}
                         </td>
                         <td className="p-2 text-center">
                           {formatRupiah(calculateTotalPajakPenghasilan())}
                         </td>
                         <td className="p-2" colSpan={6}></td>
                       </tr>
                       <tr>
                         <td className="p-2 text-right" colSpan={13}>
                           <span className="text-blue-600">
                             Jumlah Data: {data.length} item
                           </span>
                         </td>
                         <td className="p-2"></td>
                       </tr>
                     </tfoot>
                   )} */}
        </table>
      </div>

      {/*  MODAL dengan Safe Config */}
      <GlobalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={saveData}
        title={editingId ? "Edit Penghasilan Kena Pajak" : "Tambah Penghasilan Kena Pajak"}
        baseFields={baseFields}
        customChildren={customChildren}
        data={selected || {}}
        size="2xl"
      />
    </div>
  );
};

export default PenghasilanLuarNegeri;
