"use client";

import React from "react";
import { CalendarDays, Clock, LineChart } from "lucide-react";

type StatCardProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
    subText: string;
    bgColor: string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subText, bgColor }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6 w-full transition hover:shadow-xl duration-300">
            <div
                className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}
            >
                {icon}
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <span className="text-xs text-gray-400 mt-1">{subText}</span>
        </div>
    );
};

export const DashboardStats: React.FC = () => {
    return (
        <section className="">
            <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
                <StatCard
                    icon={<CalendarDays className="text-blue-600" size={24} />}
                    title="Today's Bookings"
                    value="50"
                    subText="Monthly/Yearly"
                    bgColor="bg-blue-100"
                />
                <StatCard
                    icon={<Clock className="text-purple-600" size={24} />}
                    title="Hours Booked"
                    value="40/200"
                    subText="Monthly/Yearly"
                    bgColor="bg-purple-100"
                />
                <StatCard
                    icon={<LineChart className="text-yellow-600" size={24} />}
                    title="Total Earnings"
                    value="$25/$5655"
                    subText="Monthly/Yearly"
                    bgColor="bg-yellow-100"
                />
            </div>
        </section>
    );
};
