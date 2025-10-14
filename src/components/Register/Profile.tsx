"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IMAGES } from "@/constant/image.index"

interface StepOneProfileProps {
    onContinue: (data: ProfileData) => void
    onNext: () => void
    onPrev: () => void
    currentStep: number
    initialData?: ProfileData
}

export interface ProfileData {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    phone: string
    email: string
}

export default function StepOneProfile({ onContinue, onNext, onPrev, currentStep, initialData }: StepOneProfileProps) {
    const [formData, setFormData] = useState<ProfileData>(
        initialData || {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            phone: "",
            email: "",
        },
    )

    const [isValid, setIsValid] = useState(false)

    // Validate form whenever data changes
    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "")
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        const phoneValid = formData.phone.length >= 10

        setIsValid(allFieldsFilled && emailValid && phoneValid)
    }, [formData])

    const handleChange = (field: keyof ProfileData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValid) {
            console.log("[v0] Step 1 - Profile Data:", formData)
            onContinue(formData)
        }
    }

    const handleNextClick = () => {
        if (isValid) {
            console.log("[v0] Step 1 - Profile Data (via Next):", formData)
            onContinue(formData)
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto pb-16">
            {/* Logo */}
            <div className="flex justify-center">
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
            <h1 className="mb-8 text-center font-serif text-4xl font-normal text-gray-900">Create Profile</h1>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-900">
                            First Name
                        </label>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter your name"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-900">
                            Last Name
                        </label>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Enter your name"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                            value={formData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900">
                        Address
                    </label>
                    <Input
                        id="address"
                        type="text"
                        placeholder="Enter your address"
                        className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                    />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900">
                            City
                        </label>
                        <Input
                            id="city"
                            type="text"
                            placeholder="Enter your city"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                            value={formData.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-900">
                            State
                        </label>
                        <Input
                            id="state"
                            type="text"
                            placeholder="Enter your state"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                            value={formData.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                        />
                    </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900">
                            Phone
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>
                </div>

                {/* Continue Button */}
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="h-12 w-full rounded-lg cursor-pointer bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </Button>

                <div className="flex items-center justify-between pt-4">
                    <Button
                        type="button"
                        onClick={onPrev}
                        disabled={currentStep === 1}
                        variant="ghost"
                        className="flex items-center gap-2 shadow-2xl bg-white text-black hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-10 w-10" />
                    </Button>

                    <Button
                        type="button"
                        onClick={handleNextClick}
                        disabled={!isValid}
                        variant="ghost"
                        className="flex items-center gap-2 shadow-2xl bg-white text-black hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="h-10 w-10" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
