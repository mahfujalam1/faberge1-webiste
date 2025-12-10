"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GetMeResponse, useGetMeQuery } from "@/redux/api/baseApi"
import { useGetAllBookSlotsOneDayQuery } from "@/redux/api/bookingApi"
import { useGetAvailableSlotQuery } from "@/redux/api/calenderApi"
import { Service, AddOn } from "@/types/booking/appointment"
import { Slot } from "@/types/booking/bookings"
import { CalendarDays } from "lucide-react"

// Define the types for the props
interface CalendarModalProps {
    open: boolean
    onOpenChange: (v: boolean) => void
    selectedDate: string | null
    status: "bg-white" | "bg-green-500" | "bg-red-500" | "bg-gray-500" | null
}

interface BookedSlot {
    _id: string
    startTime: string
    endTime: string
    customer?: {
        firstName: string
        lastName: string
    }
    status: "pending" | "confirmed" | "completed" | "cancelled"
    services?: Service[]
}


export default function CalendarModal({
    open,
    onOpenChange,
    selectedDate,
    status,
}: CalendarModalProps) {
    const worker = useGetMeQuery<GetMeResponse>()

    const workerId = worker?.data?._id || ""
    const { data: availabeSlots } = useGetAvailableSlotQuery({ workerId, date: selectedDate || "" })
    const todayAvailabeSlots = availabeSlots?.data?.slots || []

    const { data } = useGetAllBookSlotsOneDayQuery(selectedDate || "")

    // Extract the array from the date key (e.g., "2025-12-12")
    const bookedSlots = selectedDate && data?.data?.[selectedDate] ? data.data[selectedDate] : []

    // Don't open modal if status is bg-red-500
    const shouldOpenModal = open && status !== "bg-red-500"

    // Extract all unique services and subcategories from booked slots
    const getServicesFromBookings = () => {
        const servicesMap = new Map<string, Set<string>>()

        bookedSlots.forEach((booking: BookedSlot) => {
            booking.services?.forEach((service: Service) => {
                const serviceName = service.serviceName
                if (serviceName) {
                    if (!servicesMap.has(serviceName)) {
                        servicesMap.set(serviceName, new Set<string>())
                    }

                    // Add subcategory names for this service
                    service.subcategory?.forEach((sub: AddOn) => {
                        if (sub._id && sub.subcategoryName) {
                            servicesMap.get(serviceName)?.add(sub.subcategoryName)
                        }
                    })
                }
            })
        })

        return Array.from(servicesMap.entries()).map(([service, subs]) => ({
            serviceName: service,
            subcategories: Array.from(subs)
        }))
    }

    const servicesData = getServicesFromBookings()

    // Get status color based on slot conditions
    const getSlotStatusColor = (slot: Slot) => {
        if (!slot.isAvailable && slot.isBooked && !slot.isBlocked) {
            return "bg-green-500" // Booked
        } else if (slot.isAvailable && !slot.isBooked && !slot.isBlocked) {
            return "bg-white border-2" // Available
        } else if (!slot.isAvailable && !slot.isBooked && !slot.isBlocked) {
            return "bg-red-500" // Unavailable
        }
        return "bg-gray-500" // Default/Completed
    }

    return (
        <Dialog open={shouldOpenModal} onOpenChange={onOpenChange}>
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
                        {servicesData.length > 0 && (
                            <>
                                <h1 className="font-semibold">Services:</h1>
                                <div className="flex justify-between mb-2 text-sm">
                                    {servicesData.map((service, idx) => (
                                        <div key={idx}>
                                            <p className="font-medium">{service.serviceName}</p>
                                            {service.subcategories.map((sub, subIdx) => (
                                                <p key={subIdx} className="text-gray-600">{sub}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Time Slots */}
                        <div className="border rounded-md h-72 overflow-y-auto">
                            {bookedSlots?.map((booking: BookedSlot, idx: number) => (
                                <div key={idx} className="flex justify-between items-center px-4 py-2 border-b last:border-none text-sm">
                                    <span>{booking.startTime} - {booking.endTime}</span>
                                    <span className="font-medium">
                                        {booking.customer?.firstName} {booking.customer?.lastName}
                                    </span>
                                    <span className={`px-2 py-0.5 text-xs rounded ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                            {todayAvailabeSlots?.map((slot: Slot, idx: number) => (
                                <div key={idx} className="flex justify-between items-center px-4 py-2 border-b last:border-none">
                                    <span className="text-sm">{slot.startTime} - {slot.endTime}</span>
                                    <span className={`w-3 h-3 rounded-full ${getSlotStatusColor(slot)}`} />
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-4 mt-4 text-xs">
                            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-white border-2 rounded-full" /> Available</div>
                            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full" /> Booked</div>
                            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-full" /> Unavailable</div>
                            <div className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-500 rounded-full" /> Completed</div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
