import { Calendar, Users, Ticket, Trophy } from "lucide-react";

export default function QuickStats({
  ongoingCount,
  upcomingCount,
  registeredCount,
  clubsCount,
}) {
  const stats = [
    {
      title: "Ongoing Events",
      value: ongoingCount,
      icon: <Calendar size={28} />,
      color: "bg-red-500",
    },
    {
      title: "Upcoming Events",
      value: upcomingCount,
      icon: <Ticket size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Registered",
      value: registeredCount,
      icon: <Trophy size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Active Clubs",
      value: clubsCount,
      icon: <Users size={28} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
          >
            <div
              className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>

            <h3 className="mt-5 text-3xl font-bold">
              {item.value}
            </h3>

            <p className="mt-2 text-gray-500">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}