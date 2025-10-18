"use client"

import { useState } from "react"
import CalendarHeader from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import CalendarModal from "./CalendarModal"
import { Button } from "@/components/ui/button"
import UpdateScheduleModal from "./UpdateScheduleModal"

interface DayStatus {
    date: string
    status: "available" | "booked" | "unavailable"
}

const mockAvailability: DayStatus[] = [
    { date: "2025-10-01", status: "available" },
    { date: "2025-10-02", status: "booked" },
    { date: "2025-10-03", status: "available" },
    { date: "2025-10-04", status: "unavailable" },
    { date: "2025-10-05", status: "available" },
    { date: "2025-10-07", status: "booked" },
]

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

    const handleDayClick = (date: string, status: string) => {
        if (status === "available" || status === "booked") {
            setSelectedDate(date)
            setOpen(true)
        }
    }

    const getDayStatus = (day: number): DayStatus["status"] => {
        const date = `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        const found = mockAvailability.find((d) => d.date === date)
        return found ? found.status : "unavailable"
    }

    return (
        <div className="max-w-xl w-full mx-auto p-6 sm:p-8 bg-white">
            {/* Header (Legends) */}
            <div className="flex flex-wrap  items-center justify-end mb-4 gap-2">
                <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#22C55E] rounded-full" /> Available</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#CA0965] rounded-full" /> Booked</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#EF4444] rounded-full" /> Unavailable</div>
                </div>
            </div>

            <CalendarHeader
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={setSelectedMonth}
                onYearChange={setSelectedYear}
            />

            <CalendarGrid
                totalDays={totalDays}
                firstDay={firstDay}
                getDayStatus={getDayStatus}
                handleDayClick={handleDayClick}
                selectedYear={selectedYear}
                monthIndex={monthIndex}
            />

            <div className="flex justify-center mt-6">
                <Button
                    onClick={() => setUpdateModalOpen(true)}
                    className="bg-pink-600 hover:bg-pink-700 px-10 py-6 cursor-pointer w-full sm:w-auto"
                >
                    Update Schedule
                </Button>
            </div>

            <CalendarModal
                open={open}
                onOpenChange={setOpen}
                selectedDate={selectedDate}
                status={
                    selectedDate
                        ? mockAvailability.find((d) => d.date === selectedDate)?.status || null
                        : null
                }
            />
            <UpdateScheduleModal open={updateModalOpen} onOpenChange={setUpdateModalOpen} selectedDate={selectedDate} />
        </div>
    )
}
