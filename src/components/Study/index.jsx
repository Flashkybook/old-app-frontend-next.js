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

    return (
        <div className='mx-2'>
            <div className='container-stretch space-x-5'>

                <Games />

                {/* FlashCards */}

                <div className='w-1/2 flex flex-col items-center '>
                    <FlashCards current={user_book[current]}/>

                    {/* BUTTONS FlashCards */}
                    <div className='flex justify-center text-2xl mt-2'>
                        <div>
                            ⬅
                        </div>
                        <div className='mx-4'> {current + 1 }/{user_book.lenthg}  </div>
                        <div>
                            ➡
                        </div>
                    </div>
                </div>




                {/* LIST */}
                <div className='w-1/5 border border-white flex flex-col justify-center  rounded-xl' >
                    <span>
                        user book list
                    </span>
                    <div>
                        <ul className='flex flex-col'>
                            {user_book && user_book.map((e, i) => 
                            <>
                                <li key={e.id}>{e.word.word} {e.nivel}</li>
                            </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>



        </div>
    )
}
