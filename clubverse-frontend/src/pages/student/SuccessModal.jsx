
import { CheckCircle2, X } from "lucide-react";

export default function SuccessModal({
  open,
  title,
  message,
  onClose,
}) {

  if (!open) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        px-3
        sm:px-4
        py-4
        overflow-y-auto
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          sm:rounded-3xl
          bg-white
          shadow-2xl
          overflow-hidden
          animate-in
          fade-in
          zoom-in
          duration-300
          max-h-[95vh]
          overflow-y-auto
        "
      >

        {/* Header */}

        <div
          className="
            relative
            flex
            flex-col
            items-center
            pt-7
            sm:pt-8
            pb-5
            sm:pb-6
            px-4
            bg-gradient-to-r
            from-[#6D4BC3]
            to-[#8D76D8]
            text-white
          "
        >

          <button
            onClick={onClose}
            className="
              absolute
              right-3
              top-3
              sm:right-5
              sm:top-5
              w-9
              h-9
              sm:w-auto
              sm:h-auto
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-white/10
              transition
            "
          >
            <X
              size={20}
              className="sm:w-[22px] sm:h-[22px]"
            />
          </button>


          <CheckCircle2
            size={58}
            className="
              text-green-300
              sm:w-[70px]
              sm:h-[70px]
            "
          />


          <h2
            className="
              mt-3
              sm:mt-4
              text-xl
              sm:text-2xl
              font-bold
              text-center
              leading-tight
              break-words
              max-w-full
            "
          >
            {title}
          </h2>

        </div>


        {/* Body */}

        <div
          className="
            px-5
            sm:px-8
            py-6
            sm:py-8
            text-center
          "
        >

          <p
            className="
              text-gray-600
              leading-6
              sm:leading-7
              text-sm
              sm:text-base
              break-words
            "
          >
            {message}
          </p>


          <button
            onClick={onClose}
            className="
              mt-6
              sm:mt-8
              w-full
              rounded-xl
              sm:rounded-2xl
              bg-[#6D4BC3]
              py-3
              sm:py-3
              text-sm
              sm:text-base
              text-white
              font-semibold
              hover:bg-[#5937B7]
              transition
            "
          >
            Continue
          </button>

        </div>

      </div>

    </div>

  );

}

