import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const HeaderLampiran = ({ title, description }) => {
  const [showHeaderLampiran, setShowHeaderLampiran] = useState(false);

  return (
    <>
      <div
        className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full"
        onClick={() => setShowHeaderLampiran(!showHeaderLampiran)}
      >
        <h3 className="text-lg font-semibold">Header</h3>
        {showHeaderLampiran ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showHeaderLampiran && (
        <div className="border rounded-md p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Periode Pajak Bulan
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
                Periode Pajak Tahun
              </label>
              <input
                type="text"
                readOnly
                //   value={data.masa_tahun}
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                NPWP
              </label>
              <input
                type="text"
                disabled
                // value={data.npwp}
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
              ></input>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderLampiran;
