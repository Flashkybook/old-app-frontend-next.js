
import React from 'react'
import Link from 'next/link'

export default function GameList() {
  const links = [
    { url: "/study", name: "Review" },
    // {url:"/study/input", name: "input" }, 
    { url: "/study/listening/", name: "listening" },
  ]

  return (
    <>

      <h3 className='text-center underline font-bold text-xl'>Study Mode:</h3>

      <div className='flex flex-col mt-2'>

      {links.map((e, index) => (
        <Link key={index} href={e.url}>
          <a className='button-primary-2 my-2 mx-2 md:mx-0 text-center'>
              {e.name}
          </a>
        </Link>
      ))}
      </div>


    </>
  )


}

