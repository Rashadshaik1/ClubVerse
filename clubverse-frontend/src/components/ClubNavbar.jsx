import { useEffect, useState } from "react";
import {
  FaBell,
  FaChevronDown,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import collegeLogo from "../assets/gvpce-logo.png";

export default function ClubNavbar() {

  const navigate = useNavigate();

  const [club, setClub] = useState({});
  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);



  // ================= LOAD CLUB + NOTIFICATIONS =================

  useEffect(() => {

    const storedClub =
      JSON.parse(localStorage.getItem("club"));


    if(storedClub){

      setClub(storedClub);

      fetchNotifications(storedClub._id);

    }


  }, []);



  // ================= FETCH NOTIFICATIONS =================

  const fetchNotifications = async (clubId)=>{

    try{


      const res = await fetch(
        `http://localhost:5000/api/notifications/${clubId}`
      );


      const data = await res.json();


      setNotifications(data);


    }
    catch(error){

      console.log(
        "Notification fetch error:",
        error
      );

    }

  };




  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("club");

    navigate("/club-login");

  };



  return (

<header className="fixed top-0 left-0 w-full h-20 px-8 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm z-30 pt-1">


      
      {/* LEFT: Logo & Brand Info */}

      <div className="flex items-center gap-4 pl-16">

        <img
          src={collegeLogo}
          alt="College Logo"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-[#43bfc3]/20 shadow-sm"
        />


        <div>

          <h1 className="text-lg font-bold bg-gradient-to-r from-[#048c92] to-[#43bfc3] bg-clip-text text-transparent">

            GVPCE (A)

          </h1>


          <p className="text-[11px] font-medium text-gray-500 hidden sm:block">

            Gayatri Vidya Parishad College of Engineering (Autonomous)

          </p>


        </div>

      </div>





      {/* RIGHT */}

      <div className="flex items-center gap-5">



        {/* ================= NOTIFICATIONS ================= */}

        <div className="relative">

<button
  onClick={async () => {

    const opening =
      !showNotifications;


    setShowNotifications(opening);

    setShowProfile(false);



    // 🔔 When notification dropdown opens
    if (opening && club._id) {

      try {

        await fetch(
          `http://localhost:5000/api/notifications/read/${club._id}`,
          {
            method: "PUT"
          }
        );


        // update frontend immediately
        setNotifications(prev =>
          prev.map(item => ({
            ...item,
            isRead: true
          }))
        );


      } catch(error) {

        console.log(
          "Read notification error:",
          error
        );

      }

    }

  }}
  className="relative w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-50 border border-gray-200 hover:bg-[#eafcff] active:scale-95 shadow-sm transition-all duration-300"
>

            <FaBell className="text-[#048c92] text-lg" />


           {
  notifications.filter(
    item => !item.isRead
  ).length > 0 && (

    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">

      {
        notifications.filter(
          item => !item.isRead
        ).length
      }

    </span>

  )
}


          </button>





          {/* Dynamic Notification Menu */}

          {
            showNotifications && (

              <div className="absolute right-0 mt-3 w-80 rounded-2xl shadow-xl overflow-hidden z-50 bg-white border border-gray-200 animate-in fade-in slide-in-from-top-3 duration-200">


                <div className="p-4 font-bold border-b border-gray-100 text-[#048c92] tracking-wide text-sm bg-gray-50">

                  Notifications

                </div>



                <div className="divide-y divide-gray-50 font-medium text-xs text-gray-600">


                  {
                    notifications.length === 0 ? (

                      <div className="p-4 text-center text-gray-400">

                        No notifications yet

                      </div>

                    )

                    :

                    (

                      notifications.map((item)=>(


                        <div

                          key={item._id}

                          className="p-4 hover:bg-[#43bfc3]/5 cursor-pointer transition"

                        >


                          {item.message}


                          <p className="text-[10px] text-gray-400 mt-2">

                            {
                              new Date(
                                item.createdAt
                              ).toLocaleString()
                            }

                          </p>


                        </div>


                      ))

                    )

                  }


                </div>


              </div>

            )
          }


        </div>





        {/* ================= PROFILE ================= */}

        <div className="relative">


          <button

            onClick={()=>{

              setShowProfile(!showProfile);
              setShowNotifications(false);

            }}

            className="flex items-center gap-3 px-3 py-1.5 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-gray-50 shadow-none hover:shadow-sm transition-all duration-300"

          >


            <img

              src={
                club.logo ||
                "https://via.placeholder.com/45"
              }

              alt=""

              className="w-10 h-10 rounded-full border-2 border-[#43bfc3] shadow-md object-cover"

            />



            <div className="text-left hidden md:block">


              <h2 className="text-sm font-bold text-gray-800 tracking-wide">

                {club.name}

              </h2>


              <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">

                {club.type}

              </p>


            </div>


            <FaChevronDown className="text-xs text-gray-400" />


          </button>





          {
            showProfile && (

              <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-xl overflow-hidden z-50 bg-white border border-gray-200 animate-in fade-in slide-in-from-top-3 duration-200">


                <div className="p-2 space-y-1 font-semibold text-sm text-gray-600">


                  <button

                    onClick={()=>{
                      setShowProfile(false);
                      navigate("/profile");
                    }}

                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#43bfc3]/10 hover:text-[#048c92] transition"

                  >

                    <FaUser className="text-xs opacity-80" />

                    Profile

                  </button>



                  <div className="border-t border-gray-100 my-1" />



                  <button

                    onClick={logout}

                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-bold transition"

                  >

                    <FaSignOutAlt className="text-xs" />

                    Logout

                  </button>


                </div>


              </div>

            )
          }



        </div>



      </div>



</header>

  );

}