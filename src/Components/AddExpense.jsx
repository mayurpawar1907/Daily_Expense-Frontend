import { MoveLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../Images/loginpage-img.webp";

import axiosInstance from "./axionInstance";

function AddExpense() {
  const [expense, setExpense] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axiosInstance.get("/getsignupdata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User Data Received:", response.data);
        setExpense(response.data); // Store user data
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const submit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token missing. Please login again.");
        navigate("/login");
        return;
      }

      const values = {
        item: getValues("item"),
        amount: getValues("amount"),
        expense_by: expense.email,
        date: getValues("date"),
        payment_type: getValues("payment_type"),
        priority: getValues("priority"),
      };

      console.log("📌 Sending data:", values);

      const response = await axiosInstance.post("/addExpense", values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Response from server:", response.data);

      if (response.status === 200) {
        handleSuccess();
        setTimeout(() => navigate("/dash"), 2000);
      } else {
        toast.error("Failed to add expense. Try again.");
      }
    } catch (error) {
      console.error("❌ Error adding expense:", error);
      localStorage.removeItem("token");
      navigate("/login");

      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        toast.error("Error adding expense.");
      }
    }
  };

  const handleSuccess = () => {
    toast.success("Expense added successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return isAuthenticated ? (
    <div
      className="flex min-h-screen bg-white"
      style={{
        backgroundImage: `url("${image}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <Sidebar />

      <div className="flex justify-center items-center w-full">
        <div
          className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-xl shadow-lg w-96"
          style={{
            overflow: "hidden",
            height: "auto",
            border: "1px solid black",
            backgroundColor: "#ffffff25",
            position: "relative",
            left: "110px",
          }}
        >
          <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">
            Expense Form
          </h2>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="block text-white mb-1">Item Description</label>
              <input
                className="w-full px-4 py-2 rounded bg-[#ffffff25] bg-opacity-40 border border-black400 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="text"
                placeholder="Enter item"
                {...register("item", { required: "This field is required" })}
              />
              {errors.item && (
                <span className="text-red-500 text-sm">
                  {errors.item.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-white mb-1">Amount</label>
              <input
                className="w-full px-4 py-2 rounded bg-[#ffffff25] bg-opacity-40 border border-gray-400 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="number"
                placeholder="Enter amount"
                {...register("amount", { required: "This field is required" })}
              />
              {errors.amount && (
                <span className="text-red-500 text-sm">
                  {errors.amount.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-white mb-1">Expense By</label>
              <input
                className="w-full px-4 py-2 rounded bg-[#ffffff25] bg-opacity-40 border border-gray-400 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="text"
                value={expense.email}
                readOnly
                {...register("expense_by")}
              />
            </div>

            <div>
              <label className="block text-white mb-1">Date</label>
              <input
                className="w-full px-4 py-2 rounded bg-[#ffffff25] bg-opacity-40 border border-gray-400 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="date"
                {...register("date", { required: "This field is required" })}
              />
            </div>

            <div>
              <label className="block text-white mb-1">Payment Type</label>
              <select
                {...register("payment_type", {
                  required: "Please select a payment type",
                })}
                className="w-full px-4 py-2 rounded test bg-[#ffffff25] bg-opacity-40 border border-gray-400  focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="" style={{color:"#FFFF"}}>Select Payment Type</option>
                <option value="cash" >Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="online">Online</option>
              </select>
            </div>
           
             <div>
            
              <select
                {...register("priority", {
                  required: "Please select a payment type",
                })}
                className="w-full px-4 py-2 rounded bg-[#ffffff25] bg-opacity-40 border border-gray-400 text-black focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                  <option value="" style={{color:"#FFFF"}}>Select priority</option>
              
                <option value="hight">hight</option>
                <option value="medium"> medium</option>
                <option value="low">low</option>
              
              </select>
            </div>



            <button className="w-full bg-black text-white py-2 rounded text-lg transition duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}

export default AddExpense;
