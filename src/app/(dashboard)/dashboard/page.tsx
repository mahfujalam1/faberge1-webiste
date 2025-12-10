'use client'
// import { DashboardStats } from '@/components/Dashboard/DashboardStats';
import { BookingCard } from '@/components/myBookings/BookingCard';
import { Button } from '@/components/ui/button';
import { useGetAllUpcomingBookingForWorkerQuery } from '@/redux/api/bookingApi';
import { Booking } from '@/types/booking/bookings';
import { useState } from 'react'
import { ScaleLoader } from 'react-spinners';

function RootLayout() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 2;

    const { data, isLoading, error } = useGetAllUpcomingBookingForWorkerQuery({
        page: currentPage,
        limit: limit
    });

    // Flatten the bookings from the grouped date structure
    const bookings: Booking[] = data?.data
        ? (Object.values(data.data).flat() as Booking[])
        : [];

    const pagination = data?.pagination;


    // Pagination handlers
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (bookings?.length === limit || currentPage < (pagination?.totalPages || 1)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= (pagination?.totalPages || 1); i++) {
            buttons.push(
                <Button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`${currentPage === i
                        ? "bg-pink-500 text-white hover:bg-pink-600"
                        : "bg-white text-pink-500 border border-pink-500 hover:bg-pink-50"
                        }`}
                >
                    {i}
                </Button>
            );
        }
        return buttons;
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-tr from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 md:py-5">
                <div className="container mx-auto">
                    <div className='w-full pb-5'>
                        {/* <DashboardStats /> */}
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-md">
                        <h2 className='text-lg font-semibold border-b-2 pb-5'>Upcoming Bookings</h2>

                        {isLoading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500"><ScaleLoader color="#ff0db4" /></p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-500">Error loading bookings. Please try again.</p>
                            </div>
                        ) : bookings.length > 0 ? (
                            <>
                                {bookings?.map((booking: Booking) => (
                                    <BookingCard key={booking._id} booking={booking} />
                                ))}

                                {/* Pagination */}
                                <div className="flex justify-center items-center space-x-4 py-4">
                                    <Button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className="bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </Button>

                                    {/* Dynamic page number buttons */}
                                    <div className="flex space-x-2">{renderPageButtons()}</div>

                                    <Button
                                        onClick={handleNextPage}
                                        disabled={currentPage === pagination?.totalPages}
                                        className="bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No upcoming bookings found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RootLayout