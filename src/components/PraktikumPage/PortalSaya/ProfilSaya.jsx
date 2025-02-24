import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilSaya = () => {
          return (
                    <div className="flex h-screen bg-gray-100">
                              <aside className="w-1/6 text-blue-900 p-5 h-full bg-white">
                                        <div className='mb-5 bg-blue-900 text-white p-2 text-center'>
                                                  <h2 className="text-lg font-bold mb-5">3510145907990002</h2>
                                                  <h3 className="text-md font-semibold mb-5">PUTRI NURIL WULANATINING ASIH</h3>
                                        </div>
                                        <nav>
                                                  <ul className="space-y-3 bg">
                                                            <li className="p-2 bg-blue-700 rounded-md text-white">Ikhtisar Profil Wajib Pajak</li>
                                                            <li className="p-2 hover:bg-blue-700 hover:text-white rounded-md cursor-pointer">Informasi Umum</li>
                                                            <li className="p-2 hover:bg-blue-700 rounded-md cursor-pointer">Alamat</li>
                                                            <li className="p-2 hover:bg-blue-700 rounded-md cursor-pointer">Detail Kontak</li>
                                                            <li className="p-2 hover:bg-blue-700 rounded-md cursor-pointer">Pihak Terkait</li>
                                                            <li className="p-2 hover:bg-blue-700 rounded-md cursor-pointer">Klasifikasi Lapangan Usaha</li>
                                                  </ul>
                                        </nav>
                              </aside>
                              <main className="flex-1 p-3 bg-white shadow-lg rounded-md h-full ">
                              <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-semibold">Ikhtisar Profil Wajib Pajak</h2>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                                  📥 Unduh Ikhtisar Profil
                                        </button>
                              </div>
                                        <div className='w-full p-2 ml-0'>
                                                  <Tabs>
                                                            <TabsList className="flex justify-start gap-2 ">
                                                                      <TabsTrigger value="tab1">Profil</TabsTrigger>
                                                                      <TabsTrigger value="tab2">Daftar Kode Billing belum dibayar</TabsTrigger>
                                                                      <TabsTrigger value="tab3">Saldo Saat ini</TabsTrigger>
                                                                      <TabsTrigger value="tab4">SPT Belum Disampaikan</TabsTrigger>
                                                                      <TabsTrigger value="tab5">Jenis Pajak Terdaftar</TabsTrigger>
                                                                      <TabsTrigger value="tab6">Kasus aktif</TabsTrigger>
                                                                      <TabsTrigger value="tab7">Fasilitas Aktif</TabsTrigger>
                                                            </TabsList>
                                                  </Tabs>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                                  <div className='space-y-4'>
                                                            <p><strong>Nama:</strong> PUTRI NURIL WULANATINING ASIH</p>
                                                            <p><strong>Nomor Pokok Wajib Pajak:</strong> 3510145907990002</p>
                                                            <p><strong>Kegiatan Utama:</strong> PEGAWAI SWASTA</p>
                                                            <p><strong>Jenis Wajib Pajak:</strong> Orang Pribadi</p>
                                                            <p><strong>Kategori:</strong> Orang Pribadi</p>
                                                            <p><strong>Status NPWP:</strong> <span className="text-green-600 font-bold">Aktif</span></p>
                                                            <p><strong>Tanggal Terdaftar:</strong> 09 Maret 2022</p>
                                                  </div>
                                                  <div>
                                                            <p className="font-bold">Alamat Utama</p>
                                                            <p>JALAN NANGKA PERUM KALIREJO PERMAI BLOK P NO.1 RT 004 RW 003, KABAT, KAB. BANYUWANGI, JAWA TIMUR</p>

                                                            <p className="font-bold mt-4">Kontak Utama</p>
                                                            <p><strong>Nomor HP:</strong> 081330799798</p>
                                                            <p><strong>Email:</strong> putrinurilwulan4@gmail.com</p>
                                                  </div>
                                        </div>
                              </main>
                    </div>
          );
};

export default ProfilSaya;