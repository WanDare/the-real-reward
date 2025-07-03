"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function QRCodeModal({
  onClose,
  qrData,
}: {
  onClose: () => void;
  qrData: string;
}) {
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

      <div
        className={`bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
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

        <div
          className="p-[35px]"
          style={{
            backgroundImage: "url('/assets/images/qr_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative bg-white p-2 rounded-lg w-[200px] h-[200px] mx-auto flex items-center justify-center">
            <QRCode value={qrData} size={180} />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Image
                src="/assets/icons/thereal_qr_logo.svg"
                alt="Center Logo"
                width={60}
                height={60}
                className="p-1 shadow-lg"
              />
            </div>
          </div>

          {/* <div className="text-white text-xs mt-4 break-words max-w-[240px] mx-auto text-center">
            <pre className="whitespace-pre-wrap break-words text-[10px]">
              {JSON.stringify(JSON.parse(qrData), null, 2)}
            </pre>
          </div> */}
        </div>
      </div>
    </div>
  );
}
