"use client"

import { useMemo, useState } from "react"
import CalendarHeader from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import CalendarModal from "./CalendarModal"
import { Button } from "@/components/ui/button"
import UpdateScheduleModal from "./UpdateScheduleModal"

interface DayStatus {
    date: string
    status: "available" | "booked" | "unavailable" | "past"
}

// ✅ Base mock data
const mockAvailability: (Omit<DayStatus, "status"> & { status: "available" | "booked" | "unavailable" })[] = [
    { date: "2025-10-27", status: "available" },
    { date: "2025-10-31", status: "booked" },
    { date: "2025-10-28", status: "available" },
    { date: "2025-10-04", status: "unavailable" },
    { date: "2025-10-07", status: "unavailable" },
    { date: "2025-10-30", status: "available" },
    { date: "2025-10-07", status: "booked" },
]

// ✅ Helper - number of days in month
const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate()

export default function CalendarScheduler() {
    const [selectedMonth, setSelectedMonth] = useState("October")
    const [selectedYear, setSelectedYear] = useState("2025")
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)

    const monthIndex = new Date(`${selectedMonth} 1, ${selectedYear}`).getMonth()
    const totalDays = daysInMonth(monthIndex + 1, parseInt(selectedYear))
    const firstDay = new Date(parseInt(selectedYear), monthIndex, 1).getDay()
    const today = new Date()

    // ✅ Build merged calendar with availability + past days
    const fullMonthData: DayStatus[] = useMemo(() => {
        const allDates: DayStatus[] = Array.from({ length: totalDays }, (_, i) => {
            const day = i + 1
            const dateStr = `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            const dateObj = new Date(dateStr)
            const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate())

            const found = mockAvailability.find((d) => d.date === dateStr)

            // Found in mock data
            if (found) {
                if (found.status === "unavailable") {
                    return { date: dateStr, status: "unavailable" }
                }
                if (isPast) {
                    return { date: dateStr, status: "past" }
                }
                return found
            }

            // Not found
            if (isPast) return { date: dateStr, status: "past" }

            return { date: dateStr, status: "unavailable" }
        })
        return allDates
    }, [selectedMonth, selectedYear, monthIndex, today, totalDays])

    // ✅ Handle clicking on a day
    const handleDayClick = (date: string, status: string) => {
        if (status === "available" || status === "booked" || status === "past") {
            setSelectedDate(date)
            setOpen(true)
        }
    }

    // ✅ Get the status for each day
    const getDayStatus = (day: number): DayStatus["status"] => {
        const date = `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        const found = fullMonthData.find((d) => d.date === date)
        return found ? found.status : "unavailable"
    }

    return (
        <div className="max-w-xl w-full mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-sm">
            {/* 🔹 Legend */}
            <div className="flex flex-wrap items-center justify-end mb-4 gap-2">
                <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-[#22C55E] rounded-full" /> Available
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-[#CA0965] rounded-full" /> Booked
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-gray-400 rounded-full" /> Unavailable
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-white border-2 rounded-full" /> Past
                    </div>
                </div>
            </div>

            {/* 🔹 Calendar Header */}
            <CalendarHeader
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={setSelectedMonth}
                onYearChange={setSelectedYear}
            />

            {/* 🔹 Calendar Grid */}
            <CalendarGrid
                totalDays={totalDays}
                firstDay={firstDay}
                getDayStatus={getDayStatus}
                handleDayClick={handleDayClick}
                selectedYear={selectedYear}
                monthIndex={monthIndex}
            />

            {/* 🔹 Update Schedule Button */}
            <div className="flex justify-center mt-6">
                <Button
                    onClick={() => setUpdateModalOpen(true)}
                    className="bg-pink-600 hover:bg-pink-700 px-10 py-6 cursor-pointer w-full sm:w-auto"
                >
                    Update Schedule
                </Button>
            </div>

            {/* 🔹 Modals */}
            <CalendarModal
                open={open}
                onOpenChange={setOpen}
                selectedDate={selectedDate}
                status={
                    selectedDate
                        ? fullMonthData.find((d) => d.date === selectedDate)?.status || null
                        : null
                }
            />

            <UpdateScheduleModal open={updateModalOpen} onOpenChange={setUpdateModalOpen} />
        </div>
    )
}
