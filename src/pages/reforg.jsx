import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { get_book } from '../redux/actions/wordbook'


export default function reforg() {
  const user_book = useSelector(e => e.book.user_book)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_book())
  }, [dispatch])


  return (
    <Layout>
      
      reforg

      list words
      { user_book.map(e=>(
        <div>asdas</div>
      ))}


    </Layout>
  )
}
