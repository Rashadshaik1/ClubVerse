import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMMON
import Landing from "./pages/common/Landing";

// STUDENT
import StudentAuth from "./pages/student/StudentAuth";
import StudentHome from "./pages/student/StudentHome";
import StudentAbout from "./pages/student/StudentAbout";
import StudentProfile from "./pages/student/StudentProfile"; // ✅ NEW

// CLUB
import ClubLogin from "./pages/club/ClubLogin";
import Dashboard from "./pages/club/Dashboard";
import CreateEvent from "./pages/club/CreateEvent";
import ManageEvents from "./pages/club/ManageEvents";

import About from "./pages/club/About";

// ✅ ADDED DYNAMIC EVENT DASHBOARD
import EventDashboard from "./pages/club/EventDashboard";

// ✅ ADDED MEMBERS MANAGEMENT MODULE
import Members from "./pages/club/Members";

// 🌟 CLUB PROFILE
import Profile from "./pages/club/Profile";

// ✅ ADDED GALLERY MODULE
import Gallery from "./pages/club/Gallery";

// ✅ ADDED GALLERY DETAILS MODULE
import GalleryDetails from "./pages/club/GalleryDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING */}
        <Route path="/" element={<Landing />} />

        {/* CLUB ABOUT */}
        <Route path="/about" element={<About />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student-auth" element={<StudentAuth />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/student-about" element={<StudentAbout />} />
        <Route path="/student-profile" element={<StudentProfile />} /> {/* ✅ NEW */}

        {/* ================= CLUB ================= */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/club-dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/manage-events" element={<ManageEvents />} />

        {/* MEMBERS */}
        <Route path="/members" element={<Members />} />

        {/* CLUB PROFILE */}
        <Route path="/profile" element={<Profile />} />

        {/* GALLERY */}
        <Route path="/gallery" element={<Gallery />} />

        {/* GALLERY DETAILS */}
        <Route
          path="/club/gallery/:id"
          element={<GalleryDetails />}
        />

        {/* EVENT DASHBOARD */}
        <Route
          path="/club/event/:id"
          element={<EventDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}