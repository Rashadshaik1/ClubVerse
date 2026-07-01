import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateClub from "./pages/CreateClub";
import Users from "./pages/Users";
import Events from "./pages/Events";
import ClubDetails from "./pages/ClubDetails";
import Clubs from "./pages/Clubs";
import ClubTypePage from "./pages/ClubTypePage"; // ✅ ADD THIS

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* CREATE CLUB */}
        <Route
          path="/create-club"
          element={
            <ProtectedRoute>
              <CreateClub />
            </ProtectedRoute>
          }
        />

        {/* 👇 MAIN CLUBS PAGE (3 CARDS) */}
        <Route
          path="/clubs"
          element={
            <ProtectedRoute>
              <Clubs />
            </ProtectedRoute>
          }
        />

        {/* 👇 CATEGORY FILTER PAGE (IMPORTANT) */}
        <Route
          path="/clubs/:type"
          element={
            <ProtectedRoute>
              <ClubTypePage />
            </ProtectedRoute>
          }
        />

        {/* USERS */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* EVENTS */}
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        {/* CLUB DETAILS */}
        <Route
          path="/club/:id"
          element={
            <ProtectedRoute>
              <ClubDetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;