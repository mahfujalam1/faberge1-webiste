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

interface CalendarModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedDate: string | null
}

// Mock services data - replace with your API data
const SERVICES = [
    { id: "1", name: "Manicure", price: "$25" },
    { id: "2", name: "Water", price: "($10)" },
    { id: "3", name: "Gel", price: "($10)" },
    { id: "4", name: "Pedicure", price: "$25" },
]

const TIME_SLOTS = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"]

export default function CalendarModal({ open, onOpenChange, selectedDate }: CalendarModalProps) {
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [selectedTimes, setSelectedTimes] = useState<string[]>([])
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false)

    // Only show time selection if at least one service is selected
    const shouldShowTimeSelection = selectedServices.length > 0

    const handleServiceToggle = (serviceId: string) => {
        setSelectedServices((prev) =>
            prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
        )
        // Reset times when service selection changes
        setSelectedTimes([])
    }

    const handleTimeToggle = (time: string) => {
        setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
    }

    const handleSave = () => {
        if (selectedServices.length === 0 || selectedTimes.length === 0) return

        console.log({
            date: selectedDate,
            services: selectedServices,
            times: selectedTimes,
        })

        // Reset form and close modal
        setSelectedServices([])
        setSelectedTimes([])
        setIsTimeDropdownOpen(false)
        onOpenChange(false)
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            // Reset form when closing
            setSelectedServices([])
            setSelectedTimes([])
            setIsTimeDropdownOpen(false)
        }
        onOpenChange(newOpen)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Availability</DialogTitle>
                    <DialogDescription>{selectedDate && `${selectedDate}`}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Service Selection */}
                    <div className="space-y-3">
                        <Label>Select Service</Label>
                        <div className="grid grid-cols-4 gap-3">
                            {SERVICES.map((service) => (
                                <div key={service.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={service.id}
                                        checked={selectedServices.includes(service.id)}
                                        onCheckedChange={() => handleServiceToggle(service.id)}
                                    />
                                    <label
                                        htmlFor={service.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                        {service.name} {service.price}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Time Selection - Only shows if service is selected */}
                    {shouldShowTimeSelection && (
                        <div className="space-y-2 animate-in fade-in-50 duration-200 w-full">
                            <Label>Select Time</Label>
                            <div className="relative w-full">
                                <button
                                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                    className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between"
                                >
                                    <span className="text-sm">
                                        {selectedTimes.length === 0
                                            ? "Select Time"
                                            : `${selectedTimes.length} time${selectedTimes.length > 1 ? "s" : ""} selected`}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${isTimeDropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </button>

                                {isTimeDropdownOpen && (
                                    <div className="relative w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                        <div className="max-h-48 overflow-y-auto">
                                            {TIME_SLOTS.map((time) => (
                                                <div
                                                    key={time}
                                                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                                                    onClick={() => handleTimeToggle(time)}
                                                >
                                                    <Checkbox
                                                        checked={selectedTimes.includes(time)}
                                                        onCheckedChange={() => handleTimeToggle(time)}
                                                    />
                                                    <span className="text-sm">{time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => handleOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={selectedServices.length === 0 || selectedTimes.length === 0}
                            className="bg-pink-600 hover:bg-pink-700"
                        >
                            Save
                        </Button>
                    </DialogFooter>
                    <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#22C55E] rounded-full" /> Available</div>
                        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#CA0965] rounded-full" /> Booked</div>
                        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#EF4444] rounded-full" /> Unavailable</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
