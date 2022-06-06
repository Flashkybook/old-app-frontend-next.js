import { useEffect, useState, Fragment, useMemo} from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'

const backend_api = process.env.backend_api



/**
 * @returns  Give audio and current flash card
 */
export default function FlashCards({ current_card, gameType }) {

  const session_cards_completed = useSelector(e => e.user_book.session_cards_completed)
  const current_num = useSelector(e => e.user_book.current)

  const audio_data = new Audio(`${backend_api}/api/words/gttsApi/${current_card.terms.word}`)


  const playSond = () => {
    audio_data.currentTime = 0
    setTimeout(() => {
      audio_data.play()
    }, 500);
  }


  useEffect(() => {
    if (gameType === "Listening" && session_cards_completed.length > 0 || current_num > 0) {
      setTimeout(() => {
        playSond()
      }, 1000);
    }

  }, [current_num])


  return (
    <div className='w-full flex flex-col justify-end items-center ' >
      {/* 
      <form onSubmit={(e)=>(getTranslate(e.target.trans.value), e.preventDefault())} action="">
        <input className='bg-gray-900' autoComplete='off' type="text" name="trans" id="" />
      </form> */}

      <div className='flex flex-col justify-end  items-center  font-bold my-2 mt-5'>

        {/* WORD */}
        <button onClick={() => playSond()}>
          <i>
              <Image width={100} height={100} alt={`${current_card.terms.word}`} src="data:image/png;base64,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" />
              {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEEklEQVRoge2ZTY8VRRSGn5nLvQPjJBowMmJUXKhEjUQiEZmNBDbqwhgXunDAjfIDQGcpsAEi/AQJbNwoIBCiBDDxA5Xo0iiJGL8YRIVBgcQZEu9lcU6lmnP7o6qn7/SQzJt0eubUqar37epz6nRdmMMcbkk0gLeBC8B/wD5gfq2MSqAFHAI65tpZJ6lYDABHEOKXgGeAp/X/32rkFYUB4ChC+iLwhNobavu/Jl5RaAGHEcITwJOm3b1esxrzgY8Ron8Dy1N8rJAp9f0G2Au8BtzVW5r5WAAcQ0j+BTye4WeF2ETQAa4DB5GYmlEsAI4riT+Bx3J8rZAmsgKrgM3A50gMOb+DwH3VU+7GIHBCJ70APFrgHxIji4F3kH2nA/wDvDQ9mvkYBD7Bi3gkoE9MsN+PrEgHaANvleBYiEHgJOEr4RCbtfqAMfzrVqmYIeBTHfg8sCyirxVyDTiDPPkNwB0Z/V5FVqVNRa/ZEPCZkhkHHo7sX5S1JpCnnlaPbcHHTG4CaCF10PmUCex1DngoUkSakNuQFX0dnzQ6wNfA3aZvH/Chth/Im2RHgIAO8DvwYAkRaUIs1gA/qs+vdItZCkxq+6qsQcbVYXVG+8/absuOGIQE+0JkP+kAXyG1WxK7KFiVokna2t5XQCQPoVlrEXBWfTebtmEki10H7iwzSRUFnx3jKpLGn0/xXYNPADabfaFt68sQ7YWQZOxtS/F3e9UGY39T7XvKEO2FkCXIhjel9ueM/xtq32/sq9V+ugzRXghxGFP7CWNfpvYzxr4YX6QGTxLaHoKsMYbVfsXYh9R+1dgH1D7pDP3TJFYVGnpvG3t/hr0Ls0XIqN6/NfZ79P6Hsbss9m/aYLMh2J81/htJD/YRTLDPmyax6WI88fc24CPT/rLeDxm7qz6+Sxu0jhW5gmQquxIAa/Eb4u2m7ZS2jdpOIUTdx00jx6cIMSXKT+q7ybS5EmWKjBLFFY0jGYO72mddAJEshAhZhC9BvqS7aNxNQdG4PTFR3nUJWBGrQFEkZC1+JX5Bnn4SD+DL+KeyBmkhYtzK9EKMFTKEHFpsxB9kuJWwIvrwp5g2i0VjHvA+5cXkFY0usDfR/ToBbFWfy8C9kfOmogl8QDkxaWX8D8gTXk93dnIYxR8+vBjJNxcN4D38E1oZ2C82hdvjIPuRVQmayJOMWZkYIUvxMdFGvkF6hlgxIUKGkRTrstNlKn6dstBEcnqIGCtkAPm2GEHOs05x8yH2fioK7FCEiinKWh1kxz5Azj7RazTxh85ZYqyQSeT3lNPAu0h2Si07ZhpJMWnZrIrCc8bQwh9tJlfGfbZO1cSrFJK/sU8ALwCv6P/f18irFFr41yx5jdVJqiz6kdrpLPKD0G7q/yqdwxxicAOvc6CoQubfkwAAAABJRU5ErkJggg==" /> */}
          </i>
        </button>
        {current_card.terms.word && <>
          {gameType === "Listening" ? "" :
            <div className='text-5xl my-5 text-center'>
              {current_card.terms.word.split(" ").map((e, i) => (
                <Fragment key={i} >
                  <span className='hover:underline hover:cursor-pointer'>
                    {e}
                  </span>
                  {" "}
                </Fragment>
              ))}
            </div>
          }
        </>
        }
        <div className='text-xl font-bold mt-2'>
          {/* <span>traduccion</span> */}

        </div>
        <div className='flex text-sm font-bold'>
          <div className='m-2'></div>
          <div className='m-2'></div>
        </div>

      </div>

    </div >
  )
}

