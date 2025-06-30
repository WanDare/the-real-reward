"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function QRCodeModal({ onClose }: { onClose: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-[82px] right-[82px] hover:scale-110 transition"
        aria-label="Close"
      >
        <Image
          src="/assets/icons/close_button.svg"
          alt="Close"
          width={32}
          height={32}
        />
      </button>

      {/* QR Code Card with transition */}
      <div
        className={`
                    bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg
                    transform transition-all duration-300
                    ${show ? "scale-100 opacity-100" : "scale-90 opacity-0"}
                `}
      >
        <div className="flex items-center">
          <Image
            src="/assets/images/title_heading.png"
            alt="Logo"
            width={280}
            height={40}
            quality={100}
            priority
            style={{ imageRendering: "auto" }}
          />
        </div>

        {/* QR Code */}
        <div
          className="p-[35px]"
          style={{
            backgroundImage: "url('/assets/images/qr_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image
            src="/assets/images/QR_Code.png"
            alt="QR Code"
            width={200}
            height={200}
            className="mx-auto rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
}
