
import React from 'react'
import Link from 'next/link'

export default function GameList(){
  return (
    <div className='mt-4 w-full md:w-1/5 rounded-xl'>
      <ul className='py-2 flex md:flex-col justify-around'>

        <li className='text-xl font-bold px-2'>
        Games :
        </li>
        <Link href="/study">
          <li className='px-2 border rounded-md bg-slate-900'>
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
