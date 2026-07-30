import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventCarousel({ children, itemsLength }) {

  const sliderRef = useRef(null);

  const [active, setActive] = useState(0);

  const slides = Math.ceil(itemsLength / 3);

  const scroll = (direction)=>{

    const container = sliderRef.current;

    const cardWidth = 380;

if(direction === "next"){
  container.scrollLeft += cardWidth;
}
else{
  container.scrollLeft -= cardWidth;
}

  };


  const handleScroll = ()=>{

    const container = sliderRef.current;

    const index = Math.round(
      container.scrollLeft / container.clientWidth
    );

    setActive(index);

  };


  return (

    <div className="relative">


      {/* LEFT ARROW */}

 <button
disabled={active===0}
onClick={()=>scroll("prev")}
        className="
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        z-10
        w-10
        h-10
        rounded-full
        bg-white/70
        backdrop-blur-xl
        shadow-lg
        flex
        items-center
        justify-center
        hover:scale-110
        transition
        "
      >

        <ChevronLeft/>

      </button>



      {/* CARDS */}

      <div
      ref={sliderRef}
      onScroll={handleScroll}
      className="
      flex
      gap-6
      overflow-x-auto
      scroll-smooth
      snap-x
      snap-mandatory
      scrollbar-hide
      px-12
      "
      >

        {children}

      </div>



      {/* RIGHT ARROW */}

   <button
disabled={active===slides-1}
onClick={()=>scroll("next")}
        className="
        absolute
        right-0
        top-1/2
        -translate-y-1/2
        z-10
        w-10
        h-10
        rounded-full
        bg-white/70
        backdrop-blur-xl
        shadow-lg
        flex
        items-center
        justify-center
        hover:scale-110
        transition
        "
      >

        <ChevronRight/>

      </button>



      {/* DOTS */}

      <div className="
      flex
      justify-center
      gap-2
      mt-6
      ">


      {Array.from({length:slides}).map((_,i)=>(

        <div
        key={i}
        className={`
        h-2
        rounded-full
        transition-all
        ${
          active===i
          ?
          "w-6 bg-[#6D4BC3]"
          :
         "w-2 bg-gray-300/70 backdrop-blur-xl"
        }
        `}
        />

      ))}


      </div>


    </div>

  )
}