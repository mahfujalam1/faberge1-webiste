"use client"

import { cn } from "@/lib/utils"

interface CalendarGridProps {
    totalDays: number
    firstDay: number
    getDayStatus: (day: number) => "available" | "booked" | "unavailable"
    handleDayClick: (date: string, status: string) => void
    selectedYear: string
    monthIndex: number
}

export default function CalendarGrid({
    totalDays,
    firstDay,
    getDayStatus,
    handleDayClick,
    selectedYear,
    monthIndex,
}: CalendarGridProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "available": return "bg-green-200 hover:bg-green-300 cursor-pointer text-green-600"
            case "booked": return "bg-red-300 text-gray-500  cursor-pointer"
            default: return "bg-gray-200 cursor-not-allowed text-gray-800"
        }
    }

    return (
        <div className="grid grid-cols-7 gap-3 sm:gap-4 text-center text-xs sm:text-sm">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                <div key={d} className="font-semibold">{d}</div>
            ))}

            {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
                const day = i + 1
                const status = getDayStatus(day)
                const date = `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                return (
                    <button
                        key={day}
                        onClick={() => handleDayClick(date, status)}
                        className={cn(
                            "rounded-lg py-3 sm:py-4 text-xs sm:text-sm font-medium transition w-full",
                            getStatusColor(status)
                        )}
                    >
                        {day}
                    </button>
                )
            })}
        </div>
    )
}
