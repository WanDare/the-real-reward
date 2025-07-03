"use client";
import Image from "next/image";
import Footer from "@/components/footer";
import UserInfoForm from "@/components/forms/userinfo";

export default function CompleteProfile() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <main className="relative flex-1 bg-white overflow-hidden">
        {/* Background game slider only on mobile */}
        <div className="absolute inset-0 z-0 block md:hidden justify-center items-start ">
          <div className="relative w-full h-[260px] overflow-hidden">
            <div
              className="absolute"
              style={{
                transform: "rotate(17.18deg) translateY(-440px)",
                transformOrigin: "top left",
                width: "200%",
                height: "200%",
              }}
            >
              <div
                className="w-full h-full flex flex-col"
                style={{
                  animation: "vertical-loop 20s linear infinite",
                }}
              >
                <div className="w-full h-full">
                  <Image
                    src="/assets/images/game_slide_vertical.png"
                    alt="Slide 1"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full">
                  <Image
                    src="/assets/images/game_slide_vertical.png"
                    alt="Slide 2"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/30 to-white z-10" />
          </div>
        </div>

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

        <div className="relative z-20 flex flex-col md:flex-row h-full">
          {/* Mobile-specific layout */}
          <section className="block md:hidden w-full px-6 pt-[200] flex-1 overflow-hidden">
            <div className="flex flex-col items-center mb-4">
              <Image
                src="/assets/images/therealreward_logo.png"
                alt="The Real Reward Logo"
                width={231}
                height={91}
                priority
              />
            </div>
            <div className="flex-1 overflow-auto">
              <UserInfoForm />
            </div>
          </section>

          {/* Desktop layout */}
          <section className="hidden md:flex w-[850px] flex-col justify-between pt-[70px] pb-[200px] px-[60px] flex-shrink-0">
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
            <UserInfoForm />
          </section>

          {/* Desktop-only image slider */}
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
                  <Image
                    src="/assets/images/game_slide_vertical.png"
                    alt="Slide 1"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full">
                  <Image
                    src="/assets/images/game_slide_vertical.png"
                    alt="Slide 2"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/20 to-white z-10" />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
