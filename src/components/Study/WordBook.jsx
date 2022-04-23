import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_book } from '../../redux/actions/wordbook'


const WordBook = ({ user_book }) => {

  const userbook = useSelector(e => e.book)




  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_book())
  }, [dispatch])


  return (
   <></>
  )
}

export default WordBook