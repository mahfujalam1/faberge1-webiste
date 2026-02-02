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
import Cookies from "js-cookie"; // Make sure to install: npm install js-cookie @types/js-cookie
import { authKey } from "@/constants/auth";

const Banner = () => {
    const { data } = useGetAllDynamicBannerQuery(undefined);

    // Check if accessToken exists in cookies
    const accessToken = Cookies.get(authKey);

    // Conditionally call the API only if token exists
    const user = useGetProfileQuery<GetMeResponse>(undefined, {
        skip: !accessToken, // Skip the query if no accessToken
    });

    const bannerVideo = data?.data.find((banner: BannerData) => banner.title === 'home');

    // State to track if component has mounted on the client side
    const [isClient, setIsClient] = useState(false);

    // Video ref to control playback
    const videoRef = useRef<HTMLVideoElement>(null);

    // Set client-side flag after mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Ensure video plays on mount after it's available
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error('Error attempting to play video:', error);
            });
        }
    }, [bannerVideo]);  // Trigger when the video URL changes

    // Render content only on the client side
    if (!isClient) return null;

    return (
        <section className="relative w-full min-h-screen py-28 flex items-center justify-center overflow-hidden -mt-[80px]">
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src={`${process.env.NEXT_PUBLIC_SERVER_URL}${bannerVideo?.video || "/videos/banner-video.mp4"}`} type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-3xl px-4">
                <h1 className="text-xl md:text-5xl font-extrabold leading-tight mb-4">
                    <span className="block">In-Home </span>
                    <span className="block">Manicure $25 / Pedicure $35</span> for Seniors
                </h1>

                <p className="text-gray-200 text-md md:text-base mb-8">
                    No more waiting in line or struggling to get to the salon. Rest easy,
                    we will come to you! If you are 55 or older, get your manicures and
                    pedicures done in the comfort of your own home or facility!
                </p>

                {/* Button Box */}
                <div className={`${user?.data?.role === 'worker' ? '' : 'rounded-lg mb-10 py-8 bg-white/10 md:mx-12'}`}>
                    {/* If the user is logged in with the 'customer' role, show the 'Book Appointment' button */}
                    {
                        user?.data?.role === 'customer' && user?.data?.email && (
                            <Link href="/bookings"><PrimaryButton name="Book Appointment" /></Link>
                        )
                    }

                    {/* If the user is not logged in, show 'Sign In' and 'Sign Up' buttons */}
                    {
                        !user?.data?.email && user?.data?.role !== 'worker' && (
                            <div className="flex justify-evenly">
                                <Link href="/auth/sign-up"><PrimaryButton name="Register Now" /></Link>
                                <Link href="/auth/sign-in"><OutlineButton name="Sign In" /></Link>
                            </div>
                        )
                    }
                </div>

                {/* Phone Contact */}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center gap-2">
                        <PhoneCall size={30} className="text-white" />
                        <span className="md:text-4xl text-2xl font-bold">1(855) 622-6264</span>
                    </div>
                    <span className="md:text-2xl text-lg text-gray-300">Call Or Book Online</span>
                </div>
            </div>
        </section>
    );
};

export default Banner;