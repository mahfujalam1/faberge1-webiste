"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

interface StepThreePasswordProps {
    onComplete: (password: string) => void
    isLoading: boolean
}

export function StepThreePassword({ onComplete, isLoading }: StepThreePasswordProps) {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword === confirmPassword && newPassword.length >= 6) {
            onComplete(newPassword) // Pass new password to parent
        }
    }

    const isValid = newPassword === confirmPassword && newPassword.length >= 6

    return (
        <form className="space-y-6 w-full max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="new-password" className="mb-2 block text-sm font-medium text-gray-900">New Password</label>
                <div className="relative">
                    <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-12 rounded-lg border-gray-200 bg-gray-50 pr-12 text-gray-900"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showNewPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-gray-900">Confirm Password</label>
                <div className="relative">
                    <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-12 rounded-lg border-gray-200 bg-gray-50 pr-12 text-gray-900"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
            </div>

            <div className="w-60 mx-auto">
                <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save New Password"}
                </Button>
            </div>
        </form>
    )
}
