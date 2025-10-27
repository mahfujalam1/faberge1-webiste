'use client'
import { DashboardStats } from '@/components/Dashboard/DashboardStats';
import { BookingCard } from '@/components/myBookings/BookingCard';
import { Pagination } from '@/components/myBookings/Pagination'
// import { DynamicBanner } from '@/components/shared/DynamicBanner'
import { bookings } from '@/constants/booking';
import { useState } from 'react'

function RootLayout() {

    const [, setCurrentPage] = useState(1);
    const pageSize = 2;

    const upComingBookings = bookings.filter(b => b.status == "Upcoming")


    return (
        <div>
            {/* <DynamicBanner title='Welcome Back, John Wick' /> */}
            <div className="min-h-screen bg-gradient-to-tr from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 md:py-20">
                <div className="container mx-auto">
                    <div className='w-full py-5'>
                        <DashboardStats />
                    </div>
                    <div className="p-8 bg-white">
                        <h2 className='text-lg font-semibold border-b-2 pb-5 '>UpComing</h2>
                        {upComingBookings.length > 0 ? (
                            upComingBookings.map(b => <BookingCard key={b.id} booking={b} />)
                        ) : (
                            <p className="text-gray-500 text-center">No UpComing bookings found.</p>
                        )}
                        <Pagination
                            total={bookings.length}
                            pageSize={pageSize}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RootLayout