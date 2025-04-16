import React, { useState } from 'react';
import SideBarSPT from './SideBarSPT';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IoDocumentTextOutline } from "react-icons/io5";

const BuatKonsepSPT = () => {
    const [selectedType, setSelectedType] = useState("");
    const [step, setStep] = useState(1); // ⬅️ Tambah step

    const taxTypes = [
        { label: "PPn", value: "ppn" },
        { label: "PPh Pasal 21/26", value: "pasal" },
        { label: "PPh Unifikasi", value: "unifikasi" },
        { label: "PPh Badan", value: "Badan" },
    ];

    const handleNext = () => {
        if (step === 1 && selectedType) {
            setStep(2);
        }
    };

    return (
        <div className="flex bg-white h-screen">
            <SideBarSPT />

            <div className="flex-1 p-3 bg-white rounded-md h-full">
                <Card className="w-full bg-gray-100 shadow-sm rounded-none mb-6">
                    <CardContent className="flex items-center gap-2 py-4 px-6">
                        <IoDocumentTextOutline className="text-2xl text-blue-900" />
                        <h1 className="text-base md:text-lg font-semibold text-blue-900">
                            Buat Konsep SPT
                        </h1>
                    </CardContent>
                </Card>

                <div className="flex-1 bg-white px-10 pt-6 overflow-y-auto h-full">
                    {/* Step Indicator */}
                    <div className="flex justify-between mb-10">
                        {[1, 2, 3].map((num) => (
                            <div
                                key={num}
                                className={cn("flex flex-col items-center", step === num ? "" : "opacity-50")}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                                    step >= num ? "bg-yellow-400 text-white" : "bg-gray-300 text-white"
                                )}>
                                    {num}
                                </div>
                                <span className={cn(
                                    "text-sm mt-1 text-center",
                                    step === num ? "text-gray-800" : "text-gray-500"
                                )}>
                                    {
                                        num === 1 ? "Pilih Jenis Pajak"
                                            : num === 2 ? "Pilih periode pelaporan SPT"
                                                : "Pilih Jenis SPT"
                                    }
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Langkah 1: Pilih Jenis Pajak */}
                    {step === 1 && (
                        <div>
                            <p className="text-sm text-gray-800 font-medium mb-4">
                                <strong>Langkah 1.</strong> Pilih jenis SPT yang akan dilaporkan
                            </p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {taxTypes.map((type) => (
                                    <Card
                                        key={type.value}
                                        className={cn(
                                            "cursor-pointer hover:border-yellow-400",
                                            selectedType === type.value ? "border-yellow-400" : ""
                                        )}
                                        onClick={() => setSelectedType(type.value)}
                                    >
                                        <CardContent className="p-4 text-center text-sm font-medium text-gray-700">
                                            {type.label}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Button
                                    disabled={!selectedType}
                                    onClick={handleNext}
                                    className={cn(
                                        "w-full md:w-auto",
                                        selectedType ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-400 cursor-not-allowed"
                                    )}
                                >
                                    Lanjut
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Langkah 2: Periode pelaporan */}
                    {step === 2 && (
                        <div>
                            <p className="text-sm text-gray-800 font-medium mb-4">
                                <strong>Langkah 2.</strong> Pilih periode pelaporan untuk jenis pajak <span className="font-bold text-yellow-500 uppercase">{selectedType}</span>
                            </p>

                            {/* Contoh isi, bisa diganti sesuai kebutuhan */}
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">[Form periode pelaporan di sini]</p>
                                <Button onClick={() => setStep(3)} className="bg-yellow-400 hover:bg-yellow-500">Lanjut ke Langkah 3</Button>
                                <Button variant="outline" onClick={() => setStep(1)}>Kembali</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuatKonsepSPT;
