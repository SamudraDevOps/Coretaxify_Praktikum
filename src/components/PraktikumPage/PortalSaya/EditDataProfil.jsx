import React, { useState } from "react";
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import SidebarProfilSaya from "./SidebarProfilSaya";

const EditDataProfil = () => {
          const [isPerwakilan, setIsPerwakilan] = useState(false);
          const [showInformasiUmum, setShowInformasiUmum] = useState(false);
          const [showDataEkonomi, setShowDataEkonomi] = useState(false);
          const [showDetailKontak, setShowDetailKontak] = useState(false);
          const [isKaryawan, setIsKaryawan] = useState(false);

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
                                                                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded">+ Tambah Kontak</button>
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
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white"/></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white"/></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white"/></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white"/></td>
                                                                                                    <td className="px-4 py-4 border"><input type="text" className="w-full p-2 border rounded-md bg-white"/></td>
                                                                                                    <td className="px-4 py-4 border"><input type="date" className="w-full p-2 border rounded-md bg-white"/></td>
                                                                                                    <td className="px-4 py-4 border"><input type="date" className="w-full p-2 border rounded-md bg-white"/></td>
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
