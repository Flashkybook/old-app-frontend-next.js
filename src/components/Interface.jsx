import { useEffect, useState, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book, set_current } from '../redux/actions/wordbook'

import { useRouter } from 'next/router'

// components
import FormAddWord from './Study/FormAddWord'
import GameList from './Study/GameList'
import UserBookList from './Study/UserBookList'
import DailyTodo from './Study/DailyTodo'
import Loading from './Loading'

const FlashCards = lazy(() => import('./Games/FlashCards'))

export default function Interface({ children, study_session, gameTitle }) {
    const dispatch = useDispatch()
    const session_study = useSelector(e => e.user_book.session_study)

    useEffect(() => {
        /**get user_book or session_study if review is false */
        const getbook = (e) => {
            dispatch(get_book(e))
        }
        /* activar 1 ves en secion de estudio
        no activar en review ni en 
        */
        if (study_session) {
            getbook(true)
        } else {
            getbook(false)
        }
    }, [])


    // redux state
    const current = useSelector(e => e.user_book.current)
    const all_cards = useSelector(e => e.user_book.cards)
    const session_cards = useSelector(e => e.user_book.session_cards)
    const type_of_session = useSelector(e => e.user_book.type_of_session)
    const user = useSelector(e => e.auth.user)


    const cards = session_study ? session_cards : all_cards

    const router = useRouter()

    const setCurrent = (e) => { dispatch(set_current(e)) }

    // progres bar
    const [taje, setTaje] = useState(0)
    useEffect(() => {
        let act = current + 1
        if (cards.length > 0) {
            setTaje((act / cards.length) * 100)
        }
        if (cards.length > 0 && act > cards.length) {
            setCurrent(0)
            router.push('/study/feedback')
        }
        if (user === null) {
            router.push('/user/login')
        }
    })

    return (
        <div className='mx-2'>

            <h1 className='text-center mt-16 text-5xl font-bold underline-offset-2 underline '>{gameTitle}</h1>

            <div className="md:flex items-start">

                <div className='md:w-[20%]'>
                    <div className="card">
                        <GameList />
                    </div>

                    {gameTitle !== 'Review' &&
                        <div className='card w-auto my-5'>
                            <span className='text-base font-medium text-blue-700 dark:text-white'>{type_of_session} session</span>


                            {/* PROGRES BAR */}
                            <div className='w-full rounded-full bg-gray-200 h-2.5 dark:bg-gray-700'>
                                <div className='rounded-full bg-blue-600 h-2.5 flex justify-center items-center' style={{ width: `${taje}%` }}>
                                    <span className='text-[10px] text-center font-medium text-blue-700 dark:text-white'>{taje.toFixed(2)}%</span>
                                </div>
                            </div>

                        </div>
                    }
                </div>
                {/* FlashCards */}

                <div className='w-full'>

                    <div className='card'>
                        {gameTitle !== "feedback" &&
                            cards.length > 0 &&
                            <Suspense fallback={<Loading />}>
                                <FlashCards current_card={cards[current]} gameType={gameTitle} />
                            </Suspense>
                        }

                        {/* Input */}
                        {children}
                    </div>
                </div>

                <div className="card md:w-[20%]">
                    <DailyTodo cards={all_cards} />
                </div>



            </div>

            <div className="flex justify-center">

                <div className="card w-[70%]">
                    <FormAddWord />

                </div>
            </div>

            {/* mostrar all cards */}
            <div className="card">
                <UserBookList />
            </div>
        </div>
    )
}

Interface.defaultProps = {
    gameTitle: 'Game title',
}