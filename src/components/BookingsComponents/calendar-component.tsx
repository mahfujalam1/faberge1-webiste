"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type DateStatus = "available" | "booked" | "off" | "past"

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

    const years = Array.from({ length: 10 }, (_, i) => currentYear - 2 + i)

    const getDateStatus = (day: number): DateStatus => {
        const today = new Date()
        const dateToCheck = new Date(currentYear, currentMonth, day)

        if (dateToCheck < today) return "past"

        // Mock data: green (available), red (off), orange (booked)
        const availableDates = [4, 5, 6, 12, 13, 14, 27, 28, 29]
        const offDates = [7, 8, 15, 25, 26]
        const bookedDates = [1, 2, 3, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31]

        if (availableDates.includes(day)) return "available"
        if (offDates.includes(day)) return "off"
        if (bookedDates.includes(day)) return "booked"

        return "past"
    }

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay()
    }

    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

    return (
        <div>
            <h2 className="text-xl font-medium mb-4">
                Scheduling <span className="text-red-500">*</span>
            </h2>

            {/* Month and Year Dropdowns */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Month Select */}
                <Select
                    value={String(currentMonth)}
                    onValueChange={(value) => onMonthChange(Number(value))}
                >
                    <SelectTrigger className="md:w-80 w-30">
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

                {/* Year Select */}
                <Select
                    value={String(currentYear)}
                    onValueChange={(value) => onYearChange(Number(value))}
                >
                    <SelectTrigger className="md:w-80 w-30">
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
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-700">
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
                                onClick={() => status === "available" && onDateSelect(day)}
                                disabled={status !== "available"}
                                className={`
                  md:w-20 w-12 md:h-20 h-12 rounded-lg text-sm font-medium transition-colors mx-auto my-3
                  ${status === "available" && !isSelected ? "bg-green-200 hover:bg-green-300 text-gray-900 cursor-pointer" : ""}
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
        </div>
    )
}
