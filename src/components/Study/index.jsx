import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book, set_current } from '../../redux/actions/wordbook'
import FlashCards from './FlashCards'
import Form from './Form'
import Games from './Games'
import WordBook from './WordBook'

export default function index() {
    const dispatch = useDispatch()

    const getbook = () => {dispatch(get_book())}
    const setCurrent = (e) => {dispatch(set_current(e))}

    useEffect(() => {
        getbook()
    }, [dispatch])
    const user_book = useSelector(e => e.book.user_book)
    const current = useSelector(e => e.book.current)


    // const [current, setCurrent] = useState(0)


    const handlerSubmit = e => {
        // tiene que darle estilo para saber si es correcto
        // saber si es correcta la respuesta
        const currentWord = user_book[current].terms.word.toLocaleLowerCase()
        const answer = e.target.answer.value.toLocaleLowerCase()
        if (answer === currentWord ) {
            // espera
            e.target.answer.classList.remove("border-red-500")
            e.target.answer.classList.add("border-teal-500")
            setTimeout(() => {
                // tiene que pasar a la siguiente targeta si es correcto
                setCurrent(+1)
                e.target.reset()
                e.target.answer.classList.replace("border-teal-500", "border-white")
            }, 500);

            if (current >= user_book.length) {
                setCurrent(0)
            }
    
        } else {
            console.log("respuesta incorrecta")
            e.target.answer.classList.remove("border-teal-500")
            e.target.answer.classList.add("border-red-500")
        }
        e.preventDefault()
    }


    useEffect(() => {

        // bucle de repeticion
        if (current >= user_book.length ) {
            setCurrent(0)
        }
        

    }, [current])


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
                        <button onClick={() => setCurrent(-1)}>⬅</button>
                        <div className='mx-4'> {current+1}/{user_book.length}  </div>
                        {/* NEXT */}
                        <button onClick={() => dispatch(set_current(1))}>➡</button>
                    </div>

                    <Form/>
                </div>




                {/* wordbook LIST */}
                <WordBook user_book={user_book} />
                

            </div>



        </div>
    )
}
