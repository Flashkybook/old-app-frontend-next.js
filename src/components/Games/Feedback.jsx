import { useDispatch, useSelector } from 'react-redux'
import { set_current } from '../../redux/actions/wordbook'
import Interface from '../Interface'
import { set_session_study } from '../../redux/actions/wordbook'
import { useRouter } from 'next/router'

export default function Feedback() {
  const dispatch = useDispatch()
  const setCurrent = (e) => { dispatch(set_current(e)) }

  const current = useSelector(e => e.user_book.current)
  const cards = useSelector(e => e.user_book.cards)
  const cards_session = useSelector(e => e.user_book.cards_session)




  const router = useRouter()
  const setResetSesion = () => {

    dispatch(set_session_study(false))
    router.push("/study/")
  }




  return (
    <Interface gameTitle="feedback" review={false} feedback={true}>
      <div className='w-full flex flex-col justify-center mt-4' >
        <span className="text-center text-2xl font-bold underline my-2">
          user book list
        </span>

        <div className="border border-gray-700 p-5 flex ">
          <ul className='flex flex-col space-y-2 w-full mx-auto'>

            {cards && cards.map((e, i) => (
              <li className="border p-2 flex justify-between" key={i}>
                <div>
                  {e.terms.word}
                  <span className="px-2">
                    {(e.easiness / 5)}
                  </span>
                </div>
                <div>
                </div>
                <div>
                  {e.last_review === "2022-04-29" ?
                    <i>✅</i> : <i>➡</i>
                  }
                </div>
              </li>
            ))}
          </ul>

          <ul className='flex flex-col space-y-2 w-full mx-auto'>

            {cards_session.map((e, i) => (
              <li className="border p-2 flex justify-between" key={i}>
                <div>
                  {e.terms.word}
                  <span className="px-2">
                    {(e.easiness / 5)}
                  </span>
                </div>
                <div>
                </div>
                <div>
                  {e.last_review === "2022-04-29" ?
                    <i>✅</i> : <i>➡</i>
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </Interface>
  )
}
