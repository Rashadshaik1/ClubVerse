import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarPlus,
  FaClipboardList,
  FaUsers,
  FaUserCircle,
  FaRobot,
  FaSignOutAlt
} from "react-icons/fa";

import collegeLogo from "../assets/logoclub.png";

export default function ClubSidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/club-dashboard",
      icon: <FaTachometerAlt />
    },
    {
      name: "Create Event",
      path: "/create-event",
      icon: <FaCalendarPlus />
    },
    {
      name: "Manage Events",
      path: "/manage-events",
      icon: <FaClipboardList />
    },
    {
      name: "Members",
      path: "/members",
      icon: <FaUsers />
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant",
      icon: <FaRobot />
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("club");
    window.location.href = "/club-login";
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white/80 backdrop-blur-2xl border-r border-[#cceeee] flex flex-col shadow-xl">

      {/* LOGO */}
      <div className="p-6 border-b border-[#cceeee]">

        <div className="flex items-center gap-3">

          <img
            src={collegeLogo}
            alt="College Logo"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold text-[#048c92]">
              ClubVerse
            </h1>

            <p className="text-xs text-gray-500">
              Club Management Portal
            </p>
          </div>

        </div>

      </div>

      {/* MENU */}
      <div className="flex-1 p-5 space-y-3">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#048c92] to-[#43bfc3] text-white shadow-lg"
                  : "text-gray-700 hover:bg-[#43bfc3]/10 hover:text-[#048c92]"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

      </div>

      {/* LOGOUT */}
      <div className="p-5 border-t border-[#cceeee]">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all duration-300"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}