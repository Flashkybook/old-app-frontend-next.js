import { useDispatch, useSelector } from 'react-redux'
import { set_current} from '../../redux/actions/wordbook'
import LayoutInterface from '../LayoutInterface'
export default function Review() {

  const dispatch = useDispatch()
  const setCurrent = (e) => { dispatch(set_current(e)) }
  const current = useSelector(e => e.user_book.current)
  const cards = useSelector(e => e.user_book.cards)

  return (
    <LayoutInterface>
      {/* BUTTONS FlashCards */}
      <div className='flex justify-center text-2xl mt-2'>
        {/* PREVIUS */}
        <button onClick={() => setCurrent(-1)}>⬅</button>
        <div className='mx-4'> {current + 1}/{cards.length}  </div>
        {/* NEXT */}
        <button onClick={() => dispatch(set_current(1))}>➡</button>
      </div>

    </LayoutInterface>
  )
}
