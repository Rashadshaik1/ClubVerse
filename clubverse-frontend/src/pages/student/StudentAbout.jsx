import React from 'react';
import { Users, LayoutDashboard, ShieldCheck, Mail } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-[#F8F5FF] pb-20">
      <StudentNavbar />
      
      <main className="pt-24 px-4 sm:px-8 max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <section className="text-center mb-24 mt-10">
          <div className="inline-block p-4 bg-white/70 backdrop-blur-xl border border-[#DDD4F2] rounded-3xl shadow-sm mb-8">
            <img src={logo} alt="ClubVerse" className="w-24 h-24 rounded-2xl" />
          </div>
          <h1 className="text-6xl font-extrabold text-[#4B2E91] mb-6 tracking-tight">ClubVerse</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ClubVerse is a comprehensive College Club Management System. 
            It provides a centralized platform for students to register and view events, 
            allows club admins to manage activities, and gives super admins full system oversight.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Users, title: "For Students", desc: "Discover clubs, register for memberships, and stay updated with past and upcoming events." },
            { icon: LayoutDashboard, title: "For Club Admins", desc: "Create and manage events, track member participation, and oversee club growth." },
            { icon: ShieldCheck, title: "Super Admin", desc: "Monitor the entire platform, manage registered clubs, and ensure system integrity." },
          ].map((item, idx) => (
            <div key={idx} className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-[#DDD4F2] shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-[#F8F5FF] rounded-2xl flex items-center justify-center mb-6 text-[#6D4BC3] group-hover:scale-105 transition-transform border border-[#DDD4F2]">
                <item.icon className="w-7 h-7 text-[#6D4BC3]" />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E91] mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Developer Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-extrabold text-[#4B2E91] text-center mb-16">Developed By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {developers.map((dev, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-[#DDD4F2] text-center hover:border-[#6D4BC3] transition-all hover:scale-105 shadow-sm">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img src={dev.img} alt={dev.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-[#4B2E91] text-lg">{dev.name}</h4>
                <p className="text-xs font-bold text-[#6D4BC3] uppercase tracking-wider mt-1">{dev.dept}</p>
                <p className="text-sm text-gray-500 mt-2 font-medium">{dev.roll}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section - Using Banner Theme Gradient */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#6D4BC3] to-[#8D76D8] rounded-3xl p-10 text-white text-center shadow-xl">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
          <p className="text-[#F8F5FF] mb-8 max-w-md mx-auto">Get in touch with our team for any inquiries or support regarding the platform.</p>
          <a href="mailto:clubverse@gvpce.ac.in" className="inline-flex items-center gap-2 bg-white text-[#6D4BC3] px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition shadow-lg hover:scale-105">
            <Mail className="w-5 h-5" /> clubverse@gvpce.ac.in
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDD4F2] py-10 text-center mt-10">
        <p className="text-gray-500 text-sm font-medium">
          © {new Date().getFullYear()} ClubVerse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}