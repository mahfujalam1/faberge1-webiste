"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarHeaderProps {
    selectedMonth: string
    selectedYear: string
    onMonthChange: (value: string) => void
    onYearChange: (value: string) => void
}

export default function CalendarHeader({
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
}: CalendarHeaderProps) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const years = ["2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032"]

    return (
        <div className="flex justify-between gap-10 mb-4">
            <Select value={selectedMonth} onValueChange={onMonthChange}>
                <SelectTrigger className="w-[140px] md:w-[300px]">
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={onYearChange}>
                <SelectTrigger className="w-[140px] md:w-[300px]">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
