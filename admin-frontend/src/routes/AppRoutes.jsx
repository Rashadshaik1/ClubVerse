import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Events from "../pages/Events";
import CreateClub from "../pages/CreateClub";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/events" element={<Events />} />
      <Route path="/create-club" element={<CreateClub />} />
    </Routes>
  );
}