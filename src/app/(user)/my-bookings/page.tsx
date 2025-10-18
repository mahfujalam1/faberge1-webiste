"use client";

import { BookingTabs } from "@/components/myBookings/BookingTabs";
import { Pagination } from "@/components/myBookings/Pagination";
import { DynamicBanner } from "@/components/shared/DynamicBanner";
import { bookings } from "@/constants/booking";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { useState } from "react";

export default function BookingsPage() {
    const {user} = useAuth()
    const [, setCurrentPage] = useState(1);
    const pageSize = 2;



    return (
        <div>
            <DynamicBanner title="My Bookings" />
            <div className="min-h-screen bg-gradient-to-tr from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 md:py-20">
                <div className="container mx-auto">
                    <div className="p-8 bg-white">
                        <BookingTabs />
                        <Pagination
                            total={bookings.length}
                            pageSize={pageSize}
                            onPageChange={setCurrentPage}
                        />
                        {
                            user?.role !== 'worker' && <Link href={'/bookings'} className="flex justify-center lg:justify-end mt-5">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-12 py-3 cursor-pointer bg-primary hover:bg-pink-700 text-white font-semibold rounded-md transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    Book Appointment
                                </button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
