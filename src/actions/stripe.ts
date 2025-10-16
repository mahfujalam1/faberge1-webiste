"use server"

import { stripe } from "@/lib/Stripe"

export async function startCheckoutSession(amountInCents: number, description: string) {
    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        redirect_on_completion: "never",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Beauty Service Booking",
                        description: description,
                    },
                    unit_amount: amountInCents,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
    })

    return session.client_secret
}
