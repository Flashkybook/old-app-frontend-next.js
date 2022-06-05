import React from 'react'


// components
import Layout from '../../components/Layout'
import Quiz from '../../components/Quiz'

export default function Listening() {
  return (
    <Layout title={"listening study"}>
      <Quiz input_message={"escribe lo que puedas escuchar"} gameTitle={"Listening"}/>
    </Layout>
  )
}

