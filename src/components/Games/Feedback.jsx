import { useDispatch, useSelector } from 'react-redux'
import { set_current } from '../../redux/actions/wordbook'
import Interface from '../Interface'
import {set_session_study} from '../../redux/actions/wordbook'
import {useRouter} from 'next/router'

export default function Feedback() {
  const dispatch = useDispatch()
  const setCurrent = (e) => { dispatch(set_current(e)) }

  const current = useSelector(e => e.user_book.current)
  const cards = useSelector(e => e.user_book.cards)

  const router = useRouter()
  const setResetSesion = () => {
    
    dispatch(set_session_study(false))
    router.push("/study/")
  }




  return (
    <Interface gameTitle="feedback" review={false} feedback={true}>


      <div className='text-center flex flex-col items-center justify-center'>
        <span>vale por un feedback :)</span>
        <button onClick={() => setResetSesion()}
          className='border px-2'
        > comenzar nueva session de estudio</button>
      </div>

    </Interface>
  )
}
