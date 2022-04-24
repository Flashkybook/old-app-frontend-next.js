import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book } from '../../redux/actions/wordbook'


const WordBook = ({ user_book }) => {

  




  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_book())
  }, [dispatch])


  return (
    <div className='w-1/5 border border-white flex flex-col justify-center  rounded-xl' >
      <span>
        user book list
      </span>
      <div>
        <ul className='flex flex-col'>
          {user_book && user_book.map((e, i) => (
            <li key={i} >{e.terms.word} {e.nivel}</li>
          ))}
        </ul>
      </div>
    </div>

  )
}

export default WordBook