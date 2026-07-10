import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar"; // Adjust path as per your file tree

export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Categories based on your requirement
  const categories = ["All", "Technical", "Cultural", "Social"];

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      // Hitting your backend clubController route
      const res = await axios.get("http://localhost:5000/api/clubs");
      
      // Assuming res.data returns an array of clubs directly
      const clubData = (res.data || []).map((club) => ({
  ...club,
  category: club.type,
}));

setClubs(clubData);
setFilteredClubs(clubData);
    } catch (err) {
      console.error("Error fetching clubs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle filtering when a user clicks a category pill
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredClubs(clubs);
    } else {
      const filtered = clubs.filter(
  (club) => club.type?.toLowerCase() === category.toLowerCase()
);
      setFilteredClubs(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">
      <StudentNavbar />

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-[#4B2E91]">🏛️ Explore Clubs</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Discover and join communities that match your passion, skills, and goals.
          </p>
        </div>

        {/* ================= CATEGORY SELECTION PILLS ================= */}
        <div className="flex justify-center items-center space-x-4 mb-12 overflow-x-auto py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-sm whitespace-nowrap text-sm ${
                selectedCategory === category
                  ? "bg-[#6D4BC3] text-white shadow-purple-200 shadow-md scale-105"
                  : "bg-white/80 hover:bg-white text-gray-600 border border-purple-100/50"
              }`}
            >
              {category === "All" ? "🌐 All Categories" : category}
            </button>
          ))}
        </div>

        {/* ================= CLUBS GRID ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6D4BC3]"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClubs.length ? (
              filteredClubs.map((club) => (
                <div
                  key={club._id}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-purple-50/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      {/* Badge showing category */}
                      <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${
                        club.type?.toLowerCase() === "technical" ? "bg-blue-100 text-blue-700" :
                        club.type?.toLowerCase() === "cultural" ? "bg-pink-100 text-pink-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {club.type
  ? club.type.charAt(0).toUpperCase() + club.type.slice(1)
  : "General"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 line-clamp-1">
                      {club.name}
                    </h3>
                    
                    <p className="text-slate-500 mt-2 text-sm line-clamp-3">
                      {club.description || "No description provided for this club yet."}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      👤 Lead: <span className="text-slate-600 font-medium">{club.lead || "N/A"}</span>
                    </div>
                    
                    <button className="px-5 py-2 rounded-2xl bg-[#6D4BC3] hover:bg-[#5B3CA7] text-white font-semibold shadow-sm transition-colors text-sm">
                      View Club
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg p-16 text-center">
                <h2 className="text-2xl font-bold text-[#6D4BC3]">
                  No Clubs Found
                </h2>
                <p className="text-gray-500 mt-3">
                  There are no clubs registered under the "{selectedCategory}" category right now.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}