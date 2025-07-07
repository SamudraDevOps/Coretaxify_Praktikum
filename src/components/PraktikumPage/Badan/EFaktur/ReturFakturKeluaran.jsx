import React, { useState, useRef } from 'react';
import SideBarEFaktur from "./SideBarEFaktur";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaChevronDown, FaEdit, FaFilePdf } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";


const [selectAll, setSelectAll] = useState(false);
const [selectedItems, setSelectedItems] = useState([]);

const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
    }
};

React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
const handleSelectAll = () => {
    if (selectAll) {
        setSelectedItems([]);
        setSelectAll(false);
    } else {
        setSelectedItems(data.map(item => item.id));
        setSelectAll(true);
    }
};

// Select single item handler
const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter(id => id !== itemId));
        setSelectAll(false);
    } else {
        setSelectedItems([itemId]);
        setSelectAll(false);
    }
};

React.useEffect(() => {
        if (selectedItems.length === data.length && data.length > 0) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedItems]);

const ReturFakturKeluaran = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <SideBarEFaktur />
            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-4 pb-3 border-b">
                    <div className="flex items-center">
                        <IoDocumentTextOutline className="text-4xl text-blue-900" />
                        <h1 className="text-lg font-bold text-blue-900 ml-2">Retur Faktur Keluaran</h1>
                    </div>
                </div>
                <div className="flex justify-end mb-4 border-b pb-3">
                    <button className="flex items-center bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-2 rounded">
                        <TiDeleteOutline className="text-2xl text-white mr-2" />
                        Batalkan Retur
                    </button>
                </div>
            </div>
            <div className="w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mx-4">
                <table className='table-auto border border-gray-300 overflow-hidden'>
                    <thead className="bg-gray-200">
                        <tr>
                            <th className='border border-gray-300 px-1 py-2'>No</th>
                            <th className="border border-gray-300 px-4 py-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                    <span className="ml-2">Nomor Faktur</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default ReturFakturKeluaran;
