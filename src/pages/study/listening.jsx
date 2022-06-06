import { useDispatch } from 'react-redux'
import { set_current } from '../../redux/actions/wordbook'

// components
import Layout from '../../components/Layout'
import Quiz from '../../components/Quiz'

export default function Listening() {

  const dispatch = useDispatch()
  dispatch(set_current(0))
  return (
    <Layout title={"listening study"}>
      <Quiz input_message={"escribe lo que puedas escuchar"} gameTitle={"Listening"}/>
    </Layout>
  )
}

