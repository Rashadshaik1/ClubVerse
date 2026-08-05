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
import EventCarousel from "../../pages/student/EventCarousel";

function SkeletonCard() {
  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-white shadow-lg p-3 sm:p-4 border border-gray-100">

 <Skeleton
  height={180}
  className="sm:h-[180px]"
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
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      {/* ================= NAVBAR ================= */}

      <StudentNavbar user={user} />

      {/* ================= MAIN CONTENT ================= */}

      <main className="w-full">

        <div
          className="
            w-full
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
          "
        >

          {/* ================= HERO ================= */}

          <section className="pt-5 sm:pt-7 lg:pt-8">

            <WelcomeBanner
              user={user}
              loading={loadingUser}
            />

          </section>


          {/* ================= QUICK STATS ================= */}

          <section className="mt-6 sm:mt-8 lg:mt-10">

            <QuickStats
              ongoingCount={ongoingEvents.length}
              upcomingCount={upcomingEvents.length}
              registeredCount={registeredCount}
              clubsCount={clubsCount}
              loading={loadingStats}
            />

          </section>


         {/* =====================================================
    LIVE EVENTS
===================================================== */}

<section
  id="ongoing-events"
  className="mt-12 sm:mt-14 lg:mt-16"
>

  {/* ================= SECTION HEADER ================= */}

  <div
    className="
      flex
      flex-col
      gap-3
      sm:flex-row
      sm:items-end
      sm:justify-between
    "
  >

    <div className="min-w-0">

      <h2
        className="
          text-2xl
          sm:text-3xl
          lg:text-[32px]
          font-bold
          text-[#4B2E91]
          tracking-tight
        "
      >
        🔴 Live Events
      </h2>

      <p
        className="
          mt-1
          text-sm
          sm:text-base
          text-gray-500
        "
      >
        Events happening right now
      </p>

    </div>

    {/* ================= LIVE COUNT ================= */}

    <span
      className="
        self-start
        sm:self-auto
        shrink-0
        px-4
        sm:px-5
        py-1.5
        sm:py-2
        rounded-full
        bg-red-100
        text-red-600
        text-sm
        sm:text-base
        font-semibold
      "
    >
      {ongoingEvents.length} Live
    </span>

  </div>


  {/* ================= HORIZONTAL EVENTS ================= */}

  <div
    className="
      mt-6
      sm:mt-7
      lg:mt-8
      flex
      gap-4
      sm:gap-5
      lg:gap-6
      overflow-x-auto
      snap-x
      snap-mandatory
      pb-5
      scrollbar-hide
      overscroll-x-contain
    "
    style={{
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
  >

    {loadingEvents ? (

      <>
        {[1, 2, 3, 4].map((i) => (

          <div
            key={i}
            className="
              w-[82vw]
              sm:w-[340px]
              md:w-[360px]
              lg:w-[380px]
              xl:w-[390px]
              shrink-0
              snap-start
            "
          >
            <SkeletonCard />
          </div>

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

      <div
        className="
          w-full
          shrink-0
          rounded-2xl
          sm:rounded-3xl
          bg-white/60
          backdrop-blur-xl
          border
          border-white/70
          shadow-lg
          px-5
          py-10
          sm:px-8
          sm:py-12
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
          No Live Events
        </h2>

        <p
          className="
            text-sm
            sm:text-base
            text-gray-500
            mt-2
            sm:mt-3
          "
        >
          Check back later.
        </p>

      </div>

    )}

  </div>

</section>


          {/* =====================================================
              UPCOMING EVENTS
          ===================================================== */}

          <section
            id="upcoming-events"
            className="mt-14 sm:mt-18 lg:mt-20"
          >

            {/* SECTION HEADER */}

            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >

              <div className="min-w-0">

                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    lg:text-[32px]
                    font-bold
                    text-[#4B2E91]
                    tracking-tight
                  "
                >
                  ⏳ Upcoming Events
                </h2>

                <p
                  className="
                    text-sm
                    sm:text-base
                    text-gray-500
                    mt-1
                  "
                >
                  Register before seats fill up.
                </p>

              </div>


              {/* UPCOMING COUNT */}

              <span
                className="
                  self-start
                  sm:self-auto
                  shrink-0
                  px-4
                  sm:px-5
                  py-1.5
                  sm:py-2
                  rounded-full
                  bg-[#DDD4F2]
                  text-[#6D4BC3]
                  text-sm
                  sm:text-base
                  font-semibold
                "
              >
                {upcomingEvents.length} Upcoming
              </span>

            </div>


            {/* UPCOMING CAROUSEL */}

            <div className="mt-6 sm:mt-7 lg:mt-8">

              <EventCarousel
                itemsLength={upcomingEvents.length}
              >

                {loadingEvents ? (

                  <>
                    {[1, 2, 3].map((i) => (

                      <div
                        key={i}
                        className="
                          min-w-[calc(100vw-32px)]
                          sm:min-w-[320px]
                          md:min-w-[360px]
                          lg:min-w-[370px]
                          snap-start
                        "
                      >

                        <SkeletonCard />

                      </div>

                    ))}
                  </>

                ) : upcomingEvents.length ? (

                  upcomingEvents.map((event) => (

                    <div
                      key={event._id}
                      className="
                        min-w-[calc(100vw-32px)]
                        sm:min-w-[320px]
                        md:min-w-[360px]
                        lg:min-w-[370px]
                        snap-start
                      "
                    >

                      <UpcomingEventCard
                        event={event}
                      />

                    </div>

                  ))

                ) : (

                  <div
                    className="
                      w-full
                      rounded-2xl
                      sm:rounded-3xl
                      bg-white/60
                      backdrop-blur-xl
                      border
                      border-white/70
                      shadow-lg
                      px-5
                      py-10
                      sm:px-8
                      sm:py-12
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
                      No Upcoming Events
                    </h2>

                    <p
                      className="
                        text-sm
                        sm:text-base
                        text-gray-500
                        mt-2
                        sm:mt-3
                      "
                    >
                      New events will appear here.
                    </p>

                  </div>

                )}

              </EventCarousel>

            </div>

          </section>


          {/* =====================================================
              EXPLORE CLUB ACTIVITIES
          ===================================================== */}

          <section
            id="events-section"
            className="
              mt-14
              sm:mt-18
              lg:mt-20
              pb-16
              sm:pb-20
              lg:pb-24
            "
          >

            {/* SECTION HEADER */}

            <div>

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-[32px]
                  font-bold
                  text-[#4B2E91]
                  tracking-tight
                "
              >
                🌟 Explore Club Activities
              </h2>

              <p
                className="
                  text-sm
                  sm:text-base
                  text-gray-500
                  mt-1
                  sm:mt-2
                "
              >
                Browse all ongoing & upcoming events.
              </p>

            </div>


            {/* EVENT FEED CAROUSEL */}

            <div className="mt-6 sm:mt-7 lg:mt-8">

              <EventCarousel
                itemsLength={
                  [...ongoingEvents, ...upcomingEvents].length
                }
              >

                {loadingEvents ? (

                  <>
                    {[1, 2, 3].map((i) => (

                      <div
                        key={i}
                        className="
                          min-w-[calc(100vw-32px)]
                          sm:min-w-[320px]
                          md:min-w-[360px]
                          lg:min-w-[370px]
                          snap-start
                        "
                      >

                        <SkeletonCard />

                      </div>

                    ))}
                  </>

                ) : (

                  [...ongoingEvents, ...upcomingEvents].map(
                    (event) => (

                      <div
                        key={event._id}
                        className="
                          min-w-[calc(100vw-32px)]
                          sm:min-w-[320px]
                          md:min-w-[360px]
                          lg:min-w-[370px]
                          snap-start
                        "
                      >

                        <EventFeedCard
                          event={event}
                        />

                      </div>

                    )
                  )

                )}

              </EventCarousel>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}