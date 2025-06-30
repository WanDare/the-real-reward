"use client";
import Image from "next/image";
import RegisterForm from "../components/forms/RegisterForm";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen bg-white overflow-hidden">
        {/* 🔥 Background game slider only on mobile */}
        <div className="absolute inset-0 z-0 block md:hidden">
          <div
            className="absolute origin-top-left"
            style={{
              transform: "translateY(-140px)",
              transformOrigin: "top left",
              width: "150%",
              height: "50%",
              overflow: "hidden",
            }}
          >
            <div
              className="w-full h-full flex flex-col"
              style={{
                animation: "vertical-loop 20s linear infinite",
              }}
            >
              <div className="w-full">
                <img
                  src="/assets/images/game_slide_vertical.png"
                  alt="Slide 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <img
                  src="/assets/images/game_slide_vertical.png"
                  alt="Slide 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10" />

          <style jsx global>{`
            @keyframes vertical-loop {
              0% {
                transform: translateY(0%);
              }
              100% {
                transform: translateY(-50%);
              }
            }
          `}</style>
        </div>

        <div className="relative z-20 flex flex-col md:flex-row min-h-screen">
          {/* ✅ Mobile-specific layout */}
          <section className="block md:hidden w-full px-6 pt-[254px] pb-12">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/assets/images/therealreward_logo.png"
                alt="The Real Reward Logo"
                width={231}
                height={91}
                priority
              />
            </div>
            <RegisterForm />
          </section>

          {/* ✅ Desktop layout (unchanged) */}
          <section className="hidden md:flex w-[850px] flex-col justify-between pt-[70px] pb-[111px] px-[60px]">
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

          {/* 🖥️ Original desktop-only image slider (no change) */}
          <section className="relative hidden md:block w-full overflow-hidden">
            <div
              className="absolute origin-top-left"
              style={{
                transform: "rotate(17.18deg) translateY(-400px)",
                transformOrigin: "top left",
                width: "150%",
                height: "300%",
                overflow: "hidden",
              }}
            >
              <div
                className="w-full h-full flex flex-col gap-4"
                style={{
                  animation: "vertical-loop 30s linear infinite",
                }}
              >
                <div className="w-full h-full">
                  <img
                    src="/assets/images/game_slide_vertical.png"
                    alt="Slide 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full">
                  <img
                    src="/assets/images/game_slide_vertical.png"
                    alt="Slide 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10" />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
