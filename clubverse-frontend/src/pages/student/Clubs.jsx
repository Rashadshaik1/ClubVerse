import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "./StudentNavbar"; // Adjust path as per your file tree
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ClubSkeletonCard() {
  return (
    <div className="
      bg-white/80
      backdrop-blur-xl
      rounded-3xl
      p-6
      border
      border-purple-50/50
      shadow-md
    ">

      {/* Logo + Category */}

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <Skeleton
            circle
            width={56}
            height={56}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          <Skeleton
            width={90}
            height={24}
            borderRadius={20}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

        </div>

      </div>


      {/* Club Name */}

      <Skeleton
        height={24}
        width="65%"
        borderRadius={8}
        baseColor="#ECE8F8"
        highlightColor="#F8F7FC"
      />


      {/* Description */}

      <div className="mt-3">

        <Skeleton
          count={3}
          height={16}
          baseColor="#ECE8F8"
          highlightColor="#F8F7FC"
        />

      </div>


      {/* Bottom */}

      <div className="
        mt-8
        pt-4
        border-t
        border-slate-100
        flex
        items-center
        justify-between
        gap-3
      ">

        <Skeleton
          width={110}
          height={18}
          borderRadius={8}
          baseColor="#ECE8F8"
          highlightColor="#F8F7FC"
        />

        <Skeleton
          width={95}
          height={40}
          borderRadius={16}
          baseColor="#ECE8F8"
          highlightColor="#F8F7FC"
        />

      </div>

    </div>
  );
}
export default function ClubsPage() {
  const navigate = useNavigate();
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
      const res = await axios.get("https://clubverse-nsgq.onrender.com/api/clubs");
      
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

      <div className="
  w-full
  max-w-7xl
  mx-auto
  px-4
  sm:px-6
  lg:px-8
  pt-6
  sm:pt-8
  lg:pt-10
  pb-16
  sm:pb-20
  lg:pb-24
">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-12">
<h1 className="
  text-2xl
  sm:text-3xl
  lg:text-4xl
  font-bold
  text-[#4B2E91]
">
  🏛️ Explore Clubs
</h1>

<p className="
  text-gray-500
  mt-2
  text-sm
  sm:text-base
  lg:text-lg
">
  Discover and join communities that match your passion, skills, and goals.
</p>
        </div>

        {/* ================= CATEGORY SELECTION PILLS ================= */}
        <div className="
  flex
  justify-start
  sm:justify-center
  items-center
  gap-3
  mb-10
  sm:mb-12
  overflow-x-auto
  py-2
  px-1
  scrollbar-hide
">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 sm:px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-sm whitespace-nowrap text-xs sm:text-sm ${
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

  <div className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-6
    lg:gap-8
  ">

    {[1, 2, 3, 4, 5, 6].map((item) => (
      <ClubSkeletonCard key={item} />
    ))}

  </div>

) : (
          <div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  gap-6
  lg:gap-8
">
            {filteredClubs.length ? (
              filteredClubs.map((club) => (
                <div
                  key={club._id}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-purple-50/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                >
                  <div>
                    <div className="flex justify-between items-start mb-5">

  <div className="flex items-center gap-3">

    <img
      src={
        club.logo ||
        "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(club.name)
      }
      alt={club.name}
      className="w-14 h-14 rounded-full object-cover border-2 border-[#DDD4F2] shadow"
    />

    <span
      className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${
        club.type?.toLowerCase() === "technical"
          ? "bg-blue-100 text-blue-700"
          : club.type?.toLowerCase() === "cultural"
          ? "bg-pink-100 text-pink-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {club.type
        ? club.type.charAt(0).toUpperCase() + club.type.slice(1)
        : "General"}
    </span>

  </div>

</div>

                    <h3 className="text-xl font-bold text-slate-800 mt-2 line-clamp-1">
  {club.name}
</h3>
                    
                    <p className="text-slate-500 mt-2 text-sm line-clamp-3">
                      {club.description || "No description provided for this club yet."}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
  📍 {club.location || "GVP Campus"}
</div>
                    
                    <button
  onClick={() => navigate(`/student/club/${club._id}`)}
  className="px-5 py-2 rounded-2xl bg-[#6D4BC3] hover:bg-[#5B3CA7] text-white font-semibold shadow-sm transition-colors text-sm"
>
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