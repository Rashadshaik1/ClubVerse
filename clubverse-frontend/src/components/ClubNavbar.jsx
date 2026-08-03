import { useEffect, useState } from "react";
import {
  FaBell,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import collegeLogo from "../assets/gvpce-logo.png";

export default function ClubNavbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();
  

  const [club, setClub] = useState({});
  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // ================= LOAD CLUB + NOTIFICATIONS =================

  useEffect(() => {
    const storedClub = JSON.parse(
      localStorage.getItem("club") || "{}"
    );

    if (storedClub?._id) {
      setClub(storedClub);
      fetchNotifications(storedClub._id);
    }
  }, []);

  // ================= FETCH NOTIFICATIONS =================

  const fetchNotifications = async (clubId) => {
    try {
      const res = await fetch(
        `https://clubverse-nsgq.onrender.com/api/notifications/${clubId}`
      );

      const response = await res.json();

      if (response.success) {
        setNotifications(response.data || []);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.log(
        "Notification fetch error:",
        error
      );
    }
  };

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("club");

    navigate("/club-login");
  };

  // ================= MENU =================

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);

    // Close other dropdowns
    setShowNotifications(false);
    setShowProfile(false);
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        h-16
        sm:h-18
        lg:h-20
        px-3
        sm:px-5
        lg:px-8
        flex
        items-center
        justify-between
        bg-white
        border-b
        border-gray-200
        shadow-sm
        z-50
      "
    >
      {/* =====================================================
          LEFT SECTION
      ===================================================== */}

      <div className="flex items-center min-w-0">

        {/* ================= MENU BUTTON ================= */}

        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="
            shrink-0
            w-10
            h-10
            sm:w-11
            sm:h-11
            flex
            items-center
            justify-center
            rounded-xl
            sm:rounded-2xl
            bg-gray-50
            border
            border-gray-200
            text-[#048c92]
            hover:bg-[#eafcff]
            hover:border-[#43bfc3]/30
            active:scale-95
            transition-all
            duration-300
            shadow-sm
          "
        >
          {sidebarOpen ? (
            <FaTimes className="text-lg sm:text-xl" />
          ) : (
            <FaBars className="text-lg sm:text-xl" />
          )}
        </button>

        {/* ================= COLLEGE BRAND ================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            lg:gap-4
            ml-2
            sm:ml-3
            lg:ml-4
            min-w-0
          "
        >

          {/* College Logo */}

          <img
            src={collegeLogo}
            alt="College Logo"
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              lg:w-11
              lg:h-11
              rounded-full
              object-cover
              ring-2
              ring-[#43bfc3]/20
              shadow-sm
              shrink-0
            "
          />

          {/* ================= DESKTOP BRAND ================= */}

          <div className="hidden lg:block min-w-0">

            <h1
              className="
                text-lg
                font-bold
                leading-tight
                bg-gradient-to-r
                from-[#048c92]
                to-[#43bfc3]
                bg-clip-text
                text-transparent
              "
            >
              GVPCE (A)
            </h1>

            <p
              className="
                text-[10px]
                xl:text-[11px]
                font-medium
                text-gray-500
                whitespace-nowrap
                leading-tight
                mt-0.5
              "
            >
              Gayatri Vidya Parishad College of Engineering
              (Autonomous)
            </p>

          </div>

          {/* ================= TABLET BRAND ================= */}

          <h1
            className="
              hidden
              sm:block
              lg:hidden
              text-base
              sm:text-lg
              font-bold
              bg-gradient-to-r
              from-[#048c92]
              to-[#43bfc3]
              bg-clip-text
              text-transparent
              whitespace-nowrap
            "
          >
            GVPCE (A)
          </h1>

          {/* ================= MOBILE ================= */}

          {/* 
             Mobile intentionally has only logo.
             No GVPCE text.
          */}

        </div>
      </div>

      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          sm:gap-3
          lg:gap-5
          shrink-0
        "
      >

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div className="relative">

          <button
            onClick={async () => {
              const opening = !showNotifications;

              setShowNotifications(opening);
              setShowProfile(false);

              if (opening && club?._id) {
                try {
                  await fetch(
                    `https://clubverse-nsgq.onrender.com/api/notifications/read/${club._id}`,
                    {
                      method: "PUT",
                    }
                  );

                  setNotifications((prev) =>
                    prev.map((item) => ({
                      ...item,
                      isRead: true,
                    }))
                  );
                } catch (error) {
                  console.log(
                    "Read notification error:",
                    error
                  );
                }
              }
            }}
            aria-label="Notifications"
            className="
              relative
              w-10
              h-10
              sm:w-11
              sm:h-11
              rounded-xl
              sm:rounded-2xl
              flex
              items-center
              justify-center
              bg-gray-50
              border
              border-gray-200
              hover:bg-[#eafcff]
              active:scale-95
              shadow-sm
              transition-all
              duration-300
            "
          >
            <FaBell className="text-[#048c92] text-base sm:text-lg" />

            {notifications.filter(
              (item) => !item.isRead
            ).length > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  min-w-4
                  h-4
                  sm:min-w-5
                  sm:h-5
                  px-1
                  rounded-full
                  bg-red-500
                  text-white
                  text-[8px]
                  sm:text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  shadow-md
                "
              >
                {
                  notifications.filter(
                    (item) => !item.isRead
                  ).length
                }
              </span>
            )}
          </button>

          {/* ================= NOTIFICATION DROPDOWN ================= */}

          {showNotifications && (
            <div
              className="
                fixed
                sm:absolute
                right-2
                sm:right-0
                top-[68px]
                sm:top-auto
                sm:mt-3
                w-[calc(100vw-16px)]
                sm:w-80
                max-w-sm
                rounded-2xl
                shadow-xl
                overflow-hidden
                z-[70]
                bg-white
                border
                border-gray-200
              "
            >

              <div
                className="
                  p-4
                  font-bold
                  border-b
                  border-gray-100
                  text-[#048c92]
                  tracking-wide
                  text-sm
                  bg-gray-50
                "
              >
                Notifications
              </div>

              <div
                className="
                  max-h-80
                  overflow-y-auto
                  divide-y
                  divide-gray-50
                  font-medium
                  text-xs
                  text-gray-600
                "
              >

                {notifications.length === 0 ? (
                  <div className="p-5 text-center text-gray-400">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className="
                        p-4
                        hover:bg-[#43bfc3]/5
                        cursor-pointer
                        transition
                      "
                    >
                      <p>{item.message}</p>

                      <p className="text-[10px] text-gray-400 mt-2">
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}

              </div>
            </div>
          )}
        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="relative">

          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="
              flex
              items-center
              gap-2
              sm:gap-3
              px-1
              sm:px-2
              lg:px-3
              py-1.5
              rounded-2xl
              border
              border-transparent
              hover:border-gray-200
              hover:bg-gray-50
              transition-all
              duration-300
            "
          >

            <img
              src={
                club.logo ||
                "https://via.placeholder.com/45"
              }
              alt="Club"
              className="
                w-9
                h-9
                sm:w-10
                sm:h-10
                rounded-full
                border-2
                border-[#43bfc3]
                shadow-md
                object-cover
              "
            />

            {/* Club details hidden on mobile */}

            <div className="text-left hidden sm:block max-w-[140px] lg:max-w-none">

              <h2
                className="
                  text-xs
                  lg:text-sm
                  font-bold
                  text-gray-800
                  tracking-wide
                  truncate
                "
              >
                {club.name || "Club"}
              </h2>

              <p
                className="
                  text-[9px]
                  lg:text-[11px]
                  text-gray-500
                  font-medium
                  uppercase
                  tracking-wider
                  truncate
                "
              >
                {club.type || "Club"}
              </p>

            </div>

            <FaChevronDown
              className="
                hidden
                sm:block
                text-[10px]
                sm:text-xs
                text-gray-400
              "
            />

          </button>

          {/* ================= PROFILE DROPDOWN ================= */}

          {showProfile && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-52
                sm:w-56
                rounded-2xl
                shadow-xl
                overflow-hidden
                z-[70]
                bg-white
                border
                border-gray-200
              "
            >

              <div className="p-2 space-y-1 font-semibold text-sm text-gray-600">

                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/profile");
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-[#43bfc3]/10
                    hover:text-[#048c92]
                    transition
                  "
                >
                  <FaUser className="text-xs opacity-80" />
                  Profile
                </button>

                <div className="border-t border-gray-100 my-1" />

                <button
                  onClick={logout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-red-600
                    hover:bg-red-50
                    font-bold
                    transition
                  "
                >
                  <FaSignOutAlt className="text-xs" />
                  Logout
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}