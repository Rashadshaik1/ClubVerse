
import {
  Calendar,
  Users,
  Ticket,
  Trophy,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useNavigate } from "react-router-dom";

export default function QuickStats({
  ongoingCount,
  upcomingCount,
  registeredCount,
  clubsCount,
  loading,
}) {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const stats = [
    {
      title: "Ongoing",
      value: ongoingCount,
      icon: Calendar,
      gradient: "from-[#6D4BC3] to-[#8D76D8]",
      action: () => scrollToSection("ongoing-events"),
    },
    {
      title: "Upcoming",
      value: upcomingCount,
      icon: Ticket,
      gradient: "from-[#8D76D8] to-[#A78BFA]",
      action: () => scrollToSection("upcoming-events"),
    },
    {
      title: "Registered",
      value: registeredCount,
      icon: Trophy,
      gradient: "from-[#7C5CDB] to-[#C084FC]",
      action: () => navigate("/student/my-registrations"),
    },
    {
      title: "Active Clubs",
      value: clubsCount,
      icon: Users,
      gradient: "from-[#5B3EB6] to-[#8D76D8]",
      action: () => navigate("/student-clubs"),
    },
  ];

  return (
    <section className="w-full mt-7 sm:mt-8">
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          lg:grid-cols-4
          gap-3
          sm:gap-4
          lg:gap-5
        "
      >
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              onClick={!loading ? item.action : undefined}
              className={`
                group
                relative
                overflow-hidden
                rounded-xl
                sm:rounded-2xl
                border
                border-[#DDD4F2]
                bg-white/75
                backdrop-blur-xl

                p-3.5
                sm:p-4
                md:p-5

                shadow-md
                hover:shadow-2xl
                hover:-translate-y-1
                sm:hover:-translate-y-2
                hover:scale-[1.01]
                sm:hover:scale-[1.02]

                transition-all
                duration-300

                ${loading
                  ? "cursor-default"
                  : "cursor-pointer"
                }
              `}
            >
              {/* ================= GLOW ================= */}

              <div
                className="
                  absolute
                  -right-5
                  -top-5
                  sm:right-0
                  sm:top-0
                  w-20
                  h-20
                  sm:w-24
                  sm:h-24
                  rounded-full
                  bg-[#EEE7FF]
                  blur-3xl
                  opacity-60
                  group-hover:scale-150
                  transition-all
                  duration-500
                  pointer-events-none
                "
              />

              {/* ================= CONTENT ================= */}

              <div
                className="
                  relative
                  flex
                  items-start
                  justify-between
                  gap-2
                  min-w-0
                "
              >
                {/* LEFT */}

                <div className="min-w-0 flex-1">
                  {/* TITLE */}

                  <p
                    className="
                      text-[11px]
                      sm:text-xs
                      md:text-sm
                      font-medium
                      text-gray-500
                      truncate
                    "
                  >
                    {item.title}
                  </p>

                  {/* VALUE */}

                  <h2
                    className="
                      mt-1.5
                      sm:mt-2
                      text-2xl
                      sm:text-3xl
                      font-bold
                      text-[#4B2E91]
                      leading-none
                    "
                  >
                    {loading ? (
                      <Skeleton
                        width={48}
                        height={30}
                        borderRadius={8}
                        baseColor="#ECE8F8"
                        highlightColor="#F8F7FC"
                      />
                    ) : (
                      item.value
                    )}
                  </h2>

                  {/* LIVE STATISTICS */}

                  <div className="mt-2.5 sm:mt-3">
                    {loading ? (
                      <Skeleton
                        width={80}
                        height={13}
                        baseColor="#ECE8F8"
                        highlightColor="#F8F7FC"
                      />
                    ) : (
                      <div
                        className="
                          flex
                          items-center
                          gap-1
                          text-[9px]
                          sm:text-[10px]
                          md:text-xs
                          text-[#6D4BC3]
                          whitespace-nowrap
                        "
                      >
                        <TrendingUp
                          size={11}
                          className="sm:w-[13px] sm:h-[13px]"
                        />

                        <span>Live Statistics</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ================= ICON ================= */}

                <div className="relative shrink-0">
                  {loading ? (
                    <Skeleton
                      width={40}
                      height={40}
                      borderRadius={11}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />
                  ) : (
                    <div
                      className={`
                        w-10
                        h-10
                        sm:w-11
                        sm:h-11
                        md:w-12
                        md:h-12
                        rounded-lg
                        sm:rounded-xl
                        bg-gradient-to-r
                        ${item.gradient}
                        flex
                        items-center
                        justify-center
                        text-white
                        shadow-lg

                        group-hover:rotate-12
                        group-hover:scale-110
                        sm:group-hover:scale-125

                        transition
                        duration-300
                      `}
                    >
                      <Icon
                        size={18}
                        className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]"
                      />
                    </div>
                  )}

                  {/* ================= ARROW ================= */}

                  {!loading && item.action && (
                    <ArrowUpRight
                      size={16}
                      className="
                        absolute
                        -top-1
                        -right-1

                        sm:top-2
                        sm:right-2

                        text-[#6D4BC3]
                        opacity-0
                        group-hover:opacity-100
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        transition-all
                        duration-300
                      "
                    />
                  )}
                </div>
              </div>

              {/* ================= BOTTOM GRADIENT ================= */}

              <div
                className={`
                  mt-3
                  sm:mt-4
                  h-0.5
                  sm:h-1
                  rounded-full
                  bg-gradient-to-r
                  ${item.gradient}
                `}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

