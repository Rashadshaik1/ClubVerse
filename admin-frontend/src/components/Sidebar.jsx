import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { jwtDecode } from "jwt-decode";
import clgLogo from "../assets/clglogo.png"; // ✅ ADD THIS (your college logo)

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

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
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

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
    <div className="h-screen w-72 fixed flex flex-col justify-between 
      bg-[#05080f]/90 backdrop-blur-2xl border-r border-white/10 text-white">

      {/* TOP SECTION */}
      <div className="p-5">

        {/* BRAND */}
        <div className="flex items-center gap-3 mb-10">
          <img src={logo} className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-[#00C2FF]">
              ClubVerse
            </h1>
            <p className="text-xs text-gray-500">
              Super Admin Panel
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-2">

          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-xl text-sm transition-all duration-200
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

        {/* CLUB MENU */}
        <div className="mt-8">

          <p className="text-xs text-gray-500 mb-2 px-2">
            CLUB MANAGEMENT
          </p>

          <div className="flex flex-col gap-2">

            {clubMenu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-xl text-sm transition-all duration-200
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

      {/* BOTTOM PROFILE */}
      <div className="p-5">

        <div className="flex items-center gap-3 p-3 rounded-2xl 
          bg-white/5 border border-white/10 backdrop-blur-xl">

          {/* ✅ CHANGED: COLLEGE LOGO */}
          <img
            src={clgLogo}
            alt="College Logo"
            className="w-10 h-10 rounded-full object-cover border border-[#00C2FF]/40"
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

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full mt-3 py-2 rounded-xl text-sm
          bg-red-500/10 border border-red-400/20 text-red-400 
          hover:bg-red-500/20 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}