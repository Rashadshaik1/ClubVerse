import { Bell, User, Home, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentNavbar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* Left */}
        <div
          onClick={() => navigate("/student-home")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/favicon.svg"
            alt="ClubVerse"
            className="w-10 h-10"
          />

          <div>
            <h1 className="text-xl font-bold text-blue-600">
              ClubVerse
            </h1>

            <p className="text-xs text-gray-500">
              Student Portal
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center gap-8">

          <button
            onClick={() => navigate("/student-home")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <Home size={20} />
            Home
          </button>

          <button
            onClick={() => navigate("/clubs")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <Users size={20} />
            Clubs
          </button>

        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          <button className="relative">
            <Bell
              size={23}
              className="text-gray-700 hover:text-blue-600 transition"
            />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>

          <button
            onClick={() => navigate("/student-profile")}
            className="w-10 h-10 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center hover:bg-blue-700 transition"
          >
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : <User size={18} />}
          </button>

        </div>

      </div>
    </nav>
  );
}