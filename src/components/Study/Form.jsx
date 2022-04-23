import React from 'react'

export default function Form() {
  return (
    <div className='mt-16 w-full'>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="my-2">Add new word</div>
        <form action="" className='w-full flex justify-center'>

          <input className='
            bg-gray-900 text-gray-200 border border-gray-800
             px-6 py-4 mx-2 rounded-md text-3xl text-center ' type="text" placeholder='New word ..' />
             
          <button className='bg-slate-900 px-2 mx-2' type="submit"> add</button>

        </form>

      </div>



    </div>
  )
}
