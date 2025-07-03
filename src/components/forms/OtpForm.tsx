"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpCode, resendOtpCode } from "@/lib/api/authService";

export default function OtpForm() {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => !d)) return;

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const code = otp.join("");
      const res = await verifyOtpCode({ phone, code });

      if (!res.success) {
        throw new Error(res.message || "Verification failed");
      }

      router.push(`/auth/complete-profile?phone=${phone}&code=${code}`);
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : String(err);
      if (raw.includes("Code invalid")) {
        setError(
          "The code you entered is invalid or has expired. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phone) return;
    setResending(true);
    setError("");
    setSuccess("");
    try {
      await resendOtpCode(phone);
      setTimer(60);
      setSuccess("📩 A new code has been sent.");
    } catch {
      setError("❌ Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col">
        <h2 className="text-base font-bold text-neutral-700 py-6">
          Verification
        </h2>
        <p className="text-sm text-neutral-500 mb-2">
          Enter the 6-digit code sent to:
        </p>
        <span className="text-sm font-semibold text-neutral-700 mb-4">
          +{phone}
        </span>

        <div className="flex items-center justify-between w-full pt-3 gap-2 relative">
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

        {error && (
          <p className="text-sm text-red-500 mt-4 text-left font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 mt-4 text-left font-medium">
            {success}
          </p>
        )}

        <p className="text-sm text-neutral-500 leading-tight pt-5 pb-8 text-left w-full">
          {timer > 0 ? (
            `Resend Code (${timer}s)`
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-amber-500 font-bold"
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
          {loading ? "Checking..." : "Done"}
        </button>
      </form>
    </div>
  );
}
