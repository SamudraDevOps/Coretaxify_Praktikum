import React, { useState } from 'react';
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import SideBarEFaktur from './SideBarEFaktur';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";


const TambahFakturKeluaran = () => {
    const [showDokumenTransaksi, setShowDokumenTransaksi] = useState(false);
    const [showInformasiPembeli, setShowInformasiPembeli] = useState(false);

    const [selectedYear, setSelectedYear] = useState(new Date());


    return (
        <div className="flex h-screen bg-gray-100">
            <SideBarEFaktur />
            <div className='flex-grow p-6 bg-white h-full'>
                <div className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100' onClick={() => setShowDokumenTransaksi(!showDokumenTransaksi)}>
                    <h3 className='text-lg font-semibold'>Dokumen Transaksi</h3>
                    {showDokumenTransaksi ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showDokumenTransaksi && (
                    <div className='border rounded-md p-4 mb-2 grid grid-cols-3 gap-4 w-full'>
                        <div className="space-y-2">
                            <label className='block text-sm font-medium'>Uang Muka</label>
                            <input type="checkbox" className='justify-start p-3 border rounded' />
                        </div>
                        <div className="space-y-2">
                            <label className='block text-sm font-medium'>Pelunasan</label>
                            <input type="checkbox" className='justify-start p-3 border rounded' />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Nomor Faktur</label>
                            <input type="text" className='p-2 border rounded w-full' />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Kode Transaksi</label>
                            <select className='p-2 border rounded w-full'>
                                <option value="01">01 -  kepada selain pemungut PPN</option>
                                <option value="02">02 -  kepada Pemungut PPN Instansi Pemerintah</option>
                                <option value="03">03 -  kepada Pemungut PPN selain instansi Pemerintah</option>
                                <option value="04">04 -  DPP Nilai Lain</option>
                                <option value="05">05 -  Besaran tertentu</option>
                                <option value="06">06 -  kepada orang pribadi pemegang paspor luar negeri (16E UU PPN)</option>
                                <option value="07">07 -  penyerahan dengan fasilitas PPN atau PPN </option>
                                <option value="08">08 -  penyerahan aktiva dengan fasilitas dibebaskan PPN atau PPN dan PPnBM</option>
                                <option value="09">09 -  penyerahan aktiva yang menurut tujuan semua tidak diperjualbelikan (16D UU PPN)</option>
                                <option value="10">10 -  Penyerahan lainnya</option>

                            </select>
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Tanggal Faktur</label>
                            <input type="date" className='p-2 border rounded w-full' />
                        </div>
                        <div className='space-y-2'>
                            <label className="block text-sm font-medium">Jenis Faktur</label>
                            <input type="text" value="Normal" className='p-2 border rounded w-full bg-gray-100' disabled />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Masa Pajak</label>
                            <input type="month" className='p-2 border rounded w-full' />
                            {/* <select className='p-2 border rounded w-full'>
                                <option value="Januari">Januari</option>
                                <option value="Februari">Februari</option>
                                <option value="Maret">Maret</option>
                                <option value="April">April</option>
                                <option value="Mei">Mei</option>
                                <option value="Juni">Juni</option>
                                <option value="Juli">Juli</option>
                                <option value="Agustus">Agustus</option>
                                <option value="September">September</option>
                                <option value="Oktober">Oktober</option>
                                <option value="November">November</option>
                                <option value="Desember">Desember</option>
                            </select> */}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Tahun</label>
                            <Popover className="w-full p-2">
                                <PopoverTrigger asChild >
                                    <Button variant="outline" className="w-full justify-start ">
                                        {selectedYear.getFullYear()}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-auto p-0">
                                    <DatePicker
                                        selected={selectedYear}
                                        onChange={(date) => setSelectedYear(date)}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        className="border p-2 rounded-md w-full text-center"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Referensi</label>
                            <input type="text" className='p-2 border rounded w-full' />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Pilih Alamat</label>
                            <input type="text" className='p-2 border rounded w-full' placeholder='Link Bang, tanya pm jan tanya saia' disabled />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>IDTKU</label>
                            <input type="text" className='p-2 border rounded w-full bg-gray-100' value="000000" disabled />
                        </div>
                    </div>
                )}
                <div className='border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100' onClick={() => setShowInformasiPembeli(!showInformasiPembeli)}>
                    <h3 className='text-lg font-semibold'>Informasi Pembeli</h3>
                    {showInformasiPembeli ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {showInformasiPembeli && (
                    <div className='border rounded-md p-4 mb-2 grid grid-cols-3 gap-4 w-full'>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>NPWP </label>
                            <input type="text" className='p-2 border rounded w-full' />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>ID</label>
                            <div className='grid grid-cols-2 gap-3 '>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="identification" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' value="NPWP" />
                                    <label className='text-sm'>NPWP</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="identification" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' value="Paspor" />
                                    <label className='text-sm'>Paspor</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="identification" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' value="NIK" />
                                    <label className='text-sm'>NIK</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="identification" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' value="Identitas Lain" />
                                    <label className='text-sm'>Identitas Lain</label>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Negara</label>
                            <input type="text" className='p-2 border rounded w-full' />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Nomor Dokumen</label>
                            <input type="text" className='p-2 border rounded w-full bg-gray-100' disabled/>
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Nama</label>
                            <input type="text" className='p-2 border rounded w-full' />
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Alamat</label>
                            <input type="text" className='p-2 border rounded w-full' disabled placeholder='Ngelink kang'/>
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>IDTKU</label>
                            <input type="text" className='p-2 border rounded w-full bg-gray-100' value="000000"/>
                        </div>
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Email</label>
                            <input type="text" className='p-2 border rounded w-full' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TambahFakturKeluaran;
