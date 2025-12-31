"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/constants/image.index";
import Image from "next/image";
import { GetMeResponse, useGetMeQuery } from "@/redux/api/baseApi";

export default function CheckoutPage() {
    const router = useRouter();
    const { data: user, isLoading } = useGetMeQuery<GetMeResponse>();

    useEffect(() => {
        // Wait for user data to load before redirecting
        if (isLoading) return;

        const timer = setTimeout(() => {
            // Check user role and redirect accordingly
            if (user?.role !== 'worker') {
                router.push("/my-bookings");
                return
            } else {
                router.push("/dashboard");
                return
            }
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