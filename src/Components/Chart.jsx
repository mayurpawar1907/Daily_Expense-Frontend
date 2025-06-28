import React from "react";

const Report = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          MONTHLY EXPENSE REPORT
        </h1>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Graph Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Monthly Expense</h2>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <span>Graph Placeholder</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Total Income</h2>
            <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center text-2xl font-bold">
              $3,795
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Total Expenses</h2>
            <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center text-2xl font-bold">
              $3,089
            </div>
          </div>
        </div>

        {/* Detailed Report */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Detailed Report</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Category</th>
                <th className="border-b p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2">Housing</td>
                <td className="border-b p-2">$1,200</td>
              </tr>
              <tr>
                <td className="border-b p-2">Food</td>
                <td className="border-b p-2">$500</td>
              </tr>
              <tr>
                <td className="border-b p-2">Utilities</td>
                <td className="border-b p-2">$300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
