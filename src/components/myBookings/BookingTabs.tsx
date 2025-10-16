import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookingCard } from "./BookingCard";
import { bookings } from "@/constants/booking";

export const BookingTabs = () => {
    const [tab, setTab] = useState<"All" | "Upcoming" | "Completed">("All");

    const filteredBookings = bookings.filter(b =>
        tab === "All" ? true : b.status === tab
    );

    return (
        <Tabs value={tab} onValueChange={(value: string) => setTab(value as "All" | "Upcoming" | "Completed")}>
            <TabsList>
                <TabsTrigger value="All">All Bookings</TabsTrigger>
                <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value={tab}>
                {filteredBookings.map(b => (
                    <BookingCard key={b.id} booking={b} />
                ))}
            </TabsContent>
        </Tabs>
    );
};
