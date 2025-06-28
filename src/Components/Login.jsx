import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../Images/login-logo.avif";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  // Removed unused errorMessage state

  const onLogin = async () => {
    const email = getValues("email").trim();
    const password = getValues("password").trim();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/app");
      }, 1500);
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      {/* Navbar */}
   

      {/* Toast */}
      <ToastContainer />

      {/* Login Form Card */}
      <div className="flex-grow flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/20  rounded-lg shadow-xl p-8 w-[90%] max-w-md animate-fade-in">
          <h2 className="text-white text-3xl font-bold text-center mb-6">
            Login
          </h2>

          {/* Removed unused errorMessage display */}

          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            <div>
              <label className="block text-gray-200 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-200 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-400 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <p className="text-blue-300 hover:underline text-sm text-center cursor-pointer">
              Forgot Password?
            </p>

            <button
              type="submit"
              className="w-full bg-white hover:bg-gray-300 text-black font-bold py-2 rounded transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-200 mt-4 text-sm">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="text-blue-300 hover:underline">
              Signup
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
