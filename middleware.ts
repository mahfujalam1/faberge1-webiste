// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if user is authenticated (e.g., check for auth token in cookies)
    const token = request.cookies.get('auth-token')

    // If the token is missing and the user is trying to access a protected route
    if (!token) {
        // Redirect to login page
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    return NextResponse.next()
}

// Specify which routes to protect
export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/profile/:path*',
        '/register/:path*',
        '/appointment/:path*'
    ],
}
