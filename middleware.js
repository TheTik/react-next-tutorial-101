import { NextResponse } from "next/server";

import { jwtVerify, importJWK } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    console.log("##### [middlware] To do something before call API #####");

    // Test Signature verified.
    // try {
    //     const crackSecretJWK = {
    //         kty: 'oct',
    //         k: 'AppDev' // Replace with your actual base64 encoded secret key
    //     }

    //     let crackToken = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IkdhcnJpY2suTW9ocjgxQGhvdG1haWwuY29tIiwiaWF0IjoxNzIzNzM0OTY4LCJleHAiOjE3MjM3Mzg1Njh9.e2x8NldNP0E06oQI-SQvbg3XP70RnBHbq4rg5SK-6eU"
    //     const crackSecretKey = await importJWK(crackSecretJWK, 'HS256')
    //     const { payload } = await jwtVerify(crackToken, crackSecretKey)
    //     console.log("----------------------------------------------------------------------------------------");
    //     console.log("√ Signature verified. ");
    //     console.log("----------------------------------------------------------------------------------------");
    //     console.log("Payload : ", payload.email);
    //     console.log("----------------------------------------------------------------------------------------");
    // } catch (error) {
    //     console.log("----------------------------------------------------------------------------------------");
    //     console.log("!!! Invalid signature. !!!");
    //     console.log("----------------------------------------------------------------------------------------");
    //     console.log('Error : ', error)
    //     console.log("----------------------------------------------------------------------------------------");
    // }

    // Check JWT authorize 
    try {

        let token = request.cookies.get('cookieAuth')
        if (typeof token === "undefined") return NextResponse.next();

        const secretJWK = {
            kty: 'oct',
            k: process.env.JOSE_SECRET // Replace with your actual base64 encoded secret key
        }

        //console.log('token : ', token.value)
        //console.log('secretJWK : ', secretJWK)

        const secretKey = await importJWK(secretJWK, 'HS256')
        const { payload } = await jwtVerify(token.value, secretKey)

        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('user', JSON.stringify({ email: payload.email }))

        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
        return response;

    } catch (error) {
        //console.log('error', error)
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
    matcher: ["/:path*", "/getUsers/:path*", '/getUser/:path*']
};