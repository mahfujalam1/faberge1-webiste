"use client"

import StepTwoPassword, { PasswordData } from "@/components/Register/Password"
import StepThreePhoto, { PhotoData } from "@/components/Register/Photo"
import StepOneProfile, { ProfileData } from "@/components/Register/Profile"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { register } = useAuth()
  const router = useRouter()
  const [registrationData, setRegistrationData] = useState<{
    profile?: ProfileData
    password?: PasswordData
    photo?: PhotoData
  }>({})

  const handleStepOneComplete = (data: ProfileData) => {
    setRegistrationData((prev) => ({ ...prev, profile: data }))
    setCurrentStep(2)
  }

  const handleStepTwoComplete = (data: PasswordData) => {
    setRegistrationData((prev) => ({ ...prev, password: data }))
    setCurrentStep(3)
  }

  const handleStepThreeComplete = (data: PhotoData) => {
    setRegistrationData((prev) => ({ ...prev, photo: data }))
    const completeData = {
      ...registrationData,
      photo: data,
    }
    console.log("[v0] Registration Complete! All data:", completeData)

    const role = 'worker'

    if (completeData.profile?.email) {
      register(completeData.profile.email)
      if (role === 'worker') {
        router.push("/dashboard")
      } else {
        router.push("/")
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOneProfile
            onContinue={handleStepOneComplete}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
            initialData={registrationData.profile}
          />
        )
      case 2:
        return (
          <StepTwoPassword
            onContinue={handleStepTwoComplete}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
            initialData={registrationData.password}
          />
        )
      case 3:
        return (
          <StepThreePhoto
            onContinue={handleStepThreeComplete}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
            initialData={registrationData.photo}
          />
        )
      default:
        return (
          <StepOneProfile
            onContinue={handleStepOneComplete}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            currentStep={currentStep}
            initialData={registrationData.profile}
          />
        )
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4">
      <div className="w-full h-full max-w-[1700px] shadow-2xl bg-white px-10 rounded-[2rem]">{renderStep()}</div>
    </div>
  )
}
