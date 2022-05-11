import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book, set_current } from '../redux/actions/wordbook'
import { useRouter } from 'next/router'
import FormAddWord from './Study/FormAddWord'
import GameList from './Study/GameList'
import UserBookList from './Study/UserBookList'
import DailyTodo from './Study/DailyTodo'



import { lazy, Suspense } from 'react'
const FlashCards = lazy(() => import('./Games/FlashCards'))
/**
 *  session de estudio vs review
 * si session is true se crea una nueva ssion y se muestran solo las cartas de session
 * si no se muestran todas las cartas
 */
export default function Interface({ children, study_session, gameTitle, review, feedback }) {

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

    }, [dispatch])

    const current = useSelector(e => e.user_book.current)
    const error = useSelector(e => e.user_book.error)
    const all_cards = useSelector(e => e.user_book.cards)
    const cards_session = useSelector(e => e.user_book.cards_session)
    const type_of_session = useSelector(e => e.user_book.type_of_session)

    const cards = session_study ? cards_session : all_cards




    const router = useRouter()

    const setCurrent = (e) => { dispatch(set_current(e)) }


    // progres bar
    const [taje, setTaje] = useState(0)
    useEffect(() => {
        const act = current + 1
        if (cards.length > 0) {
            setTaje((act / cards.length) * 100)
        }
        if (cards.length > 0 && act > cards.length) {
            setCurrent(0)
            router.push('/study/feedback')
        }
    })
    return (
        <div className='mx-2'>
            <h1 className='text-center mt-16 text-5xl font-bold underline-offset-2 underline '>{gameTitle}</h1>

            <div className='flex flex-col md:flex-row md:items-start md:space-x-16 md:mx-24 justify-center items-center mt-8'>

                <div className='flex flex-col mt-4 w-full md:w-1/5 rounded-xl   '>

                    <GameList />
                    {/* FlashCards */}

                    <div className='w-full my-5'>
                        <div className='flex justify-between mb-1'>
                            {type_of_session ?
                                <span className='text-base font-medium text-blue-700 dark:text-white'>{type_of_session} session</span>
                                :
                                <span className='text-base font-medium text-blue-700 dark:text-white'>Review session</span>
                            }

                        </div>

                        <div className='w-full bg-gray-200 h-2.5 dark:bg-gray-700'>
                            <div className='bg-blue-600 h-2.5 flex justify-center items-center' style={{ width: `${taje}%` }}>
                                <span className='text-[10px] font-medium text-blue-700 dark:text-white'>{taje.toFixed(2)}%</span>

                            </div>
                        </div>


                        <div className='w-full mt-12'>

                            {cards_session.map((e, i) => (
                                <div className='bg-gray-600 my-2 flex space-x-1'>
                                    <span>{e.terms.word}</span>
                                    <span className='text-red-500 font-bold'>{e.fails}</span>
                                    <span className='text-teal-500 font-bold'>{e.ready}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-2/3 md:mx-10 flex flex-col items-center pb-4 pt-16 border border-white  bg-slate-700 rounded-3xl'>


                    {feedback === false &&
                        <>

                            {cards.length > 0 &&
                                <Suspense fallback={<svg className="animate-spin h-20 w-20 mx-auto my-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>}>

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
            <UserBookList all_cards={all_cards} />
        </div>
    )
}

Interface.defaultProps = {
    gameTitle: 'Game title',
    review: false,
    feedback: false
}