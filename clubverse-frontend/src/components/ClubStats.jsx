import {
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaChartLine
} from "react-icons/fa";

export default function ClubStats({ stats }) {
  const cards = [
    {
      title: "Total Events",
      value: stats.totalEvents || 0,
      icon: <FaCalendarAlt />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Registrations",
      value: stats.totalRegistrations || 0,
      icon: <FaUsers />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Average Rating",
      value: `${stats.rating || 0}/5`,
      icon: <FaStar />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Performance",
      value: `${stats.performance || 0}%`,
      icon: <FaChartLine />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="relative overflow-hidden rounded-3xl
          bg-[#0b1728]
          border border-cyan-500/20
          p-6
          hover:border-cyan-400
          transition-all duration-300
          hover:scale-[1.02]"
        >

          <div
            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}
          />

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {card.value}
              </h2>

            </div>

            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color}
              flex items-center justify-center text-2xl text-white shadow-xl`}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}