"use client";

import { AddOn, BookingItem, Service } from "@/types/booking/appointment";
import { Slot } from "@/types/booking/bookings";
import { Check, Clock } from "lucide-react";

interface SelectedSlot {
    time: string;
    service: Service;
    addOns: AddOn[];
}

interface ServiceSelectionTableProps {
    slots: Slot[];
    services: Service[];
    selectedSlots: SelectedSlot[];
    bookingsForDate?: BookingItem[];
    onSlotChange: (slot: SelectedSlot | null, time: string, service: Service) => void;
    onAddOnToggle: (time: string, service: Service, addOn: AddOn) => void;
    workerId: string;
}

const SLOT_DURATION_MIN = 30;
const BUFFER_MINUTES = 60;

const isSlotFree = (slot: Slot | undefined): boolean => {
    if (!slot) return false;
    if (slot.isBooked || slot.isBlocked) return false;
    if (!slot.isAvailable) return false;
    return true;
};

// Can a booking of `durationMinutes` START at slot index `startIdx`?
//
// Relaxation rules for the same customer (myDuration / myBuffer index sets):
//   - new duration may overlap MY buffer (back-to-back same-customer is fine)
//   - new duration may NOT overlap MY duration (no self double-booking)
//   - new buffer may overlap ANY of MY ranges (my own follow-on can start where my buffer is)
//   - against ANY other customer's stuff, both ranges must be free
const canStartHere = (
    allSlots: Slot[],
    startIdx: number,
    durationMinutes: number,
    myDuration: Set<number>,
    myBuffer: Set<number>,
): boolean => {
    const durationSlots = Math.max(1, Math.ceil(durationMinutes / SLOT_DURATION_MIN));
    const bufferSlots = Math.ceil(BUFFER_MINUTES / SLOT_DURATION_MIN);
    if (startIdx + durationSlots > allSlots.length) return false;
    for (let i = startIdx; i < startIdx + durationSlots; i++) {
        if (myDuration.has(i)) return false;
        if (myBuffer.has(i)) continue;
        if (!isSlotFree(allSlots[i])) return false;
    }
    const bufferEnd = Math.min(startIdx + durationSlots + bufferSlots, allSlots.length);
    for (let i = startIdx + durationSlots; i < bufferEnd; i++) {
        if (myDuration.has(i) || myBuffer.has(i)) continue;
        if (!isSlotFree(allSlots[i])) return false;
    }
    return true;
};

