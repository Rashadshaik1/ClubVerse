import {
  Calendar,
  Users,
  Ticket,
  Trophy,
  TrendingUp
} from "lucide-react";

export default function QuickStats({
  ongoingCount,
  upcomingCount,
  registeredCount,
  clubsCount,
}) {
  const stats = [
    {
      title: "Ongoing",
      value: ongoingCount,
      icon: Calendar,
      gradient: "from-[#6D4BC3] to-[#8D76D8]",
    },
    {
      title: "Upcoming",
      value: upcomingCount,
      icon: Ticket,
      gradient: "from-[#8D76D8] to-[#A78BFA]",
    },
    {
      title: "Registered",
      value: registeredCount,
      icon: Trophy,
      gradient: "from-[#7C5CDB] to-[#C084FC]",
    },
    {
      title: "Active Clubs",
      value: clubsCount,
      icon: Users,
      gradient: "from-[#5B3EB6] to-[#8D76D8]",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-[#DDD4F2]
              bg-white/75
              backdrop-blur-xl
              p-5
              shadow-md
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300"
            >

              {/* Glow */}
              <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-[#EEE7FF] blur-3xl opacity-60"></div>

              <div className="relative flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#4B2E91]">
                    {item.value}
                  </h2>

                  <div className="mt-3 flex items-center gap-1 text-xs text-[#6D4BC3]">
                    <TrendingUp size={13} />
                    <span>Live Statistics</span>
                  </div>

                </div>

                <div
                  className={`
                  w-12
                  h-12
                  rounded-xl
                  bg-gradient-to-r
                  ${item.gradient}
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-lg
                  group-hover:rotate-6
                  group-hover:scale-110
                  transition`}
                >
                  <Icon size={22} />
                </div>

              </div>

              <div
                className={`
                mt-4
                h-1
                rounded-full
                bg-gradient-to-r
                ${item.gradient}`}
              />

            </div>
          );
        })}

      </div>

    </section>
  );
}