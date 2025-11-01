"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { bookings } from "@/constants/booking";
import { IMAGES } from "@/constants/image.index";
import { useAuth } from "@/contexts/auth-context";

interface BookingCardProps {
    booking: typeof bookings[0];
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    const { user } = useAuth()
    return (
        <Card className="mb-6 rounded-lg shadow-md overflow-hidden overflow-x-auto bg-[#FFEBEF] mt-5 max-w-full">
            <CardContent className="p-0 flex  md:flex-row">
                {/* Image Section */}
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

                {/* Content Section */}
                <div className="flex-grow flex-nowrap min-w-[800px] ">
                    {/* Header Row */}
                    <div className="grid grid-cols-7  bg-[#FFC0CB] px-4 py-3 text-xs sm:text-sm font-bold text-gray-800">
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Date</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Time</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Customer</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Address</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Service</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Add-Ons</div>
                        <div className="text-right text-nowrap whitespace-nowrap flex-nowrap">
                            <Badge
                                className={`${booking.status === "Completed"
                                    ? "bg-red-500 text-white"
                                    : "bg-green-100 text-green-700"
                                    } text-xs px-2 rounded-sm`}
                            >
                                {booking.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Content Row */}
                    <div className="grid grid-cols-7 items-center px-4 py-4 text-xs sm:text-sm text-gray-800 border-b border-pink-100">
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">{booking.date}</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">{booking.time}</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">John Wick</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">New York</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">{booking.service}</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">{booking.addOns}</div>
                        <div className="text-right font-semibold text-nowrap whitespace-nowrap flex-nowrap">${booking.price}</div>
                    </div>

                    {/* Footer - Team Member Info */}
                    <div className="pt-2 border-t-2 px-4 flex justify-between">
                        <div className="text-sm flex flex-col sm:flex-row sm:items-center gap-2 font-medium text-gray-600">
                            <span className="font-semibold text-gray-700">Team Member:</span>
                            <span className="flex items-center gap-1">
                                <Image
                                    src={IMAGES.workerProfile.src}
                                    alt="profile"
                                    height={20}
                                    width={20}
                                    className="rounded-full"
                                    priority
                                />
                                <span className="text-gray-600 font-semibold whitespace-nowrap">{booking.name}</span>
                                <span className="text-gray-500 whitespace-nowrap">(Nail Tech)</span>
                                <span className="text-gray-500 whitespace-nowrap"><span className="px-5">State: New York</span> <span>ID#: 876546</span></span>
                            </span>
                        </div>
                        {
                            user?.role && <div>
                                <button className="rounded-sm bg-primary cursor-pointer text-white text-sm px-2">Close</button>
                            </div>
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
