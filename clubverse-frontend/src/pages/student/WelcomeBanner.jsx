
import {
  Sparkles,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WelcomeBanner({ user, loading }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";
  let message = "Explore today's campus activities.";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
    message =
      "Start your day by exploring exciting club events.";
  } else if (hour < 17) {
    greeting = "Good Afternoon 🌤️";
    message =
      "Don't miss today's workshops and competitions.";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const scrollToEvents = () => {
    document
      .getElementById("events-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="w-full mt-5 sm:mt-7 lg:mt-8">
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          bg-gradient-to-r
          from-[#6D4BC3]
          via-[#7B5ED8]
          to-[#9C83F6]
          shadow-xl
          px-4
          py-6
          sm:px-7
          sm:py-7
          md:px-8
          md:py-8
          lg:px-10
          lg:py-8
          text-white
        "
      >
        {/* ================= BACKGROUND GLOWS ================= */}

        <div
          className="
            absolute
            -top-20
            -right-20
            w-48
            h-48
            sm:w-64
            sm:h-64
            rounded-full
            bg-white/10
            blur-3xl
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -left-16
            w-48
            h-48
            sm:w-64
            sm:h-64
            rounded-full
            bg-[#D7CBFF]/20
            blur-3xl
            pointer-events-none
          "
        />

        {/* Subtle decorative glow */}

        <div
          className="
            absolute
            top-1/2
            right-1/4
            w-32
            h-32
            rounded-full
            bg-white/5
            blur-3xl
            pointer-events-none
          "
        />

        {/* ================= CONTENT ================= */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-7
            sm:gap-8
          "
        >
          {/* ================= LEFT CONTENT ================= */}

          <div className="flex-1 min-w-0">
            {/* PORTAL BADGE */}

            <div
              className="
                inline-flex
                max-w-full
                items-center
                gap-2
                px-3
                py-1.5
                sm:px-4
                sm:py-2
                rounded-full
                bg-white/15
                backdrop-blur-xl
                border
                border-white/20
              "
            >
              <Sparkles
                size={15}
                className="shrink-0 sm:w-4 sm:h-4"
              />

              {loading ? (
                <Skeleton
                  width={145}
                  height={16}
                  baseColor="#A88CF6"
                  highlightColor="#CDBDFF"
                />
              ) : (
                <span
                  className="
                    text-[11px]
                    sm:text-sm
                    font-medium
                    truncate
                  "
                >
                  ClubVerse Student Portal
                </span>
              )}
            </div>

            {/* ================= GREETING ================= */}

            <h1
              className="
                mt-4
                sm:mt-5
                text-[28px]
                leading-[1.2]
                sm:text-4xl
                md:text-[42px]
                lg:text-5xl
                font-bold
                tracking-tight
              "
            >
              {loading ? (
                <div className="space-y-2">
                  <Skeleton
                    width="min(260px, 80%)"
                    height={34}
                    baseColor="#A88CF6"
                    highlightColor="#CDBDFF"
                  />

                  <Skeleton
                    width="min(190px, 65%)"
                    height={38}
                    baseColor="#A88CF6"
                    highlightColor="#CDBDFF"
                  />
                </div>
              ) : (
                <>
                  {greeting}

                  <br />

                  <span className="text-[#F8F5FF] break-words">
                    {user?.name || "Student"} 👋
                  </span>
                </>
              )}
            </h1>

            {/* ================= DESCRIPTION ================= */}

            <div
              className="
                mt-3
                sm:mt-4
                max-w-2xl
                text-[13px]
                sm:text-sm
                md:text-base
                text-white/90
                leading-6
                sm:leading-7
              "
            >
              {loading ? (
                <div className="space-y-1">
                  <Skeleton
                    count={3}
                    baseColor="#A88CF6"
                    highlightColor="#CDBDFF"
                  />
                </div>
              ) : (
                <>
                  <p>{message}</p>

                  <p className="mt-1">
                    Discover workshops, hackathons, technical,
                    cultural and social events happening across
                    your campus.
                  </p>
                </>
              )}
            </div>

            {/* ================= TODAY CARD ================= */}

            <div className="mt-5 sm:mt-6">
              <div
                className="
                  inline-flex
                  max-w-full
                  items-center
                  gap-3
                  px-3.5
                  py-2.5
                  sm:px-4
                  sm:py-3
                  rounded-xl
                  bg-white/15
                  backdrop-blur-xl
                  border
                  border-white/20
                "
              >
                <div className="shrink-0">
                  <CalendarDays
                    size={17}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-white/70">
                    Today
                  </p>

                  {loading ? (
                    <Skeleton
                      width={120}
                      height={15}
                      baseColor="#A88CF6"
                      highlightColor="#CDBDFF"
                    />
                  ) : (
                    <p
                      className="
                        font-medium
                        text-xs
                        sm:text-sm
                        truncate
                      "
                    >
                      {today}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT BUTTON ================= */}

          <div
            className="
              w-full
              lg:w-auto
              flex
              items-center
              lg:justify-center
              shrink-0
            "
          >
            {loading ? (
              <div className="w-full sm:w-auto">
                <Skeleton
                  width={180}
                  height={56}
                  borderRadius={16}
                  baseColor="#A88CF6"
                  highlightColor="#CDBDFF"
                />
              </div>
            ) : (
              <button
                onClick={scrollToEvents}
                className="
                  group
                  w-full
                  sm:w-auto
                  min-w-0
                  sm:min-w-[180px]
                  px-6
                  sm:px-7
                  py-3.5
                  sm:py-4
                  rounded-xl
                  sm:rounded-2xl
                  bg-white
                  text-[#6D4BC3]
                  font-semibold
                  text-sm
                  sm:text-base
                  shadow-lg
                  hover:shadow-xl
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  transition-all
                  duration-200
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                Explore Events

                <ArrowRight
                  size={18}
                  className="
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

