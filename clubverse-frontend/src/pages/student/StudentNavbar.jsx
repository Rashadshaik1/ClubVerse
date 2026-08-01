
import { useState, useRef, useEffect } from "react";
import gvpceLogo from "../../assets/gvpce-logo.png";
import logo from "../../assets/logo.png";
import axios from "axios";

import {
  Bell,
  Home,
  Users,
  Info,
  User,
  ClipboardList,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function StudentNavbar({ user }) {

  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ================= NAV ITEMS =================

  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/student-home",
    },
    {
      name: "Clubs",
      icon: Users,
      path: "/student-clubs",
    },
    {
      name: "My Registrations",
      icon: ClipboardList,
      path: "/student/my-registrations",
    },
    {
      name: "About",
      icon: Info,
      path: "/student-about",
    },
    {
      name: "Profile",
      icon: User,
      path: "/student-profile",
    },
  ];

  // ================= NOTIFICATIONS =================

  useEffect(() => {

    const fetchNotificationCount = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://clubverse-nsgq.onrender.com/api/student-notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const unread =
          res.data.data?.filter(
            (item) => !item.isRead
          ) || [];

        setNotificationCount(unread.length);

      } catch (err) {

        console.log("NOTIFICATION ERROR:", err);

      }

    };

    fetchNotificationCount();

  }, []);

  // ================= CLOSE MENUS ON OUTSIDE CLICK =================

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // ================= CLOSE MOBILE MENU ON ROUTE CHANGE =================

  useEffect(() => {

    setMobileMenuOpen(false);
    setOpenMenu(false);

  }, [location.pathname]);

  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/student-auth");

  };

  // ================= NAVIGATION =================

  const handleNavigation = (path) => {

    navigate(path);

    setMobileMenuOpen(false);
    setOpenMenu(false);

  };

  // ================= ACTIVE ROUTE =================

  const isActive = (path) => {

    return location.pathname.startsWith(path);

  };

  return (

    <nav
      className="
        sticky
        top-0
        z-50
        w-full
        backdrop-blur-2xl
        bg-white/80
        border-b
        border-[#DDD4F2]
        shadow-sm
      "
    >

      {/* ================= MAIN NAVBAR ================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          h-[72px]
          sm:h-20
          px-4
          sm:px-6
          lg:px-8
          flex
          items-center
          justify-between
          gap-3
        "
      >

        {/* ================= LOGO ================= */}

        <div
          onClick={() =>
            handleNavigation("/student-home")
          }
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            cursor-pointer
            min-w-0
            shrink-0
          "
        >

          <img
            src={logo}
            alt="ClubVerse"
            className="
              w-10
              h-10
              sm:w-12
              sm:h-12
              object-contain
              shrink-0
            "
          />

          <div className="min-w-0">

            <h1
              className="
                text-lg
                sm:text-xl
                lg:text-2xl
                font-bold
                text-[#7966AD]
                leading-tight
              "
            >
              ClubVerse
            </h1>

            <p
              className="
                hidden
                sm:block
                text-[10px]
                sm:text-xs
                text-gray-500
                leading-tight
              "
            >
              Student Portal
            </p>

          </div>

        </div>

        {/* ================= DESKTOP MENU ================= */}

        <div
          className="
            hidden
            xl:flex
            items-center
            gap-1
            bg-white/60
            backdrop-blur-xl
            border
            border-[#DDD4F2]
            rounded-full
            px-2
            py-2
            shadow-sm
          "
        >

          {navItems.map((item) => {

            const Icon = item.icon;

            const active = isActive(item.path);

            return (

              <button
                key={item.name}
                onClick={() =>
                  handleNavigation(item.path)
                }
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  xl:px-5
                  py-2
                  rounded-full
                  transition-all
                  duration-300
                  whitespace-nowrap
                  ${
                    active
                      ? "bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8] text-white shadow-lg"
                      : "text-[#5E4A9C] hover:bg-[#EFEAFF]"
                  }
                `}
              >

                <Icon size={17} />

                <span className="font-medium text-sm">
                  {item.name}
                </span>

              </button>

            );

          })}

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            lg:gap-4
            shrink-0
          "
        >

          {/* ================= COLLEGE LOGO ================= */}

          <div
            className="
              hidden
              md:flex
              w-10
              h-10
              lg:w-12
              lg:h-12
              rounded-full
              bg-white/70
              border
              border-[#DDD4F2]
              shadow-sm
              items-center
              justify-center
              shrink-0
            "
          >

            <img
              src={gvpceLogo}
              alt="GVPCE Logo"
              className="
                w-7
                h-7
                lg:w-9
                lg:h-9
                object-contain
              "
            />

          </div>

          {/* ================= NOTIFICATION ================= */}

          <button
            onClick={() =>
              handleNavigation(
                "/student-notifications"
              )
            }
            aria-label="Notifications"
            className="
              relative
              w-10
              h-10
              sm:w-11
              sm:h-11
              lg:w-12
              lg:h-12
              rounded-full
              bg-white/70
              border
              border-[#DDD4F2]
              hover:bg-[#F3F0FF]
              hover:scale-105
              transition-all
              flex
              items-center
              justify-center
              shrink-0
            "
          >

            <Bell
              size={19}
              className="text-[#6D4BC3] sm:w-[21px] sm:h-[21px]"
            />

            {notificationCount > 0 && (

              <span
                className="
                  absolute
                  -top-0.5
                  -right-0.5
                  min-w-[18px]
                  h-[18px]
                  px-1
                  rounded-full
                  bg-red-500
                  text-white
                  text-[9px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  border-2
                  border-white
                "
              >
                {notificationCount > 99
                  ? "99+"
                  : notificationCount}
              </span>

            )}

          </button>

          {/* ================= DESKTOP AVATAR ================= */}

          <div
            className="
              relative
              hidden
              lg:block
            "
            ref={menuRef}
          >

            <button
              onClick={() =>
                setOpenMenu(!openMenu)
              }
              className="
                flex
                items-center
                gap-2
                xl:gap-3
                px-1
                xl:px-2
              "
              aria-label="Profile menu"
            >

              <div
                className="
                  w-10
                  h-10
                  xl:w-12
                  xl:h-12
                  rounded-full
                  bg-gradient-to-r
                  from-[#6D4BC3]
                  to-[#8D76D8]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-base
                  xl:text-lg
                  shadow-lg
                  shrink-0
                "
              >

                {user?.name
                  ? user.name
                      .charAt(0)
                      .toUpperCase()
                  : <User size={20} />}

              </div>

              <div
                className="
                  hidden
                  xl:block
                  text-left
                  max-w-[130px]
                "
              >

                <h3
                  className="
                    text-[#4B2E91]
                    font-semibold
                    truncate
                  "
                >
                  {user?.name || "Student"}
                </h3>

                <p className="text-xs text-gray-500">
                  Welcome 👋
                </p>

              </div>

            </button>

            {/* DESKTOP PROFILE DROPDOWN */}

            {openMenu && (

              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-3
                  w-52
                  bg-white
                  rounded-2xl
                  border
                  border-[#DDD4F2]
                  shadow-2xl
                  overflow-hidden
                  z-[100]
                  animate-in
                  fade-in
                  slide-in-from-top-2
                  duration-200
                "
              >

                <div
                  className="
                    px-5
                    py-4
                    border-b
                    border-[#EEEAF8]
                    bg-[#FAF9FF]
                  "
                >

                  <p className="text-xs text-gray-500">
                    Signed in as
                  </p>

                  <p
                    className="
                      font-semibold
                      text-[#4B2E91]
                      truncate
                      mt-1
                    "
                  >
                    {user?.name || "Student"}
                  </p>

                </div>

                <button
                  onClick={() =>
                    handleNavigation(
                      "/student-profile"
                    )
                  }
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    text-left
                    px-5
                    py-3
                    hover:bg-[#F3F0FF]
                    text-[#4B2E91]
                    font-medium
                    transition
                  "
                >

                  <User size={18} />

                  Profile

                </button>

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    text-left
                    px-5
                    py-3
                    hover:bg-red-50
                    text-red-600
                    font-medium
                    transition
                  "
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            )}

          </div>

          {/* ================= MOBILE / TABLET MENU BUTTON ================= */}

          <div
            className="
              relative
              lg:hidden
            "
            ref={mobileMenuRef}
          >

            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              aria-label="Open navigation menu"
              className="
                w-10
                h-10
                sm:w-11
                sm:h-11
                rounded-full
                bg-white/70
                border
                border-[#DDD4F2]
                hover:bg-[#F3F0FF]
                transition
                flex
                items-center
                justify-center
                text-[#6D4BC3]
              "
            >

              {mobileMenuOpen
                ? <X size={21} />
                : <Menu size={21} />}

            </button>

            {/* ================= MOBILE MENU ================= */}

            {mobileMenuOpen && (

              <div
                className="
                  fixed
                  left-3
                  right-3
                  sm:left-auto
                  sm:right-4
                  top-[76px]
                  sm:top-[84px]
                  sm:w-[340px]
                  bg-white/95
                  backdrop-blur-2xl
                  border
                  border-[#DDD4F2]
                  rounded-3xl
                  shadow-2xl
                  overflow-hidden
                  z-[100]
                "
              >

                {/* USER HEADER */}

                <div
                  className="
                    p-5
                    bg-gradient-to-r
                    from-[#F5F1FF]
                    to-[#F9F7FF]
                    border-b
                    border-[#E8E2F5]
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-gradient-to-r
                        from-[#6D4BC3]
                        to-[#8D76D8]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-lg
                        shadow-md
                        shrink-0
                      "
                    >

                      {user?.name
                        ? user.name
                            .charAt(0)
                            .toUpperCase()
                        : <User size={20} />}

                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-gray-500">
                        Welcome 👋
                      </p>

                      <p
                        className="
                          font-bold
                          text-[#4B2E91]
                          truncate
                        "
                      >
                        {user?.name || "Student"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* NAVIGATION */}

                <div className="p-3">

                  {navItems.map((item) => {

                    const Icon = item.icon;

                    const active =
                      isActive(item.path);

                    return (

                      <button
                        key={item.name}
                        onClick={() =>
                          handleNavigation(
                            item.path
                          )
                        }
                        className={`
                          w-full
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3.5
                          rounded-2xl
                          mb-1
                          transition-all
                          duration-200
                          ${
                            active
                              ? "bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8] text-white shadow-md"
                              : "text-[#5E4A9C] hover:bg-[#F3F0FF]"
                          }
                        `}
                      >

                        <Icon size={19} />

                        <span className="font-medium">
                          {item.name}
                        </span>

                      </button>

                    );

                  })}

                  {/* NOTIFICATIONS */}

                  <button
                    onClick={() =>
                      handleNavigation(
                        "/student-notifications"
                      )
                    }
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3.5
                      rounded-2xl
                      text-[#5E4A9C]
                      hover:bg-[#F3F0FF]
                      transition
                    "
                  >

                    <div className="flex items-center gap-3">

                      <Bell size={19} />

                      <span className="font-medium">
                        Notifications
                      </span>

                    </div>

                    {notificationCount > 0 && (

                      <span
                        className="
                          min-w-[22px]
                          h-[22px]
                          px-1
                          rounded-full
                          bg-red-500
                          text-white
                          text-[10px]
                          font-bold
                          flex
                          items-center
                          justify-center
                        "
                      >
                        {notificationCount > 99
                          ? "99+"
                          : notificationCount}
                      </span>

                    )}

                  </button>

                  {/* DIVIDER */}

                  <div className="my-2 border-t border-[#EEEAF8]" />

                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3.5
                      rounded-2xl
                      text-red-600
                      hover:bg-red-50
                      transition
                      font-medium
                    "
                  >

                    <LogOut size={19} />

                    Logout

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </nav>

  );

}

