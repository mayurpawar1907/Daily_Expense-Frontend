import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import image from "../Images/loginpage-img.webp";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/getsignupdata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setFormData({
          username: response.data.username || "",
          email: response.data.email || "",
          password: response.data.password || "",
        });
      } catch {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const token = localStorage.getItem("token");

        await axios.put(
          "http://localhost:3000/upprofile",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(formData);
        toast.success("Profile updated successfully");
      } catch {
        toast.error("Failed to update profile");
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 md:px-8 lg:px-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-[#ffffff25] backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">User Profile</h2>

        {loading ? (
          <p className="text-white text-center animate-pulse">Loading...</p>
        ) : user ? (
          <form className="space-y-5">
            <div>
              <label className="block text-white font-semibold">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 mt-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white placeholder-gray-300 border border-white/30 ${
                  !isEditing && "opacity-60 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-white font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 mt-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white placeholder-gray-300 border border-white/30 ${
                  !isEditing && "opacity-60 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="relative">
              <label className="block text-white font-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 mt-1 pr-10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white placeholder-gray-300 border border-white/30 ${
                  !isEditing && "opacity-60 cursor-not-allowed"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-200 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditClick}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg"
              >
                {isEditing ? "Save" : "Update Profile"}
              </motion.button>
            </div>
          </form>
        ) : (
          <p className="text-red-500 text-center">User not found!</p>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;