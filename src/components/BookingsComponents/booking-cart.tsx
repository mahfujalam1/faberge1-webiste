"use client";

import { BookingItem } from "@/types/booking/appointment";
import { X } from "lucide-react";

interface BookingCartProps {
    bookings: BookingItem[];
    memberName: string;
    workerId: string;
    onCheckout: () => void;
    isLoading: boolean;
}

interface Props extends BookingCartProps {
    onRemove?: (index: number) => void;
    onClear?: () => void;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

// "9:00 AM" → minutes since midnight.
const parse12hToMinutes = (time12: string): number => {
    const trimmed = time12.trim();
    const [time, modifier] = trimmed.split(" ");
    const [hStr, mStr] = time.split(":");
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    const mod = (modifier || "").toUpperCase();
    if (mod === "PM" && h !== 12) h += 12;
    if (mod === "AM" && h === 12) h = 0;
    return h * 60 + m;
};

const minutesTo12h = (mins: number): string => {
    const total = ((mins % (24 * 60)) + 24 * 60) % (24 * 60);
    const h24 = Math.floor(total / 60);
    const m = total % 60;
    const modifier = h24 >= 12 ? "PM" : "AM";
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}:${String(m).padStart(2, "0")} ${modifier}`;
};

// booking.time is the slot label ("9:00 AM - 9:30 AM") — always +30min.
// For display, we want the real service end: start + service.serviceDuration.
const computeServiceTimeRange = (booking: BookingItem): string => {
    const startStr = (booking.time || "").split(" - ")[0]?.trim();
    if (!startStr) return booking.time;
    const startMin = parse12hToMinutes(startStr);
    const dur = booking.service?.serviceDuration ?? 30;
    return `${startStr} - ${minutesTo12h(startMin + dur)}`;
};

export default function BookingCart({
    isLoading,
    bookings,
    memberName,
    workerId,
    onCheckout,
    onRemove,
    onClear,
}: Props) {
    // If there are no bookings
    if (!bookings || bookings.length === 0)
        return (
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center text-gray-600 font-medium">
                No bookings added yet.
            </div>
        );

    // Format date from YYYY-MM-DD to MM-DD-YYYY
    const formatDate = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${month}-${day}-${year}`;
    };

    // Customer-facing price = service price + agency fee (bundled, fee is invisible per spec).
    const lineDisplayedServicePrice = (booking: BookingItem) =>
        (booking.service?.price || 0) + (booking.service?.agencyFee || 0);

    const lineAddOnsPrice = (booking: BookingItem) =>
        booking.addOns.reduce(
            (sum: number, addon) => sum + (addon.subcategoryPrice || 0),
            0
        );

    // Sales tax is handled by Stripe at checkout, so we don't show or compute it here.
    const total = round2(
        bookings.reduce(
            (acc, b) => acc + lineDisplayedServicePrice(b) + lineAddOnsPrice(b),
            0
        )
    );

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-2 font-medium">Worker</th>
                            <th className="text-left py-3 px-2 font-medium">Date</th>
                            <th className="text-left py-3 px-2 font-medium">Time</th>
                            <th className="text-left py-3 px-2 font-medium">Service</th>
                            <th className="text-left py-3 px-2 font-medium">Add-Ons</th>
                            <th className="text-left py-3 px-2 font-medium">Total</th>
                            <th className="text-center py-3 px-2 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((booking, index) => {
                            const servicePriceDisplayed = lineDisplayedServicePrice(booking);
                            const itemTotal = round2(
                                servicePriceDisplayed + lineAddOnsPrice(booking)
                            );

                            return (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50 transition text-gray-800"
                                >
                                    <td className="py-3 px-2">{memberName}</td>
                                    <td className="py-3 px-2">{formatDate(booking.date)}</td>
                                    <td className="py-3 px-2">{computeServiceTimeRange(booking)}</td>
                                    <td className="py-3 px-2">
                                        {booking.service?.serviceName} ${servicePriceDisplayed}
                                    </td>
                                    <td className="py-3 px-2">
                                        {booking.addOns?.length > 0
                                            ? booking.addOns.map((addon) => `${addon.subcategoryName} $${addon.subcategoryPrice}`).join(", ")
                                            : "-"}
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

            <div className="mt-4 text-right text-gray-800 space-y-1">
                <div className="text-lg font-semibold">
                    Total: ${total.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                    Any applicable taxes will be added at checkout.
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-center gap-6">
                <button
                    onClick={onCheckout}
                    disabled={isLoading}
                    className="bg-primary cursor-pointer text-white px-12 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        "Check Out"
                    )}
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