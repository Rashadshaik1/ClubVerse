import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "../../pages/student/StudentNavbar";
import OngoingEventCard from "../../pages/student/OngoingEventCard";
import UpcomingEventCard from "../../pages/student/UpcomingEventCard";
import EventCountdown from "../../pages/student/EventCountdown";
import EventFeedCard from "../../pages/student/EventFeedCard";
import WelcomeBanner from "../../pages/student/WelcomeBanner";
import QuickStats from "../../pages/student/QuickStats";


export default function StudentHome() {
  const [user, setUser] = useState(null);

  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [clubsCount, setClubsCount] = useState(0);
  const [registeredCount, setRegisteredCount] = useState(0);
  

  useEffect(() => {
  fetchUser();
  fetchEvents();
  fetchStats();
}, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEvents = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/events"
    );

    const events = res.data.events || [];

    const now = new Date();

    const ongoing = [];
    const upcoming = [];

    events.forEach((event) => {
      const eventDate = new Date(event.date);

      if (
        event.status === "upcoming" &&
        eventDate > now
      ) {
        upcoming.push(event);
      }

      if (
        event.status === "ongoing"
      ) {
        ongoing.push(event);
      }
    });

    setUpcomingEvents(upcoming);
    setOngoingEvents(ongoing);

  } catch (err) {
    console.log(err);
  }
};

const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const [clubsRes, regRes] = await Promise.all([
      axios.get("http://localhost:5000/api/clubs"),
      axios.get("http://localhost:5000/api/registration", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    setClubsCount(clubsRes.data.length || 0);
    setRegisteredCount(regRes.data.data.length || 0);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar will come here */}
      <StudentNavbar user={user} />

      {/* Welcome Section */}

      <WelcomeBanner user={user} />

      <QuickStats
  ongoingCount={ongoingEvents.length}
  upcomingCount={upcomingEvents.length}
  registeredCount={registeredCount}
  clubsCount={clubsCount}
/>

      {/* Ongoing Events */}
      <section className="max-w-7xl mx-auto mt-12 px-6">

  <div className="flex items-center justify-between">

    <h2 className="text-3xl font-bold">
      🔴 Ongoing Events
    </h2>

    <span className="text-gray-500">
      {ongoingEvents.length} Live
    </span>

  </div>

  <div className="mt-6 flex gap-6 overflow-x-auto pb-4">

    {ongoingEvents.length > 0 ? (

      ongoingEvents.map((event) => (

        <OngoingEventCard
          key={event._id}
          event={event}
        />

      ))

    ) : (

      <div className="bg-white rounded-xl shadow w-full p-10 text-center text-gray-500">

        No ongoing events.

      </div>

    )}

  </div>

</section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto mt-14 px-6">

  <div className="flex items-center justify-between">

    <h2 className="text-3xl font-bold">
      ⏳ Upcoming Events
    </h2>

    <span className="text-gray-500">
      {upcomingEvents.length} Upcoming
    </span>

  </div>

  <div className="mt-6 flex gap-6 overflow-x-auto pb-4">

    {upcomingEvents.length > 0 ? (

      upcomingEvents.map((event) => (

        <UpcomingEventCard
          key={event._id}
          event={event}
        />

      ))

    ) : (

      <div className="bg-white rounded-xl shadow w-full p-10 text-center text-gray-500">

        No upcoming events.

      </div>

    )}

  </div>

</section>

      {/* Feed */}
      <section className="max-w-7xl mx-auto mt-16 px-6 pb-20">

  <h2 className="text-3xl font-bold mb-8">

    Explore Events

  </h2>

  <div className="grid lg:grid-cols-2 gap-8">

    {[...ongoingEvents, ...upcomingEvents].length > 0 ? (

      [...ongoingEvents, ...upcomingEvents].map((event) => (

        <EventFeedCard
          key={event._id}
          event={event}
        />

      ))

    ) : (

      <div className="col-span-2 bg-white rounded-2xl shadow p-12 text-center">

        <h2 className="text-2xl font-semibold">

          No Events Available

        </h2>

        <p className="mt-3 text-gray-500">

          Check back later for new club activities.

        </p>

      </div>

    )}

  </div>

</section>

    </div>
  );
}