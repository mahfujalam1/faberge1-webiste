// Type Definitions
export type AddOn = {
    _id: string;
    subcategoryName: string;
    subcategoryPrice: number;
};

export type Service = {
    service: Service;
    _id: string;
    serviceName: string;
    price: number;
    serviceCategories:[],
    subcategory?: AddOn[]
};

export type BookingItem = {
    date: string;
    time: string;
    service: Service;
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
    date:string,
    color:string
};

export interface Subcategory {
    _id: string;
    subcategoryName: string;
    subcategoryPrice: string
}


export interface ServiceItem {
    service?: {
        serviceName: string;
        subcategory?: Subcategory[]; // Subcategory array
    };
    subcategories?: string[]; // Array of subcategory IDs (this might be different based on your data)
}