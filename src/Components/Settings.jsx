// src/components/AccountSettings.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaBell, FaShieldAlt, FaTrash, FaMoneyBillWave } from "react-icons/fa";

const settingsSections = [
  { name: "Profile", icon: <FaUser />, content: "Edit your name, email, and profile picture." },
  { name: "Security", icon: <FaLock />, content: "Manage password, two-factor authentication, and login devices." },
  { name: "Notifications", icon: <FaBell />, content: "Customize email, push, and SMS notification preferences." },
  { name: "Privacy", icon: <FaShieldAlt />, content: "Control profile visibility and blocked users." },
  { name: "Billing", icon: <FaMoneyBillWave />, content: "Manage subscriptions, payments, and invoices." },
  { name: "Delete Account", icon: <FaTrash />, content: "Deactivate or permanently delete your account." },
];

const Settings = () => {
  const [selected, setSelected] = useState(settingsSections[0]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64  shadow-lg p-6  bg-gray-800 text-white hover:text-black">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-white ">Account Settings</h2>
        <ul className="space-y-4">
          {settingsSections.map((section, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${
                selected.name === section.name ? "bg-white text-black" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelected(section)}
            >
              {section.icon}
              <span>{section.name}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10">
        <motion.div
          key={selected.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 shadow-lg rounded-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900">{selected.name}</h3>
          <p className="text-gray-600 mt-2">{selected.content}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
