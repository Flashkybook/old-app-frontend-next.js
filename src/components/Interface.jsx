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
    const error = useSelector(e => e.user_book.error)
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
            <div className='flex flex-col md:flex-row md:items-start md:space-x-16 lg:mx-24 justify-center items-center mt-8'>
                <div className='flex flex-col mt-4 w-full md:w-1/5 rounded-xl   '>

                    <GameList />
                    {/* FlashCards */}

                    <div className='w-auto my-5'>
                        <div className='flex justify-between mb-1'>
                            {type_of_session &&
                                <span className='text-base font-medium text-blue-700 dark:text-white'>{type_of_session} session</span>

                            }

                        </div>

                        {gameTitle !== "feedback" &&
                            <div className='w-auto bg-gray-200 h-2.5 dark:bg-gray-700'>
                                <div className='bg-blue-600 h-2.5 flex justify-center items-center' style={{ width: `${taje}%` }}>
                                    <span className='text-[10px] font-medium text-blue-700 dark:text-white'>{taje.toFixed(2)}%</span>
                                </div>
                            </div>
                        }


                        {/* <div className='w-full mt-12'>

                            {session_cards.map((e, i) => (
                                <div key={i} className='bg-gray-600 my-2 flex space-x-1'>
                                    <span>{e.terms.word}</span>
                                    <span className='text-red-500 font-bold'>{e.fails}</span>
                                    <span className='text-teal-500 font-bold'>{e.ready}</span>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
                <div className='w-full md:mx-10 flex flex-col items-center pb-4 pt-16 border border-white  bg-slate-700 rounded-3xl'>

                    {gameTitle !==  "feedback"  &&
                        <>

                            {cards.length > 0 &&
                                <Suspense fallback={
                                    <Loading/>
                                }>
                                    <FlashCards current_card={cards[current]} gameType={gameTitle} />
                                </Suspense>
                            }
                        </>
                    }
                    {children}
                </div>


                {/* wordbook LIST */}
                <DailyTodo cards={all_cards} />

            </div>
            {error &&
                <h1 className='text-center mt-16 text-xl underline-offset-2 underline '>{error}</h1>
            }
            <FormAddWord />

            {/* mostrar all cards */}
            <UserBookList />
        </div>
    )
}

Interface.defaultProps = {
    gameTitle: 'Game title',
}