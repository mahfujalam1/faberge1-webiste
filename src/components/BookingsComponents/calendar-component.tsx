"use client"

import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type DateStatus = "available" | "booked" | "Unavailable" | "Completed"

type CalendarProps = {
    selectedDate: number | null
    onDateSelect: (date: number) => void
    currentMonth: number
    currentYear: number
    onMonthChange: (month: number) => void
    onYearChange: (year: number) => void
}

export default function CalendarComponent({
    selectedDate,
    onDateSelect,
    currentMonth,
    currentYear,
    onMonthChange,
    onYearChange,
}: CalendarProps) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ]

    const years = Array.from({ length: 10 }, (_, i) => currentYear - 2 + i)

    // Mock data for the statuses
    const availableDates = [4, 5, 6, 12, 13, 14, 27, 28, 29]
    const unavailableDates = [7, 8, 15, 25, 26]
    const bookedDates = [1, 2, 3, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31]

    const getDateStatus = (day: number): DateStatus => {
        const today = new Date()
        const dateToCheck = new Date(currentYear, currentMonth, day)

        if (dateToCheck < today) return "Completed" // Past dates are "Completed"
        if (availableDates.includes(day)) return "available"
        if (unavailableDates.includes(day)) return "Unavailable"
        if (bookedDates.includes(day)) return "booked"

        return "Completed" // Default for any other date
    }

    const getDaysInMonth = (month: number, year: number) =>
        new Date(year, month + 1, 0).getDate()

    const getFirstDayOfMonth = (month: number, year: number) =>
        new Date(year, month, 1).getDay()

    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

    const handleDateClick = (day: number, status: DateStatus) => {
        if (status === "available") {
            onDateSelect(day)
        } else {
            toast.error(`This date is ${status.toUpperCase()}`, {
                style: {
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ddd",
                },
                icon: "⚠️",
            })
        }
    }

    // Function to assign colors based on the date status
    const getStatusColor = (status: DateStatus) => {
        switch (status) {
            case "available":
                return "bg-white text-black cursor-pointer"
            case "booked":
                return "bg-green-500 text-white cursor-pointer"
            case "Unavailable":
                return "bg-red-500 text-white cursor-pointer"
            case "Completed":
                return "bg-gray-400 text-black cursor-pointer"
            default:
                return "bg-gray-200 text-gray-800 cursor-not-allowed"
        }
    }

    return (
        <div className="px-5 overflow-x-auto flex-nowrap py-5 shadow-lg rounded-2xl w-full md:w-[600px] mx-auto mb-5">

            <h2 className="text-xl font-medium mb-4">
                Scheduling <span className="text-red-500">*</span>
            </h2>

            {/* Month and Year Select */}
            <div className="grid grid-cols-2 mb-6">
                <Select
                    value={String(currentMonth)}
                    onValueChange={(value) => onMonthChange(Number(value))}
                >
                    <SelectTrigger className="xl:w-68 sm:w-52 w-fit">
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        {monthNames.map((month, index) => (
                            <SelectItem key={month} value={String(index)}>
                                {month}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={String(currentYear)}
                    onValueChange={(value) => onYearChange(Number(value))}
                >
                    <SelectTrigger className="xl:w-68 sm:w-52 w-fit">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
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
                    {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-700">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                    {/* Empty spaces before the first day of the month */}
                    {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {/* Days in the current month */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const status = getDateStatus(day)
                        const isSelected = selectedDate === day
                        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

                        return (
                            <button
                                key={day}
                                onClick={() => handleDateClick(day, status)}
                                className={`
                                    md:w-14 w-8 md:h-14 h-8 rounded-lg text-sm font-medium transition-colors mx-auto my-2 shadow-lg
                                    ${getStatusColor(status)} // Applying the correct color based on the status
                                `}
                            >
                                {day}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
