"use client";

import { IMAGES } from "@/constants/image.index";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type React from "react";

export default function ContactSection() {
    const path = usePathname();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    // ✅ Gradient background only on /contact route
    const sectionBg =
        path === "/contact"
            ? "bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1]"
            : "bg-transparent";

    return (
        <section className={`py-20 px-4 ${sectionBg} transition-all duration-500`}>
            <div className="container mx-auto ">
                <div className="md:flex">
                    {/* Image Section */}
                    <div>
                        <Image
                            src={IMAGES.perfume.src}
                            alt="Contact Us"
                            width={600}
                            height={400}
                            className="w-full md:h-[790px] h-[570px] rounded-s-lg shadow-lg"
                        />
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-[#FDE4DB] rounded-e-lg p-8 sm:p-10 lg:p-12 shadow-lg w-full md:w-[650px]">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 flex justify-center lg:text-left pt-20 pb-5">
                            Contact Us
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* First Name and Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                />
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                            />

                            {/* Message */}
                            <textarea
                                placeholder="Message"
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-md border border-gray-800 focus:border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none"
                            />

                            {/* Button */}
                            <div className="flex justify-center lg:justify-center">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-12 py-3 bg-primary hover:bg-pink-700 text-white font-semibold rounded-md transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
