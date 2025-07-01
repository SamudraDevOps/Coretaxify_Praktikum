import React from "react";
import { CreditCard, Banknote, Wallet, Printer } from "lucide-react"; // Import icons from lucide-react

// Main App component
export default function BukuBesar({ data }) {
  console.log(data);
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      <header className="bg-white p-6 shadow-md rounded-lg mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">My General Ledger</h1>
      </header>

      {/* Main Content Area */}
     <main className="">
  {/* <div className="flex justify-center"> */}
        {/* Print Ledger Button */}
        {/* <div className="flex justify-end mb-4">
          <button className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
            <Printer className="w-5 h-5 mr-2" /> 
            Print Taxpayer Ledger
          </button>
        </div> */}

        {/* Total Section */}
        <div className="bg-white p-6 shadow-md rounded-lg w-full ">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center ">
            Total
          </h2>
<div className="flex items-start justify-around">
                {/* Debit Card */}
            <DashboardCard
              icon={<CreditCard className="w-6 h-6 text-gray-600 " />} // Lucide CreditCard icon
              title="Debit"
              value="0,00"
            />
            {/* Kredit Card */}
            <DashboardCard
              icon={<Banknote className="w-6 h-6 text-gray-600" />} // Lucide Banknote icon
              title="Kredit"
              value="0,00"
            />
            {/* Debit Tersisa Card */}
            <DashboardCard
              icon={<CreditCard className="w-6 h-6 text-gray-600" />} // Lucide CreditCard icon
              title="Debit Tersisa"
              value="0,00"
            />
            {/* Kredit Tersisa Card */}
            <DashboardCard
              icon={<Banknote className="w-6 h-6 text-gray-600" />} // Lucide Banknote icon
              title="Kredit Tersisa"
              value="0,00"
            />
            {/* Saldo Card - Highlighted */}
            <DashboardCard
              icon={<Wallet className="w-6 h-6 text-gray-600" />} // Lucide Wallet icon
              title="Saldo"
              value={data?.saldo}
              // highlighted={true}
            />
          </div>
            </div>
        {/* </div> */}
      </main>
    </div>
  );
}

// Tambahan Conversi Rupiah dan card dinamis
const DashboardCard = ({ icon, title, value, highlighted = false }) => {

  const formatCurrency = (number) => {

    const numericValue = typeof number === 'string' ? parseFloat(number.replace(',', '.')) : number;

    if (isNaN(numericValue)) {
      return value; 
    }
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
    }).format(numericValue);
  };
  
  const formattedValue = formatCurrency(value);
  
  return (
    <div className="flex-1 min-w-0 p-4 bg-white border border-gray-200 rounded-lg mx-2">
      <div className="flex items-center text-sm text-gray-500">
        {icon}
        <span className="ml-2">{title}</span>
      </div>
      <div className="mt-2">
        <p className="text-xl font-semibold text-gray-900">{formattedValue}</p>
      </div>
    </div>
  );
};