import Link from 'next/link';



const Home = () => {

    let title1 = "Wordbook es tu herramienta mas potente herramienta de estudio de ingles"

    let descriptcion = [

        {
            title: "List",
            description: "Create your personal list of phrases or words you wish to learn",
            icon: <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
        },
        {
            title: "Evaluate",
            description: "Train your listening and spelling skills by trying to write the audio that is automatically generated from the phrases you have added",
            icon: <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>,
        },

        {
            title: "Repeat",
            description: "Makes sure you never forget the sounds and spelling by using a time-spaced repetition algorithm",
            icon: <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>,
        },



    ]

    let getting = [
        "Regístrate con un nombre de usuario y un correo",
        "Agrega todas las palabras o frases que deseas aprender",
        "Prepárate para estudiar en la session de listening",
        "Repasa todas tus frases en el wordbook o review mode",
    ]



    return (

        <div className=' mx-auto flex flex-col items-center pt-16'>


            <div className='mx-[10%] drop-shadow-sm shadow-white flex flex-col items-center bg-opacity-10'  >


                <h1 className='mt-16 mb-5 text-center text-4xl md:text-5xl font-bold text-gray-300 underline'>Get started your wordbook today</h1>
                <h1 className='text-center text-2xl md:text-4xl font-bold text-gray-400'>{title1}</h1>

                <div className='my-16'>
                    <Link href='user/login'>
                        <a className='mx-3 px-10 py-2 button-secondary bg-sky-500 hover:bg-sky-600'>
                            Login
                        </a>
                    </Link>
                    <Link href='user/register'>
                        <a className='mx-3 px-10 py-2 button-secondary bg-teal-500 hover:bg-teal-600'>
                            Singin
                        </a>
                    </Link>
                </div>
            </div>


            <h1 className='text-5xl text-center font-bold mt-32 mb-8 border-b '>how it works?</h1>
          
          
            <div className='grid md:grid-cols-3 mb-24'>
                {descriptcion.map((v, i) => (
                    <div key={i} className="-ml-24 w-full h-full translate-x-24">
                        <div className='shadow shadow-white mx-5 my-5 rounded-md p-5 py-10 flex flex-col items-center justify-start'>

                            <h1 className='text-2xl underline font-bold text-gray-300 mb-2'>{v.title}</h1>
                            <p className='text-slate-400 text-center font-bold text-xl'>
                                {v.description}
                            </p>
                            <div className='flex justify-center  items-center bg-blue-900 h-14 w-14 rounded-full mt-4'>
                                {v.icon}
                            </div>
                        </div>


                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home