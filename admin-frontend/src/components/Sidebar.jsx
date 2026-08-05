import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars as Menu, FaXmark as X } from "react-icons/fa6"; // Fixed import
import logo from "../assets/logo.png";
import { jwtDecode } from "jwt-decode";
import clgLogo from "../assets/clglogo.png";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Events", path: "/events" },
  ];

  const clubMenu = [
    { name: "Clubs Overview", path: "/clubs" },
    { name: "Create Club", path: "/create-club" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const closeSidebar = () => setIsOpen(false);

  // ================= SAFE JWT DECODE =================
  let adminEmail = "";
  let adminName = "Admin";

  try {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);

      adminEmail =
        decoded.email ||
        decoded.user?.email ||
        decoded.data?.email ||
        "";

      adminName =
        decoded.name ||
        decoded.user?.name ||
        decoded.data?.name ||
        "Admin";
    }
  } catch (err) {
    console.log("JWT decode error");
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Menu"
        className="lg:hidden fixed top-4 left-4 z-40 p-3 rounded-xl bg-[#05080f]/90 border border-white/10 backdrop-blur-xl shadow-lg hover:border-[#00C2FF]/40 transition"
      >
        <Menu className="text-white text-lg" />
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          flex flex-col justify-between
          bg-[#05080f] lg:bg-[#05080f]/90 backdrop-blur-2xl
          border-r border-white/10 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 overflow-y-auto
        `}
      >
        {/* TOP SECTION */}
        <div className="p-5">
          {/* Mobile Close Button */}
          <div className="flex justify-end lg:hidden mb-2">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigation Menu"
              className="p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="text-white text-xl" />
            </button>
          </div>

          {/* BRAND */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <img
              src={logo}
              alt="ClubVerse Logo"
              className="w-10 h-10 object-contain drop-shadow"
            />

            <div>
              <h1 className="text-xl font-bold text-[#00C2FF] tracking-wide">
                ClubVerse
              </h1>

              <p className="text-xs text-gray-500 font-medium">
                Super Admin Panel
              </p>
            </div>
          </div>

          {/* MAIN NAVIGATION */}
          <div className="flex flex-col gap-2">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 block
                  ${
                    isActive(item.path)
                      ? "bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF]"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CLUB MANAGEMENT MENU */}
          <div className="mt-8">
            <p className="text-xs text-gray-500 mb-2 px-2 font-semibold tracking-wider">
              CLUB MANAGEMENT
            </p>

            <div className="flex flex-col gap-2">
              {clubMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 block
                    ${
                      isActive(item.path)
                        ? "bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF]"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM PROFILE & LOGOUT */}
        <div className="p-5 border-t border-white/5 lg:border-t-0">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <img
              src={clgLogo}
              alt="College Logo"
              className="w-10 h-10 rounded-full object-cover border border-[#00C2FF]/40 flex-shrink-0"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {adminName}
              </p>

              <p className="text-xs text-gray-400 truncate">
                {adminEmail || "Loading email..."}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium bg-red-500/10 border border-red-400/20 text-red-400 hover:bg-red-500/20 transition-all duration-200 active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}