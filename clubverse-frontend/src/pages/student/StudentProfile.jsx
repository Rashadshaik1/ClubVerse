
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
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-xl">

        {/* Premium Header Skeleton */}

        <div className="h-32 sm:h-36 bg-gradient-to-r from-[#6D4BC3]/10 via-[#8D76D8]/10 to-[#E8F3FF]" />

        <div className="px-5 sm:px-8 md:px-12 pb-8 sm:pb-10">

          <div className="flex flex-col items-center -mt-16 sm:-mt-20 border-b border-purple-100/80 pb-8 text-center">

            <div className="p-1.5 sm:p-2 rounded-full bg-white shadow-xl">

              <Skeleton
                circle
                width={112}
                height={112}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

            </div>

            <div className="mt-4">

              <Skeleton
                height={32}
                width={190}
                borderRadius={10}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="mt-2 flex justify-center">

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

          {/* Profile Information */}

          <div className="pt-8">

            <Skeleton
              height={26}
              width={230}
              borderRadius={8}
              baseColor="#ECE8F8"
              highlightColor="#F8F7FC"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="bg-white/60 p-5 rounded-2xl border border-purple-100"
                >

                  <Skeleton
                    height={14}
                    width="40%"
                    borderRadius={6}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                  <div className="mt-3">

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

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <StudentNavbar user={user} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-12 pb-16 md:pb-24">

        {/* Decorative Background */}

        <div className="pointer-events-none absolute -top-10 left-0 w-40 h-40 sm:w-56 sm:h-56 bg-[#8D76D8]/10 rounded-full blur-3xl" />

        <div className="pointer-events-none absolute top-32 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-[#E8F3FF]/70 rounded-full blur-3xl" />

        {/* ================= LOADING ================= */}

        {loading ? (

          <ProfileSkeleton />

        ) : user ? (

          /* ================= PROFILE ================= */

          <div className="relative overflow-hidden bg-white/75 backdrop-blur-2xl rounded-[2rem] border border-white/80 shadow-[0_20px_60px_rgba(75,46,145,0.12)]">

            {/* ================= PREMIUM TOP BANNER ================= */}

            <div className="relative h-28 sm:h-36 md:h-40 bg-gradient-to-r from-[#6D4BC3] via-[#7D5BC8] to-[#8D76D8] overflow-hidden">

              <div className="absolute -top-16 -right-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-20 -left-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />

            </div>


            <div className="relative px-5 sm:px-8 md:px-12 pb-8 sm:pb-10">

              {/* ================= PROFILE HEADER ================= */}

              <div className="flex flex-col items-center text-center border-b border-purple-100/80 pb-8 -mt-16 sm:-mt-20">

                {/* Avatar */}

                <div className="relative">

                  <div className="absolute inset-0 rounded-full bg-[#8D76D8]/30 blur-xl scale-110" />

                  <div className="relative p-1.5 sm:p-2 rounded-full bg-white shadow-2xl">

                    <div className="
                      w-24
                      h-24
                      sm:w-28
                      sm:h-28
                      rounded-full
                      bg-gradient-to-tr
                      from-[#6D4BC3]
                      via-[#7D5BC8]
                      to-[#4B2E91]
                      text-white
                      flex
                      items-center
                      justify-center
                      text-3xl
                      sm:text-4xl
                      font-bold
                      uppercase
                      shadow-inner
                      ring-1
                      ring-purple-100
                    ">

                      {user.email
                        ? user.email[0]
                        : "S"}

                    </div>

                  </div>

                  {/* Online indicator */}

                  <div className="
                    absolute
                    bottom-2
                    right-2
                    w-5
                    h-5
                    sm:w-6
                    sm:h-6
                    rounded-full
                    bg-green-500
                    border-4
                    border-white
                    shadow-md
                  " />

                </div>


                {/* Name */}

                <div className="mt-4 max-w-full px-2">

                  <h1 className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-extrabold
                    text-slate-800
                    tracking-tight
                    break-all
                  ">

                    {user.email
                      ? user.email.split("@")[0]
                      : "Student"}

                  </h1>

                  <p className="
                    text-[#6D4BC3]
                    font-semibold
                    mt-2
                    uppercase
                    text-[11px]
                    sm:text-xs
                    md:text-sm
                    tracking-[0.16em]
                  ">

                    🎯 {user.role || "Student"} Account

                  </p>

                </div>

              </div>


              {/* ================= PROFILE INFO ================= */}

              <div className="pt-8 sm:pt-10">

                <div className="flex items-center gap-3 mb-5 sm:mb-6">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#F1EDFF]
                    border
                    border-[#DDD4F2]
                    flex
                    items-center
                    justify-center
                    text-lg
                  ">
                    📋
                  </div>

                  <div>

                    <h2 className="
                      text-lg
                      sm:text-xl
                      font-bold
                      text-[#4B2E91]
                    ">
                      Profile Information
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                      Your ClubVerse account details
                    </p>

                  </div>

                </div>


                <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                  sm:gap-5
                ">

                  {/* Email */}

                  <div className="
                    group
                    bg-white/70
                    hover:bg-white
                    p-4
                    sm:p-5
                    rounded-2xl
                    border
                    border-purple-100
                    hover:border-[#CFC2F0]
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                  ">

                    <span className="
                      text-[10px]
                      sm:text-xs
                      font-bold
                      text-gray-400
                      block
                      uppercase
                      tracking-wider
                    ">
                      Email Address
                    </span>

                    <span className="
                      text-slate-700
                      font-medium
                      text-sm
                      sm:text-base
                      mt-2
                      block
                      break-all
                    ">
                      {user.email}
                    </span>

                  </div>


                  {/* Account ID */}

                  <div className="
                    group
                    bg-white/70
                    hover:bg-white
                    p-4
                    sm:p-5
                    rounded-2xl
                    border
                    border-purple-100
                    hover:border-[#CFC2F0]
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                  ">

                    <span className="
                      text-[10px]
                      sm:text-xs
                      font-bold
                      text-gray-400
                      block
                      uppercase
                      tracking-wider
                    ">
                      Account ID
                    </span>

                    <span className="
                      text-slate-700
                      font-mono
                      text-xs
                      sm:text-sm
                      mt-2
                      block
                      break-all
                      leading-relaxed
                    ">
                      {user._id}
                    </span>

                  </div>


                  {/* Department */}

                  <div className="
                    group
                    bg-white/70
                    hover:bg-white
                    p-4
                    sm:p-5
                    rounded-2xl
                    border
                    border-purple-100
                    hover:border-[#CFC2F0]
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                  ">

                    <span className="
                      text-[10px]
                      sm:text-xs
                      font-bold
                      text-gray-400
                      block
                      uppercase
                      tracking-wider
                    ">
                      Department / Branch
                    </span>

                    <span className="
                      text-slate-700
                      font-medium
                      text-sm
                      sm:text-base
                      mt-2
                      block
                      leading-relaxed
                    ">
                      {getDepartment(user.email)}
                    </span>

                  </div>


                  {/* Joining Date */}

                  <div className="
                    group
                    bg-white/70
                    hover:bg-white
                    p-4
                    sm:p-5
                    rounded-2xl
                    border
                    border-purple-100
                    hover:border-[#CFC2F0]
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                  ">

                    <span className="
                      text-[10px]
                      sm:text-xs
                      font-bold
                      text-gray-400
                      block
                      uppercase
                      tracking-wider
                    ">
                      Joining Date
                    </span>

                    <span className="
                      text-slate-700
                      font-medium
                      text-sm
                      sm:text-base
                      mt-2
                      block
                    ">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ) : (

          /* ================= ERROR ================= */

          <div className="
            relative
            rounded-[2rem]
            bg-white/70
            backdrop-blur-2xl
            border
            border-white/80
            shadow-xl
            p-8
            sm:p-12
            md:p-16
            text-center
          ">

            <div className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-[#F1EDFF]
              flex
              items-center
              justify-center
              text-2xl
              mb-5
            ">
              ⚠️
            </div>

            <h2 className="
              text-xl
              sm:text-2xl
              font-bold
              text-[#6D4BC3]
            ">
              Failed to Load Profile
            </h2>

            <p className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
              max-w-md
              mx-auto
              leading-relaxed
            ">
              Please try logging in again to verify your token credentials.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

