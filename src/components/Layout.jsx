import Head from 'next/head'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import { auth_action } from '../redux/actions/auth'
import { useEffect } from 'react'


export default function Layout({ title, description, children }) {
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
                <title>wordbook {title}</title>
            </Head>}
            <Navbar />
                {children}


        </>
    )
}

Layout.defaultProps = {
    title: 'woordbook',
    description: 'Web aplication to learn English',
}