"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import teamMembersData from "@/constants/team-members.json"

type Service = {
    id: string
    name: string
    price: number
    code: string
}

type ExtraService = {
    id: string
    name: string
    price: number
    code: string
}

type TeamMember = {
    id: string
    workerId: string
    firstName: string
    lastName: string
    name: string
    city: string
    state: string
    location: string
    phone: string
    email: string
    price: string
    image: string
    services: Service[]
    extraServices: ExtraService[]
}

type BookingItem = {
    date: string
    time: string
    service: Service
    addOns: ExtraService[]
}

type DateStatus = "available" | "booked" | "off" | "past"

export default function BookAppointmentPage({ params }: { params: Promise<{ memberId: string }> }) {
    const router = useRouter()
    const { memberId } = React.use(params)
    const [member, setMember] = useState<TeamMember | null>()
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [selectedDate, setSelectedDate] = useState<number | null>(null)
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [selectedAddOns, setSelectedAddOns] = useState<ExtraService[]>([])
    const [bookings, setBookings] = useState<BookingItem[]>([])

    const getDateStatus = (day: number): DateStatus => {
        const today = new Date()
        const dateToCheck = new Date(currentYear, currentMonth, day)

        if (dateToCheck < today) return "past"

        // Mock data: green (available), red (off), orange (booked)
        const availableDates = [8, 9, 12, 13, 27, 28, 29]
        const offDates = [7, 10, 11, 14, 15, 16, 17, 23, 24]
        const bookedDates = [18, 19, 20, 21, 22, 25, 26, 30, 31]

        if (availableDates.includes(day)) return "available"
        if (offDates.includes(day)) return "off"
        if (bookedDates.includes(day)) return "booked"

        return "past"
    }

    const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

    console.log("member Id=>", memberId)
    useEffect(() => {
        const foundMember = teamMembersData.members.find((m) => m.workerId === memberId)
        if (foundMember) {
            setMember(foundMember as TeamMember)
        }
    }, [memberId])
    console.log("find member=>", member)

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay()
    }

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const handleAddBooking = () => {
        if (!selectedDate || !selectedTime || !selectedService) {
            alert("Please select date, time, and service")
            return
        }

        const newBooking: BookingItem = {
            date: `${currentMonth + 1}/${selectedDate}/${currentYear}`,
            time: selectedTime,
            service: selectedService,
            addOns: selectedAddOns,
        }

        setBookings([...bookings, newBooking])

        // Reset selections
        setSelectedTime("")
        setSelectedService(null)
        setSelectedAddOns([])
    }

    const handleCheckout = () => {
        const invoiceId = `INV-${Date.now()}`
        console.log("[v0] Checkout with bookings:", bookings)
        console.log("[v0] Invoice ID:", invoiceId)
        router.push(`/bookings/checkout/${invoiceId}`)
    }

    const calculateTotal = () => {
        return bookings.reduce((total, booking) => {
            const servicePrice = booking.service.price
            const addOnsPrice = booking.addOns.reduce((sum, addon) => sum + addon.price, 0)
            return total + servicePrice + addOnsPrice
        }, 0)
    }

    const toggleAddOn = (addon: ExtraService) => {
        if (selectedAddOns.find((a) => a.id === addon.id)) {
            setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id))
        } else {
            setSelectedAddOns([...selectedAddOns, addon])
        }
    }

    if (!member) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Booking Interface */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-6">
                    <div className="grid md:grid-cols-[300px_1fr] gap-8">
                        {/* Team Member Card */}
                        <div className="flex flex-col items-center">
                            <div className="w-40 h-40 bg-gray-200 rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.name}
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-gray-600 text-sm">{member.price}</p>
                        </div>

                        {/* Scheduling Section */}
                        <div>
                            <h2 className="text-2xl font-serif mb-6">Scheduling</h2>

                            {/* Month/Year Navigation */}
                            <div className="flex items-center justify-between mb-6">
                                <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="text-lg font-medium">
                                    {monthNames[currentMonth]} {currentYear}
                                </div>
                                <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Calendar */}
                            <div className="mb-6">
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => (
                                        <div key={day} className="text-center text-sm font-medium text-gray-600">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1
                                        const status = getDateStatus(day)
                                        const isSelected = selectedDate === day

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => status === "available" && setSelectedDate(day)}
                                                disabled={status !== "available"}
                                                className={`
                          aspect-square rounded-lg text-sm font-medium transition-colors
                          ${status === "available" && !isSelected ? "bg-green-200 hover:bg-green-300 text-gray-900" : ""}
                          ${status === "available" && isSelected ? "bg-green-400 text-white" : ""}
                          ${status === "booked" ? "bg-orange-200 text-gray-500 cursor-not-allowed" : ""}
                          ${status === "off" ? "bg-red-200 text-gray-500 cursor-not-allowed" : ""}
                          ${status === "past" ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""}
                        `}
                                            >
                                                {day}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Time, Service, Add-Ons Selection */}
                            {selectedDate && (
                                <div className="space-y-4 border-t pt-6">
                                    {/* Time Selection */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Time</label>
                                        <select
                                            value={selectedTime}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            className="w-full p-2 border rounded-lg"
                                        >
                                            <option value="">Select time</option>
                                            {timeSlots.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Service Selection */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Service</label>
                                        <select
                                            value={selectedService?.id || ""}
                                            onChange={(e) => {
                                                const service = member.services.find((s) => s.id === e.target.value)
                                                setSelectedService(service || null)
                                            }}
                                            className="w-full p-2 border rounded-lg"
                                        >
                                            <option value="">Select service</option>
                                            {member.services.map((service) => (
                                                <option key={service.id} value={service.id}>
                                                    {service.name} - ${service.price}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Add-Ons Selection */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Add-Ons</label>
                                        <div className="flex flex-wrap gap-2">
                                            {member.extraServices.map((addon) => (
                                                <button
                                                    key={addon.id}
                                                    onClick={() => toggleAddOn(addon)}
                                                    className={`px-4 py-2 rounded-lg border transition-colors ${selectedAddOns.find((a) => a.id === addon.id)
                                                        ? "bg-pink-500 text-white border-pink-500"
                                                        : "bg-white text-gray-700 border-gray-300 hover:border-pink-500"
                                                        }`}
                                                >
                                                    {addon.name} ${addon.price}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Add Button */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleAddBooking}
                                            className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedDate(null)
                                                setSelectedTime("")
                                                setSelectedService(null)
                                                setSelectedAddOns([])
                                            }}
                                            className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                {bookings.length > 0 && (
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
                                        const itemTotal =
                                            booking.service.price + booking.addOns.reduce((sum, addon) => sum + addon.price, 0)
                                        return (
                                            <tr key={index} className="border-b">
                                                <td className="py-3 px-2">09:00 AM</td>
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
                            Team Member: {member.name}, ID #{member.workerId}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleCheckout}
                                className="bg-pink-600 text-white px-32 py-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                            >
                                Check Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
