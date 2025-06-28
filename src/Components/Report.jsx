import  { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { NavLink } from "react-router-dom";
import image from "../Images/loginpage-img.webp";

const Report = () => {
  const [monthlyExpense, setMonthlyExpense] = useState([]);

  useEffect(() => {
    const fetchMonthlyExpense = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ No token found, user might not be logged in.");
          return;
        }
    
        const response = await axios.get("http://localhost:3000/graphexp", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("✅ Monthly Expense API Response:", response.data);
    
        // Ensure all 12 months are included
        const allMonths = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
    
        const expenseData = allMonths.map((month) => {
          const found = response.data.find((item) => item.month === month);
          return {
            month,
            total_expense: found ? Number(found.total_expense) : 0, // Fill missing months with 0
          };
        });
    
        setMonthlyExpense(expenseData);
      } catch (error) {
        console.error("❌ Failed to fetch monthly expense:", error.response?.data || error.message);
      }
    };
    

    fetchMonthlyExpense();
  }, []);

  return (
    <div
      className="p-6"
      style={{
        backgroundImage: `url("${image}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <NavLink to="/home">
        <button
          style={{
            width: "200px",
            height: "50px",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            borderRadius: "10px",
            position: "relative",
            left: "85%",
            top: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "2px 4px 10px rgba(255, 255, 255, 0.3)",
          }}
        >
          Back
        </button>
      </NavLink>

      <div
        className="shadow-lg rounded-lg p-6 mt-10"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "4px 8px 20px rgba(0, 0, 0, 0.2)",
          color: "white",
        }}
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center" style={{ color: "#f8fafc" }}>
          💰 Monthly Expense Report
        </h1>

        {/* Expense Graph */}
        <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
          {monthlyExpense.length > 0 ? (
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart
                data={monthlyExpense}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                <XAxis dataKey="month" tick={{ fill: "white", fontSize: 14 }} />
                <YAxis
                  tick={{ fill: "white", fontSize: 14 }}
                  domain={["auto", "auto"]} // Automatically adjust based on data
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    borderRadius: "8px",
                    color: "#fff",
                    padding: "10px",
                  }}
                  labelStyle={{ fontWeight: "bold", fontSize: "16px" }}
                  itemStyle={{ color: "#facc15", fontWeight: "bold", fontSize: "14px" }}
                />
                <Area
                  type="monotone" // Ensures smooth curves
                  dataKey="total_expense"
                  stroke="#6366f1"
                  strokeWidth={4}
                  fill="url(#colorExpense)"
                  animationDuration={1000}
                  dot={{ r: 6, fill: "#facc15", strokeWidth: 2, stroke: "#ffffff" }}
                  activeDot={{ r: 10, fill: "#ffffff", stroke: "#facc15" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-white text-center text-xl">📉 No expense data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
