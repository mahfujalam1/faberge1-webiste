"use client"

import { DynamicBanner } from "@/components/shared/DynamicBanner"
import { IMAGES } from "@/constants/image.index"
import Image from "next/image"

export default function CheckoutPage({ params }: { params: { invoiceId: string } }) {


    return (
        <div>
            <DynamicBanner title="Payment Method" />
            <div className="flex py-10 items-center justify-center bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4">

                <div className="max-w-3xl mx-auto pt-20 ">
                    <h1 className="text-7xl font-bold text-[#39AE86] text-center pb-10">Successfully Paid</h1>
                    <Image
                        src={IMAGES.paymentSuccess.src}
                        alt="Payment Success"
                        width={700} height={700}
                        className="mx-auto mb-6"
                    />
                </div>
            </div>
        </div>
    )
}
