
import React from 'react'
import Link from 'next/link'

const GameList = () => {
  return (
    <div className='w-1/5 border border-white rounded-xl'>

      <h2>GameList </h2>

      <ul className=' mt-5 flex flex-col'>
        <Link href="/study">
          <li className=''>
            Review
          </li>
        </Link>
        <Link href="/study/input">
          <li className=''>
            input
          </li>
        </Link>

      </ul>
    </div>
  )
}

export default GameList