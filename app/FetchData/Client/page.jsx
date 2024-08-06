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