'use server'

import React from 'react'

// [Step 1]
import { SignJWT, importJWK } from 'jose' // npm install jose
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getUsers() {
    var response = [];
    try {
        response = await fetch("https://669890d82069c438cd6f2242.mockapi.io/userInfo");
        if (!response.ok) {
            throw new Error('Cannot fetch users data.');
        }
        return response.json();
    } catch (error) {
        console.log('Error : ', error);
    }
}

async function login(prevState, formData) {

    const email = formData.get('email');
    const password = formData.get('password');
    //console.log("Email : ", email);
    //console.log("Password : ", password);

    const users = await getUsers();
    //console.log(users);

    const user = users.filter((x) => {
        if ((x.email === email) && (x.phoneNumber == password)) {
            return x;
        }
    });
    //console.log("user : ", user);

    if (user.length > 0) {

        // [Step 2]
        // !!! importance !!! | Crate .env.local in root project and enter below value pair.
        // !!! importance !!! | JOSE_SECRET=AppDev
        console.log("process.env.JOSE_SECRET : ",process.env.JOSE_SECRET);
        const secretJWK = {
            kty: 'oct',
            k: process.env.JOSE_SECRET // Replace with your actual base64 encoded secret key
        }

        const secretKey = await importJWK(secretJWK, 'HS256');
        const token = await new SignJWT({ email: user[0].email })
                                .setProtectedHeader({ alg: 'HS256' })
                                .setIssuedAt()
                                .setExpirationTime('1h') // Token expires in 1 hour
                                .sign(secretKey);
        console.log("cookieAuth : ", token);                                

        cookies().set('cookieAuth', token);
        // Check in you Browser : F12 -> Application -> find you "token" cookies
        // or https://jwt.io/

        return { message: 'Login Successful.' }
    } else {
        return { message: 'User name or password incorrect. !' }
    }
}

export default login


/*
***************************************************************************************************
Next ...
***************************************************************************************************

1) Add Error500 component : "/app/Error500/page.jsx"
***************************************************************************************************
import React from 'react'

const page = () => {
  return (
    <div>Error 500 Something Went Wrong...</div>
  )
}
***************************************************************************************************

2) Edit middleware.js
***************************************************************************************************
!!! Importance !!! add this parameter into  "/:path*"  matcher
***************************************************************************************************

export default page
...
import { jwtVerify, importJWK } from 'jose'
...
// This function can be marked `async` if using `await` inside
export async function middleware(request) {  // !!! add async mode
...    
    // Check JWT authorize
    try {
        let token = request.cookies.get('cookieAuth')
        if(typeof token === "undefined") return NextResponse.next();

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

        const response = NextResponse.next({
            request:{
                headers: requestHeaders,
            },
        });
        return response;

    } catch (error) {
        console.log('error', error)
        return NextResponse.redirect(new URL('/Error500', request.url))
    }
...
}
...
export const config = {
    matcher: ["/:path*","/getUsers/:path*", '/getUser/:path*']
};
***************************************************************************************************

3) Test middlware send response header data on root page.js
***************************************************************************************************
// [Step 1]
import { headers } from 'next/headers'

export default function Home() {

  // [Step 2]
  const headersList = headers()
  let user = JSON.parse(headersList.get('user'))
  if (user == null){
    user = { email: 'Access Denied' }
  }

  return (
    <>
      // [Step 3]
      Hello World !!!
      <h5>Email Authentication : {user.email}</h5>
    </>
  );
}
***************************************************************************************************
*/