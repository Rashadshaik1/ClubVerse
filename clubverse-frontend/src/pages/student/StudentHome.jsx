import { useEffect, useState } from "react";
import axios from "axios";

import StudentNavbar from "../../pages/student/StudentNavbar";
import OngoingEventCard from "../../pages/student/OngoingEventCard";
import UpcomingEventCard from "../../pages/student/UpcomingEventCard";
import EventFeedCard from "../../pages/student/EventFeedCard";
import WelcomeBanner from "../../pages/student/WelcomeBanner";
import QuickStats from "../../pages/student/QuickStats";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-white shadow-lg p-4 border border-gray-100">

     <Skeleton
  height={180}
  borderRadius={20}
  baseColor="#ECE8F8"
  highlightColor="#F8F7FC"
/>

      <div className="mt-4">
        <Skeleton
  height={24}
  width="75%"
  baseColor="#ECE8F8"
  highlightColor="#F8F7FC"
/>
      </div>

      <div className="mt-3">
        <Skeleton
  height={16}
  count={2}
  baseColor="#ECE8F8"
  highlightColor="#F8F7FC"
/>
      </div>

      <div className="mt-4">
        <Skeleton
  height={42}
  borderRadius={12}
  baseColor="#ECE8F8"
  highlightColor="#F8F7FC"
/>
      </div>

    </div>
  );
}

export default function StudentHome() {
  const [user, setUser] = useState(null);

  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [clubsCount, setClubsCount] = useState(0);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchUser();
    fetchEvents();
    fetchStats();
  }, []);

  // ================= USER =================

  const fetchUser = async () => {
  setLoadingUser(true);

  try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://clubverse-nsgq.onrender.com/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
   } catch (err) {
  console.log(err);
} finally {
  setLoadingUser(false);
}
  };

  // ================= EVENTS =================

 const fetchEvents = async () => {
  setLoadingEvents(true);

  try {
      const res = await axios.get(
        "https://clubverse-nsgq.onrender.com/api/events"
      );

      const events = res.data.events || [];

      const now = new Date();

      const ongoing = [];
      const upcoming = [];

      events.forEach((event) => {
        const eventDate = new Date(event.date);

        if (
          event.status === "ongoing"
        ) {
          ongoing.push(event);
        }

        if (
          event.status === "upcoming" &&
          eventDate > now
        ) {
          upcoming.push(event);
        }
      });

      setOngoingEvents(ongoing);
      setUpcomingEvents(upcoming);

   } catch (err) {
  console.log(err);
} finally {
  setLoadingEvents(false);
}
  };

  // ================= STATS =================

const fetchStats = async () => {
  setLoadingStats(true);

  try {
      const token = localStorage.getItem("token");

      const [clubsRes, regRes] =
        await Promise.all([

          axios.get(
            "https://clubverse-nsgq.onrender.com/api/clubs"
          ),

          axios.get(
            "https://clubverse-nsgq.onrender.com/api/registration",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        ]);

      setClubsCount(clubsRes.data.length || 0);
      setRegisteredCount(
        regRes.data.data.length || 0
      );

   } catch (err) {
  console.log(err);
} finally {
  setLoadingStats(false);
}
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <StudentNavbar user={user} />

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HERO ================= */}

        <div className="pt-8">

<WelcomeBanner
  user={user}
  loading={loadingUser}
/>

        </div>

        {/* ================= QUICK STATS ================= */}

        <div className="mt-10">

       <QuickStats
  ongoingCount={ongoingEvents.length}
  upcomingCount={upcomingEvents.length}
  registeredCount={registeredCount}
  clubsCount={clubsCount}
  loading={loadingStats}
/>

        </div>

        {/* ================= LIVE EVENTS ================= */}

        <section className="mt-14">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold text-[#4B2E91]">

                🔴 Live Events

              </h2>

              <p className="text-gray-500 mt-1">

                Events happening right now

              </p>

            </div>

            <span className="px-5 py-2 rounded-full bg-red-100 text-red-600 font-semibold">

              {ongoingEvents.length} Live

            </span>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">

{
  loadingEvents ? (

    <>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </>

  ) : ongoingEvents.length ? (

    ongoingEvents.map((event) => (
      <OngoingEventCard
        key={event._id}
        event={event}
      />
    ))

  ) : (

    <div className="col-span-2 rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg p-12 text-center">

      <h2 className="text-2xl font-bold text-[#6D4BC3]">
        No Live Events
      </h2>

      <p className="text-gray-500 mt-3">
        Check back later.
      </p>

    </div>

  )
}

          </div>

        </section>

        {/* ================= UPCOMING ================= */}

        <section className="mt-20">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold text-[#4B2E91]">

                ⏳ Upcoming Events

              </h2>

              <p className="text-gray-500 mt-1">

                Register before seats fill up.

              </p>

            </div>

            <span className="px-5 py-2 rounded-full bg-[#DDD4F2] text-[#6D4BC3] font-semibold">

              {upcomingEvents.length} Upcoming

            </span>

          </div>

          <div className="grid lg:grid-cols-2 gap-7 mt-8">

    {
  loadingEvents ? (

    <>
      {[1, 2].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </>

  ) : upcomingEvents.length ? (

    upcomingEvents.map((event) => (
      <UpcomingEventCard
        key={event._id}
        event={event}
      />
    ))

  ) : (

    <div className="col-span-2 rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg p-12 text-center">

      <h2 className="text-2xl font-bold text-[#6D4BC3]">
        No Upcoming Events
      </h2>

      <p className="text-gray-500 mt-3">
        New events will appear here.
      </p>

    </div>

  )
}
          </div>

        </section>

        {/* ================= FEED ================= */}

        <section
          id="events-section"
          className="mt-20 pb-24"
        >

          <h2 className="text-3xl font-bold text-[#4B2E91]">

            🌟 Explore Club Activities

          </h2>

          <p className="text-gray-500 mt-2">

            Browse all ongoing & upcoming events.

          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">

           {
  loadingEvents ? (

    <>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </>

  ) : [...ongoingEvents, ...upcomingEvents].length ? (

    [...ongoingEvents, ...upcomingEvents].map((event) => (
      <EventFeedCard
        key={event._id}
        event={event}
      />
    ))

  ) : (

    <div className="col-span-2 rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg p-14 text-center">

      <h2 className="text-2xl font-bold text-[#6D4BC3]">
        No Events Available
      </h2>

      <p className="mt-3 text-gray-500">
        Clubs haven't posted any events yet.
      </p>

    </div>

  )
}
          </div>

        </section>

      </div>

    </div>

  );

}