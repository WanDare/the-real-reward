"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import QRCodeModal from "@/components/ui/QRCodeModal";
import { registerUser } from "@/lib/api/authService";
import Image from "next/image";

const genders = [
  { label: "Male", icon: "/assets/icons/male.svg" },
  { label: "Female", icon: "/assets/icons/female.svg" },
];

export default function UserInfoForm() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const code = searchParams.get("code") || "";

  const [name, setName] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState("");

  const isValid = name.trim() !== "" && gender && phone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const payload = {
      name,
      gender: gender.toUpperCase() as "MALE" | "FEMALE",
      phone,
      code,
    };

    setLoading(true);
    try {
      await registerUser(payload);
      const userQr = JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        gender: payload.gender,
      });
      setQrData(userQr);
      setShowQR(true);
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as any).response?.data?.message === "string"
      ) {
        setMessage((err as any).response.data.message);
      } else if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white flex flex-col items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-5"
        >
          <div className="text-center">
            <h2 className="text-lg font-semibold text-neutral-700 leading-relaxed pb-[10px] font-['Poppins']">
              Register Account Here!
            </h2>
            <p className="text-sm font-normal text-neutral-700 leading-tight pb-[24px] font-['Poppins']">
              Fill your personal information
            </p>
          </div>

          <div>
            <label className="text-neutral-500 text-xs font-semibold leading-none font-['Poppins']">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-[5px] px-[11px] py-[12px] rounded-lg bg-[#F6F6F7] text-neutral-700 text-base font-normal font-['Poppins'] leading-normal focus:ring-1 focus:ring-orange-400 outline-none"
            />
          </div>

          <div>
            <label className="text-neutral-500 text-xs font-semibold leading-none mb-[5px] font-['Poppins']">
              Select Gender <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 mt-[5px]">
              {genders.map((g) => (
                <button
                  key={g.label}
                  type="button"
                  className={`flex-1 flex items-center gap-[10px] px-[10px] py-[8px] rounded-lg border transition text-sm font-semibold justify-start ${
                    gender === g.label
                      ? "border-orange-400 bg-orange-50 text-amber-500"
                      : "bg-[#F6F6F7] border-transparent text-neutral-500"
                  }`}
                  onClick={() => setGender(g.label)}
                >
                  <Image src={g.icon} alt={g.label} width={42} height={42} />
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isValid
                ? "bg-orange-400 text-white hover:bg-orange-500"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Submitting..." : "Done"}
          </button>

          {message && <p className="text-sm text-red-500">{message}</p>}
        </form>
      </div>

      {showQR && (
        <QRCodeModal qrData={qrData} onClose={() => setShowQR(false)} />
      )}
    </>
  );
}
