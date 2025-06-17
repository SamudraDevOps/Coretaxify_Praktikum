import React from "react";
import { CreditCard, Banknote, Wallet, Printer } from "lucide-react"; // Import icons from lucide-react

// Main App component
export default function BukuBesar() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      {/* Header Section */}
      <header className="bg-white p-6 shadow-md rounded-lg mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">My General Ledger</h1>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto">
        {/* Print Ledger Button */}
        {/* <div className="flex justify-end mb-4">
          <button className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
            <Printer className="w-5 h-5 mr-2" /> 
            Print Taxpayer Ledger
          </button>
        </div> */}

        {/* Total Section */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Total
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Debit Card */}
            <DashboardCard
              icon={<CreditCard className="w-6 h-6 text-gray-600" />} // Lucide CreditCard icon
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
              title="Dèbit Tersisa"
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
              icon={<Wallet className="w-6 h-6 text-blue-800" />} // Lucide Wallet icon
              title="Saldo"
              value="0,00"
              highlighted={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable DashboardCard component
const DashboardCard = ({ icon, title, value, highlighted = false }) => {
  return (
    <div
      className={`flex items-center p-4 bg-white rounded-lg shadow-sm transition duration-300 ease-in-out ${
        highlighted ? "border-2 border-blue-800" : "border border-gray-200"
      }`}
    >
      <div
        className={`flex-shrink-0 p-2 rounded-full ${
          highlighted ? "bg-blue-100" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
