"use client";
import Image from "next/image";
import RegisterForm from "../components/forms/RegisterForm";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen bg-white flex-col md:flex-row">
        {/* Left: Registration Form */}
        <section className="w-full md:w-[480px] flex flex-col justify-between pt-[70px] pb-[111px] px-[60px] md:px-[60px] bg-white">
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/assets/images/therealreward_logo.png"
              alt="The Real Reward Logo"
              width={231}
              height={120}
              priority
              className="mb-3"
            />
          </div>
          <RegisterForm />
        </section>

        <section className="relative hidden md:block w-full overflow-hidden">
          {/* Rotated wrapper (rotation applied here only) */}
          <div
            className="absolute origin-top-left"
            style={{
              transform: "rotate(17.18deg)",
              transformOrigin: "top left",
              width: "150%",
              height: "300%",
            }}
          >
            {/* Inner scrolling content (translation only) */}
            <div className="w-full h-full animate-diagonal-scroll">
              <div className="w-full h-[100%]">
                <img
                  src="/assets/images/game_slide_vertical.png"
                  alt="Slide 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-[100%]">
                <img
                  src="/assets/images/game_slide_vertical.png"
                  alt="Slide 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent z-10" />
        </section>
      </main>
      <Footer />
    </>
  );
}
