import { NextResponse } from "next/server";

import { jwtVerify, importJWK } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    console.log("##### [middlware] To do something before call API #####");


    
    // Check JWT authorize
    try {
        let token = request.cookies.get('token')

        const secretJWK = {
            kty: 'oct',
            k: process.env.JOSE_SECRET // Replace with your actual base64 encoded secret key
        }

        console.log('token : ', token.value)
        console.log('secretJWK : ', secretJWK)

        const secretKey = await importJWK(secretJWK, 'HS256')
        const { payload } = await jwtVerify(token.value, secretKey)
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('user', JSON.stringify({ email: payload.email }))
    } catch (error) {
        console.log('error', error)
        return NextResponse.redirect(new URL('/Error500', request.url))
    }



    const nextUrl = request.nextUrl
    //console.log("nextUrl : ", nextUrl);

    if (nextUrl.pathname === "/getUsers") {
        return NextResponse.redirect(new URL("/API/Users", request.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/getUsers/:path*", '/getUser/:path*','/checkAuth/:path*']
};