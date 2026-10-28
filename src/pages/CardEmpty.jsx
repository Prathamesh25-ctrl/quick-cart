import React from 'react'

function CardEmpty() {
  return (
    <div>
        <h2 className='text-black font-bold '>
            Your cart is empty
        </h2>
        <button className='bg-red-400 text-white font-bold p-4'>
            Shop Now 
        </button>
    </div>
  )
}

export default CardEmpty