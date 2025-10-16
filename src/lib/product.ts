export interface Product {
    id: string
    name: string
    description: string
    priceInCents: number
}

// Booking product for checkout
export const PRODUCTS: Product[] = [
    {
        id: "booking-payment",
        name: "Booking Payment",
        description: "Payment for beauty service booking",
        priceInCents: 0, // Will be calculated dynamically
    },
]