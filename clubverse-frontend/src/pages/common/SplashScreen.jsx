import { useEffect } from "react";
import { motion } from "framer-motion";

import clubLogo from "../../assets/logo.png";
import collegeLogo from "../../assets/gvpce-logo.png";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const particles = [
    { size: 4, left: "8%", top: "20%", delay: 0, duration: 5 },
    { size: 6, left: "17%", top: "68%", delay: 1.2, duration: 6 },
    { size: 3, left: "27%", top: "14%", delay: 0.8, duration: 4.5 },
    { size: 5, left: "39%", top: "82%", delay: 2, duration: 6 },
    { size: 4, left: "58%", top: "12%", delay: 1.5, duration: 5 },
    { size: 6, left: "72%", top: "24%", delay: 0.5, duration: 6 },
    { size: 3, left: "84%", top: "58%", delay: 2.2, duration: 4.5 },
    { size: 5, left: "91%", top: "78%", delay: 1, duration: 6 },
    { size: 3, left: "65%", top: "86%", delay: 2.5, duration: 5 },
    { size: 4, left: "11%", top: "45%", delay: 1.8, duration: 5.5 },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f6f4ff] via-[#eef2ff] to-[#e6f7ff]">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#f6f4ff] via-[#eef2ff] to-[#e6f7ff]" />

      {/* Large lavender glow */}

      <motion.div
        className="absolute -top-40 -left-40 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full bg-[#8D76D8]/15 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan glow */}

      <motion.div
        className="absolute -bottom-40 -right-40 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full bg-[#43bfc3]/15 blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center soft glow */}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full bg-[#8D76D8]/10 blur-[90px]"
        animate={{
          scale: [0.9, 1.15, 0.9],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* =====================================================
          MOVING PARTICLES
      ===================================================== */}

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#8D76D8]/40 shadow-sm shadow-[#8D76D8]/30 pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, -10, -35, 0],
            x: [0, 8, -6, 5, 0],
            opacity: [0.15, 0.7, 0.35, 0.65, 0.15],
            scale: [0.8, 1.2, 0.9, 1.15, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* =====================================================
          SMALL CYAN PARTICLES
      ===================================================== */}

      {[
        { left: "22%", top: "32%", delay: 0.4 },
        { left: "78%", top: "40%", delay: 1.5 },
        { left: "48%", top: "18%", delay: 2 },
        { left: "58%", top: "75%", delay: 0.8 },
      ].map((particle, index) => (
        <motion.span
          key={`cyan-${index}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#43bfc3]/45 pointer-events-none"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.1, 0.7, 0.1],
          }}
          transition={{
            duration: 4.5,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* =====================================================
          DECORATIVE ORBIT
      ===================================================== */}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] rounded-full border border-[#8D76D8]/10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] sm:w-[430px] sm:h-[430px] rounded-full border border-[#43bfc3]/10"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 w-full max-w-3xl">


        {/* =================================================
            LOGO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.65,
            y: 25,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >

          {/* Outer glow */}

          <motion.div
            className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#8D76D8]/30 to-[#43bfc3]/20 blur-2xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Glass logo container */}

          <div className="relative w-[92px] h-[92px] sm:w-[112px] sm:h-[112px] md:w-[128px] md:h-[128px] rounded-[26px] sm:rounded-[30px] bg-white/55 backdrop-blur-2xl border border-white/80 shadow-[0_20px_60px_rgba(109,75,195,0.15)] flex items-center justify-center p-3 sm:p-4">

            {/* Inner shine */}

            <div className="absolute inset-[1px] rounded-[25px] bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

            <img
              src={clubLogo}
              alt="ClubVerse"
              className="relative z-10 w-full h-full object-contain"
            />

          </div>

        </motion.div>


        {/* =================================================
            TITLE
        ================================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
            letterSpacing: "0.35em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            letterSpacing: "0.015em",
          }}
          transition={{
            delay: 0.45,
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 sm:mt-7 text-[40px] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none bg-gradient-to-r from-[#6D4BC3] via-[#8069D0] to-[#048c92] bg-clip-text text-transparent"
        >
          ClubVerse
        </motion.h1>


        {/* =================================================
            SUBTITLE
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
          className="mt-3 text-[9px] sm:text-xs md:text-sm font-bold tracking-[0.28em] sm:tracking-[0.32em] text-[#6F61A8]/80 uppercase"
        >
          College Club Management
        </motion.p>


        {/* =================================================
            PREMIUM DIVIDER
        ================================================= */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: "min(120px, 30vw)",
            opacity: 1,
          }}
          transition={{
            delay: 1.3,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative h-px mt-5 bg-gradient-to-r from-transparent via-[#8D76D8]/60 to-transparent"
        >

          <motion.span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8D76D8]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

        </motion.div>


        {/* =================================================
            COLLEGE BRANDING
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.45,
            duration: 0.8,
          }}
          className="mt-5 sm:mt-6 flex flex-col items-center"
        >

          <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/50 backdrop-blur-xl border border-white/75 shadow-md flex items-center justify-center p-1.5">

            <img
              src={collegeLogo}
              alt="GVPCE"
              className="w-full h-full object-contain"
            />

          </div>

          <p className="mt-2 text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-[0.22em] text-gray-400 uppercase">
            GVPCE
          </p>

        </motion.div>


        {/* =================================================
            LOADING INDICATOR
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={{
            opacity: 1,
            width: "min(110px, 28vw)",
          }}
          transition={{
            delay: 1.9,
            duration: 0.7,
          }}
          className="relative mt-7 sm:mt-8 h-[2px] bg-white/70 rounded-full overflow-hidden"
        >

          <motion.div
            initial={{
              x: "-100%",
            }}
            animate={{
              x: "200%",
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1/2 h-full bg-gradient-to-r from-[#6D4BC3] via-[#8D76D8] to-[#43bfc3]"
          />

        </motion.div>


        {/* =================================================
            LOADING TEXT
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2.1,
            duration: 0.8,
          }}
          className="mt-3 text-[8px] sm:text-[9px] tracking-[0.22em] text-gray-400 uppercase"
        >
          Entering your campus world
        </motion.p>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <motion.p
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2.2,
          duration: 0.7,
        }}
        className="absolute bottom-4 sm:bottom-5 left-0 right-0 text-center px-4 text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] sm:tracking-[0.28em] text-gray-400 uppercase"
      >
        Connecting Campus Communities
      </motion.p>

    </div>
  );
}