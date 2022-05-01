
import { useDispatch, useSelector } from 'react-redux'
import { add_word } from '../../redux/actions/wordbook'



export default function FormAddWord() {

  const dispatch = useDispatch()
  const addword = (e) => { dispatch(add_word(e)) }
  const user_book = useSelector(e => e.user_book.cards)
  const words_user = user_book.map(e => e.terms.word)

  const handleSubmit = e => {
    e.preventDefault()
    const newWord = e.target.newWord.value.toLocaleLowerCase()
    // console.log(newWord.hasCorrectedText)
    if(words_user.includes(newWord)){
      console.log('word already exists on userbook')
      e.target.newWord.classList.add('border-red-500')
    }else{
      // if this word exists in our user_book no acept and make style of error
      e.target.newWord.classList.remove('border-red-500')
      addword(newWord)
      e.target.reset()
    }
  }


  return (
    <div className='mt-16 w-full'>
      <div className='flex flex-col justify-center items-center w-full'>
        <div className='my-2'>Add new word</div>
        <form onSubmit={handleSubmit} className='w-full flex justify-center'>

          <input autoComplete='off' name='newWord' spellCheck='true'
            className='bg-gray-900 text-gray-200 border border-gray-800
             px-3 py-4 mx-2 rounded-md text-3xl text-center ' type='text' placeholder='New word ..' />
          <button className='bg-slate-900 px-2 mx-2' type='submit'> add</button>

        </form>
      </div>
    </div>
  )
}


