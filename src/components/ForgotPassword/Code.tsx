"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { IMAGES } from "@/constant/image.index"

interface StepTwoCodeProps {
    onContinue: (code: string) => void
}

export function StepTwoCode({ onContinue }: StepTwoCodeProps) {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0]
        }

        const newCode = [...code]
        newCode[index] = value

        setCode(newCode)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const fullCode = code.join("")
        if (fullCode.length === 6) {
            console.log("[v0] Code submitted:", fullCode)
            onContinue(fullCode)
        }
    }

    const isValid = code.every((digit) => digit !== "")

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
            <h1 className="mb-8 text-center font-serif text-4xl font-normal text-gray-900">Enter Digit Code</h1>

            {/* Form */}
            <form className="space-y-6 mb-10 md:mb-0" onSubmit={handleSubmit}>
                {/* Code Input Boxes */}
                <div className="flex justify-center gap-2">
                    {code.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="h-12 w-12 rounded-lg border-gray-200 bg-gray-50 text-center text-lg font-semibold text-gray-900"
                        />
                    ))}
                </div>

                {/* Continue Button */}
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        disabled={!isValid}
                        className="h-12 w-60 rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        Continue
                    </Button>
                </div>

            </form>
        </>
    )
}
