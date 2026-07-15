import { useState, useRef, useEffect } from "react";

import {
  Bell,
  Home,
  Users,
  Info,
  User,
  ClipboardList
} from "lucide-react";

import logo from "../../assets/logo.png";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

export default function StudentNavbar({ user }) {

  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

const menuRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setOpenMenu(false);
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

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/student-auth");
};

  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/student-home"
    },
    {
      name: "Clubs",
      icon: Users,
      path: "/student-clubs"
    },
{
  name: "My Registrations",
  icon: ClipboardList,
  path: "/student/my-registrations"
},
    {
      name: "About",
      icon: Info,
      path: "/student-about"
    },
    {
      name: "Profile",
      icon: User,
      path: "/student-profile"
    }
  ];

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 border-b border-[#DDD4F2] shadow-sm">

      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <div
          onClick={() => navigate("/student-home")}
          className="flex items-center gap-4 cursor-pointer"
        >

          <img
  src={logo}
  alt="ClubVerse"
  className="w-12 h-12 object-contain"
/>

          <div>

            <h1 className="text-2xl font-bold text-[#4B2E91]">
              ClubVerse
            </h1>

            <p className="text-xs text-gray-500">
              Student Portal
            </p>

          </div>

        </div>

        {/* ================= MENU ================= */}

        <div className="hidden lg:flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-[#DDD4F2] rounded-full px-3 py-2">

          {navItems.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (

              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300

                ${
                  active
                    ? "bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8] text-white shadow-lg"
                    : "text-[#5E4A9C] hover:bg-[#EFEAFF]"
                }`}
              >

                <Icon size={18} />

                <span className="font-medium">

                  {item.name}

                </span>

              </button>

            );

          })}

        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-5">

          {/* Notification */}

          <button
  onClick={() => navigate("/student-notifications")}
  className="relative w-12 h-12 rounded-full bg-white/70 border border-[#DDD4F2]
  hover:scale-105 transition flex items-center justify-center"
>

  <Bell
    size={21}
    className="text-[#6D4BC3]"
  />

  <span
    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center"
  >
    2
  </span>

</button>

{/* Avatar */}

<div className="relative" ref={menuRef}>

  <button
    onClick={() => setOpenMenu(!openMenu)}
    className="flex items-center gap-3 px-2"
  >

    <div
      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8] text-white flex items-center justify-center font-bold text-lg shadow-lg"
    >
      {user?.name
        ? user.name.charAt(0).toUpperCase()
        : <User size={20} />}
    </div>

    <div className="hidden xl:block text-left">

      <h3 className="text-[#4B2E91] font-semibold">
        {user?.name || "Student"}
      </h3>

      <p className="text-xs text-gray-500">
        Welcome 👋
      </p>

    </div>

  </button>

  {openMenu && (

    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl border border-[#DDD4F2] shadow-xl overflow-hidden z-50">

      <button
        onClick={() => {
          setOpenMenu(false);
          navigate("/student-profile");
        }}
        className="w-full text-left px-5 py-3 hover:bg-[#F3F0FF] text-[#4B2E91] font-medium"
      >
        👤 Profile
      </button>

      <button
        onClick={handleLogout}
        className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600 font-medium"
      >
        🚪 Logout
      </button>

    </div>

  )}

</div>
        </div>

      </div>

    </nav>

  );

}