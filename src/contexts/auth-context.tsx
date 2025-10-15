"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { setAuthToken, getAuthToken, removeAuthToken, generateToken } from "@/lib/auth-cookies"

interface AuthContextType {
    isLoggedIn: boolean
    user: { email: string } | null
    login: (email: string, password: string) => void
    logout: () => void
    register: (email: string) => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)

        if (typeof window !== "undefined") {
            const token = getAuthToken()
            if (token) {
                try {
                    // Decode token to get email (in production, validate with backend)
                    const decoded = atob(token)
                    const email = decoded.split("-")[0]
                    setUser({ email })
                    setIsLoggedIn(true)
                    console.log("[v0] User authenticated from cookie:", { email })
                } catch (error) {
                    console.error("[v0] Invalid token:", error)
                    removeAuthToken()
                }
            }
            setIsLoading(false)
        }
    }, [])

    const login = (email: string, password: string) => {
        console.log("[v0] Login attempt:", { email, password })
        const token = generateToken(email)
        setAuthToken(token)

        const userData = { email }
        setUser(userData)
        setIsLoggedIn(true)
        console.log("[v0] User logged in with token:", { email, token })
    }

    const register = (email: string) => {
        console.log("[v0] Registration complete for:", email)
        const token = generateToken(email)
        setAuthToken(token)

        const userData = { email }
        setUser(userData)
        setIsLoggedIn(true)
        console.log("[v0] User registered with token:", { email, token })
    }

    const logout = () => {
        console.log("[v0] User logged out")
        removeAuthToken()
        setUser(null)
        setIsLoggedIn(false)
    }

    if (!isMounted) {
        return null
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
