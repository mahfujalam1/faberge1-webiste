"use client";

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
    return (
        <section className="">
            <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
                <StatCard
                    title="Bookings"
                    value="50"
                    subText="Today"
                    bgColor="bg-blue-100"
                />
                <StatCard
                    title="Bookings"
                    value="40/200"
                    subText="Month/Year"
                    bgColor="bg-purple-100"
                />
                <StatCard
                    title="Earnings"
                    value="$25/$5655"
                    subText="Month/Year"
                    bgColor="bg-yellow-100"
                />
            </div>
        </section>
    );
};
