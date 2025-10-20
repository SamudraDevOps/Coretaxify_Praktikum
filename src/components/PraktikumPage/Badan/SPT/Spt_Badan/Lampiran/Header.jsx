import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Header = () => {
    const [showHeader, setShowHeader] = useState(true);

    return (
        <>
            <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
                onClick={() => setShowHeader(!showHeader)}
            >
                <h3 className="text-lg font-semibold">Header</h3>
                {showHeader ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showHeader && (
                <div className="border rounded-md p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tahun Pajak
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={"1 - 12 "}
                                className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                NPWP
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={"20201003020302"}
                                className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
