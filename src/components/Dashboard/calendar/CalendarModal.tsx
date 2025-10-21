"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarDays } from "lucide-react"

interface CalendarModalProps {
    open: boolean
    onOpenChange: (v: boolean) => void
    selectedDate: string | null
    status: "available" | "booked" | "unavailable" | "past" | null
}

const timeSlots = [
    "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "01:30 PM",
    "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM",
]

export default function CalendarModal({
    open,
    onOpenChange,
    selectedDate,
    status,
}: CalendarModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-pink-600" />
                        View Availability - {selectedDate}
                    </DialogTitle>
                </DialogHeader>

                {selectedDate && (
                    <>
                        {/* Services */}
                        <div className="flex justify-between mb-2 text-sm">
                            <div>
                                <p>Manicure $25</p>
                                <p>Water ($10)</p>
                                <p>Gel ($10)</p>
                            </div>
                            <div>
                                <p>Pedicure $25</p>
                                <p>Water ($10)</p>
                                <p>Gel ($10)</p>
                            </div>
                        </div>

                        {/* Conditional */}
                        {status === "available" ? (
                            <div className="border rounded-md">
                                {timeSlots.map((time, idx) => (
                                    <div key={idx} className="flex justify-between px-4 py-2 border-b last:border-none">
                                        <span>{time}</span>
                                        <span className="w-3 h-3 bg-green-400 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="border rounded-md">
                                {timeSlots.map((time, idx) => (
                                    <div key={idx} className="flex justify-between px-4 py-2 border-b last:border-none text-sm">
                                        <span>{time}</span>
                                        <span>John Wick</span>
                                        <span>New York</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Legend */}
                        <div className="flex justify-center gap-4 mt-4 text-xs">
                            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded-full" /> Available</div>
                            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-pink-400 rounded-full" /> Booked</div>
                            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-400 rounded-full" /> Unavailable</div>
                            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-white text-black border-2 rounded-full" /> Past</div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
