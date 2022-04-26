import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_current, current_session, new_study_session } from '../../redux/actions/wordbook'
import Interface from '../Interface'

/**tareas, se tiene que repetir las respuestas fallidas hasta que se acepte o se responda bien, 
// guarda el numero de fails
// inicia una sesion de estudios
// guardar la current_sesion
*/

/**
 * 
 * @returns Game de input
 */
export default function Input() {

  const dispatch = useDispatch()
  const setCurrent = (e) => { dispatch(set_current(e)) }

  const cards = useSelector(e => e.user_book.session)
  const current = useSelector(e => e.user_book.current)
  // const [fails, setFails] = useState(0)

  /**
   * @param {respuesta} e respuesta del formulario
   * obtiene la respuesta del formulario
   */
  const handlerSubmit = e => {
    const currentWord = cards[current].terms.word.toLocaleLowerCase()
    const answer = e.target.answer.value.toLocaleLowerCase()
    const card = cards[current]
    card.easiness = 5

    if (answer === currentWord) {
      // espera
      e.target.answer.classList.remove("border-red-500")
      e.target.answer.classList.add("border-teal-500")

      setTimeout(() => {
        // tiene que pasar a la siguiente targeta si es correcto
        setCurrent(+1)
        // e.target.reset()
        e.target.answer.classList.replace("border-teal-500", "border-white")
        dispatch(current_session(card))
        console.log(card)
      }, 500);
      if (current >= cards.length) {
        setCurrent(0)
      }
    } else {
      console.log("respuesta incorrecta")
      e.target.answer.classList.remove("border-teal-500")
      e.target.answer.classList.add("border-red-500")
      if (card.easiness >= 0) {
        card.easiness = card.easiness - 1
      }

    }
    e.preventDefault()
  }

  useEffect(() => {
    if (current >= cards.length) {
      setCurrent(0)
    }

  }, [current])

  // useEffect(() => {
  //   dispatch(get_book())
  //   dispatch(new_study_session()) 
  // }, [dispatch])

  return (
    <Interface gameTitle="Input" new_session={true}>
      <form action="" onSubmit={handlerSubmit} >
        <input autoComplete='off' className='py-2 px-4 outline-none bg-slate-800 rounded-3xl border text-center' name='answer' type="text" placeholder='answer...' />
      </form>
    </Interface>
  )
}
