"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import teamMembersData from "@/constants/team-members.json"
import { BookingItem, ExtraService, SelectedSlot, Service, TeamMember } from "@/types/booking/appointment"
import BookingCart from "@/components/BookingsComponents/booking-cart"
import CalendarComponent from "@/components/BookingsComponents/calendar-component"
import ServiceSelectionTable from "@/components/BookingsComponents/service-selection"
import { IMAGES } from "@/constants/image.index"
import { DynamicBanner } from "@/components/shared/DynamicBanner"
import { MapPin } from "lucide-react"



type DateStatus = "available" | "booked" | "off" | "past"

export default function BookAppointmentPage({ params }: { params: Promise<{ memberId: string }> }) {
    const router = useRouter()
    const { memberId } = React.use(params)
    const [member, setMember] = useState<TeamMember | null>(null)
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [selectedDate, setSelectedDate] = useState<number | null>(null)
    const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([])
    const [bookings, setBookings] = useState<BookingItem[]>([])

    useEffect(() => {
        const foundMember = teamMembersData.members.find((m) => m.workerId === memberId)
        if (foundMember) {
            setMember(foundMember as TeamMember)
        }
    }, [memberId])

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

    const createServiceSlots = () => {
        if (!member) return []

        const timeSlots = ["09:00 AM", "09:30 AM"]
        return timeSlots.map((time) => ({
            time,
            services: member.services.slice(0, 2), // Show first 2 services
            extraServices: member.extraServices,
        }))
    }

    const handleSlotChange = (slot: SelectedSlot | null, time: string, service: Service) => {
        if (slot) {
            setSelectedSlots([...selectedSlots, slot])
        } else {
            setSelectedSlots(selectedSlots.filter((s) => !(s.time === time && s.service.id === service.id)))
        }
    }

    const handleAddOnToggle = (time: string, service: Service, addOn: ExtraService) => {
        setSelectedSlots(
            selectedSlots.map((slot) => {
                if (slot.time === time && slot.service.id === service.id) {
                    const hasAddOn = slot.addOns.some((a) => a.id === addOn.id)
                    return {
                        ...slot,
                        addOns: hasAddOn ? slot.addOns.filter((a) => a.id !== addOn.id) : [...slot.addOns, addOn],
                    }
                }
                return slot
            }),
        )
    }

    const handleAddBookings = () => {
        if (!selectedDate || selectedSlots.length === 0) {
            alert("Please select a date and at least one service")
            return
        }

        const newBookings: BookingItem[] = selectedSlots.map((slot) => ({
            date: `${currentMonth + 1}/${selectedDate}/${currentYear}`,
            time: slot.time,
            service: slot.service,
            addOns: slot.addOns,
        }))

        setBookings([...bookings, ...newBookings])
        setSelectedSlots([])
        setSelectedDate(null)
    }

    const handleCheckout = () => {
        const invoiceId = `INV-${Date.now()}`
        console.log("[v0] Checkout with bookings:", bookings)
        console.log("[v0] Invoice ID:", invoiceId)
        router.push(`/bookings/checkout/${invoiceId}`)
    }

    if (!member) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    return (
        <div>
            <DynamicBanner title="Book Appointment" />
            <div className="min-h-screen bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 py-20">
                <div className="container mx-auto">
                    {/* Main Booking Interface */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-6">
                        <div className="grid md:grid-cols-[500px_1fr] gap-8">
                            {/* Team Member Card */}
                            <div className="flex flex-col items-center justify-center md:mt-20 bg-gray-50/50 rounded-lg shadow-md h-[400px] mx-10">
                                <div className="shadow-lg bg-white p-3 rounded-lg">
                                    <div className="md:w-60 w-52 md:h-60 h-52 rounded-lg overflow-hidden mb-4">
                                        <Image
                                            src={IMAGES.workerProfile.src}
                                            alt={member.name}
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{member.name}</h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                            <MapPin className="w-3 h-3" />
                                            <span>
                                                {member.city}, {member.state}
                                            </span>
                                        </div>

                                        <div className="flex items-end gap-1 text-xs text-gray-700">
                                            <span>ID:</span>
                                            <span>{member.workerId}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Scheduling Section */}
                            <div>
                                <CalendarComponent
                                    selectedDate={selectedDate}
                                    onDateSelect={setSelectedDate}
                                    currentMonth={currentMonth}
                                    currentYear={currentYear}
                                    onMonthChange={setCurrentMonth}
                                    onYearChange={setCurrentYear}
                                />

                                {selectedDate && (
                                    <div className="mt-6 space-y-4">
                                        <ServiceSelectionTable
                                            slots={createServiceSlots()}
                                            selectedSlots={selectedSlots}
                                            onSlotChange={handleSlotChange}
                                            onAddOnToggle={handleAddOnToggle}
                                        />

                                        {/* Add and Cancel Buttons */}
                                        <div className="flex gap-4 justify-between">
                                            <button
                                                onClick={handleAddBookings}
                                                disabled={selectedSlots.length === 0}
                                                className=" w-34 bg-primary cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                            >
                                                Add
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedDate(null)
                                                    setSelectedSlots([])
                                                }}
                                                className="w-34 bg-white cursor-pointer text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <BookingCart
                        bookings={bookings}
                        memberName={member.name}
                        workerId={member.workerId}
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>
        </div>
    )
}
