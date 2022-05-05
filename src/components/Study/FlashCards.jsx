import React, { useEffect, useState } from 'react'



export default function FlashCards({ current }) {


  const [url, setUrl]= useState()
  /**
   * toma la palabra actual
   * la manda al backend para crear un audio text to speesh
   * si el audio ya existe no lo crea solo lo obtiene
   * 
   * falta
   * tomar la url una ves la respuesta sea exitosa, 
   * tomar la url y colocar en un botton de audio
   * colocar la url en un parametro del redux
   * que el redux sea el disparador de si existe o no el archivo
   * intentar guardar el archivo de audio en el localstorage
   */
  useEffect(() => {
    const getgTTS = async (data) => {
      try {
        const res = await fetch('http://localhost:3000/api/01/wordbook/gtts/', {
          method: 'POST',
          headers: {
            'Action': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const url = await res.json()
        setUrl(url.success)

      } catch (error) {
        console.log(error)
      }
    }
    getgTTS(current.terms.word)
  }, [current])


  const playSond = () => {
    console.log(url)
    const audio_data = new Audio(url)
    audio_data.play()
  }


  return (
    <div className='w-full border border-white flex flex-col justify-end items-center pb-4 pt-16 bg-slate-700 rounded-3xl' >

      <div className='flex flex-col justify-end  items-center  font-bold my-2'>

        {/* WORD */}
        <button onClick={playSond}>

          <i>🔊</i>
        </button>
        < span className='text-5xl my-5 text-center'>
          {current.terms.word}
        </span>


        <div className='text-xl font-bold mt-2'>

        </div>
        <div className='flex text-sm font-bold'>
          <div className='m-2'></div>
          <div className='m-2'></div>
        </div>

      </div>

    </div >
  )
}

