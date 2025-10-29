"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import teamMembersData from "@/constants/team-members.json";
import {
    BookingItem,
    ExtraService,
    SelectedSlot,
    Service,
    TeamMember,
} from "@/types/booking/appointment";
import BookingCart from "@/components/BookingsComponents/booking-cart";
import CalendarComponent from "@/components/BookingsComponents/calendar-component";
import ServiceSelectionTable from "@/components/BookingsComponents/service-selection";
import { IMAGES } from "@/constants/image.index";
import { MapPin } from "lucide-react";

export default function BookAppointmentPage({
    params,
}: {
    params: Promise<{ memberId: string }>;
}) {
    const router = useRouter();
    const { memberId } = React.use(params);
    const [member, setMember] = useState<TeamMember | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
    const [bookings, setBookings] = useState<BookingItem[]>([]);

    useEffect(() => {
        const foundMember = teamMembersData.members.find(
            (m) => m.workerId === memberId
        );
        if (foundMember) {
            setMember(foundMember as TeamMember);
        }
    }, [memberId]);

    const createServiceSlots = () => {
        if (!member) return [];

        const timeSlots = ["09:00 AM", "09:30 AM"];
        return timeSlots.map((time) => ({
            time,
            services: member.services.slice(0, 2),
            extraServices: member.extraServices,
        }));
    };

    const handleSlotChange = (
        slot: SelectedSlot | null,
        time: string,
        service: Service
    ) => {
        if (slot) {
            setSelectedSlots([...selectedSlots, slot]);
        } else {
            setSelectedSlots(
                selectedSlots.filter(
                    (s) => !(s.time === time && s.service.id === service.id)
                )
            );
        }
    };

    const handleAddOnToggle = (
        time: string,
        service: Service,
        addOn: ExtraService
    ) => {
        setSelectedSlots(
            selectedSlots.map((slot) => {
                if (slot.time === time && slot.service.id === service.id) {
                    const hasAddOn = slot.addOns.some((a) => a.id === addOn.id);
                    return {
                        ...slot,
                        addOns: hasAddOn
                            ? slot.addOns.filter((a) => a.id !== addOn.id)
                            : [...slot.addOns, addOn],
                    };
                }
                return slot;
            })
        );
    };

    // ✅ Add bookings
    const handleAddBookings = () => {
        if (!selectedDate || selectedSlots.length === 0) {
            alert("Please select a date and at least one service");
            return;
        }

        const newBookings: BookingItem[] = selectedSlots.map((slot) => ({
            date: `${currentMonth + 1}/${selectedDate}/${currentYear}`,
            time: slot.time,
            service: slot.service,
            addOns: slot.addOns,
        }));

        setBookings((prev) => [...prev, ...newBookings]);
        setSelectedSlots([]);
        setSelectedDate(null);
    };

    // ✅ Delete single booking
    const handleRemoveBooking = (index: number) => {
        setBookings((prev) => prev.filter((_, i) => i !== index));
    };

    // ✅ Clear all bookings
    const handleClearBookings = () => {
        setBookings([]);
    };

    // ✅ Checkout
    const handleCheckout = () => {
        const invoiceId = `INV-${Date.now()}`;
        console.log("[v0] Checkout with bookings:", bookings);
        console.log("[v0] Invoice ID:", invoiceId);
        router.push(`/bookings/checkout`);
    };

    if (!member) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4 py-20">
                <h1 className="text-2xl font-semibold text-center pb-5 text-primary">SCHEDULE  BOOKINGS</h1>
            <div className="max-w-7xl mx-auto">
                {/* Main Booking Interface */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-6">
                    <div className="grid md:grid-cols-1 xl:grid-cols-[400px_1fr] gap-5">
                        {/* Team Member Card */}
                        <div className="flex flex-col items-center justify-center bg-gray-50/50 rounded-lg shadow-md h-[400px] ms-5">
                            <div className="shadow-lg bg-white p-3 rounded-lg">
                                <div className="md:w-40 w-40 md:h-40 h-32 rounded-lg overflow-hidden mb-4">
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
                                <div className="">
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
                        <div className="overflow-hidden">
                            <CalendarComponent
                                selectedDate={selectedDate}
                                onDateSelect={setSelectedDate}
                                currentMonth={currentMonth}
                                currentYear={currentYear}
                                onMonthChange={setCurrentMonth}
                                onYearChange={setCurrentYear}
                            />

                            {selectedDate && (
                                <div className="mt-6 space-y-4  md:-w-60 overflow-hidden">
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
                                            className="w-34 bg-primary cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedDate(null);
                                                setSelectedSlots([]);
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

                {/* ✅ Booking Cart */}
                <BookingCart
                    bookings={bookings}
                    memberName={member.name}
                    workerId={member.workerId}
                    onCheckout={handleCheckout}
                    onRemove={handleRemoveBooking}
                    onClear={handleClearBookings}
                />
            </div>
        </div>
    );
}
