import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import StudentNavbar from "./StudentNavbar";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Building2,
} from "lucide-react";

export default function MyRegistrations() {

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/registration",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistrations(res.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <StudentNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-[#4B2E91] mb-8">
          My Registrations
        </h1>

        {registrations.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

            <h2 className="text-2xl font-bold text-[#4B2E91]">
              No Registrations Yet
            </h2>

            <p className="mt-4 text-gray-500">
              Register for an event to see it here.
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {registrations.map((reg) => {

              const event = reg.eventId;

              return (

                <div
                  key={reg._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >

                 <img
  src={event.banner || event.poster}
                    alt={event.title}
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-5">

                    <span
                      className={`
                        inline-block
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        mb-4
                        ${
                          event.status === "upcoming"
                            ? "bg-green-100 text-green-700"
                            : event.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : event.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      `}
                    >
                      {event.status.toUpperCase()}
                    </span>

                   <h2 className="text-xl font-bold text-[#4B2E91] line-clamp-2">
                      {event.title}
                    </h2>

                    <div className="mt-5 space-y-3">

                     <div className="flex items-center gap-3 text-gray-600">
                        <Building2 size={18}/>
                        <span>{event.clubId?.name}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <CalendarDays size={18}/>
                        <span>
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <Clock3 size={18}/>
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <MapPin size={18}/>
                        <span>{event.venue}</span>
                      </div>

                    </div>

                    <Link to={`/student/event/${event._id}`}>
                      <button
                        className="
                        w-full
                        mt-8
                        py-3
                        rounded-2xl
                        bg-[#6D4BC3]
                        text-white
                        font-semibold
                        hover:bg-[#5A3AB2]
                        transition"
                      >
                        View Details
                      </button>
                    </Link>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

}