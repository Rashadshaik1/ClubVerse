
import React from "react";
import {
  Users,
  LayoutDashboard,
  ShieldCheck,
  Mail,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import StudentNavbar from "../../pages/student/StudentNavbar";

// Assets remain unchanged
import logo from "../../assets/logo.png";
import dev1 from "../../assets/dev1.jpg";
import dev2 from "../../assets/dev2.jpg";
import dev3 from "../../assets/dev3.jpg";
import dev4 from "../../assets/dev4.jpg";

export default function StudentAbout() {
  const developers = [
    { name: "Azeem", roll: "324103311037", dept: "IT", img: dev1 },
    { name: "Jahnavi", roll: "324103311038", dept: "IT", img: dev2 },
    { name: "Lahanya", roll: "324103311047", dept: "IT", img: dev3 },
    { name: "Rashad", roll: "324103311051", dept: "IT", img: dev4 },
  ];

  const features = [
    {
      icon: Users,
      title: "For Students",
      desc: "Discover clubs, register for memberships, and stay updated with past and upcoming events.",
    },
    {
      icon: LayoutDashboard,
      title: "For Club Admins",
      desc: "Create and manage events, track member participation, and oversee club growth.",
    },
    {
      icon: ShieldCheck,
      title: "Super Admin",
      desc: "Monitor the entire platform, manage registered clubs, and ensure system integrity.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5FF] via-[#F4F1FF] to-[#EEF2FF] text-gray-800 overflow-hidden">

      <StudentNavbar />

      <main className="relative pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* ===================================================== */}
        {/* BACKGROUND DECORATIONS */}
        {/* ===================================================== */}

        <div className="pointer-events-none absolute top-20 left-0 w-72 h-72 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-96 right-0 w-80 h-80 bg-[#6D4BC3]/10 rounded-full blur-3xl" />

        {/* ===================================================== */}
        {/* HERO SECTION */}
        {/* ===================================================== */}

        <section className="relative text-center mt-8 sm:mt-10 lg:mt-14 mb-20 sm:mb-24 lg:mb-28">

          {/* Logo */}

          <div className="
            inline-flex
            p-2
            sm:p-3
            bg-white/80
            backdrop-blur-xl
            border
            border-white
            rounded-[1.5rem]
            sm:rounded-[2rem]
            shadow-[0_15px_45px_rgba(75,46,145,0.12)]
            mb-6
            sm:mb-8
          ">

            <div className="
              p-2
              sm:p-3
              rounded-2xl
              bg-gradient-to-br
              from-[#F8F5FF]
              to-[#EDE7FF]
            ">

              <img
                src={logo}
                alt="ClubVerse"
                className="
                  w-16
                  h-16
                  sm:w-20
                  sm:h-20
                  lg:w-24
                  lg:h-24
                  rounded-xl
                  sm:rounded-2xl
                  object-cover
                "
              />

            </div>

          </div>

          {/* Small Badge */}

          <div className="flex justify-center mb-4 sm:mb-5">

            <div className="
              inline-flex
              items-center
              gap-2
              px-3
              sm:px-4
              py-2
              rounded-full
              bg-white/70
              backdrop-blur-md
              border
              border-[#DDD4F2]
              text-[#6D4BC3]
              text-xs
              sm:text-sm
              font-semibold
              shadow-sm
            ">

              <Sparkles size={15} />

              <span>Smart College Club Management</span>

            </div>

          </div>

          {/* Gradient ClubVerse Heading */}

          <h1 className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            font-extrabold
            tracking-tight
            mb-5
            sm:mb-6
            bg-gradient-to-r
            from-[#4B2E91]
            via-[#6D4BC3]
            to-[#9B7BE8]
            bg-clip-text
            text-transparent
          ">
            ClubVerse
          </h1>

          <p className="
            text-base
            sm:text-lg
            lg:text-xl
            text-gray-600
            max-w-3xl
            mx-auto
            leading-7
            sm:leading-8
            px-2
          ">
            ClubVerse is a comprehensive College Club Management System.
            It provides a centralized platform for students to register and
            view events, allows club admins to manage activities, and gives
            super admins full system oversight.
          </p>

        </section>


        {/* ===================================================== */}
        {/* FEATURES */}
        {/* ===================================================== */}

        <section className="mb-20 sm:mb-24 lg:mb-28">

          <div className="text-center mb-10 sm:mb-14">

            <p className="
              text-sm
              font-semibold
              text-[#6D4BC3]
              uppercase
              tracking-[0.2em]
              mb-3
            ">
              One Platform
            </p>

            <h2 className="
              text-3xl
              sm:text-4xl
              font-extrabold
              text-[#4B2E91]
            ">
              Built for Everyone
            </h2>

          </div>


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            sm:gap-6
          ">

            {features.map((item, idx) => {

              const Icon = item.icon;

              return (

                <div
                  key={idx}
                  className="
                    group
                    relative
                    bg-white/75
                    backdrop-blur-xl
                    p-6
                    sm:p-7
                    lg:p-8
                    rounded-3xl
                    border
                    border-white
                    shadow-[0_12px_40px_rgba(75,46,145,0.08)]
                    hover:shadow-[0_20px_55px_rgba(75,46,145,0.15)]
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    overflow-hidden
                  "
                >

                  {/* Card Glow */}

                  <div className="
                    absolute
                    -top-12
                    -right-12
                    w-28
                    h-28
                    rounded-full
                    bg-[#8B5CF6]/10
                    blur-2xl
                    group-hover:bg-[#8B5CF6]/20
                    transition
                  " />

                  {/* Icon */}

                  <div className="
                    relative
                    w-14
                    h-14
                    sm:w-16
                    sm:h-16
                    bg-gradient-to-br
                    from-[#F3EEFF]
                    to-[#E8E0FF]
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    mb-6
                    border
                    border-[#DDD4F2]
                    group-hover:scale-105
                    transition-transform
                    duration-300
                  ">

                    <Icon className="
                      w-7
                      h-7
                      sm:w-8
                      sm:h-8
                      text-[#6D4BC3]
                    " />

                  </div>

                  <h3 className="
                    text-lg
                    sm:text-xl
                    font-bold
                    text-[#4B2E91]
                    mb-3
                  ">
                    {item.title}
                  </h3>

                  <p className="
                    text-sm
                    sm:text-base
                    text-gray-600
                    leading-7
                  ">
                    {item.desc}
                  </p>

                </div>

              );

            })}

          </div>

        </section>


        {/* ===================================================== */}
        {/* DEVELOPERS */}
        {/* ===================================================== */}

        <section className="mb-20 sm:mb-24 lg:mb-28">

          <div className="text-center mb-10 sm:mb-14">

            <p className="
              text-sm
              font-semibold
              text-[#6D4BC3]
              uppercase
              tracking-[0.2em]
              mb-3
            ">
              Our Team
            </p>

            <h2 className="
              text-3xl
              sm:text-4xl
              font-extrabold
              text-[#4B2E91]
            ">
              Developed By
            </h2>

          </div>


          <div className="
            grid
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            sm:gap-6
            lg:gap-7
          ">

            {developers.map((dev, idx) => (

              <div
                key={idx}
                className="
                  group
                  relative
                  bg-white/80
                  backdrop-blur-xl
                  p-4
                  sm:p-6
                  rounded-3xl
                  border
                  border-white
                  text-center
                  shadow-[0_12px_40px_rgba(75,46,145,0.08)]
                  hover:shadow-[0_20px_50px_rgba(75,46,145,0.15)]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  overflow-hidden
                "
              >

                {/* Top Gradient */}

                <div className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-1
                  bg-gradient-to-r
                  from-[#6D4BC3]
                  to-[#9B7BE8]
                  opacity-70
                " />

                {/* Profile */}

                <div className="
                  w-20
                  h-20
                  sm:w-24
                  sm:h-24
                  mx-auto
                  mb-4
                  sm:mb-6
                  rounded-full
                  overflow-hidden
                  border-4
                  border-white
                  shadow-lg
                  group-hover:scale-105
                  transition-transform
                  duration-300
                ">

                  <img
                    src={dev.img}
                    alt={dev.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                <h4 className="
                  font-bold
                  text-[#4B2E91]
                  text-base
                  sm:text-lg
                  truncate
                ">
                  {dev.name}
                </h4>

                <p className="
                  text-[10px]
                  sm:text-xs
                  font-bold
                  text-[#6D4BC3]
                  uppercase
                  tracking-wider
                  mt-1
                ">
                  {dev.dept}
                </p>

                <p className="
                  text-[11px]
                  sm:text-sm
                  text-gray-500
                  mt-2
                  font-medium
                  break-all
                ">
                  {dev.roll}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* ===================================================== */}
        {/* CONTACT */}
        {/* ===================================================== */}

        <section className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#6D4BC3]
          via-[#7958CB]
          to-[#8D76D8]
          rounded-3xl
          p-7
          sm:p-10
          lg:p-14
          text-white
          text-center
          shadow-[0_25px_70px_rgba(75,46,145,0.25)]
        ">

          {/* Decorative circles */}

          <div className="
            absolute
            -top-20
            -right-20
            w-64
            h-64
            rounded-full
            bg-white/10
            blur-3xl
          " />

          <div className="
            absolute
            -bottom-24
            -left-20
            w-72
            h-72
            rounded-full
            bg-purple-300/10
            blur-3xl
          " />

          <div className="relative z-10">

            <div className="
              inline-flex
              items-center
              justify-center
              w-12
              h-12
              rounded-2xl
              bg-white/15
              mb-5
            ">

              <Mail size={22} />

            </div>

            <h3 className="
              text-2xl
              sm:text-3xl
              font-bold
              mb-3
            ">
              Have Questions?
            </h3>

            <p className="
              text-sm
              sm:text-base
              text-[#F8F5FF]
              mb-7
              sm:mb-8
              max-w-md
              mx-auto
              leading-7
            ">
              Get in touch with our team for any inquiries or support
              regarding the platform.
            </p>

            <a
              href="mailto:clubverse@gvpce.ac.in"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                w-full
                sm:w-auto
                bg-white
                text-[#6D4BC3]
                px-6
                sm:px-8
                py-3.5
                sm:py-4
                rounded-2xl
                font-bold
                text-sm
                sm:text-base
                hover:bg-gray-100
                transition
                shadow-lg
                hover:shadow-xl
                hover:-translate-y-0.5
              "
            >

              <Mail className="w-5 h-5 shrink-0" />

              <span>clubverse@gvpce.ac.in</span>

              <ArrowUpRight
                size={17}
                className="hidden sm:block"
              />

            </a>

          </div>

        </section>

      </main>


      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer className="
        border-t
        border-[#DDD4F2]
        py-8
        sm:py-10
        text-center
        mt-12
        sm:mt-16
        px-4
      ">

        <div className="
          flex
          items-center
          justify-center
          gap-2
          mb-2
        ">

          <span className="
            font-bold
            bg-gradient-to-r
            from-[#4B2E91]
            to-[#8D76D8]
            bg-clip-text
            text-transparent
          ">
            ClubVerse
          </span>

        </div>

        <p className="
          text-gray-500
          text-xs
          sm:text-sm
          font-medium
        ">
          © {new Date().getFullYear()} ClubVerse. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

