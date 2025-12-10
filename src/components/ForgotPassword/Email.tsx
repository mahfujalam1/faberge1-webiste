"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForgotPassowrdMutation } from "@/redux/api/authApi"
import { toast } from "sonner"
import { ApiError } from "@/types/global.types"

interface StepOneEmailProps {
    onContinue: (email: string) => void
}

export function StepOneEmail({ onContinue }: StepOneEmailProps) {
    const [email, setEmail] = useState("")
    const [forgotPassword, { isLoading }] = useForgotPassowrdMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (email && email.includes("@")) {
            const res = await forgotPassword({ email })
            if (res?.data) {
                toast.success("Code sent to email.")
                onContinue(email) // Proceed to next step with the email
            } else if (res?.error) {
                const apiError = res?.error as ApiError
                const errorMessage = apiError?.data?.message || "Login failed. Please try again."
                toast.error(errorMessage)
            }
        }
    }

    const isValid = email.includes("@") && email.length > 0

    return (
        <div className="w-full max-w-xl mx-auto pb-16">
            <h1 className="mb-8 text-center font-serif text-4xl font-normal text-gray-900">Forgot Password</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {isLoading ? "Sending..." : "Send Code"}
                </Button>
            </form>
        </div>
    )
}
