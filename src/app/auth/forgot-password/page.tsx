"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StepOneEmail } from "@/components/ForgotPassword/Email"
import { StepTwoCode } from "@/components/ForgotPassword/Code"
import { StepThreePassword } from "@/components/ForgotPassword/UpdatePassword"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        password: "",
    })

    const handleEmailSubmit = (email: string) => {
        setFormData((prev) => ({ ...prev, email }))
        setCurrentStep(2)
    }

    const handleCodeSubmit = (code: string) => {
        setFormData((prev) => ({ ...prev, code }))
        setCurrentStep(3)
    }

    const handlePasswordSubmit = (password: string) => {
        setFormData((prev) => ({ ...prev, password }))
        console.log("[v0] All forgot password data collected:", {
            ...formData,
            password,
        })
        // Redirect to home page
        router.push("/dashboard")
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4">
            {/* Fixed size container on desktop */}
            <div className="w-full h-full max-w-[1700px] md:h-[800px] shadow-2xl bg-white px-10 rounded-4xl">
                <div className="flex h-full flex-col justify-center">
                    {currentStep === 1 && <StepOneEmail onContinue={handleEmailSubmit} />}
                    {currentStep === 2 && <StepTwoCode onContinue={handleCodeSubmit} />}
                    {currentStep === 3 && <StepThreePassword onComplete={handlePasswordSubmit} />}
                </div>
            </div>
        </div>
    )
}
