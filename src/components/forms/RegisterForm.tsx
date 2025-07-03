"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "../inputs/phoneinput";
import { API_BASE_URL } from "@/constants/api";

export default function RegisterForm() {
  const router = useRouter();
  const [phoneData, setPhoneData] = useState({ phone: "", code: "+855" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isPhoneValid = phoneData.phone.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid) return;

    setLoading(true);
    setMessage("");
    try {
      const phone = phoneData.code.replace("+", "") + phoneData.phone;
      const res = await fetch(`${API_BASE_URL}/customer/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");

      router.push(`/auth/otp?phone=${phone}`);
    } catch (err: any) {
      setMessage("❌ " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full max-w-md mx-auto"
    >
      <div className="text-center">
        <h2 className="text-lg font-semibold text-neutral-700 leading-relaxed pb-[10px] font-['Poppins']">
          Register Account
        </h2>
        <p className="text-sm font-normal text-neutral-700 leading-tight pb-[24px] font-['Poppins']">
          Enter your phone number to get started.
        </p>
      </div>

      <div>
        <label className="block text-neutral-500 text-xs font-semibold mb-[5px]">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <PhoneInput onChange={setPhoneData} />
      </div>

      <button
        type="submit"
        disabled={!isPhoneValid || loading}
        className={`mt-2 w-full py-3 rounded-lg font-semibold transition ${
          !isPhoneValid || loading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-[#FFA429] text-white"
        }`}
      >
        {loading ? "Sending OTP..." : "Next"}
      </button>

      {message && (
        <p className="text-center text-sm text-red-500 font-medium">
          {message}
        </p>
      )}
    </form>
  );
}
