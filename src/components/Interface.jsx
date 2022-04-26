import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {set_current, get_book, new_study_session } from '../redux/actions/wordbook'
import FlashCards from './Study/FlashCards'
import FormAddWord from './Study/FormAddWord'
import Games from './Games'
import WordBook from './Study/WordBook'
import SessionCards from './Study/SessionCards'


/**
 *  session de estudio vs review
 * si session is true se crea una nueva ssion y se muestran solo las cartas de session
 * si no se muestran todas las cartas
 */
export default function index({ children, gameTitle, new_session }) {
    
    const dispatch = useDispatch()
    const setCurrent = (e) => { dispatch(set_current(e)) }


    useEffect(() => {
      dispatch(get_book())
      dispatch(new_study_session()) 
    }, [dispatch])
  
    const all_cards = useSelector(e => e.user_book.cards)
    



    const cards = new_session ? useSelector(e => e.user_book.session) : useSelector(e => e.user_book.cards) 
    const current = useSelector(e => e.user_book.current)

    useEffect(() => {
        // bucle de repeticion
        if (current >= cards.length) {
            setCurrent(0)
        }
    }, [current])



    return (
        <div className='mx-2'>
            <h1 className='text-center mt-16 text-5xl font-bold underline-offset-2 underline '>{gameTitle}</h1>
            <div className='container-stretch space-x-5'>


                <Games />

                {/* FlashCards */}

                <div className='w-1/2 flex flex-col items-center '>
                    <FlashCards current={cards[current] } />
                    {/* AQUI SE REPRODUCEN CADA UNO DE LOS SISTEMAS DE JUEGO DENTRO DE ESTA INTERFACE */}                    
                    {children}
                </div>


                {/* wordbook LIST */}
                <SessionCards cards={cards}/>

            </div>
            <FormAddWord />

            {/* mostrar all cards */}
            <WordBook all_cards={all_cards} />
        </div>
    )
}


index.defaultProps = {
    gameTitle: "Game title",
    new_session: false
}