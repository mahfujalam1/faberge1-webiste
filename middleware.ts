// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if user is authenticated (e.g., check for auth token in cookies)
    const token = request.cookies.get('auth-token')

    if (!token) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

// Specify which routes to protect
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/register/:path*', 'appoinment/:path*'],
}