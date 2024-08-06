import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("##### [middlware] To do something before call API #####");

    const nextUrl = request.nextUrl
    //console.log("nextUrl : ", nextUrl);

    if (nextUrl.pathname === "/getUsers"){
        return NextResponse.redirect(new URL("/API/Users", request.url));
    }else{
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/getUsers/:path*", '/getUser/:path*',]
};