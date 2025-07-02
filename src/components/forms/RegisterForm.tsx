"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhoneInput from "../inputs/phoneinput";
import { registerUser } from "@/lib/api/authService";

const genders = [
  { label: "Male", icon: "/assets/icons/male.svg" },
  { label: "Female", icon: "/assets/icons/female.svg" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [selectedGender, setGender] = useState<string | null>(null);
  const [nameValue, setNameValue] = useState("");
  const [phoneData, setPhoneData] = useState({ phone: "", code: "+855" });
  const [isLeaving, setIsLeaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isFormValid =
    nameValue.trim() !== "" &&
    selectedGender !== null &&
    phoneData.phone.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const payload = {
      name: nameValue,
      phone: phoneData.code.replace("+", "") + phoneData.phone,
      code: "390920",
      gender: selectedGender?.toUpperCase() as "MALE" | "FEMALE",
    };

    setLoading(true);
    setMessage("");
    try {
      await registerUser(payload);
      setMessage("✅ Registered successfully!");
      setIsLeaving(true);
      setTimeout(() => {
        router.push(`/otp?phone=${payload.phone}&name=${nameValue}`);
      }, 500);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`transition-opacity duration-300 ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <form
        className="flex flex-col gap-5 w-full max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800">
            Register Account Here!
          </h2>
          <p className="text-sm text-gray-500">
            Fill your personal information
          </p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Full Name"
            required
            className={`w-full px-4 py-3 rounded-lg bg-[#F6F6F7] focus:border-[#FFA429] focus:ring-1 focus:ring-[#FFA429] outline-none ${
              nameValue ? "text-neutral-700" : "text-neutral-400"
            }`}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <PhoneInput onChange={setPhoneData} />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Gender
          </label>
          <div className="flex gap-3">
            {genders.map((g) => (
              <button
                type="button"
                key={g.label}
                className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border ${
                  selectedGender === g.label
                    ? "border-[#FFA429] bg-orange-50 text-[#FFA429]"
                    : "border-transparent bg-[#F6F6F7] text-neutral-500"
                } justify-start text-sm font-semibold transition`}
                onClick={() => setGender(g.label)}
              >
                <Image src={g.icon} alt={g.label} width={28} height={28} />
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`mt-2 w-full py-3 rounded-lg font-semibold transition ${
            isFormValid
              ? "bg-[#FFA429] text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Registering..." : "Next"}
        </button>

        {message && (
          <p className="text-center text-sm text-red-500 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
