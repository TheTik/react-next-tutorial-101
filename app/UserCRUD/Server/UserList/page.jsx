import React from 'react'
import Link from 'next/link'
import { revalidatePath } from "next/cache";

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

    const users = await getUsers();
    //console.log("Users : ", users);

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