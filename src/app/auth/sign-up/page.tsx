"use client"

import StepTwoPassword, { PasswordData } from "@/components/Register/Password"
import StepThreePhoto, { PhotoData } from "@/components/Register/Photo"
import StepOneProfile, { ProfileData } from "@/components/Register/Profile"
import { useRegisterMutation, useSetPasswordMutation, useUploadPhotoMutation } from "@/redux/api/authApi"
import { loginUser } from "@/services/actions/loginUser"
import setAccessTokenToCookies from "@/services/actions/setAccessTokenToCookie"
import { storeUserInfo } from "@/services/authServices"
import { ApiError } from "@/types/global.types"
import { useState } from "react"
import { toast } from "sonner"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEamil] = useState<string | null>('')
  const [registrationData, setRegistrationData] = useState<{
    profile?: ProfileData
    password?: PasswordData
    photo?: PhotoData
  }>({})
  const [signUp] = useRegisterMutation()
  const [setPassword] = useSetPasswordMutation()
  const [uploadPhoto] = useUploadPhotoMutation()

  const handleStepOneComplete = async (data: ProfileData) => {
    setIsLoading(true)
    const res = await signUp(data)
    if (res?.data) {
      setEamil(res?.data?.data?.email)
      toast.success("First Step Successfully Complete!")
      setCurrentStep(2)
      setIsLoading(false)
    } else if (res?.error) {
      const apiError = res?.error as ApiError
      const errorMessage = apiError?.data?.message || "Login failed. Please try again."
      toast.error(errorMessage)
      setIsLoading(false)
    }
    setRegistrationData((prev) => ({ ...prev, profile: data }))
  }

  const handleStepTwoComplete = async (data: PasswordData) => {
    setIsLoading(true)
    const res = await setPassword({ email, password: data?.password })
    if (res?.data) {
      toast.success("Step Two successfully Complete!")
      setCurrentStep(3)
      setIsLoading(false)
    } else if (res?.error) {
      const apiError = res?.error as ApiError
      const errorMessage = apiError?.data?.message || "Login failed. Please try again."
      toast.error(errorMessage)
      setIsLoading(false)
    }
    setRegistrationData((prev) => ({ ...prev, password: data }))

  }

  const handleStepThreeComplete = async (data: PhotoData) => {
    const formData = new FormData();

    if (registrationData.profile?.email) {
      formData.append('email', registrationData.profile.email);
    }
    if (data?.photoFile) {
      formData.append('customerProfileImage', data.photoFile);
    }
    setIsLoading(true)
    const res = await uploadPhoto(formData);
    if (res?.data) {
      toast.success("Successfully Completed Profile!")
      const loginRes = await loginUser({ email: registrationData?.profile?.email, password: registrationData?.password?.password })
      if (loginRes?.token) {
        storeUserInfo(loginRes.token);
        setAccessTokenToCookies(loginRes.token, {
          redirect: "/",
        });
        setIsLoading(false)
      }
    } else if (res?.error) {
      const apiError = res?.error as ApiError
      const errorMessage = apiError?.data?.message || "Login failed. Please try again."
      toast.error(errorMessage)
      setIsLoading(false)
    }
    setRegistrationData((prev) => ({ ...prev, photo: data }));

  };


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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
      <div className="bg-white rounded-xl shadow-md w-full max-w-6xl p-10">{renderStep()}</div>
    </div>
  )
}
