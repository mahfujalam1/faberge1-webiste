// Type Definitions
export type AddOn = {
    _id: string;
    subcategoryName: string;
    subcategoryPrice: number;
};

export type Service = {
    _id: string;
    serviceName: string;
    price: number;
};

export type BookingItem = {
    date: string;
    time: string;
    service: {
        service: Service;
    };
    addOns: AddOn[];
};

export type Member = {
    workerId: string;
    firstName: string;
    lastName: string;
    title: string;
    city: string;
    state: string;
    services: Service[];
    subservices: AddOn[];
    uploadPhoto: string;
};

export type SelectedSlot = {
    time: string;
    service: Service;
    addOns: AddOn[];
};

export type CalendarData = {
    day: number;
    isAvailable: boolean;
};