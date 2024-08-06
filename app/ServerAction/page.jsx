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