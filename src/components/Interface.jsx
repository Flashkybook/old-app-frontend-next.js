import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book } from '../redux/actions/wordbook'
import FlashCards from './Study/FlashCards'
import FormAddWord from './Study/FormAddWord'
import GameList from './Study/GameList'
import UserBookList from './Study/UserBookList'
import DailyTodo from './Study/DailyTodo'


/**
 *  session de estudio vs review
 * si session is true se crea una nueva ssion y se muestran solo las cartas de session
 * si no se muestran todas las cartas
 */
export default function index({ children, gameTitle, review, feedback }) {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("review", review)
        dispatch(get_book(!review))
    }, [])

    const all_cards = useSelector(e => e.user_book.cards)
    const current = useSelector(e => e.user_book.current)
    const type_of_session = useSelector(e => e.user_book.type_of_session)


    // sessiond de estudio
    const session_study = useSelector(e => e.user_book.session_study)
    const cards = session_study ? useSelector(e => e.user_book.cards_session) : useSelector(e => e.user_book.cards)


    return (
        <div className='mx-2'>
            <h1 className='text-center mt-16 text-5xl font-bold underline-offset-2 underline '>{gameTitle}</h1>
            
                {type_of_session && <h6 className='text-center my-5'>{type_of_session} session</h6>}


            <div className='flex flex-col md:flex-row md:items-start md:space-x-3 justify-center items-center mt-8'>
            
                <GameList />

                {/* FlashCards */}
                <div className='w-full flex flex-col items-center '>
                    {feedback === false &&
                        <FlashCards current={cards[current]} />
                    }
                    {children}
                </div>


                {/* wordbook LIST */}
                <DailyTodo cards={all_cards} />

            </div>
            <FormAddWord />

            {/* mostrar all cards */}
            <UserBookList all_cards={all_cards} />
        </div>
    )
}

index.defaultProps = {
    gameTitle: "Game title",
    review: false,
    feedback: false
}