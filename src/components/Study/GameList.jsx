
import React from 'react'
import Link from 'next/link'

export default function GameList() {
  const links = [
    {url:"/study", name: "study" }, 
    // {url:"/study/input", name: "input" }, 
    {url:"/study/listening", name: "listeing" }, 
   ]

  return (
    <div className='mt-4 w-full rounded-xl'>
      <ul className='py-2 flex md:flex-col justify-around'>

        <li className='text-xl font-bold px-2'>
          Games :
        </li>

        {links.map((e, index)=> (

        <Link key={index} href={e.url}>
          <a >
            <button className='w-full px-2 my-4 border rounded-md bg-slate-900'>
              {e.name}
            </button>
          </a>
        </Link>
        ))}
       

      </ul>
    </div>
  )
}

