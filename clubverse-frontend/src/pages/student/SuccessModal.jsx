import { CheckCircle2, X } from "lucide-react";

export default function SuccessModal({
  open,
  title,
  message,
  onClose,
}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Header */}

        <div className="relative flex flex-col items-center pt-8 pb-6 bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8] text-white">

          <button
            onClick={onClose}
            className="absolute right-5 top-5"
          >
            <X size={22} />
          </button>

          <CheckCircle2
            size={70}
            className="text-green-300"
          />

          <h2 className="mt-4 text-2xl font-bold">
            {title}
          </h2>

        </div>

        {/* Body */}

        <div className="px-8 py-8 text-center">

          <p className="text-gray-600 leading-7">
            {message}
          </p>

          <button
            onClick={onClose}
            className="mt-8 w-full rounded-2xl bg-[#6D4BC3] py-3 text-white font-semibold hover:bg-[#5937B7] transition"
          >
            Continue
          </button>

        </div>

      </div>

    </div>

  );

}