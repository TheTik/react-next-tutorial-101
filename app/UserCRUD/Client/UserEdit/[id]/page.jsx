"use client"

import React, { useState, useEffect } from 'react'

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

    const id = params.id;

    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });

    const getUserById = async (id) => {
        try {
            const response = await getUser(id);
            setUser(response);
        } catch (error) { console.log('error', error); }
    }

    useEffect(() => {
        getUserById(id);
    }, [id]);

    const handleChange = (e) => {
        //console.log([e.target.name],e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const result = await updateUser(user);        
        if (typeof (result) !== 'undefined') {
            alert("Data has been save..");
        }
    };

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
            {/* {message && <div className={isError ? "text-red-500" : "text-green-500"}>{message}</div>} */}

            <br />
            <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">
                Save
            </button>
        </div>
    )
}

export default page