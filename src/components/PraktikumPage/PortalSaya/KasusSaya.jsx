import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiletypeXls } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";


const KasusSaya = () => {
          return (
                    <div className="p-4">
                              <div className="flex justify-between items-center mb-4 pb-3 border-b">
                                        <div className="flex items-center">
                                                  <IoDocumentTextOutline className="text-4xl text-blue-900" />
                                                  <h1 className="text-lg font-bold text-blue-900 ml-2">Dokumen Saya</h1>
                                        </div>
                                        <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                                                  Upload Dokumen
                                        </button>
                              </div>
                              <div className="flex justify-between mb-4 border-b pb-3">
                                        <table>
                                                  <thead>
                                                            <tr>
                                                                      <th className="px-4 py-2 border">No</th>
                                                                      <th className="px-4 py-2 border">Nama File</th>
                                                                      <th className="px-4 py-2 border">Tanggal Upload</th>
                                                                      <th className="px-4 py-2 border">Aksi</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            <tr>
                                                                      <td className="px-4 py-2 border">1</td>
                                                                      <td className="px-4 py-2 border">File 1</td>
                                                                      <td className="px-4 py-2 border">12/12/2021</td>
                                                                      <td className="px-4 py-2 border">
                                                                                <button className="bg-red-900 hover:bg-red-950 text-white font-bold py-2 px-2 rounded">
                                                                                          <FaTimes className="text-2xl text-white" />
                                                                                </button>
                                                                      </td>
                                                            </tr>
                                                            <tr>
                                                                      <td className="px-4 py-2 border">2</td>
                                                                      <td className="px-4 py-2 border">File 2</td>
                                                                      <td className="px-4 py-2 border">12/12/2021</td>
                                                                      <td className="px-4 py-2 border">
                                                                                <button className="bg-red-900 hover:bg-red-950 text-white font-bold py-2 px-2 rounded">
                                                                                          <FaTimes className="text-2xl text-white" />
                                                                                </button>
                                                                      </td>
                                                            </tr>
                                                            <tr>
                                                                      <td className="px-4 py-2 border">3</td>
                                                                      <td className="px-4 py-2 border">File 3</td>
                                                                      <td className="px-4 py-2 border">12/12/2021</td>
                                                                      <td className="px-4 py-2 border">
                                                                                <button className="bg-red-900 hover:bg-red-950 text-white font-bold py-2 px-2 rounded">
                                                                                          <FaTimes className="text-2xl text-white" />
                                                                                </button>
                                                                      </td>
                                                            </tr>
                                                  </tbody>
                                        </table>
                              </div>
                              <div className="flex justify-between mb-4 border-b pb-3 ">
                                        <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                                                  <BsFiletypeXls className="text-2xl text-white" />
                                        </button>
                              </div>

                              
                              <div className="pagination">
                                        <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded mr-2">
                                                  Previous
                                        </button>
                                        <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                                                  Next
                                        </button>

                              </div>


                    </div>
          );
};

export default KasusSaya;
