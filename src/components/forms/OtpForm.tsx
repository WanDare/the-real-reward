"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { sendOtpCode } from "@/lib/api/authService";
import QRCodeModal from "@/components/ui/QRCodeModal";

export default function OtpForm() {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  // Countdown timer for "Resend"
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle OTP input change
  const handleChange = (value: string, idx: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1);
    setOtp(newOtp);
    if (value && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (paste) {
      const pasteArr = paste.split("");
      const newOtp = [...otp];
      for (let i = 0; i < OTP_LENGTH; i++) {
        newOtp[i] = pasteArr[i] || "";
      }
      setOtp(newOtp);
      inputsRef.current[Math.min(paste.length - 1, OTP_LENGTH - 1)]?.focus();
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (otp.some((d) => !d)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowQR(true);
    }, 1000);
  };

  const handleResend = async () => {
    if (!phone) return alert("📱 Phone number missing in URL.");
    setResending(true);
    try {
      await sendOtpCode(phone);
      setTimer(60);
      alert("📩 OTP resent successfully!");
    } catch (err: any) {
      alert("❌ Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <div className="bg-white flex flex-col items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center"
        >
          <div className="text-left w-full mb-4">
            <h2 className="text-base font-bold text-neutral-700 leading-normal py-[24px]">
              Verification
            </h2>
            <div className="flex flex-col items-start gap-1">
              <p className="text-neutral-500 text-sm font-normal leading-tight">
                Please enter the 6-digit code sent to:
              </p>
              <span className="text-sm font-semibold text-neutral-700 leading-tight pt-[6px]">
                +{phone || "855 89 233 250"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-full pt-[20px] gap-2 relative">
            <div className="flex flex-grow gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  className="w-full h-12 text-center text-xl text-orange-500 border-b-2 border-orange-400 focus:border-orange-500 focus:outline-none transition"
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            {(loading || resending) && (
              <div className="ml-4 flex items-center justify-center">
                <span className="inline-block h-6 w-6 rounded-full border-2 border-orange-400 border-t-transparent animate-spin" />
              </div>
            )}
          </div>

          <p className="text-sm font-normal text-neutral-500 leading-tight pt-[21px] pb-[30px] text-left w-full">
            {timer > 0 ? (
              `Resend Code (${timer}s)`
            ) : (
              <button
                type="button"
                className="text-amber-500 text-sm font-bold leading-tight"
                onClick={handleResend}
                disabled={resending}
              >
                {resending ? "Sending..." : "Resend Code"}
              </button>
            )}
          </p>

          <button
            type="submit"
            disabled={otp.some((d) => !d) || loading}
            className={`w-full py-3 text-center rounded-xl font-semibold transition ${
              otp.some((d) => !d) || loading
                ? "bg-gray-300 text-neutral-400 cursor-not-allowed"
                : "bg-orange-400 text-white hover:bg-orange-500"
            }`}
          >
            Done
          </button>
        </form>
      </div>

      {/* ✅ QR Code Modal (manual trigger only) */}
      {showQR && <QRCodeModal onClose={() => setShowQR(false)} />}
    </>
  );
}
