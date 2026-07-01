
import { useEffect, useState } from "react";
import {
  FaBell,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import collegeLogo from "../assets/gvpce-logo.png";

export default function ClubNavbar() {
  const navigate = useNavigate();

  const [club, setClub] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const storedClub = JSON.parse(localStorage.getItem("club"));
    if (storedClub) setClub(storedClub);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("club");
    navigate("/club-login");
  };

  return (
    <header className="relative z-[9999] h-20 px-8 flex items-center justify-between border-b backdrop-blur-xl transition-all bg-white border-[#cceeee]">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <img
          src={collegeLogo}
          alt="College Logo"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h1 className="text-xl font-bold text-[#048c92]">
            GVPCE (A)
          </h1>

          <p className="text-xs text-gray-600">
            Gayatri Vidya Parishad College of Engineering (A)
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#cceeee]"
          >
            <FaBell className="text-[#048c92] text-lg" />

            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl shadow-xl overflow-hidden z-[99999] bg-white border border-[#cceeee]">
              <div className="p-4 font-semibold border-b">
                Notifications
              </div>

              <div className="p-4 text-sm">
                🎉 Event reached 100 registrations.
              </div>

              <div className="p-4 text-sm border-t">
                📅 Robotics Workshop starts tomorrow.
              </div>

              <div className="p-4 text-sm border-t">
                ✅ Super Admin approved your event.
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#e6f7ff]"
          >
            <img
              src={club.logo || "https://via.placeholder.com/45"}
              alt=""
              className="w-11 h-11 rounded-full border-2 border-[#43bfc3]"
            />

            <div>
              <h2 className="font-semibold text-gray-800">
                {club.name}
              </h2>

              <p className="text-xs text-gray-500">
                {club.type}
              </p>
            </div>

            <FaChevronDown />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-60 rounded-2xl shadow-xl overflow-hidden z-[99999] bg-white border border-[#cceeee]">
              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#43bfc3]/10"
              >
                <FaUser /> Profile
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#43bfc3]/10"
              >
                <FaCog /> Settings
              </button>

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-100"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

