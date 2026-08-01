import { useEffect, useState } from "react";
import axios from "axios";

import StudentNavbar from "./StudentNavbar";

import {
  Bell,
  CalendarDays,
  Clock3,
  CheckCircle,
} from "lucide-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NotificationSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Page Heading */}
        <div className="flex items-center gap-4 mb-10">

          <Skeleton
            circle
            width={34}
            height={34}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          <Skeleton
            height={40}
            width={220}
            borderRadius={10}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

        </div>

        {/* Notification Cards */}

        <div className="space-y-6">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-7
                border-l-4
                border-[#ECE8F8]
              "
            >

              <div className="flex justify-between items-start">

                <div className="w-full">

                  {/* Title */}
                  <Skeleton
                    height={24}
                    width="35%"
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                  {/* Message */}
                  <div className="mt-4">

                    <Skeleton
                      height={16}
                      count={2}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                </div>

                {/* NEW badge */}
                <Skeleton
                  width={55}
                  height={24}
                  borderRadius={20}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

              </div>

              {/* Date + Time */}
              <div className="flex gap-6 mt-6">

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

export default function StudentNotifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

  try {

    const token = localStorage.getItem("token");

    // STEP 1: Get notifications
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

    // STEP 2: Display notifications
    setNotifications(fetchedNotifications);

    // STEP 3: Mark notifications as read
    await axios.put(
      "https://clubverse-nsgq.onrender.com/api/student-notifications/read",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // STEP 4: Update UI
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
if (loading) {
  return <NotificationSkeleton />;
}

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <StudentNavbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="flex items-center gap-4 mb-10">

          <Bell className="text-[#6D4BC3]" size={34} />

          <h1 className="text-4xl font-bold text-[#4B2E91]">
            Notifications
          </h1>

        </div>

        {notifications.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

            <Bell
              size={60}
              className="mx-auto text-[#B5A6E6]"
            />

            <h2 className="text-2xl font-bold text-[#4B2E91] mt-5">
              No Notifications
            </h2>

            <p className="text-gray-500 mt-3">
              We'll notify you whenever something important happens.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {notifications.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-lg p-7 border-l-4 border-[#6D4BC3]"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="font-bold text-xl text-[#4B2E91]">
                     {item.type === "EVENT_UPDATE" ? "Event Update" : "Notification"}
                    </h2>

                    <p className="mt-3 text-gray-600 leading-7">
                      {item.message}
                    </p>

                  </div>

                  {!item.isRead && (

                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      NEW
                    </span>

                  )}

                </div>

                <div className="flex gap-6 mt-6 text-gray-500">

                  <div className="flex gap-2 items-center">

                    <CalendarDays size={18} />

                    {new Date(item.createdAt).toLocaleDateString()}

                  </div>

                  <div className="flex gap-2 items-center">

                    <Clock3 size={18} />

                    {new Date(item.createdAt).toLocaleTimeString()}

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