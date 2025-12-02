import { authKey } from '@/constants/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get(authKey)
    const { pathname } = request.nextUrl

    // Public routes
    const publicRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/']
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))

    // If trying to access protected route without token
    if (!token) {
        // If it's a protected route and no token, redirect to login
        if (!isPublicRoute) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url))
        }
    }

    // If logged in and trying to access auth pages, redirect to home
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        
    ],
}
