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
    <Tabs
      value={tab}
      onValueChange={(value: string) => setTab(value as "All" | "Upcoming" | "Completed")}
      className="w-full"
    >
      <TabsList className="flex gap-2">
        <TabsTrigger
          value="All"
          className={`${tab === "All" ? "bg-primary text-primary" : "bg-transparent text-black cursor-pointer"}`}
        >
          All Bookings
        </TabsTrigger>
        <TabsTrigger
          value="Upcoming"
          className={`${tab === "Upcoming" ? "bg-primary text-primary" : "bg-transparent text-black cursor-pointer"}`}
        >
          Upcoming
        </TabsTrigger>
        <TabsTrigger
          value="Completed"
          className={`${tab === "Completed" ? "bg-primary text-primary" : "bg-transparent text-black cursor-pointer"}`}
        >
          Completed
        </TabsTrigger>
      </TabsList>

      <TabsContent value={tab} className="mt-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(b => <BookingCard key={b.id} booking={b} />)
        ) : (
          <p className="text-gray-500 text-center">No bookings found.</p>
        )}
      </TabsContent>
    </Tabs>
  );
};
