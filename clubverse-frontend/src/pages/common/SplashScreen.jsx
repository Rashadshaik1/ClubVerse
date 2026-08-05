
import { useEffect } from "react";
import { motion } from "framer-motion";

import clubLogo from "../../assets/logo.png";
import collegeLogo from "../../assets/gvpce-logo.png";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  // Background particles
  const particles = [
    { size: 4, x: "8%", y: "18%", delay: 0 },
    { size: 6, x: "16%", y: "70%", delay: 0.8 },
    { size: 3, x: "27%", y: "28%", delay: 1.4 },
    { size: 5, x: "38%", y: "12%", delay: 0.4 },
    { size: 4, x: "52%", y: "82%", delay: 1.8 },
    { size: 6, x: "63%", y: "20%", delay: 1.1 },
    { size: 3, x: "74%", y: "68%", delay: 0.6 },
    { size: 5, x: "84%", y: "32%", delay: 1.6 },
    { size: 4, x: "92%", y: "76%", delay: 0.3 },
    { size: 3, x: "44%", y: "55%", delay: 2 },
    { size: 5, x: "12%", y: "46%", delay: 1.2 },
    { size: 4, x: "89%", y: "14%", delay: 0.9 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f7f5ff] via-[#eef1ff] to-[#e7f8f8]"
    >

      {/* =====================================================
          BASE BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#f6f4ff] via-[#eef2ff] to-[#e6f7ff]" />


      {/* =====================================================
          LARGE CINEMATIC GLOWS
      ===================================================== */}

      <motion.div
        className="absolute -top-40 -left-40 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full bg-[#8D76D8]/20 blur-[90px]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.45, 0.7, 0.45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-48 -right-40 w-[450px] h-[450px] sm:w-[560px] sm:h-[560px] rounded-full bg-[#43bfc3]/20 blur-[100px]"
        animate={{
          scale: [1.08, 0.92, 1.08],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center soft glow */}

      <motion.div
        className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#8D76D8]/10 blur-[100px]"
        animate={{
          scale: [0.9, 1.15, 0.9],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 5,
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
          className="absolute rounded-full bg-[#8D76D8]/40 pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            y: [0, -25, 0, 20, 0],
            x: [0, 10, -8, 6, 0],
            opacity: [0.15, 0.7, 0.25, 0.6, 0.15],
            scale: [0.8, 1.2, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: 5 + (index % 3),
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* =====================================================
          EXTRA TEAL PARTICLES
      ===================================================== */}

      {[
        { x: "20%", y: "35%", delay: 0.5 },
        { x: "70%", y: "45%", delay: 1.5 },
        { x: "82%", y: "82%", delay: 2 },
        { x: "31%", y: "85%", delay: 1 },
      ].map((particle, index) => (
        <motion.span
          key={`teal-${index}`}
          className="absolute w-[3px] h-[3px] rounded-full bg-[#43bfc3]/50 pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.7, 0.1],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* =====================================================
          CINEMATIC CONTENT
      ===================================================== */}

      <div className="relative z-10 w-full flex flex-col items-center justify-center px-5 sm:px-8 text-center">


        {/* =================================================
            LOGO REVEAL
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.45,
            rotate: -8,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: 0,
          }}
          transition={{
            duration: 1.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >

          {/* Outer glow */}

          <motion.div
            className="absolute inset-[-18px] rounded-[32px] bg-gradient-to-br from-[#8D76D8]/30 to-[#43bfc3]/20 blur-2xl"
            animate={{
              opacity: [0.35, 0.7, 0.35],
              scale: [0.9, 1.08, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />


          {/* Logo glass container */}

          <div className="
            relative
            w-24 h-24
            xs:w-28 xs:h-28
            sm:w-32 sm:h-32
            md:w-36 md:h-36
            rounded-[28px]
            sm:rounded-[32px]
            bg-white/55
            backdrop-blur-2xl
            border border-white/80
            shadow-2xl
            shadow-[#6D4BC3]/15
            flex items-center justify-center
            p-3 sm:p-4
          ">

            <img
              src={clubLogo}
              alt="ClubVerse"
              className="w-full h-full object-contain drop-shadow-lg"
            />

          </div>

        </motion.div>


        {/* =================================================
            CLUBVERSE TITLE
        ================================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.92,
            letterSpacing: "0.45em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            letterSpacing: "0.015em",
          }}
          transition={{
            delay: 0.55,
            duration: 1.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mt-7
            sm:mt-8
            text-[2.35rem]
            xs:text-[2.7rem]
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            leading-none
            font-black
            bg-gradient-to-r
            from-[#6D4BC3]
            via-[#7C64CF]
            to-[#048c92]
            bg-clip-text
            text-transparent
            drop-shadow-sm
          "
        >
          ClubVerse
        </motion.h1>


        {/* =================================================
            SUBTITLE
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 1.25,
            duration: 0.9,
            ease: "easeOut",
          }}
          className="
            mt-3
            text-[9px]
            xs:text-[10px]
            sm:text-xs
            md:text-sm
            font-bold
            tracking-[0.28em]
            sm:tracking-[0.35em]
            uppercase
            text-[#6F61A8]/80
          "
        >
          College Club Management
        </motion.p>


        {/* =================================================
            CINEMATIC DIVIDER
        ================================================= */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: "clamp(70px, 18vw, 130px)",
            opacity: 1,
          }}
          transition={{
            delay: 1.55,
            duration: 0.9,
            ease: "easeOut",
          }}
          className="
            h-[1px]
            mt-5
            bg-gradient-to-r
            from-transparent
            via-[#8D76D8]/60
            to-transparent
          "
        />


        {/* =================================================
            GVPCE BRANDING
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 1.75,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-6 sm:mt-7 flex flex-col items-center"
        >

          <div className="
            w-10 h-10
            sm:w-12 sm:h-12
            md:w-14 md:h-14
            rounded-full
            bg-white/45
            backdrop-blur-xl
            border border-white/70
            shadow-md
            flex items-center justify-center
            p-1.5
          ">

            <img
              src={collegeLogo}
              alt="GVPCE"
              className="w-full h-full object-contain"
            />

          </div>

          <p className="
            mt-2
            text-[8px]
            sm:text-[9px]
            md:text-[10px]
            font-semibold
            tracking-[0.22em]
            text-gray-400
            uppercase
          ">
            GVPCE
          </p>

        </motion.div>


        {/* =================================================
            LOADING / REVEAL LINE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={{
            opacity: 1,
            width: "clamp(90px, 24vw, 150px)",
          }}
          transition={{
            delay: 2.05,
            duration: 0.7,
          }}
          className="
            relative
            mt-8
            h-[2px]
            bg-white/60
            rounded-full
            overflow-hidden
          "
        >

          <motion.div
            initial={{
              x: "-120%",
            }}
            animate={{
              x: "220%",
            }}
            transition={{
              duration: 1.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-0
              top-0
              w-1/2
              h-full
              rounded-full
              bg-gradient-to-r
              from-[#6D4BC3]
              via-[#8D76D8]
              to-[#43bfc3]
            "
          />

        </motion.div>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <motion.p
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2.25,
          duration: 0.7,
        }}
        className="
          absolute
          bottom-5
          sm:bottom-6
          text-[8px]
          sm:text-[9px]
          md:text-[10px]
          tracking-[0.2em]
          sm:tracking-[0.28em]
          text-gray-400/90
          uppercase
          text-center
          px-4
        "
      >
        Connecting Campus Communities
      </motion.p>


      {/* =====================================================
          SUBTLE VIGNETTE
      ===================================================== */}

      <div className="
        absolute inset-0
        pointer-events-none
        bg-[radial-gradient(circle_at_center,transparent_35%,rgba(109,75,195,0.04)_100%)]
      " />

    </motion.div>
  );
}

