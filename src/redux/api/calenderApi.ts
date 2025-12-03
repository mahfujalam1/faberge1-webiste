import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const calendarApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCalenderSchedule: build.query({
            query: ({ year, month }) => ({
                url: `/booking/worker-monthly-calendar?year=${year}&month=${month}`,
                method: "GET",
            }),
            providesTags: [tagTypes.bookings],
        }),
        getAllBookingsForWorker: build.query({
            query: ({ page, limit, status, filterType }) => {
                console.log({ page, limit, status, filterType })
                return {
                    url: `/booking/worker-book-slot?filterType=${filterType}&status=${status || ''}&page=${page}&limit=${limit}`,
                    method: "GET",
                }
            },
            providesTags: [tagTypes.bookings],
        }),

        getAvailableSlot: build.query({
            query: ({ workerId, date }) => {
                console.log({ workerId, date })
                return {
                    url: `/time-slot/get-one-worker-availability/${workerId}?date=${date}`,
                    method: "GET",
                }
            },
            providesTags: [tagTypes.bookings],
        }),

        updateAvailability: build.mutation({
            query: ({ date, unavailableSlots }) => {
                const body = {
                    date, unavailableSlots
                }
                return {
                    url: `/time-slot/update-availability`,
                    method: "PATCH",
                    data: body
                }
            },
            invalidatesTags: [tagTypes.bookings],
        }),

        assignOfDay: build.mutation({
            query: ( date) => {
                console.log(date, 'date=>>>>')
                return {
                    url: `/time-slot/assign-off-day`,
                    method: "PATCH",
                    data: date
                }
            },
            invalidatesTags: [tagTypes.bookings],
        }),
    }),
});

export const { useGetAllBookingsForWorkerQuery, useGetCalenderScheduleQuery, useGetAvailableSlotQuery, useAssignOfDayMutation, useUpdateAvailabilityMutation } = calendarApi;
