import { useState } from 'react';
import Layout from '../components/Layout';
import Review from '../components/Games/Review'
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function Home() {

  const auth = useSelector(e => e.auth.user)


  return (
    <Layout title={"home page"}>
      {auth ?
        <Review />
        :
        <div className='flex flex-col text-xl justify-center items-center mt-24'>

          <Link href='user/login'>
            <a>
              <button className=' border rounded-2xl bg-slate-600 p-2'>login to get started</button>
            </a>
          </Link>
          or
          <Link href='user/register'>
            <a>
              <button className='border rounded-2xl bg-slate-600 p-2'>Sign up to get started</button>
            </a>
          </Link>
        </div>

      }

      {/* <div className='container m-10'>
    <h1 className='text-5xl text-center'>home page</h1>
    </div> */}
    </Layout>
  )
}


// export async function getServerSideProps() {

//   // cambia el formato de _id
//   const res = await fetch('http://localhost:3000/api/gtts/', {
//     method: 'GET',
//     headers: {
//       'Action': 'application/json',
//       'Content-Type': 'application/json'
//     },
//   })
//   const data = await res.json()


//   return { props: { url: data } }
// }
