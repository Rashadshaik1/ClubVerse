import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function ClubTypePage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await fetch(
          "https://clubverse-nsgq.onrender.com/api/admin/clubs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        const filtered = (data.data || []).filter(
          (club) => club.type?.toLowerCase() === type?.toLowerCase()
        );

        setClubs(filtered);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchClubs();
  }, [type]);

  // ================= LOADER =================
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-[#05080f] text-white overflow-x-hidden">
      <Sidebar />

      <div className="lg:ml-72 w-full pt-20 sm:pt-20 lg:pt-10 p-4 sm:p-6 md:p-10 min-w-0">
        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00C2FF] capitalize">
            {type} Clubs
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Explore all {type} clubs in your campus ecosystem
          </p>
        </div>

        {/* EMPTY STATE (PREMIUM CARD) */}
        {!loading && clubs.length === 0 && (
          <div className="flex justify-center mt-12 sm:mt-20">
            <div className="p-8 sm:p-10 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-xl shadow-glow max-w-sm sm:max-w-md w-full">
              <h2 className="text-base sm:text-lg font-semibold text-gray-300">
                No Clubs Found
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                Try exploring another category
              </p>
            </div>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {clubs.map((club) => (
            <div
              key={club._id}
              onClick={() => navigate(`/club/${club._id}`)}
              className="group cursor-pointer p-5 sm:p-6 rounded-2xl 
              bg-white/5 border border-white/10 backdrop-blur-xl
              hover:scale-[1.03] hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* LOGO */}
                <div className="flex justify-center mb-4">
                  <img
                    src={club.logo || "https://via.placeholder.com/80"}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#00C2FF]/40 
                    group-hover:shadow-glow transition object-cover"
                    alt={club.name}
                  />
                </div>

                {/* NAME */}
                <h2 className="text-center text-base sm:text-lg font-semibold group-hover:text-[#00C2FF] transition truncate">
                  {club.name}
                </h2>

                {/* EMAIL */}
                <p className="text-center text-xs text-gray-400 truncate mt-1">
                  {club.email}
                </p>
              </div>

              {/* TYPE BADGE */}
              <div className="mt-4 flex justify-center">
                <span
                  className="text-xs px-3 py-1 rounded-full 
                bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/30 capitalize"
                >
                  {club.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}