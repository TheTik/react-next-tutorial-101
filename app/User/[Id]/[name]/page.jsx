"use client"

const page = ({ params }) => {
  return (
    <div>
      Id: {params.Id} <br />
      Name: {params.name}
    </div>
  )
}

export default page