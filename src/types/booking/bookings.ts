// Define types
export type Subcategory = {
    _id: string;
    subcategoryName: string;
    subcategoryPrice: number;
};

export type Service = {
    _id: string;
    serviceName: string;
    price: number;
    subcategorys: Subcategory[];
};

export type Customer = {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    uploadPhoto: string;
};
export type Worker = {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    uploadPhoto: string;
};

export type Booking = {
    _id: string;
    customer: Customer;
    date: string;
    startTime: string;
    endTime: string;
    status: "booked" | "completed" | string;
    isPayment: boolean;
    paymentAmount: number;
    paymentExpiresAt: string;
    services: Service[] | ServiceItem[];
    worker: Worker; // Worker ID
    transactionId: string | null;
    createdAt: string;
    updatedAt: string;
};

export interface ServiceItem {
    service?: {
        _id: string;
        serviceName: string;
    };
    subcategories?: string[];
}


export type Pagination = {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    limit: number;
};

export type BookingResponse = {
    data: { [key: string]: Booking[] };
    pagination: Pagination;
};


export interface GroupedBooking {
    date: string;
    startTime: string;
    services: {
        serviceId: string;
        serviceCategories: string[];
    }[];
}

export interface BookingRequest {
    workerId: string;
    services: {
        serviceId: string;
        serviceCategories: string[];
    }[];
    date: string;
    startTime: string;
}

export interface ApiErrorResponse {
    data: {
        message: string;
    };
}

export interface BookSlotResponse {
    data?: {
        data?: {
            _id: string;
        };
    };
    error?: ApiErrorResponse;
}

export interface PaymentResponse {
    data?: {
        url?: string;
    };
    error?: ApiErrorResponse;
}

export interface Slot {
    _id: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    isBooked: boolean;
    isBlocked: boolean;
}