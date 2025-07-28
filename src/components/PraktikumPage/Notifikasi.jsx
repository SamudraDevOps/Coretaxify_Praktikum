import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaInbox } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Notifikasi = ({ data }) => {
  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState("semua");
  console.log(data);

  useEffect(() => {
    if (data) {
      const formatted = data.map((item) => ({
        id: item.id,
        sender: item.pengirim,
        subject: item.subjek,
        content: item.isi,
        date: item.created_at.split(" ")[0], // only date part
        // priority: "Sedang", // or assign based on some logic if available
        // status: "belum", // default status
      }));
      setNotifications(formatted);
    }
  }, [data]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, status: "baca" })));
  };

  const handleLihat = (id) => {
    setNotifications((notifications) =>
      notifications.map((n) => (n.id === id ? { ...n, status: "baca" } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    // if (tab === "semua") return true;
    // if (tab === "baca") return n.status === "baca";
    // if (tab === "belum") return n.status === "belum";
    return true;
  });

  return (
    
      <div className="flex-auto p-3 bg-white rounded-md h-full  min-w-0">
        <div className="flex justify-between items-center mb-4 pb-3 border-b mt-4">
          <div className="flex items-center">
            <FaInbox className="text-4xl text-blue-900" />
            <h1 className="text-lg font-bold text-blue-900 ml-2">
              Notifikasi Saya
            </h1>
          </div>
          <div className="flex justify-end">
            {/* <button
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
              onClick={markAllAsRead}
            >
              Tandai Sudah Dibaca
            </button> */}
          </div>
        </div>
        <Tabs defaultValue="semua" value={tab} onValueChange={setTab}>
          {/* <TabsList className="mb-4">
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="baca">Baca</TabsTrigger>
            <TabsTrigger value="belum">Belum Dibaca</TabsTrigger>
          </TabsList> */}
          <TabsContent value="semua">
            <NotificationTable
              notifications={filteredNotifications}
              onLihat={handleLihat}
            />
          </TabsContent>
          <TabsContent value="baca">
            <NotificationTable
              notifications={filteredNotifications}
              onLihat={handleLihat}
            />
          </TabsContent>
          <TabsContent value="belum">
            <NotificationTable
              notifications={filteredNotifications}
              onLihat={handleLihat}
            />
          </TabsContent>
        </Tabs>
      </div>
   
  );
};

function NotificationTable({ notifications, onLihat }) {
  return (
    <div className="w-full overflow-x-auto ">
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-1 py-2">Aksi</th>
            <th className="border border-gray-300 px-4 py-2">Pengirim</th>
            <th className="border border-gray-300 px-4 py-2">Subjek</th>
            {/* <th className="border border-gray-300 px-4 py-2">Isi</th> */}
            <th className="border border-gray-300 px-4 py-2">Tanggal Kirim</th>
            {/* <th className="border border-gray-300 px-4 py-2">Prioritas</th>
            <th className="border border-gray-300 px-4 py-2">Status</th> */}
          </tr>
        </thead>
        <tbody>
          {notifications.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">
                Tidak ada notifikasi
              </td>
            </tr>
          ) : (
            notifications.map((notif) => (
              <tr
                key={notif.id}
                className={notif.status === "belum" ? "bg-blue-50" : ""}
              >
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs">
                      Lihat Detail
                    </AlertDialogTrigger>

                    <AlertDialogContent className="p-2">
                      {/* <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader> */}
                      <div className="bg-white p-6 max-w-4xl ">
                        <h1 className="text-2xl font-semibold mb-6">
                          Detail Pesan
                        </h1>

                        <div className="space-y-6">
                          {/* Row: Pengirim */}
                          <div className="grid grid-cols-12 items-start gap-4">
                            <label className="col-span-3 text-sm font-medium mt-2">
                              Pengirim
                            </label>
                            <input
                              type="text"
                              value={notif.sender}
                              readOnly
                              className="col-span-9 border border-gray-300 rounded px-3 py-2 bg-gray-100 w-full"
                            />
                          </div>

                          {/* Row: Subjek */}
                          <div className="grid grid-cols-12 items-start gap-4">
                            <label className="col-span-3 text-sm font-medium mt-2">
                              Subjek
                            </label>
                            <input
                              type="text"
                              value={notif.subject}
                              readOnly
                              className="col-span-9 border border-gray-300 rounded px-3 py-2 bg-gray-100 w-full"
                            />
                          </div>

                          {/* Row: Isi */}
                          <div className="grid grid-cols-12 items-start gap-4">
                            <label className="col-span-3 text-sm font-medium mt-2">
                              Isi
                            </label>
                            <div className="col-span-9 border border-gray-300 rounded p-3 bg-gray-50 font-sans text-sm whitespace-pre-line">
                              {notif.content}
                            </div>
                          </div>
                        </div>
                      </div>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Kembali</AlertDialogCancel>
                        {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
                {/* <td className="border border-gray-300 px-1 py-2 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => onLihat(notif.id)}
                  >
                    Lihat
                  </button>
                </td> */}
                <td className="border border-gray-300 px-4 py-2">
                  {notif.sender}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {notif.subject}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  {notif.content}
                </td> */}
                <td className="border border-gray-300 px-4 py-2">
                  {notif.date}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  {notif.priority}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {notif.status === "baca" ? (
                    <span className="text-green-600 font-semibold">Dibaca</span>
                  ) : (
                    <span className="text-blue-600 font-semibold">
                      Belum Dibaca
                    </span>
                  )}
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Notifikasi;
