import { useEffect, useState } from "react";
import axios from "axios";

import StudentNavbar from "./StudentNavbar";

import {
  Bell,
  CalendarDays,
  Clock3,
} from "lucide-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


/* =========================================================
   NOTIFICATION SKELETON
========================================================= */

function NotificationSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <StudentNavbar />

      <div className="
        max-w-5xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-8
        lg:py-10
      ">

        {/* PAGE HEADING */}

        <div className="
          flex
          items-center
          gap-3
          sm:gap-4
          mb-7
          sm:mb-10
        ">

          <Skeleton
            circle
            width={34}
            height={34}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          <Skeleton
            height={36}
            width={190}
            borderRadius={10}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

        </div>


        {/* NOTIFICATION CARDS */}

        <div className="space-y-4 sm:space-y-6">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="
                bg-white
                rounded-2xl
                sm:rounded-3xl
                shadow-lg
                p-4
                sm:p-6
                lg:p-7
                border-l-4
                border-[#ECE8F8]
              "
            >

              {/* TITLE + BADGE */}

              <div className="
                flex
                flex-col
                sm:flex-row
                sm:justify-between
                sm:items-start
                gap-3
              ">

                <div className="w-full">

                  <Skeleton
                    height={22}
                    width="40%"
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                  <div className="mt-4">

                    <Skeleton
                      height={15}
                      count={2}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                </div>


                <Skeleton
                  width={55}
                  height={24}
                  borderRadius={20}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

              </div>


              {/* DATE + TIME */}

              <div className="
                flex
                flex-col
                sm:flex-row
                gap-3
                sm:gap-6
                mt-5
                sm:mt-6
              ">

                <Skeleton
                  width={120}
                  height={18}
                  borderRadius={8}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                <Skeleton
                  width={110}
                  height={18}
                  borderRadius={8}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STUDENT NOTIFICATIONS
========================================================= */

export default function StudentNotifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);


  /* =======================================================
     FETCH NOTIFICATIONS
  ======================================================= */

  useEffect(() => {
    fetchNotifications();
  }, []);


  const fetchNotifications = async () => {

    try {

      const token = localStorage.getItem("token");


      // STEP 1: GET NOTIFICATIONS

      const res = await axios.get(
        "https://clubverse-nsgq.onrender.com/api/student-notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const fetchedNotifications =
        res.data.data || [];


      // STEP 2: DISPLAY NOTIFICATIONS

      setNotifications(fetchedNotifications);


      // STEP 3: MARK ALL AS READ

      await axios.put(
        "https://clubverse-nsgq.onrender.com/api/student-notifications/read",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      // STEP 4: UPDATE UI

      setNotifications(
        fetchedNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );


    } catch (err) {

      console.log(
        "NOTIFICATION ERROR:",
        err
      );

    } finally {

      setLoading(false);

    }

  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return <NotificationSkeleton />;
  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-[#F6F4FF]
      via-[#EEF2FF]
      to-[#E8F3FF]
    ">

      <StudentNavbar />


      <div className="
        max-w-5xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-8
        lg:py-10
      ">


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="
          flex
          items-center
          gap-3
          sm:gap-4
          mb-7
          sm:mb-10
        ">

          <div className="
            w-11
            h-11
            sm:w-12
            sm:h-12
            rounded-2xl
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            flex-shrink-0
          ">

            <Bell
              className="text-[#6D4BC3]"
              size={24}
            />

          </div>


          <h1 className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            text-[#4B2E91]
          ">
            Notifications
          </h1>

        </div>


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {notifications.length === 0 ? (

          <div className="
            bg-white
            rounded-2xl
            sm:rounded-3xl
            shadow-lg
            p-8
            sm:p-10
            lg:p-12
            text-center
          ">

            <div className="
              w-16
              h-16
              sm:w-20
              sm:h-20
              mx-auto
              rounded-full
              bg-[#F3F0FF]
              flex
              items-center
              justify-center
            ">

              <Bell
                size={34}
                className="text-[#B5A6E6]"
              />

            </div>


            <h2 className="
              text-xl
              sm:text-2xl
              font-bold
              text-[#4B2E91]
              mt-5
            ">
              No Notifications
            </h2>


            <p className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
              max-w-md
              mx-auto
              leading-6
            ">
              We'll notify you whenever something important happens.
            </p>

          </div>

        ) : (


          /* =================================================
             NOTIFICATION LIST
          ================================================= */

          <div className="space-y-4 sm:space-y-6">

            {notifications.map((item) => (

              <div
                key={item._id}
                className="
                  bg-white
                  rounded-2xl
                  sm:rounded-3xl
                  shadow-lg
                  p-4
                  sm:p-6
                  lg:p-7
                  border-l-4
                  border-[#6D4BC3]
                  transition-all
                  duration-300
                  hover:shadow-xl
                "
              >


                {/* =========================================
                    TITLE + NEW BADGE
                ========================================= */}

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:justify-between
                  sm:items-start
                  gap-3
                ">


                  <div className="min-w-0">

                    <h2 className="
                      font-bold
                      text-lg
                      sm:text-xl
                      text-[#4B2E91]
                      break-words
                    ">
                      {item.type === "EVENT_UPDATE"
                        ? "Event Update"
                        : "Notification"}
                    </h2>


                    <p className="
                      mt-2
                      sm:mt-3
                      text-gray-600
                      leading-6
                      sm:leading-7
                      text-sm
                      sm:text-base
                      break-words
                    ">
                      {item.message}
                    </p>

                  </div>


                  {/* NEW */}

                  {!item.isRead && (

                    <span className="
                      self-start
                      flex-shrink-0
                      bg-red-500
                      text-white
                      text-[10px]
                      sm:text-xs
                      px-3
                      py-1
                      rounded-full
                      font-semibold
                    ">
                      NEW
                    </span>

                  )}

                </div>


                {/* =========================================
                    DATE + TIME
                ========================================= */}

                <div className="
                  flex
                  flex-col
                  xs:flex-row
                  sm:flex-row
                  gap-3
                  sm:gap-6
                  mt-5
                  sm:mt-6
                  text-gray-500
                  text-sm
                ">


                  {/* DATE */}

                  <div className="
                    flex
                    gap-2
                    items-center
                  ">

                    <CalendarDays
                      size={17}
                      className="flex-shrink-0"
                    />

                    <span>
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>


                  {/* TIME */}

                  <div className="
                    flex
                    gap-2
                    items-center
                  ">

                    <Clock3
                      size={17}
                      className="flex-shrink-0"
                    />

                    <span>
                      {new Date(
                        item.createdAt
                      ).toLocaleTimeString()}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}