import React from 'react'


// components
import Layout from '../../components/Layout'
import StudySessionLayout from '../../components/StudySessionLayout'

export default function Listening() {
  return (
    <Layout title={"listening study"}>
      <StudySessionLayout input_message={"escribe lo que puedas escuchar"} gameTitle={"Listening"} />
    </Layout>
  )
}

