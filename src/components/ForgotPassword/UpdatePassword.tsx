"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { IMAGES } from "@/constants/image.index"

interface StepThreePasswordProps {
    onComplete: (password: string) => void
}

export function StepThreePassword({ onComplete }: StepThreePasswordProps) {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword === confirmPassword && newPassword.length >= 8) {
            console.log("[v0] Password reset Completed:", { newPassword })
            onComplete(newPassword)
        }
    }

    const isValid = newPassword === confirmPassword && newPassword.length >= 8

    return (
        <>
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
            <h1 className="mb-8 text-center font-serif text-4xl font-normal text-gray-900">Create New Password</h1>

            {/* Form */}
            <form className="space-y-6 md:w-2/8 md:mx-auto mb-10 md:mb-0" onSubmit={handleSubmit}>
                {/* New Password Field */}
                <div>
                    <label htmlFor="new-password" className="mb-2 block text-sm font-medium text-gray-900">
                        New Password
                    </label>
                    <div className="relative">
                        <Input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 pr-12 text-gray-900 placeholder:text-gray-400"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-gray-900">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 pr-12 text-gray-900 placeholder:text-gray-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    Save
                </Button>
            </form>
        </>
    )
}
