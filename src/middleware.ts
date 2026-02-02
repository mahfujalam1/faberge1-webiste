import { authKey } from '@/constants/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get(authKey)
    const { pathname } = request.nextUrl

    const authRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password']

    // Fix 1: Check for exact match or startsWith for sub-paths, but handle '/' carefully
    const isAuthRoute = authRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))

    // Fix 2: Explicitly define public routes. 
    // Use exact check for '/' to prevent it from matching everything.
    const isPublicRoute = pathname === '/' || isAuthRoute

    // 1. If trying to access protected route without token
    if (!token) {
        if (!isPublicRoute) {
            // Redirect to sign-in and keep the original destination in query params if needed
            return NextResponse.redirect(new URL('/auth/sign-in', request.url))
        }
    }

    // 2. If logged in and trying to access auth pages, redirect to home
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
    ],
}
