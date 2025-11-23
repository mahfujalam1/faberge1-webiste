// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')
    const { pathname } = request.nextUrl

    // Public routes
    const publicRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password']
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

    // If trying to access protected route without token
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    // If logged in and trying to access auth pages, redirect based on role
    // Note: We can't decode JWT in middleware easily, so role check happens client-side
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/profile/:path*',
        '/register/:path*',
        '/appointment/:path*',
        '/auth/:path*',
        '/bookings/:path*',
        '/schedule/:path*',
        '/all-bookings/:path*',
        '/my-bookings/:path*'
    ],
}