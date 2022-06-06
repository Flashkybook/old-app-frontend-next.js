import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'


import { current_session } from '../redux/actions/wordbook'
import Interface from './Interface'

/**
 * @returns Get correct anwers and send this to the backend, get session_cards evaluate and send this to the session_cards_completed
 */
export default function Listening({children, input_message, gameTitle}) {

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

  const handlerSubmit = e => {
    
    const card = cards[current]

    const answer = e.target.answer.value.toLocaleLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').trim()
    const currentWord = card.terms.word.toLocaleLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')

    setCorrectAnswer(card.terms.word.toLocaleLowerCase())


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
        if (card.fails === undefined){
          card.fails = 0
        }
        // fail exist true
        if (card.current_fail) {
          card.current_fail = false
          console.log("in correct")
          dispatch(current_session(card, false))
        } else { //fail donot exist        
          console.log("correct")
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
      card.current_fail = true // 
      e.target.answer.classList.remove('border-teal-500', 'border-white')
      e.target.answer.classList.add('border-red-500')
      setTimeout(() => {
        e.target.answer.classList.replace('border-red-500', 'border-white') // error style
        e.target.reset()
      }, 1000);
    }
    e.preventDefault()
  }



  return (
    <Interface gameTitle={gameTitle} study_session={true} >

      {/* FEEDBACK */}
      {wrongAnswer &&
        <div className='text-center'>
          <h3 className='text-4xl  text-teal-500'>{correctAnswer}</h3>
          <h3 className='text-4xl mb-12 text-red-500'>{wrongAnswer}</h3>
        </div>
      }
      {/* END_FEEDBACK */}



      {children}


      {/* FORM OF ANSWER */}
      <form className='w-full' onSubmit={handlerSubmit} >
        <input autoComplete='off' className='text-2xl py-2 px-4 outline-none bg-slate-800 w-full border text-center' name='answer' type='text' placeholder={input_message} />
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