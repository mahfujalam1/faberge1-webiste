"use client";

import { useGetWorkerStatisticsQuery } from "@/redux/api/workerApi";
import React from "react";

type StatCardProps = {
    title: string;
    value: string;
    subText: string;
    bgColor: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subText, }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6 w-full transition hover:shadow-xl duration-300">
            <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <span className="text-xs text-gray-400 mt-1">{subText}</span>
        </div>
    );
};

export const DashboardStats: React.FC = () => {

    const {data} = useGetWorkerStatisticsQuery(undefined)
    console.log(data)

    return (
        <section className="">
            <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
                <StatCard
                    title="Today's Bookings"
                    value={data?.todayBookings || 0}
                    subText="Today"
                    bgColor="bg-blue-100"
                />
                <StatCard
                    title="Hours Booked"
                    value={`${data?.monthly?.hoursBooked || 0}/${data?.yearly?.hoursBooked || 0}`}
                    subText="Month/Year"
                    bgColor="bg-purple-100"
                />
                <StatCard
                    title="Total Earnings"
                    value={`${data?.monthly?.totalEarnings || 0}/${data?.yearly?.totalEarnings || 0}`}
                    subText="Month/Year"
                    bgColor="bg-purple-100"
                />
            </div>
        </section>
    );
};
