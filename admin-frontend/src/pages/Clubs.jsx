import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaLaptopCode, FaMusic } from "react-icons/fa";

export default function Clubs() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Social Clubs",
      type: "social",
      icon: <FaUsers size={26} />,
      color: "from-pink-500/20 to-pink-500/5 border-pink-400/20",
      glow: "shadow-pink-500/20"
    },
    {
      name: "Technical Clubs",
      type: "technical",
      icon: <FaLaptopCode size={26} />,
      color: "from-cyan-500/20 to-cyan-500/5 border-cyan-400/20",
      glow: "shadow-cyan-500/20"
    },
    {
      name: "Cultural Clubs",
      type: "cultural",
      icon: <FaMusic size={26} />,
      color: "from-purple-500/20 to-purple-500/5 border-purple-400/20",
      glow: "shadow-purple-500/20"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#05080f] text-white">

      <Sidebar />

      <div className="ml-72 w-full p-10">

        {/* HEADER */}
        <div className="mb-14">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00C2FF] to-blue-500 bg-clip-text text-transparent">
            Club Categories
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Organize and explore clubs by category
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {categories.map((cat) => (
            <div
              key={cat.type}
              onClick={() => navigate(`/clubs/${cat.type}`)}
              className={`
                relative cursor-pointer p-8 rounded-3xl
                border backdrop-blur-2xl
                bg-gradient-to-b ${cat.color}
                transition-all duration-300
                hover:scale-[1.06] hover:-translate-y-2
                hover:shadow-glow
                overflow-hidden
              `}
            >

              {/* LIGHT SHINE EFFECT */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-2xl rotate-45"></div>
              </div>

              {/* ICON */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                  <div className="text-[#00C2FF]">
                    {cat.icon}
                  </div>
                </div>
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-semibold text-center">
                {cat.name}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-center text-gray-400 text-sm mt-3 leading-relaxed">
                Browse and manage all {cat.name.toLowerCase()} with members, events, and analytics
              </p>

              {/* CTA BUTTON */}
              <div className="mt-7 flex justify-center">
                <button className="
                  px-5 py-2 text-sm rounded-xl
                  bg-white/5 border border-white/10
                  hover:bg-[#00C2FF]/10 hover:border-[#00C2FF]/30
                  hover:text-[#00C2FF]
                  transition
                ">
                  Open Category →
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}