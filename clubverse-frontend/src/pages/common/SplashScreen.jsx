import { useEffect } from "react";
import { motion } from "framer-motion";

import clubLogo from "../../assets/logo.png";
import collegeLogo from "../../assets/gvpce-logo.png";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (

    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f6f4ff] via-[#eef2ff] to-[#e6f7ff]">

      {/* =====================================================
          SOFT BACKGROUND GLOW
      ===================================================== */}

      <motion.div
        className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#8D76D8]/15 blur-3xl"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-[#43bfc3]/15 blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      {[
        { size: 5, left: "12%", top: "22%", delay: 0 },
        { size: 7, left: "24%", top: "70%", delay: 1 },
        { size: 4, left: "78%", top: "25%", delay: 1.5 },
        { size: 6, left: "88%", top: "65%", delay: 0.8 },
        { size: 4, left: "68%", top: "80%", delay: 2 },
        { size: 5, left: "35%", top: "15%", delay: 1.2 },
      ].map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#8D76D8]/30 pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4 + (index % 2),
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* =================================================
            CLUBVERSE LOGO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
            y: 15,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >

          {/* Logo glow */}

          <div className="absolute inset-0 rounded-3xl bg-[#8D76D8]/20 blur-2xl scale-125" />

          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl shadow-[#6D4BC3]/15 flex items-center justify-center p-3">

            <img
              src={clubLogo}
              alt="ClubVerse"
              className="w-full h-full object-contain"
            />

          </div>

        </motion.div>


        {/* =================================================
            TITLE
        ================================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
            letterSpacing: "0.35em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            letterSpacing: "0.02em",
          }}
          transition={{
            delay: 0.45,
            duration: 1,
            ease: "easeOut",
          }}
          className="mt-7 text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-[#6D4BC3] via-[#7C64CF] to-[#048c92] bg-clip-text text-transparent"
        >
          ClubVerse
        </motion.h1>


        {/* =================================================
            SUBTITLE
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
          className="mt-2 text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-[#6F61A8]/80 uppercase"
        >
          College Club Management
        </motion.p>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: 90,
            opacity: 1,
          }}
          transition={{
            delay: 1.25,
            duration: 0.7,
          }}
          className="h-[1px] mt-5 bg-gradient-to-r from-transparent via-[#8D76D8]/60 to-transparent"
        />


        {/* =================================================
            GVPCE BRANDING
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.4,
            duration: 0.8,
          }}
          className="mt-6 flex flex-col items-center"
        >

          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/45 backdrop-blur-md border border-white/70 shadow-sm flex items-center justify-center p-1.5">

            <img
              src={collegeLogo}
              alt="GVPCE"
              className="w-full h-full object-contain"
            />

          </div>

          <p className="mt-2 text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
            GVPCE
          </p>

        </motion.div>


        {/* =================================================
            LOADING LINE
        ================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 w-24 sm:w-28 h-[2px] bg-white/60 rounded-full overflow-hidden"
        >

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1/2 h-full bg-gradient-to-r from-[#6D4BC3] to-[#43bfc3]"
          />

        </motion.div>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-5 text-[9px] sm:text-[10px] tracking-widest text-gray-400 uppercase"
      >
        Connecting Campus Communities
      </motion.p>

    </div>
  );
}