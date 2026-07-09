import {
  Sparkles,
  CalendarDays,
  ArrowRight
} from "lucide-react";

export default function WelcomeBanner({ user }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";
  let message =
    "Explore today's campus activities.";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
    message =
      "Start your day by exploring exciting club events.";
  } else if (hour < 17) {
    greeting = "Good Afternoon 🌤️";
    message =
      "Don't miss today's workshops and competitions.";
  }

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const scrollToEvents = () => {
    document
      .getElementById("events-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">

      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-[#6D4BC3]
        via-[#7B5ED8]
        to-[#9C83F6]
        shadow-xl
        px-10
        py-8
        text-white"
      >

        {/* Background Glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute -bottom-20 left-0 w-56 h-56 rounded-full bg-[#D7CBFF]/20 blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between gap-8 flex-wrap">

          {/* LEFT */}
          <div className="flex-1 min-w-[320px]">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/20">

              <Sparkles size={16} />

              <span className="text-sm font-medium">
                ClubVerse Student Portal
              </span>

            </div>

            <h1 className="mt-5 text-4xl lg:text-5xl font-bold leading-tight">

              {greeting}

              <br />

              <span className="text-[#F8F5FF]">
                {user?.name || "Student"} 👋
              </span>

            </h1>

            <p className="mt-4 max-w-2xl text-white/90 leading-7">

              {message}

              <br />

              Discover workshops, hackathons, technical,
              cultural and social events happening across
              your campus.

            </p>

            <div className="mt-6 flex flex-wrap gap-4">

              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-xl border border-white/20">

                <CalendarDays size={18} />

                <div>

                  <p className="text-xs text-white/70">
                    Today
                  </p>

                  <p className="font-medium text-sm">
                    {today}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center">

            <button
              onClick={scrollToEvents}
              className="
              group
              px-7
              py-4
              rounded-2xl
              bg-white
              text-[#6D4BC3]
              font-semibold
              shadow-lg
              hover:scale-105
              transition-all
              flex
              items-center
              gap-2"
            >

              Explore Events

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}