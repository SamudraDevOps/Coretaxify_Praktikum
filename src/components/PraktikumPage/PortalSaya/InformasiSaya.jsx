import React, { useState } from 'react';
import SidebarProfilSaya from './SidebarProfilSaya';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InformasiSaya = () => {
          const [activeTab, setActiveTab] = useState("general");
          return (
                    <div className='flex h-screen bg-gray-100'>
                              <SidebarProfilSaya />
                              <main className="flex-auto p-3 bg-white rounded-md h-full">
                                        <div className="flex justify-between items-center mb-6">
                                                  <h2 className="text-2xl font-semibold">Informasi Umum Wajib Pajak</h2>
                                                  <button className="px-4 py-2 bg-yellow-300 text-blue-900 rounded-md">
                                                            Edit
                                                  </button>
                                        </div>

                                        <div className='w-full p-2 ml-0 border-t'>
                                                  <Tabs defaultValue='general' onValueChange={(val) => setActiveTab(val)}>
                                                            <TabsList className='flex justify-start gap-2 text-blue-700'>
                                                                      <TabsTrigger value='general'>Informasi Umum</TabsTrigger>
                                                                      <TabsTrigger value='alamat'>Taxplayer Tags</TabsTrigger>
                                                            </TabsList>

                                                            <TabsContent value='general'>
                                                                      <div className='grid grid-cols-2 gap-6 p-4'>
                                                                                <div className='space-y-4'>
                                                                                          test
                                                                                </div>
                                                                      </div>
                                                            </TabsContent>
                                                  </Tabs>
                                        </div>
                              </main>
                    </div>
          )
}

export default InformasiSaya;