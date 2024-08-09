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
    //console.log("Email : ", email);
    //console.log("Password : ", password);

    // [Step 6]
    const users = await getUsers();
    //console.log(users);

    const user = users.filter((f) => {
        if ((f.email === email) && (f.phoneNumber == password)) {
            return f;
        }
    });
    //console.log("user : ", user);

    if (user.length > 0) {
        return { message: 'Login Successful.' }
    } else {
        return { message: 'User name or password incorrect. !' }
    }
}

// [Step 4]
export default login