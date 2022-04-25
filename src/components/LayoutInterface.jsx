import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book} from '../redux/actions/wordbook'
import FlashCards from './Study/FlashCards'
import FormAddWord from './Study/FormAddWord'
import Games from './Games'
import WordBook from './Study/WordBook'

export default function index({children}) {

    const dispatch = useDispatch()
    const setCurrent = (e) => { dispatch(set_current(e)) }
    const getbook = () => { dispatch(get_book()) }

    useEffect(() => {
        getbook()
    }, [dispatch])
    const cards = useSelector(e => e.user_book.cards)
    const current = useSelector(e => e.user_book.current)

    return (
        <div className='mx-2'>
            <div className='container-stretch space-x-5'>

                <Games />

                {/* FlashCards */}

                <div className='w-1/2 flex flex-col items-center '>
                    <FlashCards current={cards[current]} />
    
                    {children}
                </div>


                {/* wordbook LIST */}
                <WordBook cards={cards} />

            </div>
            <FormAddWord />
        </div>
    )
}
