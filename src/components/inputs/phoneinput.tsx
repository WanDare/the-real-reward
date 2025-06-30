"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const countries = [
  { name: "Cambodia", code: "+855", flag: "/assets/icons/flag_kh.svg" },
  { name: "United States", code: "+1", flag: "/assets/icons/us.svg" },
  { name: "China", code: "+86", flag: "/assets/icons/cn.svg" },
  { name: "Germany", code: "+49", flag: "/assets/icons/gm.svg" },
  { name: "Japan", code: "+81", flag: "/assets/icons/jp.svg" },
  { name: "Turkey", code: "+90", flag: "/assets/icons/tk.svg" },
];

export default function PhoneInput({
  onChange,
}: {
  onChange: (data: { phone: string; code: string }) => void;
}) {
  const [selected, setSelected] = useState(countries[0]);
  const [phone, setPhone] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔁 Notify parent on changes
  useEffect(() => {
    onChange({ phone, code: selected.code });
  }, [phone, selected]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center bg-[#F6F6F7] px-3 rounded-l-lg"
        >
          <Image src={selected.flag} width={20} height={14} alt="Flag" />
          <span className="ml-2 text-sm font-medium text-gray-700">
            {selected.code}
          </span>
          <ChevronDownIcon className="w-3 h-3 ml-1 text-gray-500" />
        </button>

        <input
          type="tel"
          placeholder="000 000 000"
          required
          className={`flex-1 px-4 py-3 rounded-r-lg leading-normal text-base font-normal bg-[#F6F6F7] focus:border-[#FFA429] focus:ring-1 focus:ring-[#FFA429] outline-none ${
            phone ? "text-neutral-700" : "text-neutral-400"
          }`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {dropdownOpen && (
        <div className="absolute top-full left-0 mt-1 z-10 w-60 bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
          <ul className="py-2 text-sm text-gray-700">
            {countries.map((country) => (
              <li key={country.code}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(country);
                    setDropdownOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm font-normal hover:bg-gray-100"
                >
                  <Image
                    src={country.flag}
                    width={20}
                    height={14}
                    alt={country.name}
                    className="me-2"
                  />
                  {country.name} ({country.code})
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
