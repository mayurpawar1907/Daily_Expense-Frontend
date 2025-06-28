import  { useEffect, useState } from "react";
import axios from "axios";
import image from "../Images/loginpage-img.webp";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const VieweAll = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});


  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/getall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenseData(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error.response?.data || error.message);
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
    if (!id) return toast.error("Expense ID is missing!");

    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:3000/updateExpense/${id}`, editedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Expense updated successfully");
      fetchExpense();
      setEditingRow(null);
    } catch (error) {
      toast.error("Error updating expense");
      console.error(error.response?.data || error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/deleteExpense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Expense deleted successfully");
      fetchExpense();
    } catch (error) {
      toast.error("Error deleting expense");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col p-4"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex justify-end mb-4">
        <NavLink to="/dash">
          <button className="bg-white/30 text-white font-bold py-2 px-6 rounded-lg hover:bg-white/40 transition">
            Exit
          </button>
        </NavLink>
      </div>

      <h2 className="text-white text-3xl font-bold text-center mb-6 animate-fade-in">💰 Expense Dashboard</h2>

      {/* Expense Table */}
      <div className="overflow-x-auto rounded-lg shadow-xl backdrop-blur-md bg-white/20 p-4 animate-fade-in">
        <table className="w-full table-auto text-white text-sm">
          <thead className="bg-blue-800 text-white text-left">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Payment Type</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.length > 0 ? (
              expenseData.map((expense, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white/10" : "bg-white/20"
                  } hover:bg-white/30 transition`}
                >
                  <td className="p-3">
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={editedData.item || ""}
                        onChange={(e) => handleInputChange(e, "item")}
                        className="bg-gray-800 text-white p-1 rounded"
                      />
                    ) : (
                      expense?.item || "N/A"
                    )}
                  </td>
                  <td className="p-3">
                    {editingRow === index ? (
                      <input
                        type="number"
                        value={editedData.amount || ""}
                        onChange={(e) => handleInputChange(e, "amount")}
                        className="bg-gray-800 text-white p-1 rounded"
                      />
                    ) : (
                      `₹${expense?.amount || 0}`
                    )}
                  </td>
                  <td className="p-3">
                    {editingRow === index ? (
                      <input
                        type="date"
                        value={
                          editedData.date
                            ? new Date(editedData.date).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) => handleInputChange(e, "date")}
                        className="bg-gray-800 text-white p-1 rounded"
                      />
                    ) : expense?.date ? (
                      new Date(expense.date).toISOString().split("T")[0]
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3">
                    {editingRow === index ? (
                      <select
                        value={editedData.paymenttype || "cash"}
                        onChange={(e) => handleInputChange(e, "paymenttype")}
                        className="bg-gray-800 text-white p-1 rounded"
                      >
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                        <option value="paytm">Paytm</option>
                      </select>
                    ) : (
                      expense?.paymenttype || "N/A"
                    )}
                  </td>
                  <td className="p-3">
                    {editingRow === index ? (
                      <select
                        value={editedData.priority || "Medium"}
                        onChange={(e) => handleInputChange(e, "priority")}
                        className="bg-gray-800 text-white p-1 rounded"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    ) : (
                      expense?.priority || "N/A"
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    {editingRow === index ? (
                      <button
                        onClick={() => handleSaveClick(expense.id)}
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(index, expense)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClick(expense.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-white p-4">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VieweAll;
