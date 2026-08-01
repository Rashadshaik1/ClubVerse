// src/pages/student/ClubDetails.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import axios from "axios";
import {
  Users,
  CalendarDays,
  Mail,
  ArrowRight,
  Globe,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ClubDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* ================= BANNER ================= */}

        <div className="
          relative
          h-56
          sm:h-64
          lg:h-72
          rounded-3xl
          overflow-hidden
          shadow-lg
        ">

          <Skeleton
            width="100%"
            height="100%"
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          {/* Logo + Club Name */}

          <div className="
            absolute
            bottom-5
            sm:bottom-8
            left-5
            sm:left-8
            flex
            items-center
            gap-3
            sm:gap-6
          ">

            <Skeleton
              circle
              width={window.innerWidth < 640 ? 80 : 112}
              height={window.innerWidth < 640 ? 80 : 112}
              baseColor="#ECE8F8"
              highlightColor="#F8F7FC"
            />

            <div>

              <Skeleton
                width={window.innerWidth < 640 ? 150 : 220}
                height={32}
                borderRadius={8}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="mt-2">

                <Skeleton
                  width={100}
                  height={18}
                  borderRadius={8}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

              </div>

            </div>

          </div>

        </div>


        {/* ================= MAIN CONTENT ================= */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-4
          gap-6
          mt-8
        ">

          {/* LEFT */}

          <div className="lg:col-span-3 space-y-6">

            {/* ABOUT */}

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow">

              <Skeleton
                width={170}
                height={28}
                borderRadius={8}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="mt-4">

                <Skeleton
                  count={4}
                  height={16}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

              </div>

            </div>


            {/* STATS */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-5
            ">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="
                    bg-white
                    rounded-2xl
                    p-6
                    shadow
                    flex
                    items-center
                    gap-4
                  "
                >

                  <Skeleton
                    circle
                    width={34}
                    height={34}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                  <div>

                    <Skeleton
                      width={55}
                      height={30}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                    <div className="mt-2">

                      <Skeleton
                        width={100}
                        height={16}
                        borderRadius={8}
                        baseColor="#ECE8F8"
                        highlightColor="#F8F7FC"
                      />

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* FACULTY */}

            <div className="bg-white rounded-2xl shadow p-5 sm:p-6">

              <Skeleton
                width={220}
                height={28}
                borderRadius={8}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="flex items-center gap-5 mt-6">

                <Skeleton
                  circle
                  width={80}
                  height={80}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                <div className="flex-1">

                  <Skeleton
                    width={180}
                    height={22}
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                  <div className="mt-2">

                    <Skeleton
                      width={130}
                      height={16}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                  <div className="mt-2">

                    <Skeleton
                      width={220}
                      height={16}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ================= RIGHT SIDEBAR ================= */}

          <div className="space-y-6">

            {/* CONTACT */}

            <div className="bg-white rounded-2xl shadow p-6">

              <Skeleton
                width={110}
                height={24}
                borderRadius={8}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="mt-6 space-y-5">

                <Skeleton
                  width="90%"
                  height={18}
                  borderRadius={8}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                <Skeleton
                  width="65%"
                  height={18}
                  borderRadius={8}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

              </div>

            </div>


            {/* CLUB INFO */}

            <div className="bg-white rounded-2xl shadow p-6">

              <Skeleton
                width={170}
                height={24}
                borderRadius={8}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="mt-6 space-y-4">

                {[1, 2, 3].map((item) => (

                  <Skeleton
                    key={item}
                    width="80%"
                    height={18}
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                ))}

              </div>

            </div>

          </div>

        </div>


        {/* ================= EXECUTIVE TEAM ================= */}

        <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 mt-8">

          <Skeleton
            width={190}
            height={28}
            borderRadius={8}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            mt-6
          ">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="border rounded-2xl p-5 text-center"
              >

                <Skeleton
                  circle
                  width={96}
                  height={96}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                <div className="mt-4">

                  <Skeleton
                    width="65%"
                    height={20}
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                </div>

                <div className="mt-2">

                  <Skeleton
                    width="50%"
                    height={16}
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ================= UPCOMING EVENTS ================= */}

        <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 mt-8">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            mb-6
          ">

            <Skeleton
              width={190}
              height={28}
              borderRadius={8}
              baseColor="#ECE8F8"
              highlightColor="#F8F7FC"
            />

            <Skeleton
              width={130}
              height={20}
              borderRadius={8}
              baseColor="#ECE8F8"
              highlightColor="#F8F7FC"
            />

          </div>


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          ">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="
                  border
                  rounded-2xl
                  overflow-hidden
                "
              >

                <Skeleton
                  height={176}
                  width="100%"
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                <div className="p-4">

                  <Skeleton
                    width="80%"
                    height={22}
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                  <div className="mt-3">

                    <Skeleton
                      width="70%"
                      height={16}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                  <div className="mt-2">

                    <Skeleton
                      width="60%"
                      height={16}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                  <div className="mt-4">

                    <Skeleton
                      width={95}
                      height={38}
                      borderRadius={12}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

const ClubDetails = () => {
  const { id } = useParams();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchClub();
    }
  }, [id]);

