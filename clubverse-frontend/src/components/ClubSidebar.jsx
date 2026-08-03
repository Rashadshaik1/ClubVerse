import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaCalendarPlus,
  FaClipboardList,
  FaUsers,
  FaUserCircle,
  FaImages,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import collegeLogo from "../assets/logoclub.png";

export default function ClubSidebar({
  isOpen,
  setIsOpen,
}) {
  const menu = [
    {
      name: "Dashboard",
      path: "/club-dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Create Event",
      path: "/create-event",
      icon: <FaCalendarPlus />,
    },
    {
      name: "Manage Events",
      path: "/manage-events",
      icon: <FaClipboardList />,
    },
    {
      name: "Members",
      path: "/members",
      icon: <FaUsers />,
    },
    {
      name: "Gallery",
      path: "/gallery",
      icon: <FaImages />,
    },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("club");

    window.location.href = "/club-login";
  };

  return (
    <>
      {/* ================= BACKDROP ================= */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed
            inset-0
            bg-black/20
            z-40
            transition-opacity
            duration-300
          "
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          h-screen
          w-[280px]
          sm:w-72
          bg-white
          border-r
          border-gray-200
          flex
          flex-col
          shadow-xl
          z-[45]
          transform
          transition-transform
          duration-300
          ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* ================= LOGO AREA ================= */}

        <div
          className="
            p-5
            sm:p-6
            pt-20
            sm:pt-20
            border-b
            border-gray-100
            bg-gray-50
          "
        >

          <div className="flex items-center gap-3 sm:gap-4">

            <img
              src={collegeLogo}
              alt="ClubVerse Logo"
              className="
                w-11
                h-11
                sm:w-12
                sm:h-12
                rounded-2xl
                object-cover
                ring-2
                ring-[#43bfc3]/20
                shadow-sm
                shrink-0
              "
            />

            <div className="min-w-0">

              <h1
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  bg-gradient-to-r
                  from-[#048c92]
                  to-[#43bfc3]
                  bg-clip-text
                  text-transparent
                "
              >
                ClubVerse
              </h1>

              <p
                className="
                  text-[10px]
                  sm:text-[11px]
                  font-medium
                  text-gray-400
                  tracking-wider
                  uppercase
                "
              >
                Management Portal
              </p>

            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}

        <div
          className="
            flex-1
            p-4
            sm:p-5
            space-y-2
            overflow-y-auto
          "
        >

          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                px-4
                sm:px-5
                py-3
                sm:py-3.5
                rounded-2xl
                font-semibold
                text-sm
                transition-all
                duration-300
                border

                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-[#048c92]
                      to-[#43bfc3]
                      text-white
                      border-transparent
                      shadow-md
                      scale-[1.01]
                    `
                    : `
                      text-gray-600
                      border-transparent
                      hover:bg-[#eafcff]
                      hover:text-[#048c92]
                    `
                }
              `
              }
            >
              <span className="text-lg opacity-90">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}

        </div>

        {/* ================= LOGOUT ================= */}

        <div
          className="
            p-4
            sm:p-5
            border-t
            border-gray-100
            bg-gray-50
          "
        >

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              py-3
              sm:py-3.5
              rounded-2xl
              bg-red-50
              text-red-600
              font-bold
              text-sm
              border
              border-red-100
              hover:bg-red-600
              hover:text-white
              hover:border-transparent
              active:scale-95
              transition-all
              duration-300
            "
          >
            <FaSignOutAlt className="text-base" />
            Logout
          </button>

        </div>
      </aside>
    </>
  );
}