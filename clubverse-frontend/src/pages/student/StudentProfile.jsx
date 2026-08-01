import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= DEPARTMENT FROM ROLL NUMBER =================

  const getDepartment = (email) => {
    if (!email) return "Not Specified";

    const roll = email.split("@")[0];

    const branchCode = roll.substring(7, 9);

    const departmentMap = {
      "08": "Civil Engineering",
      "20": "Mechanical Engineering",
      "14": "Electrical & Electronics Engineering",
      "10": "Computer Science & Engineering",
      "11": "Information Technology",
      "12": "Electronics & Communication Engineering",
      "02": "Chemical Engineering",
      "84": "Mechanical - Robotics",
      "82": "Computer Science & Engineering(ML)",
      "83": "Computer Science & Engineering(DS)",
    };

    return departmentMap[branchCode] || "Not Specified";
  };

  // ================= FETCH PROFILE =================

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);

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
      console.error("Error fetching profile details:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= PROFILE SKELETON =================

  const ProfileSkeleton = () => {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 border border-purple-50/50 shadow-lg">

        {/* ================= PROFILE HEADER ================= */}

        <div className="flex flex-col items-center border-b border-purple-100 pb-8 mb-8 text-center">

          {/* Avatar */}
          <Skeleton
            circle
            width={112}
            height={112}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          {/* Name */}
          <div className="mt-4">
            <Skeleton
              height={32}
              width={190}
              borderRadius={10}
              baseColor="#ECE8F8"
              highlightColor="#F8F7FC"
            />

            {/* Role */}
            <div className="mt-2">
              <Skeleton
                height={18}
                width={135}
                borderRadius={8}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />
            </div>
          </div>

        </div>

        {/* ================= PROFILE INFO ================= */}

        <div>

          {/* Section Heading */}

          <Skeleton
            height={26}
            width={230}
            borderRadius={8}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          {/* Information Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="bg-white/50 p-5 rounded-2xl border border-purple-50"
              >

                {/* Label */}

                <Skeleton
                  height={14}
                  width="40%"
                  borderRadius={6}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                {/* Value */}

                <div className="mt-2">

                  <Skeleton
                    height={20}
                    width={item === 2 ? "80%" : "65%"}
                    borderRadius={7}
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <StudentNavbar user={user} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 md:pt-12 pb-16 md:pb-24">

        {/* ================= LOADING ================= */}

        {loading ? (

          <ProfileSkeleton />

        ) : user ? (

          /* ================= PROFILE ================= */

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 border border-purple-50/50 shadow-lg">

            {/* ================= PROFILE HEADER ================= */}

            <div className="flex flex-col items-center border-b border-purple-100 pb-8 mb-8 text-center">

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#6D4BC3] to-[#4B2E91] text-white flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-md uppercase">

                {user.email
                  ? user.email[0]
                  : "S"}

              </div>

              <div className="mt-4">

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 break-all">

                  {user.email
                    ? user.email.split("@")[0]
                    : "Student"}

                </h1>

                <p className="text-[#6D4BC3] font-medium mt-1 uppercase text-xs sm:text-sm tracking-wider">

                  🎯 {user.role || "Student"} Account

                </p>

              </div>

            </div>

            {/* ================= PROFILE INFO ================= */}

            <div>

              <h2 className="text-lg sm:text-xl font-bold text-[#4B2E91] mb-6">

                📋 Profile Information

              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

                {/* Email */}

                <div className="bg-white/50 p-4 sm:p-5 rounded-2xl border border-purple-50">

                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">

                    Email Address

                  </span>

                  <span className="text-slate-700 font-medium text-sm sm:text-base mt-1 block break-all">

                    {user.email}

                  </span>

                </div>

                {/* Account ID */}

                <div className="bg-white/50 p-4 sm:p-5 rounded-2xl border border-purple-50">

                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">

                    Account ID

                  </span>

                  <span className="text-slate-700 font-mono text-xs sm:text-sm mt-1 block break-all">

                    {user._id}

                  </span>

                </div>

                {/* Department */}

                <div className="bg-white/50 p-4 sm:p-5 rounded-2xl border border-purple-50">

                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">

                    Department / Branch

                  </span>

                  <span className="text-slate-700 font-medium text-sm sm:text-base mt-1 block">

                    {getDepartment(user.email)}

                  </span>

                </div>

                {/* Joining Date */}

                <div className="bg-white/50 p-4 sm:p-5 rounded-2xl border border-purple-50">

                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">

                    Joining Date

                  </span>

                  <span className="text-slate-700 font-medium text-sm sm:text-base mt-1 block">

                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}

                  </span>

                </div>

              </div>

            </div>

          </div>

        ) : (

          /* ================= ERROR ================= */

          <div className="rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg p-10 sm:p-16 text-center">

            <h2 className="text-xl sm:text-2xl font-bold text-[#6D4BC3]">

              Failed to Load Profile

            </h2>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">

              Please try logging in again to verify your token credentials.

            </p>

          </div>

        )}

      </div>

    </div>
  );
}