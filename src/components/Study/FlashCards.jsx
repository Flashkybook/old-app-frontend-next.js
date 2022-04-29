import React, { useState } from 'react'
const FlashCards = ({ current }) => {

  const [audio, setAudio] = useState("send this data")

  const handlerOnCLick = async() => {
    const res = await fetch("http://localhost:3000/api/01/wordbook/gtts/", {
      method: "POST",
      headers: {
        "Action": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(audio)
    })
    const data = await res.json()
    console.log(data)
  }


  return (
    <div className='w-full border border-white flex flex-col justify-end items-center pb-4 pt-16 bg-slate-700 rounded-3xl' >
        <button onClick={handlerOnCLick} className="text-2xl text-center mt-16 border p-2 mx-auto">hello</button>

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