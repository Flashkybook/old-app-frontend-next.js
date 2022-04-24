import React from 'react'
import Form from './Form'
const FlashCards = ({ current }) => {


  return (
    <div className='w-full border border-white flex flex-col justify-end items-center pb-4 pt-16 bg-slate-700 rounded-3xl' >

      <div className='flex flex-col justify-end  items-center  font-bold my-2'>

        {/* WORD */}
        {current &&
          < span className='text-5xl my-5 text-center'>
            {current.terms.word}
          </span>
        }

        <div className='text-xl font-bold mt-2'>
          Translate
        </div>
        <div className='flex text-sm font-bold'>
          <div className='m-2'>Sinonimo01</div>
          <div className='m-2'>Sinonimo01</div>
        </div>

      </div>

    </div >
  )
}

export default FlashCards