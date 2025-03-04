import React, { useState } from "react";
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import SidebarProfilSaya from "./SidebarProfilSaya";

const EditDataProfil = () => {
          const [isPerwakilan, setIsPerwakilan] = useState(false);
          const [showInformasiUmum, setShowInformasiUmum] = useState(false);
          const [showDataEkonomi, setShowDataEkonomi] = useState(false);
          const [showDetailKontak, setShowDetailKontak] = useState(false);
          const [showPihakTerkait, setShowPihakTerkait] = useState(false);
          const [showAlamatWajibPajak, setShowAlamatWajibPajak] = useState(false);
          const [showTempatKegiatanUsaha, setShowTempatKegiatanUsaha] = useState(false);

          const [isModalOpen, setIsModalOpen] = useState(false);

          const openModal = () => setIsModalOpen(true);
          const closeModal = () => setIsModalOpen(false);

          const [isKaryawan, setIsKaryawan] = useState(false);
          const [selectedType, setSelectedType] = useState("");
          const [selectedRelatedPersonType, setSelectedRelatedPersonType] = useState("");



          return (
                    <div className="flex h-screen bg-gray-100">
                              <SidebarProfilSaya />
                              <div className="flex-grow p-6 bg-white  h-full">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pembaruan Data Wajib Pajak</h2>
                                        <div className="border rounded-md p-4 mb-4">
                                                  <h3 className="text-lg font-semibold mb-3">Manajemen Kasus</h3>
                                                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                                            <div>
                                                                      <label className="block font-medium text-gray-700">Kanal</label>
                                                                      <select className="w-full p-2 border rounded-md bg-gray-100 text-gray-600">
                                                                                <option>Daring (Portal Wajib Pajak)</option>
                                                                      </select>
                                                            </div>
                                                            <div>
                                                                      <label className="block font-medium text-gray-700">Tanggal Permohonan</label>
                                                                      <div className="flex items-center gap-2">
                                                                                <input type="text" value="27-02-2025" readOnly className="w-full p-2 border rounded-md bg-gray-100 text-gray-600" />
                                                                                <button className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"><FaCalendarAlt /></button>
                                                                                <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"><FaFilter /></button>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                                        <div className="border rounded-md p-4 mb-4">
                                                  <h3 className="text-lg font-semibold mb-3">Kuasa Wajib Pajak</h3>
                                                  <div className="flex items-center gap-2 mb-3">
                                                            <input type="checkbox" className="h-5 w-5" onChange={() => setIsPerwakilan(!isPerwakilan)} />
                                                            <label className="text-gray-700">Diisi oleh perwakilan Wajib Pajak?</label>
                                                  </div>
                                                  <div className={`grid grid-cols-1 md:grid-cols-1 gap-4 ${!isPerwakilan && "opacity-50 pointer-events-none"}`}>
                                                            <div>
                                                                      <label className="block font-medium text-gray-700">ID Penunjukan Perwakilan</label>
                                                                      <div className="flex items-center gap-2">
                                                                                <select className="w-full p-2 border rounded-md bg-gray-100 text-gray-600">
                                                                                          <option>Silakan pilih</option>
                                                                                </select>
                                                                                <button className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"><FaSearch /></button>
                                                                                <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"><FaTimes /></button>
                                                                      </div>
                                                            </div>
                                                            <div className="col-span-2">
                                                                      <label className="block font-medium text-gray-700">NIK/NPWP Perwakilan</label>
                                                                      <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-gray-600" readOnly />
                                                            </div>
                                                            <div className="col-span-2">
                                                                      <label className="block font-medium text-gray-700">Nama Wakil/Kuasa</label>
                                                                      <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-gray-600" readOnly />
                                                            </div>
                                                  </div>
                                        </div>
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center" onClick={() => setShowInformasiUmum(!showInformasiUmum)}>
                                                  <h3 className="text-lg font-semibold">Informasi Umum</h3>
                                                  {showInformasiUmum ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                        {showInformasiUmum && (
                                                  <div className="border rounded-md p-4 mb-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">NPWP</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-gray-600" readOnly />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Jenis Wajib Pajak</label>
                                                                                <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                                                                                          <option>Orang Pribadi</option>
                                                                                          <option>Badan</option>
                                                                                </select>
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Nama</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed" value="Samudera Edukasi Teknologi" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Kategori Wajib Pajak</label>
                                                                                <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                                                                                          <option>Perseroan Terbatas (PT)</option>
                                                                                          <option>Perorangan</option>
                                                                                </select>
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Negara Asal</label>
                                                                                <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                                                                                          <option>Indonesia</option>
                                                                                          <option>Malaysia</option>
                                                                                </select>
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Nomor Keputusan Pengesahan</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Tanggal Keputusan Pengesahan</label>
                                                                                <input type="date" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Nomor Keputusan Pengesahan Perubahan</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Tanggal Surat Keputusan Perubahan Pengesahan</label>
                                                                                <input type="date" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Nomor Akta Pendirian</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Tempat Pendirian</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Tanggal Pendirian</label>
                                                                                <input type="date" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">NIK Notaris</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Nama Notaris</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Fasilitas PMDN</label>
                                                                                <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                                                                                          <option>Swasta Nasional</option>
                                                                                          <option>Fasilitas PMDN</option>
                                                                                          <option>BUMN</option>
                                                                                          <option>BUMD</option>
                                                                                          <option>Penanaman Modal Asing (PMA)</option>
                                                                                </select>
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Modal Dasar</label>
                                                                                <input type="number" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Modal Ditempatkan</label>
                                                                                <input type="number" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Modal Disetor</label>
                                                                                <input type="number" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Kewarganegaraan</label>
                                                                                <select className="w-full p-2 border rounded-md bg-white text-gray-600">
                                                                                          <option>WNI</option>
                                                                                          <option>WNA</option>
                                                                                </select>
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Bahasa Yang Dipilih</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed text-gray-600" value="Bahasa Indonesia" readOnly />
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center" onClick={() => setShowDataEkonomi(!showDataEkonomi)}>
                                                  <h3 className="text-lg font-semibold">Data Ekonomi</h3>
                                                  {showDataEkonomi ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                        {showDataEkonomi && (
                                                  <div className="border rounded-md p-4 mb-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Merk Dagang/Bisnis</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Memiliki Karyawan?</label>
                                                                                <input type="checkbox" className="h-5 w-5" onChange={() => setIsKaryawan(!isKaryawan)} />
                                                                                {isKaryawan && (
                                                                                          <select className="w-full p-2 border rounded-md bg-white text-gray-600 mt-2">
                                                                                                    <option>Jumlah Karyawan</option>
                                                                                                    <option value="1-5">dibawah 10</option>
                                                                                                    <option value="10-100">10 sd 100</option>
                                                                                                    <option value="101-1000">101 sd 1000</option>
                                                                                                    <option value="1000+">diatas 1000</option>
                                                                                          </select>
                                                                                )}

                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Metode Pembukuan/Pencatatan</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Mata Uang Pembukuan</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Periode Pembukuan</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Omset Per Tahun</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                                      <div>
                                                                                <label className="block font-medium text-gray-700">Jumlah Peredaran Bruto</label>
                                                                                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-600" />
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center" onClick={() => setShowDetailKontak(!showDetailKontak)}>
                                                  <h3 className="text-lg font-semibold">Detail Kontak</h3>
                                                  {showDetailKontak ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>

                                        {showDetailKontak && (
                                                  <div className="border rounded-md p-4 mb-4 ">

                                                            <div className="flex justify-between items-center mb-4">
                                                                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded" onClick={openModal}>+ Tambah Kontak</button>
                                                            </div>
                                                            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                                                      <table className="table-auto border border-gray-300 overflow-hidden">

                                                                                <thead className="bg-gray-200 w-[100px]">
                                                                                          <tr>
                                                                                                    <th className="px-6 py-2 border">Aksi</th>
                                                                                                    <th className="px-8 py-2 border">Jenis Kontak</th>
                                                                                                    <th className="px-4 py-2 border">Nomor Telepon</th>
                                                                                                    <th className="px-4 py-2 border">Nomor Handphone</th>
                                                                                                    <th className="px-4 py-2 border">Nomor Faksimile</th>
                                                                                                    <th className="px-4 py-2 border">Alamat Email</th>
                                                                                                    <th className="px-4 py-2 border">Alamat Situs Web</th>
                                                                                                    <th className="px-4 py-2 border">Keterangan</th>
                                                                                                    <th className="px-4 py-2 border">Tanggal Mulai</th>
                                                                                                    <th className="px-4 py-2 border">Tanggal Berakhir</th>
                                                                                          </tr>
                                                                                </thead>
                                                                                <tbody className="text-gray-600">
                                                                                          <tr className="bg-gray-100">
                                                                                                    <td className="px-4 py-4 border"><button></button></td>
                                                                                                    <td className="px-2 py-4 border">
                                                                                                              <select className="w-full p-2 border rounded-md bg-white">
                                                                                                                        <option value="kontak-alternatif-wajib-pajak">Kontak Alterntif Wajib Pajak</option>
                                                                                                                        <option value="kontak-utama-wajib-pajak">Kontak Utama Wajib Pajak</option>
                                                                                                                        <option value="kontak-orang-alternatif">Kontak Orang Alternatif</option>
                                                                                                                        <option value="kontak-orang-utama">Kontak Orang Utama</option>
                                                                                                                        <option value="kontak-teknis-wajib-pajak">Kontak Teknis Wajib Pajak</option>
                                                                                                              </select>
                                                                                                    </td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="date" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="date" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                          </tr>
                                                                                </tbody>
                                                                      </table>
                                                            </div>
                                                            {isModalOpen && (
                                                                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                                                                <div className="bg-white w-[80%] rounded-lg shadow-lg ">

                                                                                          <div className="flex justify-between items-center border-b p-4">
                                                                                                    <h2 className="text-lg font-bold">Tambahkan Kontak Wajib Pajak</h2>
                                                                                                    <button onClick={closeModal} className="text-gray-500 hover:text-red-500">
                                                                                                              <FaTimes size={20} />
                                                                                                    </button>
                                                                                          </div>

                                                                                          <div className="p-4 ">
                                                                                                    <div className="grid gap-4 overflow-auto h-96">
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Jenis Kontak</label>
                                                                                                                        <select className="w-full p-2 border rounded-md bg-white">
                                                                                                                                  <option value="kontak-alternatif-wajib-pajak">Kontak Alterntif Wajib Pajak</option>
                                                                                                                                  <option value="kontak-utama-wajib-pajak">Kontak Utama Wajib Pajak</option>
                                                                                                                                  <option value="kontak-orang-alternatif">Kontak Orang Alternatif</option>
                                                                                                                                  <option value="kontak-orang-utama">Kontak Orang Utama</option>
                                                                                                                                  <option value="kontak-teknis-wajib-pajak">Kontak Teknis Wajib Pajak</option>
                                                                                                                        </select>
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Nomor Telepon</label>
                                                                                                                        <input type="text" className="w-full p-2 border rounded" />
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Nomor Handphone Baru</label>
                                                                                                                        <input type="text" className="w-full p-2 border rounded" />
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Nomor Faksimile</label>
                                                                                                                        <input type="text" className="w-full p-2 border rounded" />
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Alamat Email Baru</label>
                                                                                                                        <input type="text" className="w-full p-2 border rounded" />
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Website</label>
                                                                                                                        <input type="text" className="w-full p-2 border rounded" />
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Keterangan</label>
                                                                                                                        <textarea className="w-full p-2 border rounded "></textarea>
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Tanggal Mulai</label>
                                                                                                                        <input type="date" className="w-full p-2 border rounded" />
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium">Tanggal Berakhir</label>
                                                                                                                        <input type="date" className="w-full p-2 border rounded" />
                                                                                                              </div>
                                                                                                    </div>

                                                                                          </div>
                                                                                          <div className="flex justify-end p-4 border-t">
                                                                                                    <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
                                                                                                              Batal
                                                                                                    </button>
                                                                                                    <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">
                                                                                                              Simpan
                                                                                                    </button>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            )}


                                                  </div>

                                        )}
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center" onClick={() => setShowPihakTerkait(!showPihakTerkait)}>
                                                  <h3 className="text-lg font-semibold">Pihak Terkait</h3>
                                                  {showPihakTerkait ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                        {showPihakTerkait && (
                                                  <div className="border rounded-md p-4 mb-4 ">

                                                            <div className="flex justify-between items-center mb-4">
                                                                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded" onClick={openModal}>+ Tambah Kontak</button>
                                                            </div>
                                                            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                                                      <table className="table-auto border border-gray-300 overflow-hidden">

                                                                                <thead className="bg-gray-200 w-[100px]">
                                                                                          <tr>
                                                                                                    <th className="px-6 py-2 border">Aksi</th>
                                                                                                    <th className="px-8 py-2 border">Jenis Kontak</th>
                                                                                                    <th className="px-4 py-2 border">Nomor Telepon</th>
                                                                                                    <th className="px-4 py-2 border">Nomor Handphone</th>
                                                                                                    <th className="px-4 py-2 border">Nomor Faksimile</th>
                                                                                                    <th className="px-4 py-2 border">Alamat Email</th>
                                                                                                    <th className="px-4 py-2 border">Alamat Situs Web</th>
                                                                                                    <th className="px-4 py-2 border">Keterangan</th>
                                                                                                    <th className="px-4 py-2 border">Tanggal Mulai</th>
                                                                                                    <th className="px-4 py-2 border">Tanggal Berakhir</th>
                                                                                          </tr>
                                                                                </thead>
                                                                                <tbody className="text-gray-600">
                                                                                          <tr className="bg-gray-100">
                                                                                                    <td className="px-4 py-4 border"><button></button></td>
                                                                                                    <td className="px-2 py-4 border">
                                                                                                              <select className="w-full p-2 border rounded-md bg-white">
                                                                                                                        <option value="kontak-alternatif-wajib-pajak">Kontak Alterntif Wajib Pajak</option>
                                                                                                                        <option value="kontak-utama-wajib-pajak">Kontak Utama Wajib Pajak</option>
                                                                                                                        <option value="kontak-orang-alternatif">Kontak Orang Alternatif</option>
                                                                                                                        <option value="kontak-orang-utama">Kontak Orang Utama</option>
                                                                                                                        <option value="kontak-teknis-wajib-pajak">Kontak Teknis Wajib Pajak</option>
                                                                                                              </select>
                                                                                                    </td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="date" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                                    <td className="px-4 py-4 border"><input type="date" className="w-full p-2 border rounded-md bg-white" /></td>
                                                                                          </tr>
                                                                                </tbody>
                                                                      </table>
                                                            </div>
                                                            {isModalOpen && (
                                                                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                                                                <div className="bg-white w-[80%] rounded-lg shadow-lg">
                                                                                          <div className="flex justify-between items-center border-b p-4">
                                                                                                    <h2 className="text-lg font-bold">Tambahkan Kontak Wajib Pajak</h2>
                                                                                                    <button onClick={closeModal} className="text-gray-500 hover:text-red-500">
                                                                                                              <FaTimes size={20} />
                                                                                                    </button>
                                                                                          </div>
                                                                                          <div className="p-4">
                                                                                                    <div className="grid gap-4 overflow-auto h-96">
                                                                                                              <div className="h-full ">
                                                                                                                        <label className="block text-sm font-medium">Jenis Pihak Terkait</label>
                                                                                                                        <select
                                                                                                                                  className="w-full p-2 border rounded-md bg-white"
                                                                                                                                  value={selectedType}
                                                                                                                                  onChange={(e) => setSelectedType(e.target.value)}
                                                                                                                        >
                                                                                                                                  <option value="">-- Pilih Jenis Pihak --</option>
                                                                                                                                  <option value="related-person">Related Person</option>
                                                                                                                                  {/* <option value="related-taxpayer">Related Taxpayer</option> */}
                                                                                                                        </select>
                                                                                                              </div>
                                                                                                              <div className="h-full mt-0">
                                                                                                                        {selectedType === "related-person" && (
                                                                                                                                  <>
                                                                                                                                            <div className="grid grid-cols-4 gap-4 ">
                                                                                                                                                      <div className="">
                                                                                                                                                                <label className="block text-sm font-medium">Apakah PIC?</label>
                                                                                                                                                                <input type="checkbox" className="justify-start p-3 border rounded" checked />
                                                                                                                                                      </div>
                                                                                                                                                      <div>
                                                                                                                                                                <label className="block text-sm font-medium">Jenis Orang Terkait</label>
                                                                                                                                                                <select
                                                                                                                                                                          className="w-full p-2 border rounded"
                                                                                                                                                                          value={selectedRelatedPersonType}
                                                                                                                                                                          onChange={(e) => setSelectedRelatedPersonType(e.target.value)}
                                                                                                                                                                >
                                                                                                                                                                          <option value="">--Pilih jenis orang terkait--</option>
                                                                                                                                                                          <option value="direktur">Direktur</option>
                                                                                                                                                                          <option value="komisaris">Komisaris</option>
                                                                                                                                                                          <option value="lainnya">Lainnya</option>
                                                                                                                                                                          <option value="wakil">Wakil</option>
                                                                                                                                                                </select>
                                                                                                                                                      </div>
                                                                                                                                                      {selectedRelatedPersonType === "direktur" && (
                                                                                                                                                                <div>
                                                                                                                                                                          <label className="block text-sm font-medium">Sub Jenis Orang Terkait</label>
                                                                                                                                                                          <select className="w-full p-2 border rounded">
                                                                                                                                                                                    <option value="">-- Pilih Sub Jenis --</option>
                                                                                                                                                                                    <option value="dewan-pengawas-syariah">Dewan Pengawas Syariah</option>
                                                                                                                                                                                    <option value="direktur">Direktur</option>
                                                                                                                                                                                    <option value="direktur-independen">Diretur Independen</option>
                                                                                                                                                                                    <option value="direktur-utama">Direktur Utama</option>
                                                                                                                                                                                    <option value="presiden-direktur">Presiden Direktur</option>
                                                                                                                                                                                    <option value="wakil-direktur">Wakil Direktur</option>
                                                                                                                                                                                    <option value="wakil-direktur-utama">Wakil Direktur Utama</option>
                                                                                                                                                                                    <option value="wakil-presiden-direktur">Wakil Presiden Direktur</option>
                                                                                                                                                                          </select>

                                                                                                                                                                </div>

                                                                                                                                                      )}
                                                                                                                                                      {selectedRelatedPersonType === "komisaris" && (
                                                                                                                                                                <div>
                                                                                                                                                                          <label className="block text-sm font-medium">Sub Jenis Orang Terkait</label>
                                                                                                                                                                          <select className="w-full p-2 border rounded">
                                                                                                                                                                                    <option value="">-- Pilih Sub Jenis --</option>
                                                                                                                                                                                    <option value="komisaris">Komisaris</option>
                                                                                                                                                                                    <option value="komisaris-independen">Komisaris Independen</option>
                                                                                                                                                                                    <option value="komisaris-utama">Komisaris Utama</option>
                                                                                                                                                                                    <option value="presiden-komisaris">Presiden Komisaris</option>
                                                                                                                                                                                    <option value="presiden-komisaris-independen">Presiden Komisaris Independen</option>
                                                                                                                                                                                    <option value="wakil-komisaris-utama">Wakil Komisaris Utama</option>
                                                                                                                                                                                    <option value="wakil-presiden-komisaris">Wakil Presiden Komisaris</option>
                                                                                                                                                                          </select>
                                                                                                                                                                </div>
                                                                                                                                                      )}
                                                                                                                                                      {selectedRelatedPersonType === "wakil" && (
                                                                                                                                                                <div>
                                                                                                                                                                          <label className="block text-sm font-medium">Sub Jenis Orang Terkait</label>
                                                                                                                                                                          <select className="w-full p-2 border rounded">
                                                                                                                                                                                    <option value="">-- Pilih Sub Jenis --</option>
                                                                                                                                                                                    <option value="curator">Curator</option>
                                                                                                                                                                                    <option value="karyawan">Karyawan</option>
                                                                                                                                                                                    <option value="liquidator">Liquidator</option>
                                                                                                                                                                                    <option value="pemilik-manfaat-lainnya">Pemilik Manfaat Lainnya</option>
                                                                                                                                                                          </select>
                                                                                                                                                                </div>
                                                                                                                                                      )}
                                                                                                                                                      {selectedRelatedPersonType === "lainnya" && (
                                                                                                                                                                <div>
                                                                                                                                                                          <label className="block text-sm font-medium">Keterangan</label>
                                                                                                                                                                          <input type="text" className="w-full p-2 border rounded" />
                                                                                                                                                                </div>
                                                                                                                                                      )}
                                                                                                                                                      <div className="mt-2"></div>
                                                                                                                                                      <div className="mt-2">
                                                                                                                                                                <label className="block text-sm font-medium">NIK</label>
                                                                                                                                                                <select className="w-full p-2 border rounded">
                                                                                                                                                                          <option value="nik-1">1234567890</option>
                                                                                                                                                                          <option value="nik-2">0987654321</option>
                                                                                                                                                                          <option value="nik-3">1234567890</option>
                                                                                                                                                                </select>
                                                                                                                                                                {/* Ngelink dari akun */}
                                                                                                                                                      </div>
                                                                                                                                                      <div className="mt-2">
                                                                                                                                                                <label className="block text-sm font-medium">Nama</label>
                                                                                                                                                                <input type="text" className="w-full p-2 border rounded cursor-not-allowed bg-gray-200" disabled />
                                                                                                                                                                {/* Ngelink dari NIK */}
                                                                                                                                                      </div>
                                                                                                                                                      <div className="mt-2">
                                                                                                                                                                <label className="block text-sm font-medium">Kewarganegaraan</label>
                                                                                                                                                                <input type="text" className="w-full p-2 border rounded cursor-not-allowed bg-gray-200" value="Indonesia" readOnly disabled />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="mt-2">
                                                                                                                                                                <label className="block text-sm font-medium">Negara Asal</label>
                                                                                                                                                                <input type="text" className="w-full p-2 border rounded cursor-not-allowed bg-gray-200" value="Indonesia" readOnly disabled />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="mt-2">
                                                                                                                                                                <label className="block text-sm font-medium">Email</label>
                                                                                                                                                                <input type="email" className="w-full p-2 border rounded" />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="mt-2">
                                                                                                                                                                <label className="block text-sm font-medium">Nomor Telepon</label>
                                                                                                                                                                <input type="text" className="w-full p-2 border rounded" />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="mt-2">
                                                                                                                                                                <label className="block text-sm font-medium">Tanggal Mulai</label>
                                                                                                                                                                <input type="date" className="w-full p-2 border rounded" />
                                                                                                                                                      </div>
                                                                                                                                                      <div className="mt-2">
                                                                                                                                                                <label className="block text-sm font-medium">Tanggal Berakhir</label>
                                                                                                                                                                <input type="date" className="w-full p-2 border rounded" />
                                                                                                                                                      </div>
                                                                                                                                            </div>
                                                                                                                                  </>
                                                                                                                        )}

                                                                                                                        {/* {selectedType === "related-taxpayer" && (
                                                                                                                                  <>
                                                                                                                                            <div>
                                                                                                                                                      <label className="block text-sm font-medium">Jenis Kontak</label>
                                                                                                                                                      <select className="w-full p-2 border rounded-md bg-white">
                                                                                                                                                                <option value="kontak-alternatif-wajib-pajak">Kontak Alternatif Wajib Pajak</option>
                                                                                                                                                                <option value="kontak-utama-wajib-pajak">Kontak Utama Wajib Pajak</option>
                                                                                                                                                                <option value="kontak-orang-alternatif">Kontak Orang Alternatif</option>
                                                                                                                                                                <option value="kontak-orang-utama">Kontak Orang Utama</option>
                                                                                                                                                                <option value="kontak-teknis-wajib-pajak">Kontak Teknis Wajib Pajak</option>
                                                                                                                                                      </select>
                                                                                                                                            </div>
                                                                                                                                            <div>
                                                                                                                                                      <label className="block text-sm font-medium">Nomor Telepon</label>
                                                                                                                                                      <input type="text" className="w-full p-2 border rounded" />
                                                                                                                                            </div>
                                                                                                                                            <div>
                                                                                                                                                      <label className="block text-sm font-medium">Nomor Faksimile</label>
                                                                                                                                                      <input type="text" className="w-full p-2 border rounded" />
                                                                                                                                            </div>
                                                                                                                                            <div>
                                                                                                                                                      <label className="block text-sm font-medium">Alamat Email Baru</label>
                                                                                                                                                      <input type="text" className="w-full p-2 border rounded" />
                                                                                                                                            </div>
                                                                                                                                  </>
                                                                                                                        )} */}
                                                                                                              </div>
                                                                                                    </div>
                                                                                          </div>
                                                                                          <div className="flex justify-end p-4 border-t">
                                                                                                    <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
                                                                                                              Batal
                                                                                                    </button>
                                                                                                    <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950">
                                                                                                              Simpan
                                                                                                    </button>
                                                                                          </div>

                                                                                </div>
                                                                      </div>
                                                            )}

                                                  </div>
                                        )}
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center" onClick={() => setShowAlamatWajibPajak(!showAlamatWajibPajak)}>
                                                  <h3 className="text-lg font-semibold">Alamat Wajib Pajak</h3>
                                                  {showAlamatWajibPajak ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                        {showAlamatWajibPajak && (
                                                  <div className="border rounded-md p-4 mb-4">
                                                            <div className="spcae-y-2 h-full">
                                                                      <h1 className="text-lg font-semibold">Alamat Utama</h1>
                                                                      <p className="mt-2">Detail Alamat Utama : Link dari import an awal kang</p>
                                                            </div>
                                                  </div>
                                        )}
                                        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center" onClick={() => setShowTempatKegiatanUsaha(!showTempatKegiatanUsaha)}>
                                                  <h3 className="text-lg font-semibold">Tempat Kegiatan Usaha/Sub Unit</h3>
                                                  {showTempatKegiatanUsaha ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                        {showTempatKegiatanUsaha && (
                                                  <div className="border rounded-md p-4 mb-4">
                                                            <div className="flex justify-between items-center mb-4">
                                                                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded" onClick={openModal}>+ Tambah</button>
                                                            </div>
                                                            <div className=" w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden ">
                                                                      <table className="table-auto border border-gray-300 overflow-hidden">
                                                                                <thead>
                                                                                          <tr>
                                                                                                    <th className="border border-gray-300 px-4 py-2">Aksi</th>
                                                                                                    <th className="border border-gray-300 px-4 py-2">NITKU</th>
                                                                                                    <th className="border border-gray-300 px-4 py-2">Jenis TKU</th>
                                                                                                    <th className="border border-gray-300 px-4 py-2">Nama TKU</th>
                                                                                                    <th className="border border-gray-300 px-4 py-2">KLU TKU</th>
                                                                                          </tr>
                                                                                </thead>
                                                                                <tbody className="text-gray-600">
                                                                                          <tr className="bg-gray-100">
                                                                                                    <td className="px-1 py-4 border">
                                                                                                              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">Edit</button>
                                                                                                              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded ml-2">Lihat</button>
                                                                                                    </td>
                                                                                          </tr>
                                                                                </tbody>
                                                                      </table>

                                                            </div>
                                                  </div>
                                        )}

                              </div>
                    </div>
          );
};

export default EditDataProfil;
