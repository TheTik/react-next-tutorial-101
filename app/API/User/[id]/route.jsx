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