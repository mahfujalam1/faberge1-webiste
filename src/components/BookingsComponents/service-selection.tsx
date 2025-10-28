"use client"

import { ExtraService, Service, ServiceSelectionTableProps } from "@/types/booking/appointment"

export default function ServiceSelectionTable({
    slots,
    selectedSlots,
    onSlotChange,
    onAddOnToggle,
}: ServiceSelectionTableProps) {
    const isServiceSelected = (time: string, service: Service) => {
        return selectedSlots.some((slot) => slot.time === time && slot.service.id === service.id)
    }

    const isAddOnSelected = (time: string, service: Service, addOn: ExtraService) => {
        const slot = selectedSlots.find((s) => s.time === time && s.service.id === service.id)
        return slot?.addOns.some((a) => a.id === addOn.id) || false
    }

    return (
        <div className="border rounded-lg flex-nowrap overflow-x-auto">
            {/* Horizontal scroll container for smaller screens */}
            <div className="w-full  ">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap sticky left-0 bg-gray-50 z-10 border-r">
                                Time
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap min-w-[150px]">
                                Service
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap min-w-[120px]">
                                Add-Ons
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap min-w-[150px]">
                                Service
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap min-w-[120px]">
                                Add-Ons
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {slots.map((slot, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                {/* Time column - sticky */}
                                <td className="py-3 px-4 align-top whitespace-nowrap sticky left-0 bg-white border-r z-5">
                                    <span className="text-sm font-medium text-gray-900">{slot.time}</span>
                                </td>

                                {/* First Service */}
                                <td className="py-3 px-4 align-top min-w-[150px]">
                                    {slot.services[0] && (
                                        <label className="flex items-start gap-2  cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={isServiceSelected(slot.time, slot.services[0])}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        onSlotChange(
                                                            {
                                                                time: slot.time,
                                                                service: slot.services[0],
                                                                addOns: [],
                                                            },
                                                            slot.time,
                                                            slot.services[0],
                                                        )
                                                    } else {
                                                        onSlotChange(null, slot.time, slot.services[0])
                                                    }
                                                }}
                                                className="w-4 h-4 mt-0.5 flex-shrink-0"
                                            />
                                            <span className="text-sm whitespace-nowrap group-hover:text-blue-600 transition-colors">
                                                {slot.services[0].name}<br />
                                                <span className="text-green-600 font-medium">${slot.services[0].price}</span>
                                            </span>
                                        </label>
                                    )}
                                </td>

                                {/* First Service Add-Ons */}
                                <td className="py-3 px-4 align-top min-w-[120px]">
                                    {slot.services[0] && (
                                        <div className="space-y-2">
                                            {slot.extraServices.map((addon) => (
                                                <label key={addon.id} className="flex items-start gap-2 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={isAddOnSelected(slot.time, slot.services[0], addon)}
                                                        onChange={() => onAddOnToggle(slot.time, slot.services[0], addon)}
                                                        disabled={!isServiceSelected(slot.time, slot.services[0])}
                                                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                                                    />
                                                    <span className={`text-xs whitespace-nowrap group-hover:text-blue-600 transition-colors ${!isServiceSelected(slot.time, slot.services[0]) ? 'text-gray-400' : ''
                                                        }`}>
                                                        {addon.name}<br />
                                                        <span className="text-green-600">+${addon.price}</span>
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </td>

                                {/* Second Service */}
                                <td className="py-3 px-4 align-top min-w-[150px]">
                                    {slot.services[1] && (
                                        <label className="flex items-start gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={isServiceSelected(slot.time, slot.services[1])}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        onSlotChange(
                                                            {
                                                                time: slot.time,
                                                                service: slot.services[1],
                                                                addOns: [],
                                                            },
                                                            slot.time,
                                                            slot.services[1],
                                                        )
                                                    } else {
                                                        onSlotChange(null, slot.time, slot.services[1])
                                                    }
                                                }}
                                                className="w-4 h-4 mt-0.5 flex-shrink-0"
                                            />
                                            <span className="text-sm whitespace-nowrap text-nowrap group-hover:text-blue-600 transition-colors">
                                                {slot.services[1].name}<br />
                                                <span className="text-green-600 font-medium">${slot.services[1].price}</span>
                                            </span>
                                        </label>
                                    )}
                                </td>

                                {/* Second Service Add-Ons */}
                                <td className="py-3 px-4 align-top min-w-[120px]">
                                    {slot.services[1] && (
                                        <div className="space-y-2">
                                            {slot.extraServices.map((addon) => (
                                                <label key={addon.id} className="flex items-start gap-2 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={isAddOnSelected(slot.time, slot.services[1], addon)}
                                                        onChange={() => onAddOnToggle(slot.time, slot.services[1], addon)}
                                                        disabled={!isServiceSelected(slot.time, slot.services[1])}
                                                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                                                    />
                                                    <span className={`text-xs whitespace-nowrap group-hover:text-blue-600 transition-colors ${!isServiceSelected(slot.time, slot.services[1]) ? 'text-gray-400' : ''
                                                        }`}>
                                                        {addon.name}<br />
                                                        <span className="text-green-600">+${addon.price}</span>
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
