import React from "react";
import {
  Users,
  LayoutDashboard,
  ShieldCheck,
  Mail,
  Sparkles,
} from "lucide-react";

import ClubSidebar from "../../components/ClubSidebar";
import ClubNavbar from "../../components/ClubNavbar";

// Assets
import logo from "../../assets/logoclub.png";
import dev1 from "../../assets/dev1.jpg";
import dev2 from "../../assets/dev2.jpg";
import dev3 from "../../assets/dev3.jpg";
import dev4 from "../../assets/dev4.jpg";

export default function About() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const developers = [
    {
      name: "Azeem",
      roll: "324103311037",
      dept: "IT",
      img: dev1,
    },
    {
      name: "Jahnavi",
      roll: "324103311038",
      dept: "IT",
      img: dev2,
    },
    {
      name: "Lahanya",
      roll: "324103311047",
      dept: "IT",
      img: dev3,
    },
    {
      name: "Rashad",
      roll: "324103311051",
      dept: "IT",
      img: dev4,
    },
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
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd]">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

     <ClubSidebar
  isOpen={sidebarOpen}
  setIsOpen={setSidebarOpen}
/>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

       <div className="flex-1 w-full min-w-0 pt-20 sm:pt-24 px-3 sm:px-5 lg:px-8 pb-8 sm:pb-12 transition-all duration-300">

  <ClubNavbar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
  />

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-10">

          <div className="max-w-6xl mx-auto">

            {/* =================================================
                HERO SECTION
            ================================================= */}

            <section className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] border border-[#cceeee] bg-white/70 backdrop-blur-xl shadow-sm">

              {/* Decorative background */}

              <div className="absolute -top-24 -right-24 w-56 h-56 sm:w-72 sm:h-72 bg-[#43bfc3]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="absolute -bottom-24 -left-24 w-56 h-56 sm:w-72 sm:h-72 bg-[#048c92]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16 text-center">

                {/* Logo */}

                <div className="relative inline-block mb-6 sm:mb-7">

                  <div className="absolute inset-0 rounded-[1.5rem] bg-[#43bfc3]/20 blur-xl scale-110" />

                  <img
                    src={logo}
                    alt="ClubVerse"
                    className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-2xl sm:rounded-3xl border-4 border-white shadow-xl"
                  />

                </div>

                {/* Small badge */}

                <div className="flex items-center justify-center gap-2 mb-3">

                  <Sparkles className="w-4 h-4 text-[#048c92]" />

                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#048c92]">
                    Smart Club Management
                  </span>

                </div>

                {/* Heading */}

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#048c92]">
                  ClubVerse
                </h1>

                {/* Description */}

                <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-gray-500">
                  ClubVerse is a comprehensive College Club Management System
                  designed to bring students, clubs, and administrators together
                  on one centralized platform.
                </p>

                <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm leading-6 text-gray-400">
                  Discover events, manage club activities, track participation,
                  and create a more connected campus experience.
                </p>

                {/* Bottom accent */}

                <div className="flex justify-center mt-7">

                  <div className="h-1 w-16 rounded-full bg-[#048c92]" />

                </div>

              </div>

            </section>


            {/* =================================================
                FEATURES SECTION
            ================================================= */}

            <section className="mt-12 sm:mt-16">

              {/* Section Heading */}

              <div className="text-center mb-7 sm:mb-9">

                <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#048c92]">
                  Built For Everyone
                </p>

                <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black text-gray-800">
                  One Platform. Three Experiences.
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
                  ClubVerse simplifies the complete college club ecosystem
                  for every type of user.
                </p>

              </div>


              {/* Feature Cards */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">

                {features.map((item, idx) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={idx}
                      className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-[#cceeee] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >

                      {/* Hover glow */}

                      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#43bfc3]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Icon */}

                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#048c92]/10 border border-[#43bfc3]/20 flex items-center justify-center mb-5 group-hover:bg-[#048c92] transition-colors duration-300">

                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#048c92] group-hover:text-white transition-colors duration-300" />

                      </div>

                      {/* Content */}

                      <h3 className="text-base sm:text-lg font-black text-gray-800">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm leading-6 text-gray-500">
                        {item.desc}
                      </p>


                    </div>
                  );
                })}

              </div>

            </section>


            {/* =================================================
                DEVELOPERS SECTION
            ================================================= */}

            <section className="mt-14 sm:mt-20">

              <div className="bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl sm:rounded-[2rem] shadow-sm overflow-hidden">

                {/* Header */}

                <div className="px-5 py-8 sm:px-8 sm:py-10 text-center border-b border-[#e8f7f7]">

                  <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#048c92]">
                    Our Team
                  </p>

                  <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black text-gray-800">
                    Developed By
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm text-gray-400">
                    The team behind the ClubVerse experience.
                  </p>

                </div>


                {/* Developers */}

                <div className="p-5 sm:p-8 lg:p-10">

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                    {developers.map((dev, idx) => (

                      <div
                        key={idx}
                        className="group text-center bg-white/70 border border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-5 hover:border-[#bce8e9] hover:shadow-lg transition-all duration-300"
                      >

                        {/* Profile Image */}

                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto">

                          <div className="absolute inset-0 rounded-full bg-[#43bfc3]/20 blur-md scale-105 opacity-0 group-hover:opacity-100 transition-opacity" />

                          <img
                            src={dev.img}
                            alt={dev.name}
                            className="relative w-full h-full object-cover rounded-full border-4 border-[#eafcff] shadow-md group-hover:scale-105 transition-transform duration-300"
                          />

                        </div>

                        {/* Name */}

                        <h4 className="mt-4 text-sm sm:text-base font-black text-gray-800">
                          {dev.name}
                        </h4>

                        {/* Department */}

                        <span className="inline-block mt-1 px-2.5 py-1 rounded-full bg-[#048c92]/10 border border-[#43bfc3]/20 text-[9px] sm:text-[10px] font-black text-[#048c92] uppercase tracking-wider">
                          {dev.dept}
                        </span>

                        {/* Roll */}

                        <p className="mt-2 text-[9px] sm:text-[11px] text-gray-400 font-medium break-all">
                          {dev.roll}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>


                {/* =================================================
                    CONTACT / COPYRIGHT
                ================================================= */}

                <div className="border-t border-[#e8f7f7] px-5 py-7 sm:px-8 sm:py-8 text-center">

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-500">

                    <div className="w-8 h-8 rounded-xl bg-[#048c92]/10 flex items-center justify-center">

                      <Mail className="w-4 h-4 text-[#048c92]" />

                    </div>

                    <p className="text-xs sm:text-sm font-semibold">

                      For any queries:{" "}

                      <a
                        href="mailto:clubverse@gvpce.ac.in"
                        className="text-[#048c92] font-bold hover:underline break-all"
                      >
                        clubverse@gvpce.ac.in
                      </a>

                    </p>

                  </div>

                  <div className="mt-5 pt-5 border-t border-gray-100">

                    <p className="text-[10px] sm:text-xs text-gray-400">
                      © {new Date().getFullYear()} ClubVerse. All rights reserved.
                    </p>

                  </div>

                </div>

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}