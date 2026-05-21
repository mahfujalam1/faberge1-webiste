import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const calendarApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCalenderSchedule: build.query({
            query: ({workerId, year, month }) => ({
                url: `/booking/worker-monthly-calendar/${workerId}?year=${year}&month=${month}`,
                method: "GET",
            }),
            providesTags: [tagTypes.bookings],
        }),

        getAvailableSlot: build.query({
            query: ({ workerId, date, durationMinutes }: { workerId: string; date: string; durationMinutes?: number }) => {
                const params = new URLSearchParams({ date });
                if (durationMinutes) params.set("durationMinutes", String(durationMinutes));
                return {
                    url: `/time-slot/get-one-worker-availability/${workerId}?${params.toString()}`,
                    method: "GET",
                }
            },
            providesTags: [tagTypes.bookings],
        }),

        updateAvailability: build.mutation({
            query: (data ) => {
                return {
                    url: `/time-slot/update-availability`,
                    method: "PATCH",
                    body: (data),
                }
            },
            invalidatesTags: [tagTypes.bookings],
        }),

        assignOfDay: build.mutation({
            query: ({ date }) => {
                return {
                    url: `/time-slot/assign-off-day`,
                    method: "PATCH",
                    body: { date },
                }
            },
            invalidatesTags: [tagTypes.bookings],
        }),
    }),
});

export const { useGetCalenderScheduleQuery, useGetAvailableSlotQuery, useAssignOfDayMutation, useUpdateAvailabilityMutation } = calendarApi;
