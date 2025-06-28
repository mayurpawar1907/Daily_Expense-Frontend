import React, { useState } from "react";
import { motion } from "framer-motion";

const ManageAccount = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveChanges = () => {
    alert("Changes Saved!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 shadow-lg rounded-lg max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Manage Account
        </h2>

        {/* Profile Info */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Change Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">New Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-700 font-medium">Two-Factor Authentication</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={twoFactor}
              onChange={() => setTwoFactor(!twoFactor)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all"></div>
          </label>
        </div>

        {/* Save Changes Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          onClick={handleSaveChanges}
        >
          Save Changes
        </motion.button>

        {/* Delete Account */}
        <div className="mt-6 text-center">
          <button className="text-red-500 hover:underline">Delete Account</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageAccount;
