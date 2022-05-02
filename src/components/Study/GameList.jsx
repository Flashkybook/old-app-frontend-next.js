
import React from 'react'
import Link from 'next/link'

export default function GameList() {
  return (
    <div className='mt-4 w-full md:w-1/5 rounded-xl'>
      <ul className='py-2 flex md:flex-col justify-around'>

        <li className='text-xl font-bold px-2'>
          Games :
        </li>
        <Link href='/study'>
          <a >
            <button className='w-full px-2 my-4 border rounded-md bg-slate-900'>
              Review
            </button>
          </a>
        </Link>
        <Link href='/study/input'>
          <a >
            <button className='w-full px-2 my-4 border rounded-md bg-slate-900'>
              input
            </button>
          </a>
        </Link>

      </ul>
    </div>
  )
}
