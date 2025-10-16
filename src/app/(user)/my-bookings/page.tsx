"use client";

import { BookingTabs } from "@/components/myBookings/BookingTabs";
import { Pagination } from "@/components/myBookings/Pagination";
import { DynamicBanner } from "@/components/shared/DynamicBanner";
import { bookings } from "@/constants/booking";
import { useState } from "react";

export default function BookingsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    const paginatedBookings = bookings.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
                    </div>
                </div>
            </div>
        </div>
    );
}
