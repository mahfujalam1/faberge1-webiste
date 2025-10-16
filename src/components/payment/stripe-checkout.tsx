"use client"

import { useState } from "react"
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js"

export default function StripeCheckoutForm({
    amountInCents,
    description,
    onSuccess,
}: {
    amountInCents: number
    description: string
    onSuccess: () => void
}) {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("United States")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return
        setLoading(true)
        setError(null)

        try {
            const { error: paymentError } = await stripe.confirmCardPayment(
                "pi_test_secret_key_simulation", // replace with real client secret later
                {
                    payment_method: {
                        card: elements.getElement(CardNumberElement)!,
                        billing_details: {
                            address: {
                                postal_code: postalCode,
                                country: country,
                            },
                        },
                    },
                }
            )

            if (paymentError) {
                setError(paymentError.message || "Payment failed")
            } else {
                onSuccess()
            }
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    const inputStyle = {
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
            },
            invalid: { color: "#fa755a" },
        },
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="font-semibold text-lg mb-2">Select Payment method</h3>
                <div className="border rounded-lg p-3 flex items-center gap-2">
                    <span className="font-medium">💳 Stripe</span>
                </div>
            </div>

            {/* Card Number */}
            <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <div className="border rounded-md px-3 py-3">
                    <CardNumberElement options={inputStyle} />
                </div>
            </div>

            {/* Expiry + CVC */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Expiry</label>
                    <div className="border rounded-md px-3 py-3">
                        <CardExpiryElement options={inputStyle} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">CVC</label>
                    <div className="border rounded-md px-3 py-3">
                        <CardCvcElement options={inputStyle} />
                    </div>
                </div>
            </div>

            {/* Country + Postal Code */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="border rounded-md px-3 py-3 w-full"
                    >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="e.g. 25455"
                        className="border rounded-md px-3 py-3 w-full"
                    />
                </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
                {loading ? "Processing..." : "Purchase Now"}
            </button>
        </form>
    )
}
