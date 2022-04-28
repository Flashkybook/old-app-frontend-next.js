import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book } from '../redux/actions/wordbook'
import FlashCards from './Study/FlashCards'
import FormAddWord from './Study/FormAddWord'
import GameList from './Study/GameList'
import WordBook from './Study/WordBook'
import SessionCards from './Study/SessionCards'


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

    // sessiond de estudio
    const session_study = useSelector(e => e.user_book.session_study)
    const cards = session_study ? useSelector(e => e.user_book.cards_session) : useSelector(e => e.user_book.cards)


    return (
        <div className='mx-2'>
            <h1 className='text-center mt-16 text-5xl font-bold underline-offset-2 underline '>{gameTitle}</h1>
            <div className='container-stretch space-x-5'>

                <GameList />
                {/* FlashCards */}
                <div className='w-1/2 flex flex-col items-center '>

                    <div>
                        {feedback === false &&
                            <FlashCards current={cards[current]} />
                        }
                        {children}
                    </div>


                </div>


                {/* wordbook LIST */}
                <SessionCards cards={cards} />

            </div>
            <FormAddWord />

            {/* mostrar all cards */}
            <WordBook all_cards={all_cards} />
        </div>
    )
}

index.defaultProps = {
    gameTitle: "Game title",
    review: false,
    feedback: false
}