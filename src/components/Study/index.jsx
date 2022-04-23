import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book } from '../../redux/actions/wordbook'
import WordBook from './WordBook'
import FlashCards from './FlashCards'
import Games from './Games'

export default function index() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_book())
    }, [dispatch])
    const user_book = useSelector(e => e.book.user_book)


    const [current, setCurrent] = useState(0)



    const handlerSubmit = e => {
        // tiene que darle estilo para saber si es correcto
        // saber si es correcta la respuesta
        const currentWord = user_book[current].dictionary.word.toLocaleLowerCase()
        
        const answer = e.target.answer.value.toLocaleLowerCase()
        
        if (answer === currentWord) {
            e.target.answer.classList.add("border-teal-500")
            // tiene que pasar a la siguiente targeta si es correcto
            setCurrent(current + 1)
            e.target.reset()

            // bucle de repeticion
            if (current +1 >= user_book.length) {
                setCurrent(0)
                console.log(current +1 >= user_book.length)
            }
        } else {
            console.log("respuesta incorrecta")
            e.target.answer.classList.add("border-teal-500")
            e.target.answer.classList.replace("border-teal-500", "border-red-500")
        }

        e.preventDefault()


    }

    return (
        <div className='mx-2'>
            <div className='container-stretch space-x-5'>

                <Games />

                {/* FlashCards */}

                <div className='w-1/2 flex flex-col items-center '>
                    <FlashCards current={user_book[current]} />

                    {/* Answer  */}
                    <form action="" onSubmit={handlerSubmit} >
                        <input className='py-2 px-4 outline-none bg-slate-800 rounded-3xl border text-center' name='answer' type="text" placeholder='answer...' />
                    </form>

                    {/* BUTTONS FlashCards */}
                    <div className='flex justify-center text-2xl mt-2'>

                        {/* PREVIUS */}
                        <div>⬅</div>

                        <div className='mx-4'> {current + 1}/{user_book.length}  </div>

                        {/* NEXT */}
                        <div>➡</div>

                    </div>
                </div>




                {/* wordbook LIST */}
                <div className='w-1/5 border border-white flex flex-col justify-center  rounded-xl' >
                    <span>
                        user book list
                    </span>
                    <div>
                        <ul className='flex flex-col'>
                            {user_book && user_book.map((e, i) =>(
                                 <li key={e.id} >{e.dictionary.word} {e.nivel}</li>
                                 ))}
                        </ul>
                    </div>
                </div>


            </div>



        </div>
    )
}
