// src/middleware/adminAuthMiddleware.ts
import { NextRequest, NextResponse } from "next/server";

export function adminAuthMiddleware(req: NextRequest) {
    const protectedPaths = /^\/(fa|en)?\/?admin(\/|$)/;
    const isProtected = protectedPaths.test(req.nextUrl.pathname);

    if (isProtected) {
        const token = req.cookies.get("token");

        // اگر توکن نباشد، ریدایرکت به صفحه لاگین
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    // ادامه پردازش
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*']
};