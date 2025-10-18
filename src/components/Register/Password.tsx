"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react"
import { IMAGES } from "@/constants/image.index"

interface StepTwoPasswordProps {
    onContinue: (passwordData: PasswordData) => void
    onNext: () => void
    onPrev: () => void
    currentStep: number
    initialData?: PasswordData
}

export interface PasswordData {
    password: string
    confirmPassword: string
}

export default function StepTwoPassword({
    onContinue,
    onPrev,
    initialData,
}: StepTwoPasswordProps) {
    const [password, setPassword] = useState(initialData?.password || "")
    const [confirmPassword, setConfirmPassword] = useState(initialData?.confirmPassword || "")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        const passwordValid = password.length >= 8
        const passwordsMatch = password === confirmPassword && confirmPassword !== ""
        setIsValid(passwordValid && passwordsMatch)
    }, [password, confirmPassword])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValid) {
            console.log("[v0] Step 2 - Password created (length):", password.length)
            onContinue({ password, confirmPassword })
        }
    }

    const handleNextClick = () => {
        if (isValid) {
            console.log("[v0] Step 2 - Password created (via Next):", password.length)
            onContinue({ password, confirmPassword })
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto py-16">
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
            <h1 className="mb-8 text-center font-serif text-4xl font-normal text-gray-900">Create Password</h1>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 pr-12 text-gray-900 placeholder:text-gray-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-900">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
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

                {/* Validation Messages */}
                {password && password.length < 8 && (
                    <p className="text-sm text-red-600">Password must be at least 8 characters</p>
                )}
                {confirmPassword && password !== confirmPassword && (
                    <p className="text-sm text-red-600">Passwords do not match</p>
                )}

                {/* Continue Button */}
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </Button>

                <div className="flex items-center justify-between pt-4">
                    <Button
                        type="button"
                        onClick={onPrev}
                        variant="ghost"
                        className="flex items-center gap-2 shadow-2xl bg-white text-black hover:text-primary"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        type="button"
                        onClick={handleNextClick}
                        disabled={!isValid}
                        variant="ghost"
                        className="flex items-center gap-2 shadow-2xl bg-white text-black hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
