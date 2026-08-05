import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function EventCarousel({
  children,
  itemsLength,
}) {
  const sliderRef = useRef(null);

  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  /*
   * =========================================
   * GET CARDS
   * =========================================
   */

  const getCards = () => {
    const container = sliderRef.current;

    if (!container) return [];

    return Array.from(container.children);
  };

  /*
   * =========================================
   * UPDATE CAROUSEL STATE
   * =========================================
   */

  const updateCarousel = () => {
    const container = sliderRef.current;

    if (!container) return;

    const maxScroll =
      container.scrollWidth - container.clientWidth;

    const currentScroll = container.scrollLeft;

    // Previous arrow
    setCanPrev(currentScroll > 5);

    // Next arrow
    setCanNext(
      currentScroll < maxScroll - 5
    );

    const cards = getCards();

    if (!cards.length) {
      setActive(0);
      return;
    }

    /*
     * Find the card closest to
     * the visible left side.
     */

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.offsetLeft -
          container.scrollLeft -
          container.offsetLeft
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActive(closestIndex);
  };

  /*
   * =========================================
   * SCROLL TO CARD
   * =========================================
   */

  const scroll = (direction) => {
    const container = sliderRef.current;

    if (!container) return;

    const cards = getCards();

    if (!cards.length) return;

    /*
     * Current scroll position
     */

    const currentScroll = container.scrollLeft;

    /*
     * Find the card currently closest
     * to the left visible area.
     */

    let currentIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.offsetLeft - currentScroll
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        currentIndex = index;
      }
    });

    /*
     * Calculate next card
     */

    let nextIndex =
      direction === "next"
        ? currentIndex + 1
        : currentIndex - 1;

    /*
     * Keep inside bounds
     */

    nextIndex = Math.max(
      0,
      Math.min(
        nextIndex,
        cards.length - 1
      )
    );

    const targetCard = cards[nextIndex];

    if (!targetCard) return;

    /*
     * IMPORTANT:
     * Calculate exact scroll position.
     */

    const targetLeft =
      targetCard.offsetLeft;

    container.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });

    setActive(nextIndex);
  };

  /*
   * =========================================
   * GO TO SPECIFIC CARD
   * =========================================
   */

  const goToCard = (index) => {
    const container = sliderRef.current;

    if (!container) return;

    const cards = getCards();

    const targetCard = cards[index];

    if (!targetCard) return;

    container.scrollTo({
      left: targetCard.offsetLeft,
      behavior: "smooth",
    });

    setActive(index);
  };

  /*
   * =========================================
   * INITIAL LOAD + RESIZE
   * =========================================
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      updateCarousel();
    }, 150);

    const handleResize = () => {
      updateCarousel();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      clearTimeout(timer);

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [itemsLength]);

  /*
   * =========================================
   * UPDATE AFTER CHILDREN CHANGE
   * =========================================
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      updateCarousel();
    }, 200);

    return () => clearTimeout(timer);
  }, [children, itemsLength]);

  /*
   * =========================================
   * RENDER
   * =========================================
   */

  return (
    <div className="relative w-full">

      {/* =====================================
          LEFT ARROW
      ===================================== */}

      <button
        type="button"
        disabled={!canPrev}
        onClick={() => scroll("prev")}
        aria-label="Previous events"
        className={`
          absolute
          left-1
          sm:left-2
          lg:-left-2
          top-1/2
          -translate-y-1/2
          z-20

          w-9
          h-9

          sm:w-10
          sm:h-10

          lg:w-11
          lg:h-11

          rounded-full

          bg-white/90
          backdrop-blur-xl

          border
          border-[#DDD4F2]

          shadow-lg

          flex
          items-center
          justify-center

          text-[#6D4BC3]

          transition-all
          duration-200

          ${
            canPrev
              ? `
                hover:scale-110
                hover:bg-white
                cursor-pointer
              `
              : `
                opacity-40
                cursor-not-allowed
              `
          }
        `}
      >
        <ChevronLeft
          size={20}
          className="sm:w-[22px] sm:h-[22px]"
        />
      </button>


      {/* =====================================
          CAROUSEL
      ===================================== */}

      <div
        ref={sliderRef}
        onScroll={updateCarousel}
        className="
          flex
          gap-4
          sm:gap-5
          lg:gap-6

          overflow-x-auto

          scroll-smooth
          snap-x
          snap-mandatory

          scrollbar-hide

          px-11
          sm:px-12
          lg:px-14

          py-3
          -my-3
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>


      {/* =====================================
          RIGHT ARROW
      ===================================== */}

      <button
        type="button"
        disabled={!canNext}
        onClick={() => scroll("next")}
        aria-label="Next events"
        className={`
          absolute
          right-1
          sm:right-2
          lg:-right-2
          top-1/2
          -translate-y-1/2
          z-20

          w-9
          h-9

          sm:w-10
          sm:h-10

          lg:w-11
          lg:h-11

          rounded-full

          bg-white/90
          backdrop-blur-xl

          border
          border-[#DDD4F2]

          shadow-lg

          flex
          items-center
          justify-center

          text-[#6D4BC3]

          transition-all
          duration-200

          ${
            canNext
              ? `
                hover:scale-110
                hover:bg-white
                cursor-pointer
              `
              : `
                opacity-40
                cursor-not-allowed
              `
          }
        `}
      >
        <ChevronRight
          size={20}
          className="sm:w-[22px] sm:h-[22px]"
        />
      </button>


      {/* =====================================
          DOTS
      ===================================== */}

      {itemsLength > 1 && (
        <div
          className="
            flex
            justify-center
            items-center
            gap-2

            mt-5
            sm:mt-6
          "
        >

          {Array.from({
            length: itemsLength,
          }).map((_, index) => (

            <button
              key={index}
              type="button"
              aria-label={`Go to event ${index + 1}`}
              onClick={() =>
                goToCard(index)
              }
              className={`
                h-2
                rounded-full

                transition-all
                duration-300

                ${
                  active === index
                    ? "w-6 bg-[#6D4BC3]"
                    : "w-2 bg-gray-300/70"
                }
              `}
            />

          ))}

        </div>
      )}

    </div>
  );
}