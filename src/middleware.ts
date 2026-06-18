import { authKey } from '@/constants/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    role?: string
    // Add other token properties if needed
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get(authKey)
    const { pathname } = request.nextUrl

    // Public routes (accessible to everyone, logged in or not)
    const publicRoutes = ['/', '/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/about', '/contact', '/services', '/terms-and-conditions', '/privacy-policy']

    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))

    // 1. If trying to access protected route without token
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    // 2. Role-based access control
    if (token) {
        try {
            const decoded = jwtDecode<DecodedToken>(token.value)
            const userRole = decoded.role

            // Worker restrictions
            if (userRole === 'worker') {
                const workerRestrictedRoutes = ['/', '/my-bookings']
                const isWorkerRestricted = workerRestrictedRoutes.some(
                    route => pathname === route || pathname.startsWith(`${route}/`)
                )

                if (isWorkerRestricted) {
                    return NextResponse.redirect(new URL('/dashboard', request.url))
                }
            }

            // Customer restrictions
            if (userRole === 'customer') {
                const customerRestrictedRoutes = ['/all-bookings', '/schedule', '/dashboard']
                const isCustomerRestricted = customerRestrictedRoutes.some(
                    route => pathname === route || pathname.startsWith(`${route}/`)
                )

                if (isCustomerRestricted) {
                    return NextResponse.redirect(new URL('/', request.url))
                }
            }
        } catch (error) {
            console.error('Error decoding token:', error)
            // If token is invalid, redirect to sign-in
            return NextResponse.redirect(new URL('/auth/sign-in', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
    ],
}