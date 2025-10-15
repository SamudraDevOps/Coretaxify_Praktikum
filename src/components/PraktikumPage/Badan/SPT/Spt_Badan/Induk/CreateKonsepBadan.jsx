import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import {
    PertanyaanA,
    PertanyaanB,
    PertanyaanC,
    PertanyaanD,
    PertanyaanE,
    PertanyaanF,
    PertanyaanG,
    PertanyaanH,
    PertanyaanI,
}
    from './section';

const CreateKonsepBadan = () => {
    const [showHeaderInduk, setShowHeaderInduk] = useState(true);
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-auto p-3 bg-white rounded-md h-full min-w-0">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl text-blue-900 mt-4">SPT TAHUNAN PAJAK PENGHASILAN (PPh) WAJIB PAJAK BADAN</h2>
                </div>

                <div className="w-full p-2 ml-0 border-t text-lg">
                    <Tabs defaultValue="induk" onValueChange={(val) => setShowHeaderInduk(val === 'induk')}>
                        <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
                            <TabsTrigger value="induk">Induk</TabsTrigger>
                            <TabsTrigger value="anak">Anak</TabsTrigger>
                        </TabsList>
                        <TabsContent value="induk">
                            <div className="mt-4">
                                <div
                                    className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                                    onClick={() => setShowHeaderInduk(!showHeaderInduk)}
                                >
                                    <h3 className="text-lg font-semibold">HEADER</h3>
                                    {showHeaderInduk ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderInduk && (
                                    <div className="border rounded-md p-4 mb-4">
                                        <div className=" grid grid-cols-2 md:grid-cols-2 gap-4">
                                            <div >
                                                <label className="text-gray-700 font-medium mb-2 block">
                                                    Tahun Pajak
                                                </label>
                                                <DatePicker
                                                    className="w-72 p-2 border rounded-md bg-white text-gray-600"
                                                    showYearPicker
                                                    dateFormat="yyyy"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-700 font-medium mb-2 block">
                                                    Status
                                                </label>
                                                <select className="w-72 p-2 border rounded-md bg-gray-100 text-gray-600">
                                                    <option id='1'>Normal</option>
                                                    <option id='2'>Pembetulan</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-gray-700 font-medium mb-2 block">
                                                    Periode Pembukuan
                                                </label>
                                                <div className="flex gap-4">
                                                    <input
                                                        type="text"
                                                        className="w-32 p-2 border rounded-md bg-white text-gray-600"
                                                        value="01"
                                                        readOnly
                                                    />
                                                    <input
                                                        type="text"
                                                        className="w-32 p-2 border rounded-md bg-white text-gray-600"
                                                        value="12"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className='text-gray-700 font-medium mb-2 block'>
                                                    Metode Pembukuan
                                                </label>
                                                <select className="w-72 p-2 border rounded-md bg-gray-100 text-gray-600">
                                                    <option id='1'>Penuh</option>
                                                    <option id='2'>Sederhana</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <PertanyaanA />
                                <PertanyaanB />
                                <PertanyaanC />
                                <PertanyaanD />
                                <PertanyaanE />
                                <PertanyaanF />
                                <PertanyaanG />
                                <PertanyaanH />
                                <PertanyaanI />
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </div>
    )
}

export default CreateKonsepBadan
