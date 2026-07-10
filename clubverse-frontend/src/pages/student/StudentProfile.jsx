import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= DEPARTMENT FROM ROLL NUMBER =================

  const getDepartment = (email) => {
    if (!email) return "Not Specified";

    const roll = email.split("@")[0];

    // Change these indexes if your roll number format differs
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
      // "09": "Computer Science & Engineering(CS)",
      "82": "Computer Science & Engineering(ML)",
      "83": "Computer Science & Engineering(DS)",
    };

    return departmentMap[branchCode] || "Not Specified";
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);

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
      console.error("Error fetching profile details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">
      <StudentNavbar user={user} />

      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6D4BC3]"></div>
          </div>
        ) : user ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-50/50 shadow-lg">

            {/* ================= PROFILE HEADER ================= */}

            <div className="flex flex-col items-center border-b border-purple-100 pb-8 mb-8 text-center">

              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#6D4BC3] to-[#4B2E91] text-white flex items-center justify-center text-4xl font-bold shadow-md uppercase">
                {user.email ? user.email[0] : "S"}
              </div>

              <div className="mt-4">
                <h1 className="text-3xl font-bold text-slate-800">
                  {user.email ? user.email.split("@")[0] : "Student"}
                </h1>

                <p className="text-[#6D4BC3] font-medium mt-1 uppercase text-sm tracking-wider">
                  🎯 {user.role || "Student"} Account
                </p>
              </div>

            </div>

            {/* ================= PROFILE INFO ================= */}

            <div>

              <h2 className="text-xl font-bold text-[#4B2E91] mb-6">
                📋 Profile Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">

                {/* Email */}

                <div className="bg-white/50 p-5 rounded-2xl border border-purple-50">
                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
                    Email Address
                  </span>

                  <span className="text-slate-700 font-medium text-base mt-1 block break-all">
                    {user.email}
                  </span>
                </div>

                {/* Account ID */}

                <div className="bg-white/50 p-5 rounded-2xl border border-purple-50">
                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
                    Account ID
                  </span>

                  <span className="text-slate-700 font-mono text-sm mt-1 block">
                    {user._id}
                  </span>
                </div>

                {/* Department */}

                <div className="bg-white/50 p-5 rounded-2xl border border-purple-50">
                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
                    Department / Branch
                  </span>

                  <span className="text-slate-700 font-medium text-base mt-1 block">
                    {getDepartment(user.email)}
                  </span>
                </div>

                {/* Joining Date */}

                <div className="bg-white/50 p-5 rounded-2xl border border-purple-50">
                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
                    Joining Date
                  </span>

                  <span className="text-slate-700 font-medium text-base mt-1 block">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg p-16 text-center">

            <h2 className="text-2xl font-bold text-[#6D4BC3]">
              Failed to Load Profile
            </h2>

            <p className="text-gray-500 mt-3">
              Please try logging in again to verify your token credentials.
            </p>

          </div>
        )}
      </div>
    </div>
  );
}