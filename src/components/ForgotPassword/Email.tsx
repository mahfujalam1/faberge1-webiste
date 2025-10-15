"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { IMAGES } from "@/constants/image.index"

interface StepOneEmailProps {
    onContinue: (email: string) => void
}

export function StepOneEmail({ onContinue }: StepOneEmailProps) {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email && email.includes("@")) {
            console.log("[v0] Email submitted:", email)
            onContinue(email)
        }
    }

    const isValid = email.includes("@") && email.length > 0

    return (
        <div className="w-full max-w-xl mx-auto pb-16">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
                <div className="text-center">
                    <div className="mb-2 flex items-center justify-center">
                        <div className="relative ">
                            <Image
                                src={IMAGES.logo.src}
                                alt="IHBS Logo"
                                width={200}
                                height={200}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h1 className="mb-8 text-center font-serif text-4xl font-normal text-gray-900">Forgot Password</h1>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Send Code Button */}
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    Send Code
                </Button>
            </form>
        </div>
    )
}
