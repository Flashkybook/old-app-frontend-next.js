import Head from 'next/head'
import Image from 'next/image'

import { useDispatch, useSelector } from 'react-redux'
import { auth_action } from '../redux/actions/auth'
import { useEffect } from 'react'

// components
import Loading from './Loading'
import Navbar from './Navbar'
import Footer from './Footer'


export default function Layout({ title, description, children }) {

    const loading = useSelector(e => e.auth.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        const get_auth = () => {
            if (dispatch && dispatch !== undefined && dispatch !== null) {
                dispatch(auth_action())
            }
        }
        get_auth()
    }, [dispatch])


    return (
        <>
            {<Head>
                <meta charSet='UTF-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <meta name='description' content={description} />
                <title>wordbook</title>
            </Head>}

            <Navbar />



                {loading ?
                    <div className="mp-[10%]">
                        <Loading />
                    </div>
                    :
                    children
                }

                <a href="https://ko-fi.com/angelriera" target={"_blank"} rel="noreferrer">

                    <div className='bg-coffee flex flex-col' >
                        <img width={25} height={25} className='coffee'
                            src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg"
                            alt="Buy Me A Coffee" />
                        <span className='underline'>a coffee</span>
                    </div>
                </a>

                <Footer />

           
        </>
    )
}

Layout.defaultProps = {
    description: 'Web aplication to learn English',
}