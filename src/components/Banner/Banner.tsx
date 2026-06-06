'use client';
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

    const bannerVideo = data?.data?.find((banner: BannerData) => banner.title === 'home');
    const [isClient, setIsClient] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const videoSrc = bannerVideo?.video
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}${bannerVideo.video}`
        : "/videos/banner-video.mp4";

    useEffect(() => {
        setIsClient(true);
    }, []);

    // ✅ Reload + autoplay whenever the source URL changes.
    // Changing a <source> child's src does NOT reload a <video> on its own —
    // without an explicit load() the element keeps playing the previously
    // loaded (old/short) clip, so a freshly uploaded banner never shows up.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const playVideo = async () => {
            try {
                video.muted = true;
                video.load(); // pick up the new source
                await video.play();
            } catch (error) {
                console.error('Error playing video:', error);
                // Fallback: retry after the first user interaction
                const playOnInteraction = () => {
                    videoRef.current?.play();
                    document.removeEventListener('click', playOnInteraction);
                };
                document.addEventListener('click', playOnInteraction);
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(playVideo, 100);
        return () => clearTimeout(timer);
    }, [videoSrc]); // re-run only when the actual URL changes

    if (!isClient) return null;

    return (
        <section className="relative w-full min-h-screen py-28 flex items-center justify-center overflow-hidden -mt-[80px]">
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
                    // Belt-and-suspenders loop in case the `loop` attribute
                    // is ignored for a given encoding.
                    const v = e.currentTarget;
                    v.currentTime = 0;
                    v.play().catch(() => {});
                }}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-4xl px-4">
                <h1 className="font-[family-name:var(--font-pacifico)] text-[56px] md:text-7xl leading-tight mb-6">
                    In-Home Beauty Services
                </h1>

                <p className="font-[family-name:var(--font-eb-garamond)] text-2xl md:text-4xl mb-6">
                    <span className="block">Manicures · Pedicures · Facials · Hairstyling</span>
                    <span className="block">Makeup · Massages · Hair Cuts</span>
                </p>

                <p className="font-[family-name:var(--font-eb-garamond)] text-gray-200 text-xl md:text-2xl mb-8">
                    No more waiting in line or rushing to get to the shop. Save time and gas
                    because we&apos;ll come to you! Get your beauty services done by licensed,
                    qualified professionals in the comfort of your own living space!
                </p>

                <div className={`${user?.data?.role === 'worker' ? '' : 'rounded-lg mb-10 py-8 bg-white/10 md:mx-12'}`}>
                    {user?.data?.role === 'customer' && user?.data?.email && (
                        <Link href="/bookings"><PrimaryButton name="Book Appointment" /></Link>
                    )}

                    {!user?.data?.email && user?.data?.role !== 'worker' && (
                        <div className="flex justify-evenly">
                            <Link href="/auth/sign-up"><PrimaryButton name="Register Now" /></Link>
                            <Link href="/auth/sign-in"><OutlineButton name="Sign In" /></Link>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center gap-2">
                        <PhoneCall size={25} className="text-white" />
                        <span className="md:text-4xl text-2xl font-bold ">1(855) 622-6264</span>
                    </div>
                    <span className="md:text-3xl text-lg text-gray-300 font-[family-name:var(--font-eb-garamond)]">Call Or Book Online</span>
                </div>
            </div>
        </section>
    );
};

export default Banner;