const to12Hour = (time: string) => {
    const date = new Date(`1970-01-01T${time}`);
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const formatDuration = (mins?: number) => {
    if (!mins || mins <= 0) return null;
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
};

export default function ServiceSelectionTable({
    slots,
    services,
    selectedSlots,
    bookingsForDate,
    onSlotChange,
    onAddOnToggle,
}: ServiceSelectionTableProps) {
    const allSlots = slots || [];
    const availableSlots = allSlots.filter(isSlotFree);

    // Match a slot in `allSlots` from a chip label like "9:00 AM - 9:30 AM".
    const findSlotIdxFromLabel = (label: string): number =>
        allSlots.findIndex((s) => {
            const slotLabel = `${to12Hour(s.startTime)} - ${to12Hour(s.endTime)}`;
            return slotLabel === label;
        });

    // Build the customer's own occupied index sets from BOTH staged selections
    // (current modal) AND items already in the cart for this date. The backend
    // applies the same relaxation, so the UI matches what will succeed at checkout.
    const bufferSlotCount = Math.ceil(BUFFER_MINUTES / SLOT_DURATION_MIN);
    const myDurationIdx = new Set<number>();
    const myBufferIdx = new Set<number>();
    const addRange = (label: string, durationMinutes: number) => {
        const idx = findSlotIdxFromLabel(label);
        if (idx < 0) return;
        const ds = Math.max(1, Math.ceil(durationMinutes / SLOT_DURATION_MIN));
        for (let i = idx; i < Math.min(idx + ds, allSlots.length); i++) {
            myDurationIdx.add(i);
        }
        for (
            let i = idx + ds;
            i < Math.min(idx + ds + bufferSlotCount, allSlots.length);
            i++
        ) {
            myBufferIdx.add(i);
        }
    };
    selectedSlots.forEach((s) => {
        const dur = s.service?.service?.serviceDuration ?? SLOT_DURATION_MIN;
        addRange(s.time, dur);
    });
    bookingsForDate?.forEach((b) => {
        const dur = b.service?.serviceDuration ?? SLOT_DURATION_MIN;
        addRange(b.time, dur);
    });

    if (!services || services.length === 0) {
        return (
            <div className="border border-pink-100 rounded-xl p-8 text-center bg-white">
                <p className="text-gray-500">This worker has no services configured.</p>
            </div>
        );
    }

    if (availableSlots.length === 0) {
        return (
            <div className="border border-pink-100 rounded-xl p-8 text-center bg-white">
                <p className="text-gray-500">No available time slots for this date</p>
            </div>
        );
    }

    // True when this exact (timeSlot, service) is already in the staging list.
    const isServiceTimeSelected = (timeSlot: string, service: Service) =>
        selectedSlots?.some(
            (s) => s.time === timeSlot && s.service?._id === service?._id,
        );

    const selectionsForService = (service: Service) =>
        selectedSlots?.filter((s) => s.service?._id === service?._id) || [];

    // Add-on toggling per-card. If the user already picked time(s) for this
    // service, toggle the add-on across every selected (time, service) pair so
    // one click updates them all. If they haven't picked a time yet, this is a
    // no-op (the checkboxes are disabled in that state).
    const handleCardAddOnToggle = (service: Service, addOn: AddOn) => {
        const mine = selectionsForService(service);
        if (mine.length === 0) return;
        mine.forEach((sel) => onAddOnToggle(sel.time, service, addOn));
    };

    // For "is this add-on checked?" at card level we use the first selected
    // (time, service). All selections for the same service should stay in sync
    // through handleCardAddOnToggle.
    const isCardAddOnChecked = (service: Service, addOn: AddOn) => {
        const mine = selectionsForService(service);
        if (mine.length === 0) return false;
        return mine[0].addOns?.some((a) => a._id === addOn._id) || false;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {services.map((service: Service) => {
                const inner = service?.service;
                const displayedPrice =
                    (inner?.price ?? 0) + (inner?.agencyFee ?? 0);
                const dur = inner?.serviceDuration ?? SLOT_DURATION_MIN;
                const durationLabel = formatDuration(dur);
                const subcategories = inner?.subcategory || [];
                const selectionsForThis = selectionsForService(service);
                const selectedCount = selectionsForThis.length;

                // Per spec: once the user picks a time for a service, lock that
                // service to that single pick — other times for it become disabled.
                // Count both staged selections AND already-in-cart bookings.
                const cartTimesForThisService = (bookingsForDate || [])
                    .filter((b) => b.service?._id === inner?._id)
                    .map((b) => b.time);
                const stagedTimesForThisService = selectionsForThis.map((s) => s.time);
                const lockedTimes = new Set<string>([
                    ...cartTimesForThisService,
                    ...stagedTimesForThisService,
                ]);
                const serviceHasAnyPick = lockedTimes.size > 0;

                return (
                    <div
                        key={service._id}
                        className={`bg-white rounded-xl border transition-all p-4 flex flex-col gap-3 ${
                            selectedCount > 0
                                ? "border-primary shadow-md"
                                : "border-pink-100 hover:border-pink-200 hover:shadow-sm"
                        }`}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 truncate">
                                    {inner?.serviceName || "Service"}
                                </h3>
                                <div className="flex items-center gap-3 mt-1 text-sm">
                                    <span className="text-green-600 font-semibold">
                                        ${displayedPrice.toFixed(2)}
                                    </span>
                                    {durationLabel && (
                                        <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                                            <Clock size={12} />
                                            {durationLabel}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {selectedCount > 0 && (
                                <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">
                                    <Check size={12} />
                                    {selectedCount} selected
                                </span>
                            )}
                        </div>

                        {/* Time chips */}
                        <div>
                            <p className="text-xs font-medium text-gray-700 mb-2">
                                Available times
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {availableSlots.map((slot) => {
                                    const timeLabel = `${to12Hour(slot.startTime)} - ${to12Hour(slot.endTime)}`;
                                    const slotIdx = allSlots.findIndex((s) => s._id === slot._id);
                                    const feasible =
                                        slotIdx >= 0
                                            ? canStartHere(
                                                  allSlots,
                                                  slotIdx,
                                                  dur,
                                                  myDurationIdx,
                                                  myBufferIdx,
                                              )
                                            : true;
                                    const selected = isServiceTimeSelected(timeLabel, service);
                                    // "lockedToOtherTime" = this service already has a pick
                                    // elsewhere; only the picked chip(s) remain clickable so
                                    // the user can still deselect.
                                    const lockedToOtherTime =
                                        serviceHasAnyPick && !lockedTimes.has(timeLabel);
                                    const inCartElsewhere =
                                        cartTimesForThisService.includes(timeLabel) && !selected;
                                    const disabled =
                                        !feasible || lockedToOtherTime || inCartElsewhere;

                                    let title: string | undefined;
                                    if (!feasible) title = "Not enough consecutive time for this service";
                                    else if (inCartElsewhere) title = "Already added to your cart at this time";
                                    else if (lockedToOtherTime)
                                        title = "Remove your existing pick for this service first";

                                    return (
                                        <button
                                            key={slot._id}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => {
                                                if (selected) {
                                                    onSlotChange(null, timeLabel, service);
                                                } else {
                                                    onSlotChange(
                                                        {
                                                            time: timeLabel,
                                                            service: service,
                                                            addOns: [],
                                                        },
                                                        timeLabel,
                                                        service,
                                                    );
                                                }
                                            }}
                                            title={title}
                                            className={`text-xs px-2.5 py-1.5 rounded-md border transition-all ${
                                                disabled && !selected
                                                    ? "border-gray-200 text-gray-300 cursor-not-allowed line-through"
                                                    : selected
                                                      ? "border-primary bg-primary text-white shadow-sm"
                                                      : "border-pink-200 text-gray-700 hover:border-primary hover:text-primary cursor-pointer"
                                            }`}
                                        >
                                            {to12Hour(slot.startTime)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Add-ons */}
                        {subcategories.length > 0 && (
                            <div className="border-t border-pink-50 pt-3">
                                <p className="text-xs font-medium text-gray-700 mb-2">
                                    Add-ons
                                    {selectedCount === 0 && (
                                        <span className="text-gray-400 font-normal ml-1">
                                            (pick a time first)
                                        </span>
                                    )}
                                </p>
                                <div className="space-y-1.5">
                                    {subcategories.map((addOn) => {
                                        const checked = isCardAddOnChecked(service, addOn);
                                        const disabled = selectedCount === 0;
                                        return (
                                            <label
                                                key={addOn._id}
                                                className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-md transition-colors ${
                                                    disabled
                                                        ? "cursor-not-allowed opacity-50"
                                                        : "cursor-pointer hover:bg-pink-50"
                                                }`}
                                            >
                                                <span className="flex items-center gap-2 text-sm text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        disabled={disabled}
                                                        checked={checked}
                                                        onChange={() =>
                                                            handleCardAddOnToggle(service, addOn)
                                                        }
                                                        className="w-4 h-4 accent-primary"
                                                    />
                                                    {addOn.subcategoryName}
                                                </span>
                                                <span className="text-xs text-green-600 font-medium whitespace-nowrap">
                                                    +${Number(addOn.subcategoryPrice).toFixed(2)}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
