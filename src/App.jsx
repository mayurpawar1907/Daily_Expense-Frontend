import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Layout from "./Layout";
import Dashboard from "./Components/Dashbord";
import Profile from "./Components/Profile";
import AddExpense from "./Components/AddExpense";
import Report from "./Components/Report";
import  VieweAll  from "./Components/VieweAll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 Protected App Layout with Header/Sidebar */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="dash" />} />
          <Route path="dash" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="vieweAll" element={<VieweAll />} />
          <Route path="add" element={<AddExpense />} />
          <Route path="repo" element={<Report />} />
        </Route>

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
