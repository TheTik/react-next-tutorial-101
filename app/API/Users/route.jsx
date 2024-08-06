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