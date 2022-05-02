import { useEffect } from 'react'
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
export default function Interface({ children, gameTitle, review, feedback }) {

    const dispatch = useDispatch()
    useEffect(() => {
        const getbook = (e)=>{
            dispatch(get_book(e))
        }
        const if_no_review = !review
        getbook(if_no_review)
    }, [dispatch])

    const current = useSelector(e => e.user_book.current)

    const all_cards = useSelector(e => e.user_book.cards)
    const cards_session = useSelector(e => e.user_book.cards_session)

    const type_of_session = useSelector(e => e.user_book.type_of_session)
    // sessiond de estudio
    const session_study = useSelector(e => e.user_book.session_study)
    const cards = session_study ? cards_session  : all_cards

    // progres bar
    var act = current + 1
    const taj = 0
    if (cards.length > 0) {

        const taj = (act / cards.length) * 100
    }



    return (
        <div className='mx-2'>
            <h1 className='text-center mt-16 text-5xl font-bold underline-offset-2 underline '>{gameTitle}</h1>

            <div className='flex flex-col md:flex-row md:items-start md:space-x-16 md:mx-24 justify-center items-center mt-8'>


                <GameList />

                {/* FlashCards */}
                <div className='w-full md:w-2/3 md:mx-10 flex flex-col items-center '>
                    {feedback === false &&
                        <>
                            <div className='w-full my-5'>
                                <div className='flex justify-between mb-1'>
                                    {type_of_session ?
                                        <span className='text-base font-medium text-blue-700 dark:text-white'>{type_of_session} session</span>
                                        :
                                        <span className='text-base font-medium text-blue-700 dark:text-white'>Review session</span>
                                    }

                                    <span className='text-sm font-medium text-blue-700 dark:text-white'>{taj.toFixed(2)}%</span>
                                </div>

                                <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
                                    <div className='bg-blue-600 h-2.5 rounded-full' style={{ width: `${taj}%` }}></div>
                                </div>
                            </div>
                            <FlashCards current={cards[current]} />
                        </>
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

Interface.defaultProps = {
    gameTitle: 'Game title',
    review: false,
    feedback: false
}