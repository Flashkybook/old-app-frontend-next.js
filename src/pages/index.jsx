import { useState } from "react";
import Layout from "../components/Layout";
import Review from '../components/Games/Review'
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {

  const [audio, setAudio] = useState("send this data")

  const auth = useSelector(e => e.auth.user)

  const handlerOnCLick = async () => {

    try {
      const res = await fetch("http://localhost:3000/api/01/wordbook/gtts/", {
        method: "POST",
        headers: {
          "Action": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(audio)
      })
      const data = await res.json()
      console.log(data)
      const audio_data = new Audio(data.success)
      audio_data.play()

    } catch (error) {
      console.log(error)

    }



  }

  return (
    <Layout>
      {auth ?
        <Review />
        :
        <div className="flex flex-col text-xl justify-center items-center mt-24">

          <Link href="user/login">
            <button className=" border rounded-2xl bg-slate-600 p-2">login to get started</button>
          </Link>
          or
          <Link href="user/register">
            <button className="border rounded-2xl bg-slate-600 p-2">Sign up to get started</button>
          </Link>
        </div>

      }

      {/* <div className="container m-10">
    <h1 className="text-5xl text-center">home page</h1>
    <button onClick={handlerOnCLick} className="text-2xl text-center mt-16 border p-2 mx-auto">hello</button>
    </div> */}
    </Layout>
  )
}


// export async function getServerSideProps() {

//   // cambia el formato de _id
//   const res = await fetch("http://localhost:3000/api/gtts/", {
//     method: "GET",
//     headers: {
//       "Action": "application/json",
//       "Content-Type": "application/json"
//     },
//   })
//   const data = await res.json()


//   return { props: { url: data } }
// }
