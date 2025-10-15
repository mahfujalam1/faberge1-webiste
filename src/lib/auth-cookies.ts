"use client"

export function setAuthToken(token: string) {
    // Set cookie with 7 days expiry
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)
    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`
}

export function getAuthToken(): string | null {
    if (typeof document === "undefined") return null

    const cookies = document.cookie.split("; ")
    const authCookie = cookies.find((cookie) => cookie.startsWith("auth_token="))

    if (authCookie) {
        return authCookie.split("=")[1]
    }

    return null
}

export function removeAuthToken() {
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict"
}

export function generateToken(email: string): string {
    // Simple token generation - in production, this would come from your backend
    return btoa(`${email}-${Date.now()}`)
}
