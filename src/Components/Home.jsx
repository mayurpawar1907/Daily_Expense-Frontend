import { useNavigate } from "react-router-dom";
import image from '../assets/react.svg'; // or your own image

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Basic Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">Daily Expense</h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          Login
        </button>
      </nav>

      {/* Hero Banner */}
      <div className="w-full h-[500px]">
        <img
          src={image}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Optional: some features / intro */}
      <section className="p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Track your expenses smartly!</h2>
        <p className="text-gray-600">
          Sign up and get started with managing your daily expenses with ease.
        </p>
      </section>
    </div>
  );
};

export default Homepage;
