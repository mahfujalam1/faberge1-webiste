'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IMAGES } from "@/constants/image.index";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/authServices";
import { formatDate, getStatusColor } from "@/utils/utils";
import { Booking, ServiceItem } from "@/types/booking/bookings";

interface BookingCardProps {
    booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    const [, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = getUserInfo();
        setUser(userInfo);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Card className="mb-6 rounded-lg shadow-md overflow-hidden overflow-x-auto bg-[#FFEBEF] mt-5 max-w-full">
                <CardContent className="p-0 flex md:flex-row">
                    <div className="flex-shrink-0 px-6 md:pb-0 pb-3 flex justify-start">
                        <Image
                            src={IMAGES.logo.src}
                            alt="team member"
                            width={120}
                            height={120}
                            className="object-cover border bg-white rounded"
                            priority
                        />
                    </div>
                    <div className="flex-grow flex-nowrap min-w-[800px]">
                        <div className="grid grid-cols-7 bg-[#FFC0CB] px-4 py-3 text-xs sm:text-sm font-bold text-gray-800">
                            <div className="text-nowrap whitespace-nowrap flex-nowrap">Loading...</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }


    return (
        <Card className="mb-6 rounded-lg shadow-md overflow-hidden overflow-x-auto bg-[#FFEBEF] mt-5 max-w-full">
            <CardContent className="p-0 flex md:flex-row">
                {/* Image Section */}
                <div className="flex-shrink-0 px-6 md:pb-0 pb-3 flex justify-start">
                    <Image
                        src={booking?.worker?.uploadPhoto || IMAGES.logo.src}
                        alt="customer"
                        width={120}
                        height={120}
                        className="object-cover border bg-white rounded"
                        priority
                    />
                </div>

                {/* Content Section */}
                <div className="flex-grow flex-nowrap min-w-[800px]">
                    {/* Header Row */}
                    <div className="grid grid-cols-7 bg-[#FFC0CB] px-4 py-3 text-xs sm:text-sm font-bold text-gray-800">
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Date</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Time</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Customer</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Phone</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Email</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrapn text-center">Payment</div>
                        <div className="text-right text-nowrap whitespace-nowrap flex-nowrap">
                            <Badge
                                className={`${getStatusColor(booking.status)} text-xs px-2 rounded-sm`}
                            >
                                {booking.status.toUpperCase()}
                            </Badge>
                        </div>
                    </div>

                    {/* Content Row */}
                    <div className="grid grid-cols-7 items-center px-4 py-4 text-xs sm:text-sm text-gray-800 border-b border-pink-100">
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">
                            {formatDate(booking.date)}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">
                            {booking.startTime} - {booking.endTime}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">
                            {booking.customer?.firstName} {booking.customer?.lastName}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">
                            {booking.customer?.phone || 'N/A'}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap overflow-hidden text-ellipsis">
                            {booking.customer?.email || 'N/A'}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap text-center">
                            <span className="bg-green-500 px-2 rounded-full text-white">
                                {booking.isPayment ? 'Paid' : 'Pending'}
                            </span>
                        </div>
                        <div className="text-right font-semibold text-nowrap whitespace-nowrap flex-nowrap">
                            ${booking.paymentAmount || 0}
                        </div>
                    </div>

                    {/* Footer - Services Info */}
                    <div className="pt-2 border-t-2 px-4 flex justify-between items-center">
                        <div className="text-sm flex flex-col sm:flex-row sm:items-center gap-2 font-medium text-gray-600">
                            <span className="font-semibold text-gray-700">Services:</span>
                            <span className="text-gray-600">
                                {booking.services?.length || 0} service({booking?.services?.map((service: ServiceItem) => <span key={service?.service?._id}>{service?.service?.serviceName} </span>)}) booked
                            </span>
                            {booking.transactionId && (
                                <span className="text-gray-500 text-xs">
                                    Transaction ID: {booking.transactionId}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
