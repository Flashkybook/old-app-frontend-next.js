
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add_word } from '../../redux/actions/wordbook'



export default function FormAddWord() {

  const dispatch = useDispatch()
  const addword = (e) => { dispatch(add_word(e)) }
  const user_book = useSelector(e => e.user_book.cards)
  const words_user = user_book.map(e => e.terms.word)

  const [error, setError] = useState(null)

  if (error !== null) {

    setTimeout(() => {
      setError(null)
    }, 3000)
  }


  const handleSubmit = e => {
    e.preventDefault()
    const newWord = e.target.newWord.value.toLocaleLowerCase().replace(/.,\s]/g, '')

    console.log(newWord)
    // console.log(newWord.hasCorrectedText)
    if (newWord.trim().length === 0) {
      setError('this word is empty')
      e.target.newWord.classList.add('border-red-500')
    } else if (words_user.includes(newWord)) {
      setError('this word already exists on userbook')
      e.target.newWord.classList.add('border-red-500')
    } else {
      e.target.newWord.classList.remove('border-red-500')
      addword(newWord)
    }
    e.target.reset()
  }


  return (
    <div className='w-full'>
      <div className='flex flex-col justify-center items-center w-full'>

        <div className='my-2'>Add new word</div>
        <form onSubmit={handleSubmit} className='w-full flex '>
          <input autoComplete='off' name='newWord' spellCheck='true'
            className='bg-gray-900 text-gray-200 border border-gray-800 w-full
             px-3 py-4 mx-2 rounded-md text-xl text-center' type='text' placeholder='add a new phrase or word you want to learn' />
          <button className='bg-slate-900 px-2 mx-2' type='submit'> add</button>

        </form>

        {error &&
          <span className='text-red-500 font-semibold'>{error}</span>
        }

      </div>
    </div>
  )
}


