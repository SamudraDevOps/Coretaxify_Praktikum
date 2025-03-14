import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidebarProfilSayaBadan from "./SidebarProfilSaya";

const ProfilSayaBadan = () => {
    const [activeTab, setActiveTab] = useState("profil");

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarProfilSayaBadan />
            <main className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Ikhtisar Profil Wajib Pajak</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        📥 Unduh Ikhtisar Profil
                    </button>
                </div>

                <div className="w-full p-2 ml-0 border-t">
                    <Tabs defaultValue="profil" onValueChange={(val) => setActiveTab(val)}>
                        <TabsList className="flex justify-start gap-2 text-blue-700">
                            <TabsTrigger value="profil">Profil</TabsTrigger>
                            <TabsTrigger value="billing">Daftar Kode Billing belum dibayar</TabsTrigger>
                            <TabsTrigger value="saldo">Saldo Saat ini</TabsTrigger>
                            <TabsTrigger value="spt">SPT Belum Disampaikan</TabsTrigger>
                            <TabsTrigger value="pajak">Jenis Pajak Terdaftar</TabsTrigger>
                            <TabsTrigger value="kasus">Kasus aktif</TabsTrigger>
                            <TabsTrigger value="fasilitas">Fasilitas Aktif</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profil">
                            <div className="grid grid-cols-2 gap-6 p-4">
                                <div className="space-y-4">
                                    <p><strong>Nama:</strong> PUTRI NURIL WULANATINING ASIH</p>
                                    <p><strong>Nomor Pokok Wajib Pajak:</strong> 3510145907990002</p>
                                    <p><strong>Kegiatan Utama:</strong> PEGAWAI SWASTA</p>
                                    <p><strong>Jenis Wajib Pajak:</strong> Orang Pribadi</p>
                                    <p><strong>Kategori:</strong> Orang Pribadi</p>
                                    <p><strong>Status NPWP:</strong> <span className="text-green-600 font-bold">Aktif</span></p>
                                    <p><strong>Tanggal Terdaftar:</strong> 09 Maret 2022</p>
                                    <p><strong>Tanggal Aktivasi:</strong> 09 Maret 2022</p>
                                    <p><strong>Kantor Wilayah DJP:</strong> Kantor Wilayah DJP Jawa Timur III</p>
                                    <p><strong>Kantor Pelayanan Pajak:</strong> Kantor Pelayanan Pajak Pratama Banyuwangi</p>
                                    <p><strong>Seksi Pengawasan:</strong> Seksi Pengawasan II</p>
                                    <p><strong>Tanggal Pembaruan Profil Terakhir:</strong> 20 Februari 2025</p>
                                </div>
                                <div>
                                    <p className="font-bold">Alamat Utama</p>
                                    <p>JALAN NANGKA PERUM KALIREJO PERMAI BLOK P NO.1 RT 004 RW 003, KABAT, KAB. BANYUWANGI, JAWA TIMUR</p>
                                    <p className="font-bold mt-4">Kontak Utama</p>
                                    <p><strong>Nomor HP:</strong> 081330799798</p>
                                    <p><strong>Email:</strong> putrinurilwulan4@gmail.com</p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="billing"> {/* Link dari SPT */}
                            <div className="p-4">
                                <p className="text-gray-600">Daftar kode billing yang belum dibayar akan ditampilkan di sini.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="saldo">
                            <div className="p-4">
                                <p className="text-gray-600">Informasi saldo saat ini akan ditampilkan di sini.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="spt">
                            <div className="p-4">
                                <p className="text-gray-600">Daftar SPT yang belum disampaikan akan muncul di sini.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="pajak">
                            <div className="p-4">
                                <p className="text-gray-600">Jenis pajak yang terdaftar akan muncul di sini.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="kasus">
                            <div className="p-4">
                                <p className="text-gray-600">Kasus aktif yang terkait akan ditampilkan di sini.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="fasilitas">
                            <div className="p-4">
                                <p className="text-gray-600">Fasilitas aktif akan muncul di sini.</p>
                            </div>
                        </TabsContent>

                    </Tabs>
                </div>
            </main>
        </div>
    );
};

export default ProfilSayaBadan;
