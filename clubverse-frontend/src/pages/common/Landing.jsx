import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserGraduate, FaUsers } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center px-4 sm:px-6">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f6f4ff] via-[#eef2ff] to-[#e6f7ff]" />

      {/* BLOBS */}
      <div className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] bg-purple-300/20 blur-3xl rounded-full top-[-80px] sm:top-[-100px] md:top-[-120px] left-[-80px] sm:left-[-100px] md:left-[-120px]" />
      <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] bg-cyan-300/20 blur-3xl rounded-full bottom-[-80px] sm:bottom-[-100px] md:bottom-[-120px] right-[-80px] sm:right-[-100px] md:right-[-120px]" />

      {/* CONTENT */}
      <div className="relative w-full flex flex-col items-center text-center mt-8 sm:mt-10 md:mt-12 pb-20">

        {/* LOGO */}
        <motion.img
          src={logo}
          className="w-20 sm:w-24 md:w-28 mb-4 drop-shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* TITLE */}
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8] bg-clip-text text-transparent">
          ClubVerse
        </h1>

        <p className="text-sm sm:text-base text-[#6F61A8] mt-2 mb-8 sm:mb-10 font-medium">
          Choose your mode to continue
        </p>

        {/* CARDS */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-14">

          {/* STUDENT */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-full max-w-[260px] p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-[#DDD4F2]"
          >

            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
              bg-gradient-to-br from-[#D6CCF5] to-[#BCAEEA]"
            >
              <FaUserGraduate className="text-xl text-[#6D4BC3]" />
            </div>

            <button
              onClick={() => navigate("/student-auth")}
              className="w-full py-2 rounded-full font-semibold text-white
              bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8]
              border border-[#8D76D8]/50"
            >
              Student
            </button>

            <p className="text-sm text-[#6F61A8] mt-3">
              Join clubs, attend events, grow skills
            </p>

          </motion.div>

          {/* CLUB */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-full max-w-[260px] p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-[#cceeee]"
          >

            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
              bg-gradient-to-br from-[#43bfc3] to-[#048c92]"
            >
              <FaUsers className="text-xl text-white" />
            </div>

            <button
              onClick={() => navigate("/club-login")}
              className="w-full py-2 rounded-full font-semibold text-white
              bg-gradient-to-r from-[#048c92] to-[#43bfc3]
              border border-[#43bfc3]/50"
            >
              Club
            </button>

            <p className="text-sm text-[#2f6f72] mt-3">
              Manage clubs, users & events
            </p>

          </motion.div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="relative z-10 mt-auto pb-5 pt-4 text-center text-xs text-gray-500">
        © 2026 ClubVerse • Privacy • Help
      </footer>

    </div>
  );
}