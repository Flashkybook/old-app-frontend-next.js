import { useSelector } from 'react-redux';



// componetns
import Review from '../components/Games/Review'
import Layout from '../components/Layout';
import Home from '../components/Landing/Home';



export default function Index() {

  const auth = useSelector(e => e.auth.user)


  return (
    <Layout title={"home page"}>
      {auth ?
        <Review />
        :
        <Home />

      }

    </Layout>
  )
}