const fetchClub = async () => {
  try {
    const res = await axios.get(
      `https://clubverse-nsgq.onrender.com/api/clubs/${id}`
    );

    console.log(res.data);

    setClub(res.data.data);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

 if (loading) {
  return (
    <>
      <StudentNavbar />
      <ClubDetailsSkeleton />
    </>
  );
}

  if (!club)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-medium text-gray-500">
        Club Not Found
      </div>
    );
const facultyCoordinator =
  club.executiveTeam?.find(
    (member) => member.position === "Faculty Coordinator"
  ) || null;

const executiveMembers =
  club.executiveTeam?.filter(
    (member) => member.position !== "Faculty Coordinator"
  ) || [];
  return (
  <>
    <StudentNavbar />

    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF] py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner */}
        <div className="relative h-72 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={club.banner || "https://via.placeholder.com/1200x400"}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35"></div>
          <div className="absolute bottom-8 left-8 flex items-center gap-6">
            <img
              src={club.logo || "https://via.placeholder.com/150"}
              alt=""
              className="w-28 h-28 rounded-full border-4 border-white object-cover bg-white"
            />
            <div>
              <h1 className="text-4xl font-bold text-white">{club.name}</h1>
              <p className="text-white/90 mt-2">{club.type}</p>
            </div>
          </div>
        </div>

        {/* Top Info */}
        <div className="grid lg:grid-cols-4 gap-6 mt-8">
          {/* Left */}
          <div className="lg:col-span-3 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold text-[#4B2E91] mb-3">
                About Club
              </h2>
              <p className="text-gray-600 leading-7">{club.description}</p>
            </div>

            {/* Stats */}

<div className="grid md:grid-cols-3 gap-5">

  <div className="bg-white rounded-2xl p-6 shadow flex items-center gap-4">

    <CalendarDays
      className="text-[#6D4BC3]"
      size={34}
    />

    <div>
      <h3 className="text-3xl font-bold">
        {club.stats?.totalEvents || 0}
      </h3>

      <p className="text-gray-500">
        Total Events
      </p>
    </div>

  </div>


  <div className="bg-white rounded-2xl p-6 shadow flex items-center gap-4">

    <CalendarDays
      className="text-green-500"
      size={34}
    />

    <div>
      <h3 className="text-3xl font-bold">
        {club.stats?.upcomingEvents || 0}
      </h3>

      <p className="text-gray-500">
        Upcoming Events
      </p>
    </div>

  </div>


  <div className="bg-white rounded-2xl p-6 shadow flex items-center gap-4">

    <CalendarDays
      className="text-gray-500"
      size={34}
    />

    <div>
      <h3 className="text-3xl font-bold">
        {club.stats?.completedEvents || 0}
      </h3>

      <p className="text-gray-500">
        Completed Events
      </p>
    </div>

  </div>

</div>

            {/* Faculty */}
            {facultyCoordinator && (
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-semibold text-[#4B2E91] mb-5">
                  Faculty Coordinator
                </h2>
                <div className="flex items-center gap-5">
                  <img
                    src={facultyCoordinator.photo}
                    alt=""
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                     {facultyCoordinator.name}
                    </h3>
                    <p className="text-gray-500">
                      {facultyCoordinator.position}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <Mail size={18} />
                      <span>{club.facultyCoordinator?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">


            {/* Contact */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold text-[#4B2E91] mb-5">
                Contact
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span>{club.email}</span>
                </div>
                {club.instagram && (
                  <div className="flex items-center gap-3">
                    <Globe size={18} />
                    <a
                      href={club.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#6D4BC3] hover:underline"
                    >
                      Instagram
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Club Info */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold text-[#4B2E91] mb-4">
                Club Information
              </h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  <strong>Category:</strong> {club.type}
                </p>
                <p>
                  <strong>Founded:</strong> {club.establishedYear || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> Active
                </p>
              </div>
            </div>
          </div>
        </div>
                    {/* Executive Team */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 w-full">
              <h2 className="text-2xl font-semibold text-[#4B2E91] mb-6">
                Executive Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {club.executiveTeam?.length > 0 ? (
                  executiveMembers.map((member) => (
                    <div
                      key={member._id}
                      className="border rounded-2xl p-5 text-center hover:shadow-lg transition"
                    >
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                      <h3 className="mt-4 text-lg font-semibold">
                        {member.name}
                      </h3>
                      <p className="text-[#6D4BC3] text-sm">{member.position}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No Executive Members</p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#4B2E91]">
                  Upcoming Events
                </h2>
                           <Link
to={`/student/clubs/${club._id}/events`}
className="flex items-center gap-2 text-[#6D4BC3] font-semibold hover:underline"
>
View All Events
</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {club.events?.length > 0 ? (
                  club.events.slice(0, 3).map((event) => (
                    <div
                      key={event._id}
                      className="border rounded-2xl overflow-hidden hover:shadow-lg transition"
                    >
                      <img
                        src={event.poster}
                        alt={event.title}
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p className="text-gray-500 text-sm mt-2">
                          📅 {event.date}
                        </p>
                        <p className="text-gray-500 text-sm">📍 {event.venue}</p>
<Link
  to={`/student/event/${event._id}`}
  className="mt-4 inline-block bg-[#6D4BC3] text-white px-4 py-2 rounded-xl text-sm"
>
  View Event
</Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No Upcoming Events</p>
                )}
              </div>
            </div>
      </div>
     </div>
  </>
);
};

export default ClubDetails;