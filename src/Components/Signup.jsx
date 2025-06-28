
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "./axionInstance";
import "react-toastify/dist/ReactToastify.css";
import image from "../Images/login-logo.avif";

function Signup() {
  const navigate = useNavigate();
  // Removed unused errorMessage state

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onsubmit = async () => {
    try {
      const values = {
        username: getValues("username"),
        email: getValues("email"),
        password: getValues("password"),
      };

      console.log("Sending Data:", values);
      localStorage.setItem("values", JSON.stringify(values));
      const response = await axiosInstance.post("/signup", values);
      console.log("Response:", response.data);

      toast.success("Signup successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Navbar */}
      <div className="flex justify-end p-4 space-x-6 text-white text-sm md:text-base font-semibold">
        <NavLink to="/" className="hover:underline">HOME</NavLink>
        <NavLink to="/about" className="hover:underline">ABOUT US</NavLink>
        <NavLink to="/con" className="hover:underline">CONTACT US</NavLink>
        <NavLink to="/doc" className="hover:underline">DOCUMENT</NavLink>
      </div>

      {/* Signup Card */}
      <div className="flex-grow flex items-center justify-center">
        <div
          className="backdrop-blur-md bg-white/20  rounded-lg shadow-xl p-8 w-[90%] max-w-md animate-fade-in"
        >
          <h2 className="text-white text-3xl font-bold text-center mb-6">
            Signup
          </h2>

          {/* Removed unused errorMessage display */}

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-200 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="text-red-400 text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-200 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-400 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-200 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <span className="text-red-400 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-gray-300 text-black font-bold py-2 rounded transition duration-300"
            >
              Signup
            </button>
          </form>

          <p className="text-center text-gray-200 mt-4 text-sm">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-300 hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
