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