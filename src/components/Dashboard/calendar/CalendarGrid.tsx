"use client"

import { cn } from "@/lib/utils"
import { toast } from "sonner"  

interface CalendarGridProps {
    totalDays: number
    firstDay: number
    getDayStatus: (day: number) => "available" | "booked" | "unavailable" | "Completed"
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
            case "available":
                return "bg-white shadow-lg  cursor-pointer text-black"
            case "booked":
                return "bg-green-500 shadow-lg text-white cursor-pointer"
            case "unavailable":
                return "bg-red-500 shadow-lg text-white cursor-pointer"
            case "Completed":
                return "bg-gray-400 shadow-lg text-black cursor-pointer"
            default:
                return "bg-gray-200 shadow-lg cursor-not-allowed text-gray-800"
        }
    }

    // 🔹 handle click logic
    const handleClick = (date: string, status: string) => {
        if (status === "unavailable") {
            toast.warning("This a weekend date.")
            return
        }

        handleDayClick(date, status)
    }

    return (
        <div className="grid grid-cols-7 gap-3 sm:gap-4 text-center text-xs sm:text-sm">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                <div key={d} className="font-semibold">
                    {d}
                </div>
            ))}

            {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
                const day = i + 1
                const status = getDayStatus(day)
                const date = `${selectedYear}-${String(monthIndex + 1).padStart(
                    2,
                    "0"
                )}-${String(day).padStart(2, "0")}`

                return (
                    <button
                        key={day}
                        onClick={() => handleClick(date, status)}
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
