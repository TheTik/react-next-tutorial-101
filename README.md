This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


---------------------------------------------------------------------------------------------------
# AppDev tutorial 101
- Create next project.
- Pages and Layouts.
  - Create a nested routes.
  - Create Web Template example.
- Nesting Layouts.  
- Dynamic Routes.
- Route Handlers.
- Middleware.
- Rendering : Server/Client component.
- Loading UI and Streaming.
- Server Action.
- UserCRUD 
    - UserList run as server.
    - UserEdit run as client.
- Login 
    - action : bz-login run as server.
    - page : login ui run as client.    
- LoginJWT
    - useFormState
    - jose
    - cookies
---------------------------------------------------------------------------------------------------
# npx create-next-app@latest
Need to install the following packages:
create-next-app@14.2.5
Ok to proceed? (y)

? What is your project named? » "react-next-tutorial-101"

√ What is your project named? ... react-next-tutorial-101
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias (@/*)? ... No / Yes
Creating a new Next.js app in "react-next-tutorial-101".

Using npm.

Initializing project with template: app

Installing dependencies:
- react
- react-dom
- next

***** Install packages *****

added 21 packages, and audited 22 packages in 31s

3 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Initialized a git repository.

Success! Created react-next-tutorial-101 at "react-next-tutorial-101"

1) Change directory to "react-next-tutorial-101"
2) Edit "page.js" file to "eact-next-tutorial-101\app\page.js"
---------------------------------------------------------------------------------------------------

Packet install
# npm install jose



###################################################################################################
Pages and Layouts
###################################################################################################

---------------------------------------------------------------------------------------------------
1) Create a nested routes.
---------------------------------------------------------------------------------------------------
1.1) Create folder "app\RouteDemo"
1.2) Create "app\RouteDemo\page.jsx"
***************************************************************************************************
const page = () => {
  return (
    <div>page route demo</div>
  )
}

export default page
***************************************************************************************************
1.3) Test route "http://localhost:3000/RouteDemo"
---------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------
2) Create Web Template example.
---------------------------------------------------------------------------------------------------
2.1) Create "HeaderPage.jsx" on "app\Components\WebTemplate\HeaderPage.jsx"
***************************************************************************************************
'use client'

import React from 'react'

const HeaderPage = () => {
  return (
    <div>Header Page</div>
  )
}

export default HeaderPage
***************************************************************************************************

2.1) Create "FooterPage.jsx" on "app\Components\WebTemplate\FooterPage.jsx"
***************************************************************************************************
'use client'

import React from 'react'

const FooterPage = () => {
  return (
    <div>Footer Page</div>
  )
}

export default FooterPage
***************************************************************************************************

2.3) Edit "layout.js" on "app\layout.js"
***************************************************************************************************
...
import HeaderPage from "./Components/WebTemplate/HeaderPage";
import FooterPage from "./Components/WebTemplate/FooterPage";
...

...
        <div><HeaderPage /></div>
        <div>
          <hr />{children}<hr />
        </div>
        <div><FooterPage /></div>
...        
***************************************************************************************************
2.3) Test : http://localhost:3000/
---------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------
3) Nesting Layouts.
---------------------------------------------------------------------------------------------------
3.1) Create layout.jsx to "app/RouteDemo/layout.jsx"
***************************************************************************************************
export default function RouteDemoLayout({
    children,
}) {
    return (
        <section>
            <div>Sub Header</div>
            {children}
        </section>
    )
}
***************************************************************************************************
3.2) Test : http://localhost:3000/RouteDemo is will show...

Header Page
.............................
Sub Header
page route demo
.............................
Footer Page

3.3) Change route : http://localhost:3000/ is will show...

Header Page
.............................
Hello World !!!
.............................
Footer Page

3.4) Create sub page... Create page.jsx into "app/RouteDemo/SubDemo-1/page.jsx"
***************************************************************************************************
const page = () => {
  return (
    <div>SubDemo-1 page</div>
  )
}

export default page
***************************************************************************************************

3.5) Test show "SubDemo-1". Test : http://localhost:3000/RouteDemo/SubDemo-1

Header Page
.............................
Sub Header
SubDemo-1 page
.............................
Footer Page

---------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------
4) Dynamic Routes.
---------------------------------------------------------------------------------------------------
4.1.1) A Dynamic Segment can be created by wrapping a folder's name 
in square brackets: [folderName]. For example, [id] or [name].

- Create folder and file by "app/User/[id]/[name]/page.jsx"
***************************************************************************************************
'use client'

import React from 'react'

const page = ({ params }) => {
  return (
    <div>
      Id: {params.id} <br />
      Name: {params.name}
    </div>
  )
}

export default page
***************************************************************************************************
4.1.2) Test show user result : http://localhost:3000/User/5/Appdev

Header Page
.............................
Id: 5
Name: Appdev
.............................
Footer Page

---------------------------------------------------------------------------------------------------

4.2.1) Catch-all Segments
Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets [...folderName].

- Create folder and file by "app/Users/[...AllUsers]/page.jsx"
***************************************************************************************************
"use client"

const AllUsers = ({ params }) => {
  return (
    <div>
      <ul>
        {params.AllUsers.map(item => (
          <li key={item}>{item}</li>
        )
        )}
      </ul>
    </div>
  )
}

export default AllUsers
***************************************************************************************************

4.2.2) Test show all users result : http://localhost:3000/Users/AppDev1/AppDev2/AppDev3

Header Page
.............................
AppDev1
AppDev2
AppDev3
.............................
Footer Page

---------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------
5) Route Handlers.
---------------------------------------------------------------------------------------------------
5.1.1) Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

- Create folder and file by "app/API/Users/route.jsx"
***************************************************************************************************
'use server'

export async function GET() {

    console.log("##### Test API as server. [http://localhost:3000/API/Users] #####");

    const res = await fetch('https://669890d82069c438cd6f2242.mockapi.io/userInfo', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()

    return Response.json({ data })
}
***************************************************************************************************
5.1.2) Test get all users api : http://localhost:3000/API/Users
---------------------------------------------------------------------------------------------------

5.2.1) Dynamic Route Segments : Route Handlers can use Dynamic Segments to create request handlers from dynamic data.

- Create folder and file by "app/API/User/[id]/route.jsx"
***************************************************************************************************
'use server'

export async function GET(request, { params }) {

    console.log("##### Test API as server. [http://localhost:3000/API/User/XXX] #####");

    const userId = params.id;
    const res = await fetch(`https://669890d82069c438cd6f2242.mockapi.io/userInfo/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()

    return Response.json({ data })
}
***************************************************************************************************
5.2.2) Test get all users api : http://localhost:3000/API/User/10
---------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------
6) Middleware.
Test : http://localhost:3000/getUsers
---------------------------------------------------------------------------------------------------
Middleware คือส่วนของ code ที่จะ run ก่อนที่ request จะทำงานเสร็จ
- สามารถที่จะ rewriting, redirecting, modifying ตัว request, response ก่อนที่จะไปถึงตำแหน่งจริงๆได้
กฎคือ สร้างไฟล์ชื่อ middleware.js ไว้ที่ root project (level เดียวกันกับ app) = ได้ middleware แล้วเรียบร้อย

6.1) Create middleware.js in the root project
***************************************************************************************************
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
***************************************************************************************************
6.2) Test get all users api : http://localhost:3000/getUsers
---------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------
7) Rendering : Server/Client component.
Test : http://localhost:3000/FetchData/Client
---------------------------------------------------------------------------------------------------
7.1.1) Server : Create folder and file by "app/FetchData/Server/page.jsx"
***************************************************************************************************
'use server'

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

const page = async () => {

    const users = await getUsers();
    console.log("Users : ", users);

    return (
        <div>
            <h3>Run as Server</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.id}:{user.name}</li>
                )
                )}
            </ul>
        </div>
    )
}

export default page
***************************************************************************************************
7.1.2) Test get all users api : http://localhost:3000/FetchData/Server
---------------------------------------------------------------------------------------------------

7.2.1) Client : Create folder and file by "app/FetchData/Client/page.jsx"
***************************************************************************************************
"use client"

import React from 'react'
import { useState, useEffect } from 'react'

const page = () => {

    const [users, setUsers] = useState([]);

    async function getUsers() {
        try {
            await fetch("https://669890d82069c438cd6f2242.mockapi.io/userInfo")
                .then((res) => res.json())  // Current is native brower => paser JSON response into native JavaScript objects.
                .then((res) => {
                    setUsers(res);
                });
        } catch (error) {
            console.log('Error : ', error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);
    console.log(users);
    // !!! react App rendering twice !!!
    // Edit file "next.config.mjs" for disable reactStrictMode
    // const nextConfig = {
    //     reactStrictMode: false
    // };

    return (
        <div>
            <h3>Run as Client</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.id}:{user.name}</li>
                )
                )}
            </ul>
        </div>
    )
}

export default page
***************************************************************************************************
7.2.2) Test get all users api : http://localhost:3000/FetchData/Client
---------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------
8) Loading UI and Streaming.
Test : http://localhost:3000/FetchData/ServerLoading and pass Ctrl + F5
---------------------------------------------------------------------------------------------------
The special file loading.js helps you create meaningful Loading UI with "React Suspense". With this convention, 
you can show an instant loading state from the server while the content of a route segment loads. 
The new content is automatically swapped in once rendering is complete.

8.1) Copy "app/FetchData/Server" to "app/FetchData/ServerLoading"
8.2) Create file : "app/FetchData/ServerLoading/loading.js"
***************************************************************************************************
export default function Loding(){
    return <div>Loding...</div>
}
***************************************************************************************************
8.3) Test page render by : http://localhost:3000/FetchData/ServerLoading and pass Ctrl + F5
---------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------
9) Server Action.
Test : http://localhost:3000/ServerAction
---------------------------------------------------------------------------------------------------
9.1) Create folder and file by "app/ServerAction/page.jsx"
***************************************************************************************************
"use client"

import React, { useState, useEffect } from 'react'
import { submitForm } from './action'

const UserEdit = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        console.log([e.target.name],e.target.value);
        setUser(({ ...user, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <form action={submitForm}>
                <div className="container mx-auto p-4">
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="mb-2 w-full rounded border p-2"
                    />
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="mb-2 w-full rounded border p-2"
                    />
                    <br />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="mb-4 w-full rounded border p-2"
                    />

                    <br />
                    <button className="rounded bg-green-500 px-4 py-2 text-white">
                        Submit
                    </button>
                    <h5>After click submit button check you data into server terminal.</h5>
                </div>
            </form>
        </>
    )
}

export default UserEdit
***************************************************************************************************
9.2) Create file : "app/ServerAction/action.jsx"
***************************************************************************************************
'use server'

export async function submitForm(formData)
{
    console.log(formData);
}
***************************************************************************************************
9.3) Test by enter you data and click on "Submit" button and then check you data on server teminal.
AppBaseUrl : http://localhost:3000/ServerAction
---------------------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------------------
10) UserCRUD 
- UserList run as server.
- UserEdit run as client.
Test : http://localhost:3000/UserCRUD/Server/UserList
---------------------------------------------------------------------------------------------------
10.1) Server : Create folder and file by "/app/UserCRUD/Server/UserList/page.jsx"
# rafce 

***************************************************************************************************
[Step 1]
import Link from 'next/link'
import { revalidatePath } from "next/cache";

[Step 2]
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

[Step 3]
async function deleteUser(id) {
    var response = null;
    try {
        const requestOptions = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            redirect: "follow"
        };

        response = await fetch(`https://669890d82069c438cd6f2242.mockapi.io/userInfo/${id}`, requestOptions);
        if (!response.ok) {
            throw new Error('Cannot fetch users data.');
        }
        return response.json();
    } catch (error) {
        console.log('Error : ', error);
    }
}

const page = async () => {

[Step 4]
    const users = await getUsers();
    //console.log("Users : ", users);

[Step 6]
    const handleDelete = async (data) => {
        "use server";

        const userId = data.get("userId");
        //console.log("userId : ", userId);

        const result = await deleteUser(userId);
        //console.log("Result : ", result);
        if (typeof (result) !== 'undefined') {
            revalidatePath("/UserCRUD/Server/UserList");
        }
    };

[Step 5]
   return (
        <div className="container mx-auto p-4">
            <h3 className="mb-4 text-lg font-semibold">User List</h3>
            {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between border-b py-2">
                    <div>
                        <p>Id: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phoneNumber}</p>
                    </div>
                    <div>

                        <form action={handleDelete}>

                            <input name="userId" type="hidden" value={user.id} />
                            <button type="submit" className="mr-2 rounded bg-red-500 px-3 py-1 text-white">Delete</button>

                            <Link href={`/UserCRUD/Client/UserEdit/${user.id}`}>
                                <button className="rounded bg-blue-500 px-3 py-1 text-white">Edit</button>
                            </Link>

                        </form>

                    </div>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default page

***************************************************************************************************

10.2) Client : Create folder and file by "/app/UserCRUD/Client/UserEdit/[id]/page.jsx"
# rafce 
***************************************************************************************************
[Step 1]
"use client"

import React, { useState, useEffect } from 'react'

[Step 2]
async function getUser(id) {
    let response = null;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };

        response = await fetch(`https://669890d82069c438cd6f2242.mockapi.io/userInfo/${id}`, requestOptions);
        if (!response.ok) {
            throw new Error('Cannot fetch user data.');
        }
        return response.json();
    } catch (error) {
        console.log('Error : ', error);
    }
}

[Step 3]
async function updateUser(raw) {
    let response = null;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(raw),
        };

        response = await fetch(`https://669890d82069c438cd6f2242.mockapi.io/userInfo/${raw.id}`, requestOptions);
        if (!response.ok) {
          throw new Error('Cannot fetch user data.');
        }
        return response.json();
    } catch (error) {
        console.log('Error : ', error);
    }
}


export const page = ({ params }) => {

[Step4]
    const id = params.id;

    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });
	
[Step 5]	
    const getUserById = async (id) => {
        try {
            const response = await getUser(id);
            setUser(response);
        } catch (error) { console.log('error', error); }
    }
	
[Step 6]
    useEffect(() => {
        getUserById(id);
    }, [id]);
	

[Step 8]
    const handleChange = (e) => {
        //console.log([e.target.name],e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };


[Step 9]
    const handleSave = async () => {
        const result = await updateUser(user);        
        if (typeof (result) !== 'undefined') {
            alert("Data has been save..");
        }
    };


[Step 7]
    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
                className="mb-2 w-full rounded border p-2"
            />
            <br />
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="mb-2 w-full rounded border p-2"
            />
            <br />
            <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="mb-4 w-full rounded border p-2"
            />

            <br />
            
            <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">
                Save
            </button>
        </div>
    )

}

export default page

***************************************************************************************************

10.4) Server : Create loading.jsx file by "/app/UserCRUD/Server/UserList/loading.jsx"
***************************************************************************************************
export default function Loading() {
    return <div>UserList Loading... </div>
  }
***************************************************************************************************

10.5) Client : Create loading.jsx file by "/app/UserCRUD/Client/UserEdit/[id]/page.jsx"
***************************************************************************************************
export default function Loading() {
    return <div>UserEdit Loading... </div>
  }
***************************************************************************************************

---------------------------------------------------------------------------------------------------
11) Login 
- action : bz-login run as server.
- page : login ui run as client.
Test : http://localhost:3000/Login
---------------------------------------------------------------------------------------------------
11.1) Client : Create folder and file by "/app/Login/page.jsx"
***************************************************************************************************
// [Step 1]
'use client'

// [Step 2] #rafce
import React from 'react'

// [Step 6]
import login from './action'

// [Step 3]
import { useFormState, useFormStatus } from 'react-dom'

const page = () => {

    // [Step 5]
    const initialState = {
        message: null,
    }

    // [Step 4]
    const [state, formAction] = useFormState(login, initialState);
    // login is server function, matcher login : prevState

    // [Step 6]
    return (
        <div>
            <form action={formAction}>
                <div>Email <input name="email" /></div>
                <div>Password <input name="password" type="password" /></div>
                <button>Login</button>
                <div>
                    System Message : {state?.message}
                </div>
            </form>
        </div>
    )
}

export default page
***************************************************************************************************
11.2) Server : Create folder and file by "/app/Login/action.jsx"
***************************************************************************************************
// [Step 1]
'use server'

// [Step 2] # rafce
import React from 'react'

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

// [Step 3] change code : const action = () => { : async function login (prevState, formData) {
async function login(prevState, formData) {

    // [Step 5]
    const email = formData.get('email');
    const password = formData.get('password');
    console.log("------------------------------------");
    console.log("Email : ", email);
    console.log("Password : ", password);
    console.log("------------------------------------");

    // [Step 6]
    const users = await getUsers();
    //console.log(users);

    const user = users.filter((x) => {
        //console.log(x.email);
        if ((x.email === email) && (x.phoneNumber == password)){ 
            return x; 
        }
    });    
    //console.log("user : ", user);

    if (user.length > 0) { 
        return { message : 'Login Successful.'}
    }else{
        return { message : 'User name or password incorrect. !'}
    }
}

// [Step 4]
export default login
***************************************************************************************************

Deploy 

1) Download URL Rewrite Module 2.1 : https://www.iis.net/downloads/microsoft/url-rewrite
2) Add Website...
3) Double click on URL Rewrite
   - Add Rule(s)
   - Revers Proxy and clike OK
   - Inbound Rules ()=> Enter the server name or the IP address where HTTP request will be forwarded. example : "localhost:300"
4) Edit Permissions ... click right on you site....
   - Add user IUSR : Full control
   - Add user IIS_USRS : Full control
   
