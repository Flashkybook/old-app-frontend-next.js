import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {set_current, current_sesion } from '../../redux/actions/wordbook'
import LayoutInterface from '../LayoutInterface'


export default function Input() {
  const dispatch = useDispatch()
  const setCurrent = (e) => { dispatch(set_current(e)) }

  const cards = useSelector(e => e.user_book.cards)
  const current = useSelector(e => e.user_book.current)

  // const [current, setCurrent] = useState(0)
  const [fails, setFails] = useState(0)


  const handlerSubmit = e => {
    // tiene que darle estilo para saber si es correcto
    // saber si es correcta la respuesta
    const currentWord = cards[current].terms.word.toLocaleLowerCase()
    const answer = e.target.answer.value.toLocaleLowerCase()

    if (answer === currentWord) {
      // espera
      e.target.answer.classList.remove("border-red-500")
      e.target.answer.classList.add("border-teal-500")
      const card = cards[current]

      setTimeout(() => {
        // tiene que pasar a la siguiente targeta si es correcto
        setCurrent(+1)
        e.target.reset()
        setFails(0)
        e.target.answer.classList.replace("border-teal-500", "border-white")
        card.nivel = fails
        dispatch(current_sesion(card))
      }, 500);

      if (current >= cards.length) {
        setCurrent(0)
      }
    } else {
      console.log("respuesta incorrecta")
      e.target.answer.classList.remove("border-teal-500")
      e.target.answer.classList.add("border-red-500")
      if (fails < 5) {
        setFails(fails + 1)
      }
    }
    e.preventDefault()
  }


  useEffect(() => {
    // bucle de repeticion
    if (current >= cards.length) {
      setCurrent(0)
    }
  }, [current])

  return (
    <LayoutInterface>

      <form action="" onSubmit={handlerSubmit} >
        <input className='py-2 px-4 outline-none bg-slate-800 rounded-3xl border text-center' name='answer' type="text" placeholder='answer...' />
      </form>



    </LayoutInterface>
  )
}
