import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "./Header";
import PertanyaanE from "./section/Lampiran10B/index";

const Lampiran10A = ({ data }) => {
  const [showBagianA, setShowBagianA] = useState(true);

  return (
    <div className="space-y-4">
      <Header />

      {/* PERNYATAAN TERKAIT TRANSAKSI YANG DIPENGARUHI HUBUNGAN ISTIMEWA */}
      <div>
        <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full">
          <h3 className="text-lg font-semibold">
            PERNYATAAN TERKAIT TRANSAKSI YANG DIPENGARUHI HUBUNGAN ISTIMEWA
          </h3>
        </div>
        <div>
          <div className="border rounded-md p-4 space-y-4">
            <div className="ml-4">
              <PertanyaanE />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampiran10A;
