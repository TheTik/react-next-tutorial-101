// [Step 1]
'use client'

// [Step 2] #rafce
import React from 'react'

// [Step 6]
import login from './action'

// [Step 4]
import { useFormState, useFormStatus } from 'react-dom'

const page = () => {

    // [Step 6]
    const initialState = {
        message: null,
    }

    // [Step 5]
    const [state, formAction] = useFormState(login, initialState) 
    // login is server function, matcher login : prevState

    // [Step 7]
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