import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import image from "../Images/loginpage-img.webp";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [dailyExpense, setDailyExpense] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salary, setSalary] = useState(() => localStorage.getItem("salary") || "");

  const remainingBalance = salary - monthlyExpense;

  useEffect(() => {
    fetchExpense();
    fetchDailyExpense();
    fetchMonthlyExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/getExpense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenseData(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchDailyExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/getDailyExpense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDailyExpense(response.data.dailyExpense || 0);
    } catch (error) {
      console.error("Failed to fetch daily expense:", error);
    }
  };

  const fetchMonthlyExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/getMonthlyExpense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonthlyExpense(response.data.monthlyExpense || 0);
    } catch (error) {
      console.error("Failed to fetch monthly expense:", error);
    }
  };

  const handleEditClick = (index, expense) => {
    setEditingRow(index);
    setEditedData({ ...expense });
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSaveClick = async (id) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/updateExpense/${id}`, editedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Expense updated successfully");
      fetchExpense();
      setEditingRow(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/deleteExpense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpense();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleSalaryChange = (e) => setSalary(e.target.value);

  const handleSalarySave = () => {
    localStorage.setItem("salary", salary);
    setIsModalOpen(false);
    toast.success("Salary saved");
  };

  return (
    <div className="flex min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <Sidebar />
      <div className="flex-1 p-6 ml-64 animate-fadeInUp">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-6"
        >
          <h2 className="text-4xl text-white font-extrabold tracking-tight">📊 Expense Dashboard</h2>
          <NavLink to="/app/viewAll">
            <button className="bg-white/30 px-6 py-2 rounded-lg text-white font-bold hover:bg-white/50 transition">View All</button>
          </NavLink>
        </motion.div>

        {/* Info Boxes */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          <Box title="Daily Expense" value={`₹${dailyExpense}`} color="bg-blue-500" />
          <Box title="Monthly Expense" value={`₹${monthlyExpense}`} color="bg-red-500" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer p-6 rounded-lg text-white shadow-md text-center bg-green-500"
            onClick={() => setIsModalOpen(true)}
          >
            <h2 className="text-xl font-semibold">Monthly Salary</h2>
            <p className="text-2xl font-bold mt-2">₹{salary || "Set Salary"}</p>
          </motion.div>
          <Box title="Remaining Balance" value={`₹${remainingBalance}`} color="bg-yellow-500" />
        </motion.div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <motion.div
              className="bg-white p-6 rounded-lg w-80"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-2">Set Monthly Salary</h2>
              <input
                type="number"
                className="w-full border p-2 rounded mb-4"
                value={salary}
                onChange={handleSalaryChange}
              />
              <div className="flex justify-end gap-4">
                <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
                <button onClick={handleSalarySave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Expense Table */}
        <motion.div
          className="overflow-x-auto bg-white/20 rounded-lg shadow-md mt-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <table className="w-full text-left text-white">
            <thead className="bg-blue-600">
              <tr>
                <th className="p-3">Item</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.length > 0 ? (
                expenseData.map((expense, index) => (
                  <tr key={index} className="border-t border-white/10 hover:bg-white/10 transition">
                    <td className="p-3">
                      {editingRow === index ? (
                        <input type="text" value={editedData.item || ""} onChange={(e) => handleInputChange(e, "item")} className="text-black px-2 rounded" />
                      ) : (
                        expense.item
                      )}
                    </td>
                    <td className="p-3">
                      {editingRow === index ? (
                        <input type="number" value={editedData.amount || ""} onChange={(e) => handleInputChange(e, "amount")} className="text-black px-2 rounded" />
                      ) : (
                        `₹${expense.amount}`
                      )}
                    </td>
                    <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="p-3">{expense.paymenttype}</td>
                    <td className="p-3">{expense.priority}</td>
                    <td className="p-3 space-x-2">
                      {editingRow === index ? (
                        <button onClick={() => handleSaveClick(expense.id)} className="bg-green-600 px-3 py-1 rounded text-white">Save</button>
                      ) : (
                        <button onClick={() => handleEditClick(index, expense)} className="bg-yellow-500 px-3 py-1 rounded text-white">Edit</button>
                      )}
                      <button onClick={() => handleDeleteClick(expense.id)} className="bg-red-600 px-3 py-1 rounded text-white">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">No expenses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

const Box = ({ title, value, color }) => (
  <motion.div
    className={`${color} text-white p-6 rounded-lg shadow-md text-center`}
    whileHover={{ scale: 1.05 }}
  >
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </motion.div>
);

Box.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

export default Dashboard;
