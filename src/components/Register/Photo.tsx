"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, User, ChevronLeft, ChevronRight } from "lucide-react"
import { IMAGES } from "@/constants/image.index"

interface StepThreePhotoProps {
    onContinue: (photoData: PhotoData) => void
    onNext: () => void
    onPrev: () => void
    currentStep: number
    initialData?: PhotoData
}

export interface PhotoData {
    photoUrl: string | null
    photoFile: File | null
}

export default function StepThreePhoto({ onContinue, onPrev, initialData }: StepThreePhotoProps) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(initialData?.photoUrl || null)
    const [photoFile, setPhotoFile] = useState<File | null>(initialData?.photoFile || null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPhotoFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            console.log("[v0] Photo selected:", file.name)
        }
    }

    const handleChoosePhoto = () => {
        fileInputRef.current?.click()
    }

    const handleContinue = () => {
        console.log("[v0] Step 3 - Photo Data:", { photoFile: photoFile?.name, hasPreview: !!photoPreview })
        onContinue({ photoUrl: photoPreview, photoFile })
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
            <h1 className="mb-4 text-center font-serif text-4xl font-normal text-gray-900">Upload Photo</h1>

            {/* Subtitle */}
            <p className="mb-12 text-center text-sm text-gray-600">
                Please provide a clear headshot on a light background minus glasses and headwear.
            </p>

            {/* Photo Preview */}
            <div className="mb-8 flex justify-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-lg border-4 border-gray-300 bg-gray-200">
                    {photoPreview ? (
                        <Image src={photoPreview || "/placeholder.svg"} alt="Profile preview" fill className="object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <User className="h-16 w-16 text-gray-400" />
                        </div>
                    )}
                </div>
            </div>

            {/* Hidden File Input */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />

            {/* Choose Photo Button */}
            <div className="mb-6">
                <Button
                    type="button"
                    onClick={handleChoosePhoto}
                    className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800 flex items-center justify-center gap-2"
                >
                    <Upload className="h-5 w-5" />
                    Choose Photo
                </Button>
            </div>

            {/* Continue Button - Only enabled if photo is selected */}
            {photoPreview && (
                <Button
                    type="button"
                    onClick={handleContinue}
                    className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800"
                >
                    Continue
                </Button>
            )}

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
                    onClick={handleContinue}
                    disabled={!photoPreview}
                    variant="ghost"
                    className="flex items-center gap-2 shadow-2xl bg-white text-black hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
