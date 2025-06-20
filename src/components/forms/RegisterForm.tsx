"use client";
import { useState } from "react";
import Image from "next/image";

const genders = [
  { label: "Male", icon: "/assets/icons/male.svg" },
  { label: "Female", icon: "/assets/icons/female.svg" },
];

export default function RegisterForm() {
  const [selectedGender, setGender] = useState<string | null>(null);

  return (
    <form className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div>
        <h2 className="text-lg font-bold text-gray-800">
          Register Account Here!
        </h2>
        <p className="text-sm text-gray-500">Fill your personal information</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Full Name <span className="text-[#FFA429]">*</span>
        </label>
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFA429] focus:ring-1 focus:ring-[#FFA429] outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Phone <span className="text-[#FFA429]">*</span>
        </label>
        <div className="flex">
          <span className="flex items-center bg-gray-100 px-3 rounded-l-lg border border-r-0 border-gray-200">
            <Image
              src="/assets/icons/flag_kh.svg"
              width={20}
              height={14}
              alt="Flag"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">+855</span>
          </span>
          <input
            type="tel"
            placeholder="000 000 000"
            required
            className="flex-1 px-4 py-3 rounded-r-lg border border-gray-200 focus:border-[#FFA429] focus:ring-1 focus:ring-[#FFA429] outline-none"
          />
          {/* <span className="flex items-center pl-2 text-gray-400">
            <Image
              src="/assets/icons/phone.svg"
              width={24}
              height={16}
              alt="KH"
            />
          </span> */}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Select Gender
        </label>
        <div className="flex gap-3">
          {genders.map((g, i) => (
            <button
              type="button"
              key={g.label}
              className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border bg-neutral-100
              ${
                selectedGender === g.label
                  ? "border-[#FFA429] bg-orange-50 text-[#FFA429]"
                  : "border-transparent bg-white text-neutral-500"
              }
              self-stretch justify-start text-sm font-semibold leading-tight transition-all`}
              onClick={() => setGender(g.label)}
            >
              <Image src={g.icon} alt={g.label} width={28} height={28} />
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="mt-2 w-full py-3 rounded-lg bg-gray-200 text-gray-500 font-semibold transition
          disabled:opacity-80 disabled:cursor-not-allowed"
        disabled
      >
        Register
      </button>
    </form>
  );
}
