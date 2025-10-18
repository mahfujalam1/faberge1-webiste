"use client"

import { BookingCartProps } from "@/types/booking/appointment"



export default function BookingCart({ bookings, memberName, workerId, onCheckout }: BookingCartProps) {
    if (bookings.length === 0) return null

    // const calculateTotal = () => {
    //     return bookings.reduce((total, booking) => {
    //         const servicePrice = booking.service.price
    //         const addOnsPrice = booking.addOns.reduce((sum, addon) => sum + addon.price, 0)
    //         return total + servicePrice + addOnsPrice
    //     }, 0)
    // }

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
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => {
                            const itemTotal = booking.service.price + booking.addOns.reduce((sum, addon) => sum + addon.price, 0)
                            return (
                                <tr key={index} className="border-b">
                                    <td className="py-3 px-2">{booking.time}</td>
                                    <td className="py-3 px-2">{booking.date}</td>
                                    <td className="py-3 px-2">{booking.time}</td>
                                    <td className="py-3 px-2">
                                        {booking.service.code} ${booking.service.price}
                                    </td>
                                    <td className="py-3 px-2">
                                        {booking.addOns.map((addon) => `${addon.code} $${addon.price}`).join(", ") || "-"}
                                    </td>
                                    <td className="py-3 px-2 font-medium">${itemTotal}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 text-sm text-gray-600">
                Team Member: {memberName}, ID #{workerId}
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={onCheckout}
                    className="bg-primary cursor-pointer text-white px-32 py-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                >
                    Check Out
                </button>
            </div>
        </div>
    )
}
