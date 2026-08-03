
import { useEffect, useState } from "react";
import {
  FaBell,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import collegeLogo from "../assets/gvpce-logo.png";

export default function ClubNavbar() {
  const navigate = useNavigate();

  const [club, setClub] = useState({});
  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // ================= LOAD CLUB + NOTIFICATIONS =================

  useEffect(() => {
    const storedClub = JSON.parse(
      localStorage.getItem("club")
    );

    if (storedClub) {
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
        setNotifications(response.data);
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

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        h-20
        px-3
        sm:px-5
        md:px-8
        flex
        items-center
        justify-between
        border-b
        border-gray-200
        bg-white
        shadow-sm
        z-30
      "
    >

      {/* ===================================================== */}
      {/* LEFT - COLLEGE BRAND */}
      {/* ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          sm:gap-3
          md:gap-4
          pl-0
          md:pl-16
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
            md:w-11
            md:h-11
            rounded-full
            object-cover
            ring-2
            ring-[#43bfc3]/20
            shadow-sm
            flex-shrink-0
          "
        />

        {/* College Name */}

        <div className="min-w-0">

          <h1
            className="
              text-sm
              sm:text-base
              md:text-lg
              font-bold
              bg-gradient-to-r
              from-[#048c92]
              to-[#43bfc3]
              bg-clip-text
              text-transparent
              truncate
            "
          >
            GVPCE (A)
          </h1>

          <p
            className="
              text-[9px]
              sm:text-[10px]
              md:text-[11px]
              font-medium
              text-gray-500
              hidden
              sm:block
              truncate
              max-w-[220px]
              md:max-w-none
            "
          >
            Gayatri Vidya Parishad College of Engineering (Autonomous)
          </p>

        </div>

      </div>


      {/* ===================================================== */}
      {/* RIGHT SECTION */}
      {/* ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          sm:gap-3
          md:gap-5
          flex-shrink-0
        "
      >

        {/* ================================================= */}
        {/* NOTIFICATIONS */}
        {/* ================================================= */}

        <div className="relative">

          <button
            onClick={async () => {
              const opening = !showNotifications;

              setShowNotifications(opening);
              setShowProfile(false);

              if (opening && club._id) {
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

            className="
              relative
              w-9
              h-9
              sm:w-10
              sm:h-10
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

            <FaBell
              className="
                text-[#048c92]
                text-base
                sm:text-lg
              "
            />

            {/* Unread Badge */}

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  min-w-[17px]
                  h-[17px]
                  sm:min-w-[20px]
                  sm:h-[20px]
                  px-1
                  rounded-full
                  bg-red-500
                  text-white
                  text-[9px]
                  sm:text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  shadow-md
                "
              >
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}

          </button>


          {/* ================================================= */}
          {/* NOTIFICATION DROPDOWN */}
          {/* ================================================= */}

          {showNotifications && (
            <div
              className="
                absolute
                right-0
                mt-3

                w-[calc(100vw-24px)]
                max-w-[320px]

                sm:w-80

                rounded-2xl
                shadow-xl
                overflow-hidden
                z-50
                bg-white
                border
                border-gray-200

                animate-in
                fade-in
                slide-in-from-top-3
                duration-200
              "
            >

              {/* Header */}

              <div
                className="
                  p-3
                  sm:p-4
                  font-bold
                  border-b
                  border-gray-100
                  text-[#048c92]
                  tracking-wide
                  text-xs
                  sm:text-sm
                  bg-gray-50
                "
              >
                Notifications
              </div>


              {/* Notification List */}

              <div
                className="
                  max-h-72
                  sm:max-h-80
                  overflow-y-auto
                  divide-y
                  divide-gray-50
                  font-medium
                  text-xs
                  text-gray-600
                  custom-scrollbar
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
                        p-3
                        sm:p-4
                        hover:bg-[#43bfc3]/5
                        cursor-pointer
                        transition
                      "
                    >

                      <p className="leading-relaxed">
                        {item.message}
                      </p>

                      <p
                        className="
                          text-[9px]
                          sm:text-[10px]
                          text-gray-400
                          mt-2
                        "
                      >
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


        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        <div className="relative">

          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}

            className="
              flex
              items-center
              gap-1.5
              sm:gap-2
              md:gap-3
              px-1
              sm:px-2
              md:px-3
              py-1
              sm:py-1.5
              rounded-xl
              sm:rounded-2xl
              border
              border-transparent
              hover:border-gray-200
              hover:bg-gray-50
              shadow-none
              hover:shadow-sm
              transition-all
              duration-300
            "
          >

            {/* Club Logo */}

            <img
              src={
                club.logo ||
                "https://via.placeholder.com/45"
              }
              alt="Club"
              className="
                w-8
                h-8
                sm:w-9
                sm:h-9
                md:w-10
                md:h-10
                rounded-full
                border-2
                border-[#43bfc3]
                shadow-md
                object-cover
                flex-shrink-0
              "
            />


            {/* Club Details */}

            <div
              className="
                text-left
                hidden
                md:block
                max-w-[130px]
              "
            >

              <h2
                className="
                  text-sm
                  font-bold
                  text-gray-800
                  tracking-wide
                  truncate
                "
              >
                {club.name}
              </h2>

              <p
                className="
                  text-[11px]
                  text-gray-500
                  font-medium
                  uppercase
                  tracking-wider
                  truncate
                "
              >
                {club.type}
              </p>

            </div>


            {/* Chevron */}

            <FaChevronDown
              className="
                text-[9px]
                sm:text-xs
                text-gray-400
              "
            />

          </button>


          {/* ================================================= */}
          {/* PROFILE DROPDOWN */}
          {/* ================================================= */}

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
                z-50
                bg-white
                border
                border-gray-200

                animate-in
                fade-in
                slide-in-from-top-3
                duration-200
              "
            >

              <div
                className="
                  p-2
                  space-y-1
                  font-semibold
                  text-sm
                  text-gray-600
                "
              >

                {/* Profile */}

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
                    px-3
                    sm:px-4
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


                {/* Logout */}

                <button
                  onClick={logout}

                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    sm:px-4
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

