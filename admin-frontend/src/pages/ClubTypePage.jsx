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
        const res = await fetch("http://127.0.0.1:5000/api/admin/clubs", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

        const data = await res.json();

        const filtered = (data.data || []).filter(
  (club) =>
    club.type?.toLowerCase() === type?.toLowerCase()
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
    <div className="flex min-h-screen bg-[#05080f] text-white">

      <Sidebar />

      <div className="ml-72 w-full p-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#00C2FF] capitalize">
            {type} Clubs
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Explore all {type} clubs in your campus ecosystem
          </p>
        </div>

        {/* EMPTY STATE (PREMIUM CARD) */}
        {!loading && clubs.length === 0 && (
          <div className="flex justify-center mt-20">
            <div className="p-10 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-xl shadow-glow">
              <h2 className="text-lg font-semibold text-gray-300">
                No Clubs Found
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Try exploring another category
              </p>
            </div>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {clubs.map((club) => (
            <div
              key={club._id}
              onClick={() => navigate(`/club/${club._id}`)}
              className="group cursor-pointer p-6 rounded-2xl 
              bg-white/5 border border-white/10 backdrop-blur-xl
              hover:scale-[1.03] hover:shadow-glow transition-all duration-300"
            >

              {/* LOGO */}
              <div className="flex justify-center mb-4">
                <img
                  src={club.logo || "https://via.placeholder.com/80"}
                  className="w-20 h-20 rounded-full border border-[#00C2FF]/40 
                  group-hover:shadow-glow transition"
                />
              </div>

              {/* NAME */}
              <h2 className="text-center text-lg font-semibold group-hover:text-[#00C2FF] transition">
                {club.name}
              </h2>

              {/* EMAIL */}
              <p className="text-center text-xs text-gray-400">
                {club.email}
              </p>

              {/* TYPE BADGE */}
              <div className="mt-4 flex justify-center">
                <span className="text-xs px-3 py-1 rounded-full 
                bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/30">
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