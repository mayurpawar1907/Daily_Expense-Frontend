import { motion } from "framer-motion";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token for login
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-between px-6 shadow-lg z-50 backdrop-blur-md"
    >
      {/* Brand Logo */}
      <div
        className="flex items-center space-x-3 cursor-pointer select-none"
        onClick={() => navigate(isLoggedIn ? "/app/dash" : "/")}
      >
        <FaWallet size={28} className="text-yellow-300 animate-pulse" />
        <h1 className="text-2xl font-extrabold tracking-wider">Daily Expense</h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-6 font-medium items-center">
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/app/dash")} className="hover:text-yellow-300 transition">Dashboard</button>
            <button onClick={() => navigate("/app/profile")} className="hover:text-yellow-300 transition">Profile</button>
            <button onClick={() => navigate("/app/add")} className="hover:text-yellow-300 transition">Add</button>
            <button onClick={() => navigate("/app/repo")} className="hover:text-yellow-300 transition">Report</button>
            <button onClick={handleLogout} className="hover:text-red-300 transition">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="hover:text-yellow-300 transition">Login</button>
            <button onClick={() => navigate("/signup")} className="hover:text-yellow-300 transition">Signup</button>
          </>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <Menu
          size={26}
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer hover:text-yellow-300 transition"
        />
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 right-4 bg-white text-black rounded-lg shadow-xl w-48 py-2 z-50 md:hidden"
        >
          {isLoggedIn ? (
            <>
              <button onClick={() => { navigate("/app/dash"); setMenuOpen(false); }} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Dashboard</button>
              <button onClick={() => { navigate("/app/profile"); setMenuOpen(false); }} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Profile</button>
              <button onClick={() => { navigate("/app/add"); setMenuOpen(false); }} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Add</button>
              <button onClick={() => { navigate("/app/repo"); setMenuOpen(false); }} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Report</button>
              <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Login</button>
              <button onClick={() => { navigate("/signup"); setMenuOpen(false); }} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Signup</button>
            </>
          )}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
