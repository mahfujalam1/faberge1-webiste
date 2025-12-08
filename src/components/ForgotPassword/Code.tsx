"use client"
import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StepTwoCodeProps {
    onContinue: (code: string) => void
    isLoading: boolean
}

export function StepTwoCode({ onContinue, isLoading }: StepTwoCodeProps) {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0]
        }

        const newCode = [...code]
        newCode[index] = value

        setCode(newCode)

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
            onContinue(fullCode) // Pass code to parent
        }
    }

    const isValid = code.every((digit) => digit !== "")

    return (
        <form className="space-y-6 w-full max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                    <Input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el }}
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
            <div className="w-40 mx-auto">
                <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
            </div>
        </form>
    )
}
