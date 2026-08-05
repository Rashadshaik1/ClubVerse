// src/pages/student/ClubDetails.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import axios from "axios";
import {
  CalendarDays,
  Mail,
  Globe,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ClubDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-5
          sm:py-6
          lg:py-8
        "
      >

        {/* ================= BANNER ================= */}

        <div
          className="
            relative
            h-52
            xs:h-56
            sm:h-64
            md:h-72
            rounded-2xl
            sm:rounded-3xl
            overflow-hidden
            shadow-lg
          "
        >

          <Skeleton
            width="100%"
            height="100%"
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          {/* Logo + Club Name */}

          <div
            className="
              absolute
              bottom-4
              sm:bottom-6
              md:bottom-8
              left-4
              sm:left-6
              md:left-8
              right-4
              sm:right-6
              flex
              items-center
              gap-3
              sm:gap-5
              md:gap-6
            "
          >

            <Skeleton
              circle
              width={80}
              height={80}
              baseColor="#ECE8F8"
              highlightColor="#F8F7FC"
            />

            <div className="min-w-0 flex-1">

              <Skeleton
                width="70%"
                height={28}
                borderRadius={8}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="mt-2">

                <Skeleton
                  width={90}
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

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-4
            gap-5
            sm:gap-6
            mt-6
            sm:mt-8
          "
        >

          {/* LEFT */}

          <div className="lg:col-span-3 space-y-5 sm:space-y-6">

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

           <div
  className="
    grid
    grid-cols-3
    gap-2
    sm:gap-4
    md:gap-5
  "
>

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                 className="
  bg-white
  rounded-2xl
  p-3
  sm:p-5
  md:p-6
  shadow
  flex
  items-center
  gap-2
  sm:gap-4
  min-w-0
"
                >

                  <Skeleton
                    circle
                    width={34}
                    height={34}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                  <div className="min-w-0">

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

              <div
                className="
                  flex
                  flex-col
                  xs:flex-row
                  items-start
                  xs:items-center
                  gap-4
                  sm:gap-5
                  mt-6
                "
              >

                <Skeleton
                  circle
                  width={80}
                  height={80}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                <div className="min-w-0 flex-1">

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

                  <div className="p-4">

  <Skeleton
    width="80%"
    height={22}
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

          <div className="space-y-5 sm:space-y-6">

            {/* CONTACT */}

            <div className="bg-white rounded-2xl shadow p-5 sm:p-6">

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

            <div className="bg-white rounded-2xl shadow p-5 sm:p-6">

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

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 mt-6 sm:mt-8">

          <Skeleton
            width={190}
            height={28}
            borderRadius={8}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          <div
            className="
              grid
              grid-cols-1
              xs:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-4
              sm:gap-6
              mt-6
            "
          >

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

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 mt-6 sm:mt-8">

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              mb-6
            "
          >

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


          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
              sm:gap-6
            "
          >

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
      <div className="min-h-screen flex justify-center items-center px-4 text-center text-lg font-medium text-gray-500">
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

      <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF] py-5 sm:py-6 lg:py-8">

        <div
          className="
            w-full
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* ================= BANNER ================= */}

          <div
            className="
              relative
              h-52
              xs:h-56
              sm:h-64
              md:h-72
              rounded-2xl
              sm:rounded-3xl
              overflow-hidden
              shadow-lg
            "
          >

            <img
              src={
                club.banner ||
                "https://via.placeholder.com/1200x400"
              }
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35"></div>

            {/* Banner Content */}

            <div
              className="
                absolute
                bottom-4
                sm:bottom-6
                md:bottom-8
                left-4
                sm:left-6
                md:left-8
                right-4
                sm:right-6
                md:right-8
                flex
                items-center
                gap-3
                sm:gap-5
                md:gap-6
              "
            >

              {/* Logo */}

              <img
                src={
                  club.logo ||
                  "https://via.placeholder.com/150"
                }
                alt=""
                className="
                  w-16
                  h-16
                  sm:w-20
                  sm:h-20
                  md:w-28
                  md:h-28
                  shrink-0
                  rounded-full
                  border-2
                  sm:border-4
                  border-white
                  object-cover
                  bg-white
                  shadow-lg
                "
              />

              {/* Name */}

              <div className="min-w-0">

                <h1
                  className="
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    lg:text-4xl
                    font-bold
                    text-white
                    line-clamp-2
                    break-words
                  "
                >
                  {club.name}
                </h1>

                <p
                  className="
                    text-white/90
                    mt-1
                    sm:mt-2
                    text-sm
                    sm:text-base
                    capitalize
                  "
                >
                  {club.type}
                </p>

              </div>

            </div>

          </div>


          {/* ================= TOP INFO ================= */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-4
              gap-5
              sm:gap-6
              mt-6
              sm:mt-8
            "
          >

            {/* ================= LEFT ================= */}

            <div className="lg:col-span-3 space-y-5 sm:space-y-6">

              {/* ABOUT */}

              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow">

                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    font-semibold
                    text-[#4B2E91]
                    mb-3
                  "
                >
                  About Club
                </h2>

                <p
                  className="
                    text-gray-600
                    leading-6
                    sm:leading-7
                    text-sm
                    sm:text-base
                    break-words
                  "
                >
                  {club.description}
                </p>

              </div>


              {/* ================= STATS ================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  gap-4
                  sm:gap-5
                "
              >

                {/* Total Events */}

                <div
                  className="
                    bg-white
                    rounded-2xl
                    p-5
                    sm:p-6
                    shadow
                    flex
                    items-center
                    gap-4
                  "
                >

                 <CalendarDays
  className="text-[#6D4BC3] shrink-0 w-5 h-5 sm:w-7 sm:h-7"
  size={30}
/>

                  <div className="min-w-0">

                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold">
                      {club.stats?.totalEvents || 0}
                    </h3>

                    <p className="text-gray-500 text-[10px] sm:text-sm md:text-base leading-tight">
                      Total Events
                    </p>

                  </div>

                </div>


                {/* Upcoming Events */}

                <div
                  className="
                    bg-white
                    rounded-2xl
                    p-5
                    sm:p-6
                    shadow
                    flex
                    items-center
                    gap-4
                  "
                >

            <CalendarDays
  className="text-[#6D4BC3] shrink-0 w-5 h-5 sm:w-7 sm:h-7"
  size={30}
/>

                  <div className="min-w-0">

                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold">
                      {club.stats?.upcomingEvents || 0}
                    </h3>

                    <p className="text-gray-500 text-[10px] sm:text-sm md:text-base leading-tight">
                      Upcoming Events
                    </p>

                  </div>

                </div>


                {/* Completed Events */}

                <div
                  className="
                    bg-white
                    rounded-2xl
                    p-5
                    sm:p-6
                    shadow
                    flex
                    items-center
                    gap-4
                  "
                >

              <CalendarDays
  className="text-[#6D4BC3] shrink-0 w-5 h-5 sm:w-7 sm:h-7"
  size={30}
/>

                  <div className="min-w-0">

                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold">
                      {club.stats?.completedEvents || 0}
                    </h3>

                    <p className="text-gray-500 text-[10px] sm:text-sm md:text-base leading-tight">
                      Completed Events
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= FACULTY ================= */}

              {facultyCoordinator && (

                <div className="bg-white rounded-2xl shadow p-5 sm:p-6">

                  <h2
                    className="
                      text-xl
                      sm:text-2xl
                      font-semibold
                      text-[#4B2E91]
                      mb-5
                    "
                  >
                    Faculty Coordinator
                  </h2>

                  <div
                    className="
                      flex
                      flex-col
                      xs:flex-row
                      items-start
                      xs:items-center
                      gap-4
                      sm:gap-5
                    "
                  >

                    <img
                      src={facultyCoordinator.photo}
                      alt=""
                      className="
                        w-16
                        h-16
                        sm:w-20
                        sm:h-20
                        shrink-0
                        rounded-full
                        object-cover
                      "
                    />

                    <div className="min-w-0">

                      <h3 className="text-lg sm:text-xl font-semibold break-words">
                        {facultyCoordinator.name}
                      </h3>

                      <p className="text-gray-500 text-[10px] sm:text-sm md:text-base leading-tight">
                        {facultyCoordinator.position}
                      </p>

                      <div
                        className="
                          flex
                          items-start
                          gap-2
                          mt-2
                          text-gray-600
                          text-sm
                          sm:text-base
                        "
                      >

                        <Mail
                          size={18}
                          className="shrink-0 mt-0.5"
                        />

                        <span className="break-all">
                          {club.facultyCoordinator?.email}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              )}

            </div>


            {/* ================= RIGHT SIDEBAR ================= */}

            <div className="space-y-5 sm:space-y-6">

              {/* CONTACT */}

              <div className="bg-white rounded-2xl shadow p-5 sm:p-6">

                <h2
                  className="
                    text-lg
                    sm:text-xl
                    font-semibold
                    text-[#4B2E91]
                    mb-5
                  "
                >
                  Contact
                </h2>

                <div className="space-y-4 text-gray-600">

                  <div
                    className="
                      flex
                      items-start
                      gap-3
                      text-sm
                      sm:text-base
                    "
                  >

                    <Mail
                      size={18}
                      className="shrink-0 mt-0.5"
                    />

                    <span className="break-all">
                      {club.email}
                    </span>

                  </div>

                  {club.instagram && (

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        text-sm
                        sm:text-base
                      "
                    >

                      <Globe
                        size={18}
                        className="shrink-0"
                      />

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


              {/* CLUB INFO */}

              <div className="bg-white rounded-2xl shadow p-5 sm:p-6">

                <h2
                  className="
                    text-lg
                    sm:text-xl
                    font-semibold
                    text-[#4B2E91]
                    mb-4
                  "
                >
                  Club Information
                </h2>

                <div className="space-y-3 text-gray-600 text-sm sm:text-base">

                  <p className="break-words">
                    <strong>Category:</strong>{" "}
                    {club.type}
                  </p>

                  <p>
                    <strong>Founded:</strong>{" "}
                    {club.establishedYear || "N/A"}
                  </p>

                  <p>
                    <strong>Status:</strong> Active
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ================= EXECUTIVE TEAM ================= */}

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 mt-6 sm:mt-8">

            <h2
              className="
                text-xl
                sm:text-2xl
                font-semibold
                text-[#4B2E91]
                mb-6
              "
            >
              Executive Team
            </h2>

            <div
              className="
                grid
                grid-cols-1
                xs:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-4
                sm:gap-6
              "
            >

              {club.executiveTeam?.length > 0 ? (

                executiveMembers.map((member) => (

                  <div
                    key={member._id}
                    className="
                      border
                      rounded-2xl
                      p-5
                      text-center
                      hover:shadow-lg
                      transition
                    "
                  >

                    <img
                      src={member.photo}
                      alt={member.name}
                      className="
                        w-20
                        h-20
                        sm:w-24
                        sm:h-24
                        rounded-full
                        mx-auto
                        object-cover
                      "
                    />

                    <h3
                      className="
                        mt-4
                        text-base
                        sm:text-lg
                        font-semibold
                        line-clamp-2
                      "
                    >
                      {member.name}
                    </h3>

                    <p
                      className="
                        text-[#6D4BC3]
                        text-sm
                        mt-1
                        line-clamp-2
                      "
                    >
                      {member.position}
                    </p>

                  </div>

                ))

              ) : (

                <p className="text-gray-500">
                  No Executive Members
                </p>

              )}

            </div>

          </div>


          {/* ================= UPCOMING EVENTS ================= */}

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 mt-6 sm:mt-8">

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:justify-between
                sm:items-center
                gap-3
                mb-6
              "
            >

              <h2
                className="
                  text-xl
                  sm:text-2xl
                  font-semibold
                  text-[#4B2E91]
                "
              >
                Upcoming Events
              </h2>

              <Link
                to={`/student/clubs/${club._id}/events`}
                className="
                  flex
                  items-center
                  gap-2
                  text-[#6D4BC3]
                  font-semibold
                  hover:underline
                  text-sm
                  sm:text-base
                  w-fit
                "
              >
                View All Events
              </Link>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-4
                sm:gap-5
                lg:gap-6
              "
            >

              {club.events?.length > 0 ? (

                club.events.slice(0, 3).map((event) => (

                  <div
                    key={event._id}
                    className="
                      border
                      rounded-2xl
                      overflow-hidden
                      hover:shadow-lg
                      transition
                      min-w-0
                    "
                  >

                    <img
                      src={event.poster}
                      alt={event.title}
                      className="
                        w-full
                        h-36
                        sm:h-40
                        md:h-44
                        object-cover
                      "
                    />

                    <div className="p-4">

                      <h3
                        className="
                          text-base
                          sm:text-lg
                          font-semibold
                          line-clamp-2
                        "
                      >
                        {event.title}
                      </h3>

                      <p
                        className="
                          text-gray-500
                          text-sm
                          mt-2
                          truncate
                        "
                      >
                        📅 {event.date}
                      </p>

                      <p
                        className="
                          text-gray-500
                          text-sm
                          truncate
                        "
                      >
                        📍 {event.venue}
                      </p>

                      <Link
                        to={`/student/event/${event._id}`}
                        className="
                          mt-4
                          inline-block
                          bg-[#6D4BC3]
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          hover:bg-[#5B3CA7]
                          transition
                        "
                      >
                        View Event
                      </Link>

                    </div>

                  </div>

                ))

              ) : (

                <p className="text-gray-500">
                  No Upcoming Events
                </p>

              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default ClubDetails;