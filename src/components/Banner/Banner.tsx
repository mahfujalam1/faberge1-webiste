"use client";

import React from "react";
import { PhoneCall } from "lucide-react";
import { PrimaryButton } from "../ui/PrimaryButton";
import { OutlineButton } from "../ui/OutlineButton";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

const Banner = () => {
    const { user } = useAuth()
    return (
        <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden -mt-[80px]">
            {/* ✅ Background Video from public folder */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/videos/banner-video.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-3xl px-4">
                <h1 className="text-xl md:text-5xl font-extrabold leading-tight mb-4">
                    <span className="block">In-Home </span>
                    <span className="block">Manicure $25 / Pedicure $35</span> for Seniors
                </h1>

                <p className="text-gray-200 text-sm md:text-base mb-8">
                    No more waiting in line or struggling to get to the salon. Rest easy,
                    we’ll come to you! If you’re 55 or older, get your manicures and
                    pedicures done in the comfort of your own home!
                </p>

                {/* Buttons */}
                <div className="rounded-lg mb-10 py-8 bg-white/10 md:mx-12">
                    {
                        user?.email ? <Link href="/bookings"><PrimaryButton name="Book Appointment" /></Link> : <div className="flex justify-evenly">
                            <Link href="/auth/sign-up"><PrimaryButton name="Register Now" /></Link>
                            <Link href="/auth/sign-in"><OutlineButton name="Sign In" /></Link>
                        </div>
                    }
                </div>

                {/* Phone Contact */}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center gap-2">
                        <PhoneCall size={22} className="text-white" />
                        <span className="text-2xl font-bold">1(855) 622-6264</span>
                    </div>
                    <span className="text-sm text-gray-300">Call for Appointment</span>
                </div>
            </div>
        </section>
    );
};

export default Banner;
