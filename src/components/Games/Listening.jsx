import { useDispatch, useSelector } from 'react-redux'
import { set_current, current_session } from '../../redux/actions/wordbook'
import Interface from '../Interface'
import { useRouter } from 'next/router'


export default function Listening() {

  const dispatch = useDispatch()
  const setCurrent = (e) => { dispatch(set_current(e)) }

  const cards = useSelector(e => e.user_book.cards_session)
  const current = useSelector(e => e.user_book.current)

  // session de estudio
  const router = useRouter()
  const handlerSubmit = e => {
    const currentWord = cards[current].terms.word.toLocaleLowerCase()
    const answer = e.target.answer.value.toLocaleLowerCase()
    const card = cards[current]
    card.easiness = 5
    if (answer === currentWord) {
      // espera
      e.target.answer.classList.remove('border-red-500', 'border-white')
      e.target.answer.classList.add('border-teal-500')
      setTimeout(() => {
        setCurrent(+1) // next card
        e.target.reset()  // reset input
        e.target.answer.classList.replace('border-teal-500', 'border-white') // success style
        dispatch(current_session(card)) // add card sta to backend
      }, 500);
      if (current +1 >= cards.length) {
        router.push('/study/feedback')
      }
    } else {
      e.target.answer.classList.remove('border-teal-500', 'border-white')
      e.target.answer.classList.add('border-red-500')
      setTimeout(() => {
        e.target.answer.classList.replace('border-red-500', 'border-white') // success style
      }, 1000);
      if (card.easiness >= 0) {
        card.easiness = card.easiness - 1
      }
    }
    e.preventDefault()
  }
  return (
    <Interface gameTitle='Listening' >
      <form action='' onSubmit={handlerSubmit} >
        <input autoComplete='off' className='py-2 px-4 outline-none bg-slate-800 rounded-3xl border text-center' name='answer' type='text' placeholder='answer...' />
      </form>
    </Interface>
  )
}
