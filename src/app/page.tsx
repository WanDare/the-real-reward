"use client";
import Image from "next/image";
import RegisterForm from "../components/forms/RegisterForm";
import Footer from "@/components/footer";
import OtpForm from "@/components/forms/OtpForm";
import Auth from "./auth/register/page";

export default function Home() {
  return (
    <>
      <Auth />
    </>
  );
}
