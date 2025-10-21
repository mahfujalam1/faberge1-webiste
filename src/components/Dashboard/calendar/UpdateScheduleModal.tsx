"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const TIME_SLOTS = [
    "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "01:30 PM",
    "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM",
]

interface CalendarModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function CalendarModal({ open, onOpenChange }: CalendarModalProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedTimes, setSelectedTimes] = useState<string[]>([])
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false)

    const handleTimeToggle = (time: string) => {
        setSelectedTimes((prev) =>
            prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
        )
    }

    const handleSave = () => {
        if (!selectedDate || selectedTimes.length === 0) return

        console.log({
            date: format(selectedDate, "PPP"),
            times: selectedTimes,
        })

        // Reset after save
        setSelectedDate(undefined)
        setSelectedTimes([])
        setIsTimeDropdownOpen(false)
        onOpenChange(false)
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setSelectedDate(undefined)
            setSelectedTimes([])
            setIsTimeDropdownOpen(false)
        }
        onOpenChange(newOpen)
    }

    const shouldShowTimeSelection = !!selectedDate

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Availability</DialogTitle>
                    <DialogDescription>Select a date and time for availability</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Date Picker */}
                    <div className="space-y-3">
                        <Label>Select Date</Label>
                        <Popover open={isTimeDropdownOpen} onOpenChange={setIsTimeDropdownOpen}>
                            <PopoverTrigger asChild>
                                <button
                                    className={cn(
                                        "w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between",
                                        !selectedDate && "text-gray-400"
                                    )}
                                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                >
                                    {selectedDate ? (
                                        <span>{format(selectedDate, "PPP")}</span>
                                    ) : (
                                        <span>Select date</span>
                                    )}
                                    <CalendarIcon className="w-4 h-4 opacity-70" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                        setSelectedDate(date)
                                        setIsTimeDropdownOpen(false)
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Time Selection */}
                    {shouldShowTimeSelection && (
                        <div className="space-y-2 animate-in fade-in-50 duration-200 w-full">
                            <Label>Select Time</Label>
                            <div className="relative w-full">
                                <div className="relative w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm">
                                    <div className="max-h-56 overflow-y-auto divide-y">
                                        {TIME_SLOTS.map((time) => {
                                            const isSelected = selectedTimes.includes(time)
                                            return (
                                                <div
                                                    key={time}
                                                    className={cn(
                                                        "flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-gray-100",
                                                        isSelected && "bg-pink-50"
                                                    )}
                                                    onClick={() => handleTimeToggle(time)}
                                                >
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onCheckedChange={() => handleTimeToggle(time)}
                                                        className="pointer-events-none"
                                                    />
                                                    <span className="text-sm">{time}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!selectedDate || selectedTimes.length === 0}
                        className="bg-pink-600 hover:bg-pink-700"
                    >
                        Save
                    </Button>
                </DialogFooter>

                <div className="flex flex-wrap gap-3 text-xs sm:text-sm mt-3">
                    <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#22C55E] rounded-full" /> Available</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#CA0965] rounded-full" /> Booked</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#EF4444] rounded-full" /> Unavailable</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 bg-white text-black border-2 rounded-full" /> Past</div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
