"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GetMeResponse } from "@/redux/api/baseApi";
import { useGetProfileQuery } from "@/redux/api/authApi";
import Cookies from "js-cookie";
import { authKey } from "@/constants/auth";

export default function CancelPage() {
    const router = useRouter();
    const accessToken = Cookies.get(authKey);

    const { data: user, isLoading } = useGetProfileQuery<GetMeResponse>(undefined, {
        skip: !accessToken,
    });

    useEffect(() => {
        if (isLoading) return;

        const timer = setTimeout(() => {
            router.push("/my-bookings");
        }, 3000);

        return () => clearTimeout(timer);
    }, [router, user, isLoading]);

    return (
        <div>
            <div className="flex py-10 items-center justify-center bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 h-screen">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Animated X Icon */}
                    <div className="flex items-center justify-center mb-8">
                        <div
                            className="relative flex items-center justify-center w-36 h-36 rounded-full"
                            style={{
                                background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                                boxShadow: "0 0 0 16px rgba(238, 90, 36, 0.12), 0 8px 40px rgba(238, 90, 36, 0.35)",
                                animation: "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
                            }}
                        >
                            {/* X marks */}
                            <svg
                                width="64"
                                height="64"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ animation: "drawX 0.4s ease-out 0.4s both" }}
                            >
                                <line
                                    x1="16"
                                    y1="16"
                                    x2="48"
                                    y2="48"
                                    stroke="white"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="48"
                                    y1="16"
                                    x2="16"
                                    y2="48"
                                    stroke="white"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Pulse ring */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    border: "3px solid rgba(238, 90, 36, 0.5)",
                                    animation: "pulseRing 1.8s ease-out infinite 1s",
                                }}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h1
                        className="text-5xl md:text-7xl font-bold pb-4"
                        style={{
                            color: "#ee5a24",
                            animation: "slideUp 0.5s ease-out 0.3s both",
                        }}
                    >
                        Payment Cancelled
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-lg md:text-xl text-gray-500 pb-6"
                        style={{ animation: "slideUp 0.5s ease-out 0.5s both" }}
                    >
                        Your payment was not completed. Don&apos;t worry, no amount was deducted.
                    </p>

                    {/* Redirect notice */}
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                        style={{
                            background: "rgba(238, 90, 36, 0.1)",
                            color: "#ee5a24",
                            border: "1px solid rgba(238, 90, 36, 0.25)",
                            animation: "slideUp 0.5s ease-out 0.7s both",
                        }}
                    >
                        <svg
                            className="animate-spin"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Redirecting you to home in 3 seconds...
                    </div>
                </div>

                {/* CSS Animations */}
                <style jsx>{`
                    @keyframes popIn {
                        0% { transform: scale(0); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    @keyframes slideUp {
                        0% { transform: translateY(24px); opacity: 0; }
                        100% { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes pulseRing {
                        0% { transform: scale(1); opacity: 0.6; }
                        100% { transform: scale(1.5); opacity: 0; }
                    }
                    @keyframes drawX {
                        0% { opacity: 0; transform: scale(0.5) rotate(-15deg); }
                        100% { opacity: 1; transform: scale(1) rotate(0deg); }
                    }
                `}</style>
            </div>
        </div>
    );
}