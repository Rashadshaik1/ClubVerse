import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMMON
import Landing from "./pages/common/Landing";

// STUDENT
import StudentAuth from "./pages/student/StudentAuth";

// CLUB
import ClubLogin from "./pages/club/ClubLogin";
import Dashboard from "./pages/club/Dashboard";
import CreateEvent from "./pages/club/CreateEvent";

// ✅ ADDED
import ManageEvents from "./pages/club/ManageEvents";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING */}
        <Route path="/" element={<Landing />} />

        {/* STUDENT */}
        <Route path="/student-auth" element={<StudentAuth />} />
        <Route
          path="/student-dashboard"
          element={<div>Student Dashboard</div>}
        />

        {/* CLUB */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/club-dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />

        {/* ✅ MANAGE EVENTS */}
        <Route path="/manage-events" element={<ManageEvents />} />

      </Routes>
    </BrowserRouter>
  );
}