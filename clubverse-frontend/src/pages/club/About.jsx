import React from 'react';
import { Users, LayoutDashboard, ShieldCheck, Mail } from 'lucide-react';
import ClubSidebar from "../../components/ClubSidebar";
import ClubNavbar from "../../components/ClubNavbar";

// ఇక్కడ నీ అసెట్స్ ని ఇంపోర్ట్ చేసుకో
import logo from "../../assets/logoclub.png";
import dev1 from "../../assets/dev1.jpg";
import dev2 from "../../assets/dev2.jpg";
import dev3 from "../../assets/dev3.jpg";
import dev4 from "../../assets/dev4.jpg";

export default function About() {
  const developers = [
    { name: "Azeem", roll: "324103311037", dept: "IT", img: dev1 },
    { name: "Jahnavi", roll: "324103311038", dept: "IT", img: dev2 },
    { name: "Lahanya", roll: "324103311047", dept: "IT", img: dev3 },
    { name: "Rashad", roll: "324103311051", dept: "IT", img: dev4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      <ClubSidebar />
      
      <div className="flex-1 w-full">
        <ClubNavbar />
        
        <div className="pt-24 px-8 pb-12 max-w-5xl mx-auto">
          {/* Main Introduction */}
          <div className="text-center mb-20">
            <img src={logo} alt="ClubVerse" className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-lg" />
            <h1 className="text-5xl font-black text-[#048c92] mb-4">ClubVerse</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ClubVerse is a comprehensive College Club Management System. 
              It provides a centralized platform for students to register and view events, 
              allows club admins to manage activities, and gives super admins full system oversight.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: Users, title: "For Students", desc: "Discover clubs, register for memberships, and stay updated with past and upcoming events." },
              { icon: LayoutDashboard, title: "For Club Admins", desc: "Create and manage events, track member participation, and oversee club growth." },
              { icon: ShieldCheck, title: "Super Admin", desc: "Monitor the entire platform, manage registered clubs, and ensure system integrity." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-[#048c92] mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-8">
            <h2 className="text-2xl font-black text-center text-gray-800 mb-12">Developed By</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {developers.map((dev, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#eafcff] shadow-md group-hover:scale-105 transition-transform">
                    <img src={dev.img} alt={dev.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-gray-800">{dev.name}</h4>
                  <p className="text-[10px] font-black text-[#048c92] uppercase tracking-widest mt-0.5">{dev.dept}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{dev.roll}</p>
                </div>
              ))}
            </div>

            {/* Contact & Copyright Section */}
            <div className="text-center border-t border-gray-100 pt-8">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <Mail className="w-4 h-4" />
                <p className="text-sm font-bold">For any queries: <a href="mailto:clubverse@gvpce.ac.in" className="text-[#048c92] hover:underline">clubverse@gvpce.ac.in</a></p>
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} ClubVerse. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}