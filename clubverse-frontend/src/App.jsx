import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentNotifications from "./pages/student/StudentNotifications";

// COMMON
import Landing from "./pages/common/Landing";

// ================= STUDENT =================
import StudentAuth from "./pages/student/StudentAuth";
import StudentHome from "./pages/student/StudentHome";
import StudentAbout from "./pages/student/StudentAbout";
import StudentProfile from "./pages/student/StudentProfile";
import Clubs from "./pages/student/Clubs";
import StudentEventDetails from "./pages/student/StudentEventDetails";
import MyRegistrations from "./pages/student/MyRegistrations";

// ================= CLUB =================
import ClubLogin from "./pages/club/ClubLogin";
import Dashboard from "./pages/club/Dashboard";
import CreateEvent from "./pages/club/CreateEvent";
import ManageEvents from "./pages/club/ManageEvents";
import About from "./pages/club/About";
import EventDashboard from "./pages/club/EventDashboard";
import Members from "./pages/club/Members";
import Profile from "./pages/club/Profile";
import Gallery from "./pages/club/Gallery";
import GalleryDetails from "./pages/club/GalleryDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= COMMON ================= */}
        <Route path="/" element={<Landing />} />

        {/* ================= CLUB ABOUT ================= */}
        <Route path="/about" element={<About />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student-auth" element={<StudentAuth />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/student-clubs" element={<Clubs />} />
        <Route path="/student-about" element={<StudentAbout />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route
  path="/student/event/:id"
  element={<StudentEventDetails />}
/>
<Route
  path="/student/my-registrations"
  element={<MyRegistrations />}
/>
<Route
  path="/student-notifications"
  element={<StudentNotifications />}
/>

        {/* ================= CLUB ================= */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/club-dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/manage-events" element={<ManageEvents />} />

        {/* MEMBERS */}
        <Route path="/members" element={<Members />} />

        {/* PROFILE */}
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