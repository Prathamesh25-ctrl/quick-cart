import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='flex justify-center text-center items-center flex-col gap-4 px-4 py-6'>
        <h1>PageNotFound 404</h1>
        <Link to={"/"} className='bg-blue-600 p-4'> Back To home </Link>
    </div>
  )
}

export default PageNotFound