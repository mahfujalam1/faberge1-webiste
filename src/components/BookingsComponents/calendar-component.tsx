"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CalendarData } from "@/types/booking/appointment"

interface TimeSlot {
    time: string;
    isAvailable: boolean;
}

interface AvailableSlots {
    offDay: boolean;
    slots: TimeSlot[];
}

interface CalendarProps {
    calenderData?: CalendarData[];
    selectedMonth: number;
    selectedYear: number;
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
    setSelectedDate: (date: string) => void;
    availableSlots?: AvailableSlots | null;
}


export default function CalendarComponent({
    calenderData = [],
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
    setSelectedDate,
    availableSlots = null
}: CalendarProps) {
    const [, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const monthNames: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ]

    const years: number[] = Array.from({ length: 10 }, (_, i) => selectedYear - 2 + i)

    // Check if date is in the past
    const isPastDate = (dateString: string): boolean => {
        const date = new Date(dateString)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
    }

    // Check if all slots are booked for display purposes
    const areAllSlotsBooked = (date: string): boolean => {
        if (!availableSlots || !availableSlots.slots) return false
        return availableSlots.slots.every((slot: TimeSlot) => slot.isAvailable === false)
    }

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "bg-white":
                return "bg-white shadow-lg  cursor-pointer text-black"
            case "bg-green-500":
                return "bg-green-500 shadow-lg text-white cursor-pointer"
            case "bg-red-500":
                return "bg-red-500 shadow-lg text-white cursor-pointer"
            case "bg-gray-500":
                return "bg-gray-400 shadow-lg text-black cursor-pointer"
            case "bg-gray-200":
                return "bg-gray-200 shadow-lg text-gray-800 cursor-pointer"
            default:
                return "bg-gray-200 shadow-lg cursor-not-allowed text-gray-800"
        }
    }

    const handleDateClick = (date: string, status: string): void => {
        // Check for errors first
        if (isPastDate(date)) {
            toast.error(`Cannot select past date: ${date}`, {
                style: {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                },
                icon: "❌",
            })
            return
        }

        if (availableSlots && availableSlots.offDay === false) {
            toast.error(`This is an off day: ${date}`, {
                style: {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                },
                icon: "❌",
            })
            return
        }

        if (availableSlots && availableSlots.slots && availableSlots.slots.every((slot: TimeSlot) => slot.isAvailable === false)) {
            toast.error(`All slots are unavailable for ${date}`, {
                style: {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                },
                icon: "❌",
            })
            return
        }

        // If no errors, proceed with selection
        setSelectedDate(date)

        const allBooked = areAllSlotsBooked(date)

        if (status === "bg-red-500") {
            toast.warning(`Date ${date} is unavailable`, {
                style: {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                },
                icon: "⚠️",
            })
        } else if (status === "bg-gray-500") {
            toast.info(`Date ${date} is completed`, {
                style: {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                },
                icon: "✓",
            })
        } else if (allBooked) {
            toast.info(`All slots are booked for ${date}`, {
                style: {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                },
                icon: "📅",
            })
        } else {
            toast.success(`Date ${date} is available`, {
                style: {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                },
                icon: "✅",
            })
        }
    }

    // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDay: number = calenderData.length > 0 ? new Date(calenderData[0].date).getDay() : 0
    // Adjust for Monday-based week (0 = Monday, 6 = Sunday)
    const adjustedFirstDay: number = firstDay === 0 ? 6 : firstDay - 1

    return (
        <div className="px-5 overflow-x-auto flex-nowrap py-5 shadow-lg rounded-2xl w-full lg:w-[600px] mx-auto mb-5">
            <div className="flex flex-wrap items-center justify-end mb-4 gap-2">
                <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-white border-2 rounded-full" /> Available
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-green-500 rounded-full" /> Booked
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-red-500 rounded-full" /> Unavailable
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-gray-400 rounded-full" /> Completed
                    </div>
                </div>
            </div>

            {/* Month and Year Select */}
            <div className="grid grid-cols-2 mb-6">
                <Select
                    value={String(selectedMonth)}
                    onValueChange={(value: string) => onMonthChange(Number(value))}
                >
                    <SelectTrigger className="xl:w-68 md:w-32 sm:w-52 w-fit">
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        {monthNames.map((month: string, index: number) => (
                            <SelectItem key={month} value={String(index)}>
                                {month}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={String(selectedYear)}
                    onValueChange={(value: string) => onYearChange(Number(value))}
                >
                    <SelectTrigger className="xl:w-68 md:w-32 sm:w-52 w-fit">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year: number) => (
                            <SelectItem key={year} value={String(year)}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Calendar Grid */}
            <div>
                {/* Day Labels */}
                <div className="grid grid-cols-7 mb-2">
                    {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day: string) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-700">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                    {/* Empty spaces before the first day of the month */}
                    {Array.from({ length: adjustedFirstDay }).map((_, i: number) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {/* Days in the current month */}
                    {calenderData.map((data: CalendarData, i: number) => {
                        return (
                            <button
                                key={i}
                                onClick={() => handleDateClick(data?.date, data?.color)}
                                className={`
                                    lg:w-14 w-8 lg:h-14 h-8 rounded-lg text-sm font-medium transition-colors mx-auto my-2 shadow-lg
                                    ${getStatusColor(data?.color)}
                                `}
                            >
                                {data?.day}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}