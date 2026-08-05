import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ClubSkeletonCard() {
  return (
    <div
      className="
        w-full
        min-w-0
        bg-white/80
        backdrop-blur-xl
        rounded-2xl
        sm:rounded-3xl
        p-4
        sm:p-5
        lg:p-6
        border
        border-purple-50/50
        shadow-md
      "
    >

      {/* Logo + Category */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-3
          mb-5
        "
      >

        <div className="flex items-center gap-3 min-w-0">

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

      <div
        className="
          mt-7
          sm:mt-8
          pt-4
          border-t
          border-slate-100
          flex
          flex-col
          xs:flex-row
          xs:items-center
          xs:justify-between
          gap-3
        "
      >

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
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [loading, setLoading] = useState(true);

  // Categories
  const categories = [
    "All",
    "Technical",
    "Cultural",
    "Social",
  ];

  useEffect(() => {
    fetchClubs();
  }, []);

  // ================= FETCH CLUBS =================

  const fetchClubs = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://clubverse-nsgq.onrender.com/api/clubs"
      );

      const clubData = (res.data || []).map(
        (club) => ({
          ...club,
          category: club.type,
        })
      );

      setClubs(clubData);
      setFilteredClubs(clubData);

    } catch (err) {

      console.error(
        "Error fetching clubs:",
        err
      );

    } finally {

      setLoading(false);

    }

  };

  // ================= CATEGORY FILTER =================

  const handleCategoryChange = (category) => {

    setSelectedCategory(category);

    if (category === "All") {

      setFilteredClubs(clubs);

    } else {

      const filtered = clubs.filter(
        (club) =>
          club.type?.toLowerCase() ===
          category.toLowerCase()
      );

      setFilteredClubs(filtered);

    }

  };

  return (

    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-gradient-to-br
        from-[#F6F4FF]
        via-[#EEF2FF]
        to-[#E8F3FF]
      "
    >

      <StudentNavbar />

      <main
        className="
          w-full
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8
          xl:px-10

          pt-6
          sm:pt-8
          lg:pt-10

          pb-16
          sm:pb-20
          lg:pb-24
        "
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            w-full
            max-w-2xl
            mx-auto
            text-center

            mb-8
            sm:mb-10
            lg:mb-12

            px-1
          "
        >

          <h1
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl

              font-bold
              text-[#4B2E91]

              leading-tight
            "
          >
            🏛️ Explore Clubs
          </h1>

          <p
            className="
              text-gray-500

              mt-2
              sm:mt-3

              text-sm
              sm:text-base
              lg:text-lg

              leading-6
              sm:leading-7
            "
          >
            Discover and join communities that
            match your passion, skills, and goals.
          </p>

        </div>


        {/* =====================================================
            CATEGORY SELECTION
        ===================================================== */}

        <div
          className="
            w-full

            flex
            items-center

            justify-start
            sm:justify-center

            gap-2
            sm:gap-3

            mb-8
            sm:mb-10
            lg:mb-12

            overflow-x-auto

            px-1
            py-2

            scrollbar-hide

            snap-x
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() =>
                handleCategoryChange(category)
              }
              className={`
                shrink-0
                snap-start

                px-4
                sm:px-5
                lg:px-6

                py-2
                sm:py-2.5

                rounded-full

                font-semibold

                text-xs
                sm:text-sm

                whitespace-nowrap

                shadow-sm

                transition-all
                duration-300

                ${
                  selectedCategory === category
                    ? `
                      bg-[#6D4BC3]
                      text-white
                      shadow-purple-200
                      shadow-md
                      scale-105
                    `
                    : `
                      bg-white/80
                      hover:bg-white
                      text-gray-600
                      border
                      border-purple-100/50
                    `
                }
              `}
            >

              {category === "All"
                ? "🌐 All Categories"
                : category}

            </button>

          ))}

        </div>


        {/* =====================================================
            CLUBS
        ===================================================== */}

        {loading ? (

          <div
            className="
              grid

              grid-cols-1

              sm:grid-cols-2

              lg:grid-cols-3

              gap-4
              sm:gap-5
              lg:gap-8
            "
          >

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <ClubSkeletonCard
                  key={item}
                />
              )
            )}

          </div>

        ) : (

          <div
            className="
              grid

              grid-cols-1

              sm:grid-cols-2

              lg:grid-cols-3

              gap-4
              sm:gap-5
              lg:gap-8

              items-stretch
            "
          >

            {filteredClubs.length ? (

              filteredClubs.map((club) => (

                <div
                  key={club._id}
                  className="
                    w-full
                    min-w-0

                    bg-white/80
                    backdrop-blur-xl

                    rounded-2xl
                    sm:rounded-3xl

                    p-4
                    sm:p-5
                    lg:p-6

                    border
                    border-purple-50/50

                    shadow-md

                    hover:shadow-xl
                    transition-all
                    duration-300

                    flex
                    flex-col
                    justify-between

                    transform
                    hover:-translate-y-1
                  "
                >

                  {/* =====================
                      CLUB CONTENT
                  ===================== */}

                  <div className="min-w-0">

                    {/* Logo + Category */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-3

                        mb-4
                        sm:mb-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          sm:gap-3

                          min-w-0
                        "
                      >

                        {/* LOGO */}

                        <img
                          src={
                            club.logo ||
                            "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(
                                club.name
                              )
                          }
                          alt={club.name}
                          className="
                            w-12
                            h-12

                            sm:w-14
                            sm:h-14

                            shrink-0

                            rounded-full

                            object-cover

                            border-2
                            border-[#DDD4F2]

                            shadow
                          "
                        />

                        {/* CATEGORY */}

                        <span
                          className={`
                            shrink-0

                            px-2.5
                            sm:px-3

                            py-1

                            text-[10px]
                            sm:text-xs

                            font-bold

                            rounded-full

                            uppercase
                            tracking-wide

                            ${
                              club.type?.toLowerCase() ===
                              "technical"
                                ? "bg-blue-100 text-blue-700"
                                : club.type?.toLowerCase() ===
                                  "cultural"
                                ? "bg-pink-100 text-pink-700"
                                : "bg-green-100 text-green-700"
                            }
                          `}
                        >

                          {club.type
                            ? club.type
                                .charAt(0)
                                .toUpperCase() +
                              club.type.slice(1)
                            : "General"}

                        </span>

                      </div>

                    </div>


                    {/* CLUB NAME */}

                    <h3
                      className="
                        text-lg
                        sm:text-xl

                        font-bold
                        text-slate-800

                        mt-1

                        line-clamp-2

                        leading-6
                        sm:leading-7

                        break-words
                      "
                    >
                      {club.name}
                    </h3>


                    {/* DESCRIPTION */}

                    <p
                      className="
                        text-slate-500

                        mt-2

                        text-sm

                        leading-6

                        line-clamp-3
                      "
                    >
                      {club.description ||
                        "No description provided for this club yet."}
                    </p>

                  </div>


                  {/* =================================================
                      FOOTER
                  ================================================= */}

                  <div
                    className="
                      mt-6
                      sm:mt-8

                      pt-4

                      border-t
                      border-slate-100

                      flex

                      flex-col
                      xs:flex-row

                      xs:items-center
                      xs:justify-between

                      gap-3
                    "
                  >

                    {/* LOCATION */}

                    <div
                      className="
                        min-w-0
                        flex-1

                        text-sm
                        text-gray-500

                        leading-5
                      "
                    >

                      <span className="line-clamp-2">
                        📍{" "}
                        {club.location ||
                          "GVP Campus"}
                      </span>

                    </div>


                    {/* VIEW CLUB */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/student/club/${club._id}`
                        )
                      }
                      className="
                        shrink-0

                        w-full
                        xs:w-auto

                        px-5

                        py-2.5

                        rounded-2xl

                        bg-[#6D4BC3]

                        hover:bg-[#5B3CA7]

                        text-white

                        font-semibold

                        shadow-sm

                        transition-colors

                        text-sm

                        text-center
                      "
                    >
                      View Club
                    </button>

                  </div>

                </div>

              ))

            ) : (

              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div
                className="
                  col-span-full

                  w-full

                  rounded-2xl
                  sm:rounded-3xl

                  bg-white/60
                  backdrop-blur-xl

                  shadow-lg

                  px-5
                  sm:px-8
                  lg:px-16

                  py-10
                  sm:py-12
                  lg:py-16

                  text-center
                "
              >

                <h2
                  className="
                    text-xl
                    sm:text-2xl

                    font-bold
                    text-[#6D4BC3]
                  "
                >
                  No Clubs Found
                </h2>

                <p
                  className="
                    text-sm
                    sm:text-base

                    text-gray-500

                    mt-2
                    sm:mt-3

                    leading-6
                  "
                >
                  There are no clubs registered
                  under the "{selectedCategory}"
                  category right now.
                </p>

              </div>

            )}

          </div>

        )}

      </main>

    </div>
  );
}