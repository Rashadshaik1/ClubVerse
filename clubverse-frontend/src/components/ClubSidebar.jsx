
import React, { useState } from "react";
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
  FaBars,
  FaTimes
} from "react-icons/fa";

import collegeLogo from "../assets/logoclub.png";

export default function ClubSidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
      name: "Gallery",
      path: "/gallery",
      icon: <FaImages />
    },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("club");
    window.location.href = "/club-login";
  };

  return (
    <>
      {/* =====================================================
          MOBILE / TABLET MENU BUTTON
          ===================================================== */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        className="
          fixed
          top-[5.25rem]
          left-3
          sm:left-5
          z-[60]

          w-11
          h-11
          sm:w-12
          sm:h-12

          flex
          items-center
          justify-center

          bg-white
          border
          border-[#cceeee]

          text-[#048c92]

          rounded-xl
          sm:rounded-2xl

          shadow-md
          hover:shadow-lg
          hover:bg-[#eafcff]

          active:scale-95

          transition-all
          duration-300
        "
      >
        {isOpen ? (
          <FaTimes className="text-lg sm:text-xl" />
        ) : (
          <FaBars className="text-lg sm:text-xl" />
        )}
      </button>


      {/* =====================================================
          BACKDROP
          ===================================================== */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed
            inset-0
            bg-black/20
            z-[45]
          "
        />
      )}


      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-20
          h-[calc(100vh-5rem)]

          w-[280px]
          sm:w-72

          bg-white

          border-r
          border-gray-200

          flex
          flex-col

          shadow-xl

          z-[50]

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

        {/* =================================================
            LOGO AREA
            ================================================= */}

        <div
          className="
            px-5
            sm:px-6
            py-5
            sm:py-6

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

                rounded-xl
                sm:rounded-2xl

                object-cover

                ring-2
                ring-[#43bfc3]/20

                shadow-sm

                flex-shrink-0
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

                  truncate
                "
              >
                ClubVerse
              </h1>

              <p
                className="
                  text-[9px]
                  sm:text-[10px]

                  font-medium

                  text-gray-400

                  tracking-wider
                  uppercase

                  truncate
                "
              >
                Management Portal
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            NAVIGATION
            ================================================= */}

        <nav
          className="
            flex-1

            px-4
            sm:px-5

            py-4
            sm:py-5

            space-y-2

            overflow-y-auto

            custom-scrollbar
          "
        >

          {menu.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}

              onClick={() => setIsOpen(false)}

              className={({ isActive }) =>
                `
                  group

                  flex
                  items-center

                  gap-3
                  sm:gap-4

                  px-4
                  sm:px-5

                  py-3
                  sm:py-3.5

                  rounded-xl
                  sm:rounded-2xl

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

                        translate-x-0.5
                      `
                      : `
                        text-gray-600

                        border-transparent

                        hover:bg-[#eafcff]

                        hover:text-[#048c92]

                        hover:translate-x-1
                      `
                  }
                `
              }
            >

              <span
                className="
                  text-base
                  sm:text-lg

                  opacity-90

                  flex-shrink-0

                  transition-transform
                  duration-300

                  group-hover:scale-110
                "
              >
                {item.icon}
              </span>

              <span className="truncate">
                {item.name}
              </span>

            </NavLink>

          ))}

        </nav>


        {/* =================================================
            LOGOUT
            ================================================= */}

        <div
          className="
            px-4
            sm:px-5

            py-4
            sm:py-5

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

              gap-2
              sm:gap-3

              py-3
              sm:py-3.5

              rounded-xl
              sm:rounded-2xl

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

            <FaSignOutAlt className="text-sm sm:text-base" />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}

