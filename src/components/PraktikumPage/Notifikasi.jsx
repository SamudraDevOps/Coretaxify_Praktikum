import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaInbox } from "react-icons/fa6";

const dummyNotifications = [
    {
        id: 1,
        sender: "Admin Pajak",
        subject: "Pengingat Laporan SPT",
        date: "2024-06-10",
        priority: "Tinggi",
        status: "belum", // belum/baca
    },
    {
        id: 2,
        sender: "Sistem",
        subject: "Update Fitur Baru",
        date: "2024-06-09",
        priority: "Sedang",
        status: "baca",
    },
    {
        id: 3,
        sender: "Admin Pajak",
        subject: "Konfirmasi Pembayaran",
        date: "2024-06-08",
        priority: "Rendah",
        status: "belum",
    },
];

const Notifikasi = () => {
    const [notifications, setNotifications] = useState(dummyNotifications);
    const [tab, setTab] = useState("semua");

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, status: "baca" })));
    };

    const handleLihat = (id) => {
        setNotifications(notifications =>
            notifications.map(n =>
                n.id === id ? { ...n, status: "baca" } : n
            )
        );
    };

    const filteredNotifications = notifications.filter(n => {
        if (tab === "semua") return true;
        if (tab === "baca") return n.status === "baca";
        if (tab === "belum") return n.status === "belum";
        return true;
    });

    return (
        <div className='flex h-screen bg-gray-100'>
            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className='flex justify-between items-center mb-4 pb-3 border-b mt-4'>
                    <div className='flex items-center'>
                        <FaInbox className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Notifikasi Saya</h1>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                            onClick={markAllAsRead}
                        >
                            Tandai Sudah Dibaca
                        </button>
                    </div>
                </div>
                <Tabs defaultValue="semua" value={tab} onValueChange={setTab}>
                    <TabsList className="mb-4">
                        <TabsTrigger value="semua">Semua</TabsTrigger>
                        <TabsTrigger value="baca">Baca</TabsTrigger>
                        <TabsTrigger value="belum">Belum Dibaca</TabsTrigger>
                    </TabsList>
                    <TabsContent value="semua">

                        <NotificationTable notifications={filteredNotifications} onLihat={handleLihat} />
                    </TabsContent>
                    <TabsContent value="baca">

                        <NotificationTable notifications={filteredNotifications} onLihat={handleLihat} />
                    </TabsContent>
                    <TabsContent value="belum">

                        <NotificationTable notifications={filteredNotifications} onLihat={handleLihat} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};


function NotificationTable({ notifications, onLihat }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className='border border-gray-300 px-1 py-2'>Aksi</th>
                        <th className='border border-gray-300 px-4 py-2'>Pengirim</th>
                        <th className='border border-gray-300 px-4 py-2'>Subjek</th>
                        <th className='border border-gray-300 px-4 py-2'>Tanggal Kirim</th>
                        <th className='border border-gray-300 px-4 py-2'>Prioritas</th>
                        <th className='border border-gray-300 px-4 py-2'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-400">Tidak ada notifikasi</td>
                        </tr>
                    ) : (
                        notifications.map((notif) => (
                            <tr key={notif.id} className={notif.status === "belum" ? "bg-blue-50" : ""}>
                                <td className='border border-gray-300 px-1 py-2 text-center'>

                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                                        onClick={() => onLihat(notif.id)}
                                    >
                                        Lihat
                                    </button>
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>{notif.sender}</td>
                                <td className='border border-gray-300 px-4 py-2'>{notif.subject}</td>
                                <td className='border border-gray-300 px-4 py-2'>{notif.date}</td>
                                <td className='border border-gray-300 px-4 py-2'>{notif.priority}</td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {notif.status === "baca" ? (
                                        <span className="text-green-600 font-semibold">Dibaca</span>
                                    ) : (
                                        <span className="text-blue-600 font-semibold">Belum Dibaca</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Notifikasi;
