import Header from "./Components/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // Define the routes where Header should appear
  const showHeader = location.pathname === "/" || location.pathname === "/home";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 🔹 Conditionally Render Header Only on / or /home */}
      {showHeader && <Header />}

      {/* 🔹 Page Content */}
      <main className={`${showHeader ? "pt-16" : ""} px-4 md:px-6 pb-8 transition-all duration-300`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
