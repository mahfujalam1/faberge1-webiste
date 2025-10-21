"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { IMAGES } from "@/constants/image.index"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"


function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted with data:", {
      email,
      password,
      rememberMe,
    })

    const role = 'worker'

    login(email, password)

    // login করার পর user রোল চেক করে redirect করা হচ্ছে
    if (role === "worker") {
      router.push("/dashboard")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#fdeaea] via-[#fff1f3] to-[#ffdae1] p-4">
      <div className="w-full h-full max-w-[1700px] md:h-[800px] shadow-2xl bg-white px-10 rounded-4xl">
        <div className="w-full max-w-xl mx-auto py-10">
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

          {/* Welcome Back Title */}
          <h1 className="mb-8 text-center font-serif text-4xl font-normal text-gray-900">Welcome Back</h1>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-lg border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Remember Me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm font-medium text-gray-900 hover:underline">
                Forgot Password
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="h-12 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800"
            >
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-900">
            Don not have an account?{" "}
            <Link href="/auth/sign-up" className="font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


export default LoginForm