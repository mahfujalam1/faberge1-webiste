"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/constants/image.index";
import Image from "next/image";
import { GetMeResponse, } from "@/redux/api/baseApi";
import { useGetProfileQuery } from "@/redux/api/authApi";
import Cookies from "js-cookie";
import { authKey } from "@/constants/auth";

export default function CheckoutPage() {
    const router = useRouter();
    const accessToken = Cookies.get(authKey);

    // Conditionally call the API only if token exists
    const { data: user, isLoading } = useGetProfileQuery<GetMeResponse>(undefined, {
        skip: !accessToken, // Skip the query if no accessToken
    });

    useEffect(() => {
        // Wait for user data to load before redirecting
        if (isLoading) return;

        const timer = setTimeout(() => {
            router.push("/my-bookings");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router, user, isLoading]);

    return (
        <div>
            <div className="flex py-10 items-center justify-center bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 h-screen ">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-[#39AE86] pb-10">
                        Successfully Paid
                    </h1>
                    <Image
                        src={IMAGES.paymentSuccess.src}
                        alt="Payment Success"
                        width={700}
                        height={700}
                        className="mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}