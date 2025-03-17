import { useState } from 'react';
import SidebarProfilSaya from './SidebarProfilSaya';
import { BsFiletypeXls } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import Maintan from '../../../../assets/images/maintain.jpg';


const TwoAuthentication = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarProfilSaya />
            <div className='flex-auto p-3 bg-white rounded-md h-full'>
                <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                    <div className='flex items-center'>
                        <IoDocumentTextOutline className='text-4xl text-blue-900' />
                        <h1 className='text-lg font-bold text-blue-900 ml-2'>Two Authentication</h1>
                    </div>
                </div>
                {/* <div className="flex justify-between mb-4 border-b pb-3 " >
                    <button className="flex items-center bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded">
                        <BsFiletypeXls className="text-2xl text-white" />
                    </button>
                </div> */}
                <div className=' w-[1050px] overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden mx-4 '>
                    <img src={Maintan} alt="" className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default TwoAuthentication;
