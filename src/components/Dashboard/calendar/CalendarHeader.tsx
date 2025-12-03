"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarHeaderProps {
    selectedMonth: number
    selectedYear: number
    onMonthChange: (value: number) => void
    onYearChange: (value: number) => void
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

    const currentYear = new Date().getFullYear()
    const startYear = 2025
    const yearCount = currentYear - startYear + 1
    const years = Array.from({ length: yearCount }, (_, i) => startYear + i)

    return (
        <div className="flex justify-between gap-10 mb-4">
            <Select value={selectedMonth.toString()} onValueChange={(value) => onMonthChange(Number(value))}>
                <SelectTrigger className="w-[140px] md:w-[300px]">
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((m, index) => (
                        <SelectItem key={m} value={(index + 1).toString()}>{m}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(Number(value))}>
                <SelectTrigger className="w-[140px] md:w-[300px]">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                    {years.map((y) => (
                        <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}