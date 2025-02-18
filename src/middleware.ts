import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.includes("admin")) {
        const protectedPaths = /^\/(fa|en)?\/?admin(\/|$)/;
        const isProtected = protectedPaths.test(req.nextUrl.pathname);
        if (req.nextUrl.pathname === "/admin/login") {
            return NextResponse.next();
        }
        if (isProtected) {
            const token = req.cookies.get("authToken");
            if (!token) {
                return NextResponse.redirect(new URL("/admin/login", req.url));
            }
        }
    } else {
        if (req.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/en", req.url));
        }
        const result = intlMiddleware(req);
        if (result) return result;
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/(fa|en)/:path*', '/'],
};