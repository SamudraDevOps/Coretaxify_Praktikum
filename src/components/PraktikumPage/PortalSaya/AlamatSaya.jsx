import React, { useState } from 'react';
import SidebarProfilSaya from './SidebarProfilSaya';
import { BsFiletypeXls } from "react-icons/bs";

const AlamatSaya = () => {
          const [alamat, setAlamat] = useState({
                    alamat: "Jl. Raya Ciputat Parung No. 1",
                    kelurahan: "Ciputat Timur",
                    kecamatan: "Ciputat",
                    kota: "Tangerang Selatan",
                    provinsi: "Banten",
                    kodePos: "15111"
          });

          return (
                    <div className='flex h-screen bg-gray-100'>
                              <SidebarProfilSaya />
                              
                              <div className='flex-auto p-3 bg-white rounded-md h-full'>
                                        <h2 className='text-2xl font-semibold'>Alamat</h2>
                                        <div className="flex justify-between mb-4 border-b pb-3 mt-4">
                                                  <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                                            <BsFiletypeXls className="text-2xl text-white" />
                                                  </button>
                                        </div>
                                        <div className='w-[1080px]'>
                                                  <div className='w-[100%] overflow-x-auto'>
                                                            <table className='table-auto w-full border border-gray-300 '>
                                                                      <thead>
                                                                                <tr>
                                                                                          <th className='border border-gray-300 p-2'>Alamat</th>
                                                                                          <th className='border border-gray-300 p-2'>Kelurahan</th>
                                                                                          <th className='border border-gray-300 p-2'>Kecamatan</th>
                                                                                          <th className='border border-gray-300 p-2'>Kota</th>
                                                                                          <th className='border border-gray-300 p-2'>Provinsi</th>
                                                                                          <th className='border border-gray-300 p-2'>Kode Pos</th>
                                                                                </tr>
                                                                      </thead>
                                                                      <tbody>
                                                                                <tr>
                                                                                          <td className='border border-gray-300 p-2'>{alamat.alamat}</td>
                                                                                          <td className='border border-gray-300 p-2'>{alamat.kelurahan}</td>
                                                                                          <td className='border border-gray-300 p-2'>{alamat.kecamatan}</td>
                                                                                          <td className='border border-gray-300 p-2'>{alamat.kota}</td>
                                                                                          <td className='border border-gray-300 p-2'>{alamat.provinsi}</td>
                                                                                          <td className='border border-gray-300 p-2'>{alamat.kodePos}</td>
                                                                                </tr>
                                                                      </tbody>
                                                            </table>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}
export default AlamatSaya;