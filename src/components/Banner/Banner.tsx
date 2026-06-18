"use client";
import React, { useEffect, useRef, useState } from "react";
import { PhoneCall } from "lucide-react";
import { PrimaryButton } from "../ui/PrimaryButton";
import { OutlineButton } from "../ui/OutlineButton";
import Link from "next/link";
import { useGetAllDynamicBannerQuery } from "@/redux/api/publicApi";
import { BannerData } from "@/types/global.types";
import { GetMeResponse } from "@/redux/api/baseApi";
import { useGetProfileQuery } from "@/redux/api/authApi";
import Cookies from "js-cookie";
import { authKey } from "@/constants/auth";

const Banner = () => {
  const { data, isLoading } = useGetAllDynamicBannerQuery(undefined);
  const accessToken = Cookies.get(authKey);
  const user = useGetProfileQuery<GetMeResponse>(undefined, {
    skip: !accessToken,
  });

  const bannerVideo = data?.data?.find(
    (banner: BannerData) => banner.title === "home",
  );
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = bannerVideo?.video
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}${bannerVideo.video}`
    : "/videos/banner-video.mp4";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.load();
        await video.play();
      } catch (error) {
        console.error("Error playing video:", error);
        const playOnInteraction = () => {
          videoRef.current?.play();
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
      }
    };

    const timer = setTimeout(playVideo, 100);
    return () => clearTimeout(timer);
  }, [videoSrc]);

  if (!isClient) return null;

  const isWorker = user?.data?.role === "worker";
  const isCustomer = user?.data?.role === "customer" && user?.data?.email;
  const isGuest = !user?.data?.email && user?.data?.role !== "worker";

  return (
    <section className="relative w-full min-h-screen py-20 sm:py-24 md:py-28 flex items-center justify-center overflow-hidden -mt-[80px]">
      {/* Background Video */}
      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/banner-poster.jpg"
        onEnded={(e) => {
          const v = e.currentTarget;
          v.currentTime = 0;
          v.play().catch(() => {});
        }}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h1 className="font-[family-name:var(--font-pacifico)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4 sm:mb-6">
          In-Home Beauty Services
        </h1>

        {/* Services list */}
        <p className="font-[family-name:var(--font-eb-garamond)] text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6">
          {/* On very small screens stack each group; on sm+ show inline */}
          <span className="block sm:inline">
            Manicures · Pedicures · Facials · Hairstyling
          </span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">Makeup · Massages · Hair Cuts</span>
        </p>

        {/* Tagline */}
        <p className="font-[family-name:var(--font-eb-garamond)] text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed">
          No more waiting in line or rushing to get to the shop. Save time and
          gas because we&apos;ll come to you! Get your beauty services done by
          licensed, qualified professionals in the comfort of your own living
          space!
        </p>

        {/* CTA block — hidden entirely for workers */}
        {!isWorker && (
          <div className="rounded-lg mb-8 sm:mb-10 py-6 sm:py-8 bg-white/10 px-4 sm:px-8 md:mx-12">
            {isCustomer && (
              <Link href="/bookings">
                <PrimaryButton name="Book Appointment" />
              </Link>
            )}

            {isGuest && (
              <div className="flex  md:flex-row justify-center flex-col items-center gap-3 sm:gap-3 sm:justify-evenly">
                <Link href="/auth/sign-up">
                  <PrimaryButton name="Register Now" />
                </Link>
                <Link href="/auth/sign-in">
                  <OutlineButton name="Sign In" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Phone */}
        <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <PhoneCall
              size={20}
              className="text-white sm:w-6 sm:h-6 md:w-7 md:h-7"
            />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
              1(855) 622-6264
            </span>
          </div>
          <span className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-300 font-[family-name:var(--font-eb-garamond)]">
            Call Or Book Online
          </span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
