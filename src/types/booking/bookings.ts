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
    subcategory: Subcategory[];
};

export type Customer = {
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
    services: Service[];
    worker: string; // Worker ID
    transactionId: string | null;
    createdAt: string;
    updatedAt: string;
};

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