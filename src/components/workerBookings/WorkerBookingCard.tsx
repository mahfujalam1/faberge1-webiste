'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IMAGES } from "@/constants/image.index";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/authServices";
import { formatDate, getStatusColor } from "@/utils/utils";
import { Booking, ServiceItem } from "@/types/booking/bookings";
import { ScaleLoader } from "react-spinners";
import { useCompleteBookingMutation } from "@/redux/api/bookingApi";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ApiError } from "@/types/global.types";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface BookingCardProps {
    booking: Booking;
}

export const WorkerBookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    console.log(booking?._id)
    const [, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completeBooking, { isLoading: isCompleting }] = useCompleteBookingMutation();

    useEffect(() => {
        const userInfo = getUserInfo();
        setUser(userInfo);
        setLoading(false);
    }, []);

    // Handle complete booking with API call
    const completeBookingAPI = async () => {
        if (!booking?._id) {
            toast.error("Booking ID not found!");
            return;
        }

        try {
            const response = await completeBooking(booking._id);
            console.log(response);

            if (response?.data) {
                toast.success(response?.data?.message || "Booking completed successfully!");
            } else if (response?.error) {
                const apiError = response?.error as ApiError;
                const errorMessage = apiError?.data?.message || "Failed to complete booking!";
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Complete booking error:", error);
            toast.error("Failed to complete booking!");
        }
    };

    // Show confirmation popup before completing booking
    const handleCompleteBooking = () => {
        confirm({
            title: 'Complete Booking',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to mark this booking as completed?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            centered: true,
            okButtonProps: {
                style: { backgroundColor: '#ec4899', borderColor: '#ec4899', color:"#ffff" }
            },
            onOk() {
                completeBookingAPI();
            },
            onCancel() {
                console.log('Booking completion cancelled');
            },
        });
    };

    // Check if booking is completed
    const isCompleted = booking?.status === 'completed';

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
                            <div className="text-nowrap whitespace-nowrap flex-nowrap">
                                <ScaleLoader color="#ff0db4" />
                            </div>
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
                        src={booking.customer?.uploadPhoto || IMAGES.logo.src}
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
                    <div className="grid grid-cols-9 bg-[#FFC0CB] px-4 py-3 text-xs sm:text-sm font-bold text-gray-800">
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Date</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Time</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Customer</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Phone</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">Email</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap text-center">Payment Status</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap text-center">Amount</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap text-center">Status</div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap text-end">Complete Status</div>
                    </div>

                    {/* Content Row */}
                    <div className="grid grid-cols-9 items-center px-4 py-4 text-xs sm:text-sm text-gray-800 border-b border-pink-100">
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">
                            {formatDate(booking?.date)}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">
                            {booking?.startTime} - {booking?.endTime}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">
                            {booking?.customer?.firstName} {booking?.customer?.lastName}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap">
                            {booking?.customer?.phone || 'N/A'}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap overflow-hidden text-ellipsis">
                            {booking?.customer?.email || 'N/A'}
                        </div>
                        <div className="text-nowrap whitespace-nowrap flex-nowrap text-center">
                            <span className="bg-green-500 px-2 rounded-full text-white">
                                {booking?.isPayment ? 'Paid' : 'Pending'}
                            </span>
                        </div>
                        <div className="text-center font-semibold text-nowrap whitespace-nowrap flex-nowrap">
                            ${booking?.paymentAmount || 0}
                        </div>
                        <div className="text-center text-nowrap whitespace-nowrap flex-nowrap">
                            <Badge
                                className={`${getStatusColor(booking?.status)} text-xs px-2 rounded-sm`}
                            >
                                {booking?.status === 'booked' ? 'Upcoming' : booking?.status === 'completed' ? 'Completed' : booking?.status}
                            </Badge>
                        </div>
                        <div className="text-center text-nowrap whitespace-nowrap flex-nowrap flex justify-end">
                            <Button
                                onClick={handleCompleteBooking}
                                disabled={isCompleted || isCompleting}
                                className={`
                                    px-3 py-1 text-xs h-7 rounded
                                    ${isCompleted
                                        ? 'bg-green-500 hover:bg-green-500 cursor-not-allowed'
                                        : 'bg-pink-500 hover:bg-pink-600 cursor-pointer'
                                    }
                                    text-white 
                                    disabled:opacity-70
                                    transition-all
                                `}
                            >
                                {isCompleting ? (
                                    <span className="flex items-center gap-1">
                                        <ScaleLoader color="#ffffff" height={10} width={2} />
                                    </span>
                                ) : isCompleted ? (
                                    'True'
                                ) : (
                                    'False'
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Footer - Services Info */}
                    <div className="pt-2 border-t-2 px-4 flex justify-between items-center">
                        <div className="text-sm flex flex-col sm:flex-row sm:items-center gap-2 font-medium text-gray-600">
                            <span className="font-semibold text-gray-700">Services:</span>
                            <span className="text-gray-600">
                                {booking?.services?.length || 0} service(
                                {booking?.services?.map((service: ServiceItem, index: number) => (
                                    <span key={service?.service?._id}>
                                        {service?.service?.serviceName}
                                        {index < booking.services.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                                ) booked
                            </span>
                            {booking?.transactionId && (
                                <span className="text-gray-500 text-xs">
                                    Transaction ID: {booking?.transactionId}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};