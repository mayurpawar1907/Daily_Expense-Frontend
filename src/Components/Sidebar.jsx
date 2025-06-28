import { useState } from "react";
import {
  LayoutDashboard,
  User,
  PlusCircle,
  Settings,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { FaChartLine } from "react-icons/fa";
import image from "../Images/login-logo.avif";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

function Sidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      toast.success("You have been logged out successfully", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    } else {
      toast.warn("You are not logged in", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleNavClick = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <>
      <ToastContainer />

      {/* 🔹 Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-gray-900 text-white p-2 rounded-md shadow-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 🔹 Sidebar for Desktop + Mobile Drawer */}
      <AnimatePresence>
        {(menuOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 shadow-lg z-40 md:z-50"
          >
            {/* 🔹 Logo */}
            <div className="w-full h-40 flex items-center justify-center">
              <img
                src={image}
                alt="logo"
                className="h-full w-full object-cover"
              />
            </div>

            {/* 🔹 Navigation */}
            <nav className="flex flex-col p-4 space-y-3">
              <NavItem
                icon={<LayoutDashboard size={20} />}
                to="/app/dash"
                label="Dashboard"
                onClick={handleNavClick}
              />
              <NavItem
                icon={<User size={20} />}
                to="/app/profile"
                label="Profile"
                onClick={handleNavClick}
              />
              <NavItem
                icon={<PlusCircle size={20} />}
                to="/app/add"
                label="Add Expense"
                onClick={handleNavClick}
              />
              <NavItem
                icon={<FaChartLine size={20} />}
                to="/app/repo"
                label="Report"
                onClick={handleNavClick}
              />

              {/* 🔹 Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-gray-800 transition"
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>

                <AnimatePresence>
                  {isSettingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-full top-0 ml-2 bg-white text-black rounded-lg shadow-lg p-3 w-44"
                    >
                      <ul className="space-y-2">
                        <li
                          onClick={handleLogout}
                          className="hover:bg-gray-100 rounded p-2 cursor-pointer transition"
                        >
                          Logout
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 🔹 Reusable Nav Item Component
const NavItem = ({ icon, to, label, onClick }) => (
  <button
    onClick={() => onClick(to)}
    className="flex items-center space-x-3 p-3 rounded-md w-full text-left transition hover:bg-gray-800"
  >
    {icon}
    <span>{label}</span>
  </button>
);

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Sidebar;
