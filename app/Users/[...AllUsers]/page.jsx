"use client"

const AllUsers = ({ params }) => {
  return (
    <div>
      <ul>
        {params.AllUsers.map(item => (
          <li key={item}>{item}</li>
        )
        )}
      </ul>
    </div>
  )
}

export default AllUsers