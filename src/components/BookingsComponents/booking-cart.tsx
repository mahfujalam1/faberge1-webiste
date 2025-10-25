"use client";

import { X } from "lucide-react";
import { BookingCartProps } from "@/types/booking/appointment";

interface Props extends BookingCartProps {
    onRemove?: (index: number) => void;
    onClear?: () => void;
}

export default function BookingCart({
    bookings,
    memberName,
    workerId,
    onCheckout,
    onRemove,
    onClear,
}: Props) {
    if (!bookings || bookings.length === 0)
        return (
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center text-gray-600 font-medium">
                No bookings added yet.
            </div>
        );

    // 🔹 Total calculation
    const calculateTotal = () => {
        return bookings.reduce((total, booking) => {
            const servicePrice = booking.service.price;
            const addOnsPrice = booking.addOns.reduce(
                (sum, addon) => sum + addon.price,
                0
            );
            return total + servicePrice + addOnsPrice;
        }, 0);
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-2 font-medium">Customer</th>
                            <th className="text-left py-3 px-2 font-medium">Date</th>
                            <th className="text-left py-3 px-2 font-medium">Time</th>
                            <th className="text-left py-3 px-2 font-medium">Service</th>
                            <th className="text-left py-3 px-2 font-medium">Add-Ons</th>
                            <th className="text-left py-3 px-2 font-medium">Total</th>
                            <th className="text-center py-3 px-2 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => {
                            const itemTotal =
                                booking.service.price +
                                booking.addOns.reduce((sum, addon) => sum + addon.price, 0);

                            return (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50 transition text-gray-800"
                                >
                                    <td className="py-3 px-2">{booking.time}</td>
                                    <td className="py-3 px-2">{booking.date}</td>
                                    <td className="py-3 px-2">{booking.time}</td>
                                    <td className="py-3 px-2">
                                        {booking.service.code} ${booking.service.price}
                                    </td>
                                    <td className="py-3 px-2">
                                        {booking.addOns.map((addon) => `${addon.code} $${addon.price}`).join(", ") ||
                                            "-"}
                                    </td>
                                    <td className="py-3 px-2 font-medium">${itemTotal}</td>
                                    <td className="py-3 px-2 text-center">
                                        <button
                                            onClick={() => onRemove?.(index)}
                                            className="text-red-500 hover:text-red-700 transition cursor-pointer"
                                            title="Remove"
                                        >
                                            <X size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            <div className="mt-6 text-sm text-gray-600">
                Team Member: {memberName}, ID #{workerId}
            </div>

            <div className="mt-4 text-right text-gray-800 font-medium">
                Total Amount: ${calculateTotal()}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-center gap-6">
                <button
                    onClick={onCheckout}
                    className="bg-primary cursor-pointer text-white px-12 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                >
                    Check Out
                </button>

                <button
                    onClick={onClear}
                    className="border border-primary text-primary px-12 py-3 rounded-lg font-medium hover:bg-pink-50 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
