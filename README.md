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
2) Crate Web Template example.
---------------------------------------------------------------------------------------------------
2.1) Create "HeaderPage.jsx" on "app\Components\WebTemplate\HeaderPage.jsx"
***************************************************************************************************
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
3) Nesting Layouts
---------------------------------------------------------------------------------------------------
3.1) Create layout.jsx
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
4) Dynamic Routes
---------------------------------------------------------------------------------------------------
4.1.1) A Dynamic Segment can be created by wrapping a folder's name 
in square brackets: [folderName]. For example, [id] or [name].

- Create folder and file by "app/User/[id]/[name]/page.jsx"
***************************************************************************************************
import React from 'react'

const page = ({ params }) => {
  return (
    <div>
      Id: {params.Id} <br />
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

- Create folder and file by "app/Users/[...AllUser]/page.jsx"
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

4...2) Test show all users result : http://localhost:3000/Users/AppDev1/AppDev2/AppDev3

Header Page
.............................
AppDev1
AppDev2
AppDev3
.............................
Footer Page

---------------------------------------------------------------------------------------------------