import { useState } from "react";
import Layout from "../components/Layout";

export default function Home() {

  const [audio, setAudio] = useState("send this data")

  const handlerOnCLick = async() => {


    const res = await fetch("http://localhost:3000/api/01/wordbook/gtts/", {
      method: "POST",
      headers: {
        "Action": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(audio)
    })
    const data = await res.json()

    const audio = new Audio(data.success)

    audio.play()
  }

  return (
    <Layout>
      <div className="container m-10">
        <h1 className="text-5xl text-center">home page</h1>
        <button onClick={handlerOnCLick} className="text-2xl text-center mt-16 border p-2 mx-auto">hello</button>
      </div>
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
