import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMMON
import Landing from "./pages/common/Landing";

// STUDENT
import StudentAuth from "./pages/student/StudentAuth";
import StudentHome from "./pages/student/StudentHome";

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

// 🌟 FIX: Profile
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
        <Route path="/about" element={<About />} />

       {/* STUDENT */}
        <Route path="/student-auth" element={<StudentAuth />} />
        <Route path="/student-home" element={<StudentHome />} />

        {/* CLUB */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/club-dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/manage-events" element={<ManageEvents />} />


        {/* MEMBERS CONFIGURATION ROUTE LINKED */}
        <Route path="/members" element={<Members />} />

        {/* ✅ ADDED PROFILE ROUTE LINKED */}
        <Route path="/profile" element={<Profile />} />

        {/* ✅ ADDED GALLERY ROUTE LINKED */}
        <Route path="/gallery" element={<Gallery />} />
        
        {/* ✅ ADDED GALLERY DETAILS ROUTE (ఇక్కడ యాడ్ చేశాను) */}
        <Route path="/club/gallery/:id" element={<GalleryDetails />} />

        {/* DYNAMIC EVENT DASHBOARD ROUTE */}

        <Route path="/club/event/:id" element={<EventDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}