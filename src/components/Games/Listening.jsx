import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_current, current_session } from '../../redux/actions/wordbook'
import Interface from '../Interface'
import { useRouter } from 'next/router'


export default function Listening() {

  const dispatch = useDispatch()
  // const setCurrent = (e) => { dispatch(set_current(e)) }
  const router = useRouter()

  const cards = useSelector(e => e.user_book.session_cards)
  const current = useSelector(e => e.user_book.current)

  // session de estudio
  const [wrongAnswer, setWrongAnswer] = useState()
  const [correctAnswer, setCorrectAnswer] = useState()

  useEffect(() => {
 
  }, [current])

  /**
   * crear una lista de completadas y faltantes
   * se esta mandando al final la palabra mal contestada[ esta bien]
   * el current deberia reiniciarse tras cada palabra, 
   * en session solo estan las palanbras no completadas
   * una ves compeltadas se borran de session y se agregan a feedback con sus nuevas estadisticas 
   */
  const handlerSubmit = e => {
    const answer = e.target.answer.value.toLocaleLowerCase()
    const currentWord = cards[current].terms.word.toLocaleLowerCase()
    const card = cards[current]

    setCorrectAnswer(currentWord)

    if (answer === currentWord) {
      // espera
      e.target.answer.classList.remove('border-red-500', 'border-white')
      e.target.answer.classList.add('border-teal-500')

      setTimeout(() => {
        // setCurrent(+1) // next card
        e.target.reset()  // reset input
        e.target.answer.classList.replace('border-teal-500', 'border-white') // success style

        // reset of feedback
        setWrongAnswer(false)
        setCorrectAnswer(false)

        // una ves aprovado si la palabra fue fallida 1 ves la volvemos a repetir y gana un punto de fail acumulativo para la siguiente ronda
        
        if (cards.fails) { 
          card.score = 5 - cards.fails
        }

        
        // fail exist true
        if (card.current_fail) { 
          card.current_fail = false
          dispatch(current_session(card, false))
        } else { //fail donot exist
          dispatch(current_session(card, true)) // add word sta to backend
          
          setTimeout(() => {
            if (cards.length === 0) {
              router.push("/study/feedback/")
            }
          }, 1000);

        }

      }, 500);

    } else {
      setWrongAnswer(answer)
      card.current_fail = true //disparador a ser enviada al final de la ronda
      e.target.answer.classList.remove('border-teal-500', 'border-white')
      e.target.answer.classList.add('border-red-500')
      setTimeout(() => {
        e.target.answer.classList.replace('border-red-500', 'border-white') // success style

      }, 1000);

      // if (card.easiness > 0) {
      //   card.easiness = card.easiness - 1
      // }
    }
    e.preventDefault()
  }



  return (
    <Interface gameTitle='Listening' study_session={true} >

      {wrongAnswer &&
        <div className='text-center'>
          <h3 className='text-4xl  text-teal-500'>{correctAnswer}</h3>
          <h3 className='text-4xl mb-12 text-red-500'>{wrongAnswer}</h3>
        </div>
      }


      <form className='w-full' onSubmit={handlerSubmit} >
        <input autoComplete='off' className='text-2xl py-2 px-4 outline-none bg-slate-800 w-full border text-center' name='answer' type='text' placeholder='Escribe lo que logras escuchar...' />
      </form>
    </Interface>
  )
}


// // str2 is the text which I want to compare with str1.
// var str2 = "I was sent to moon in order to protect you"

// function words(s) {
//     return s.toLowerCase().match(/\w+/g);
// }

// // str1 is the reference text. 
// var str1 = "I was sent to earth to protect my cousin";

// let a = words(str1);
// let b = words(str2);
// let res1 = b.filter(i => !a.includes(i));
// let res2 = a.filter(i => !b.includes(i));

// highlight(b, "str2", res1);
// highlight(a, "str1", res2);
// function highlight(str, id, res){
//     const div = document.createElement('div');
//     var text = "";
//    for(var i=0; i<str.length; i++){
//     var hasVal = res.includes(str[i]);
//     if(hasVal){
//       text +=" <span class='imp'>"+str[i]+"</span> ";
//     } else {
//        text +=" "+str[i]+" ";
//     }
//    }
//     div.innerHTML = text;
//     document.body.appendChild(div);
// }
// .imp{
//   color: red
// }