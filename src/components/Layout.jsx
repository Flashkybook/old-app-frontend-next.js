import Head from 'next/head'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { auth_action } from '../redux/actions/auth'
import { useEffect } from 'react'


export default function Layout({ title, description, children }) {
    const userStatus = useSelector(e => e.auth)
    const dispatch = useDispatch()
    
    const check_user = () => {
        if (dispatch && dispatch !== undefined && dispatch !== null) {
            dispatch(auth_action())
        }
    }


    useEffect(() => {
        check_user()
    }, [])

    return (
        <>
            <Head>
                <meta charset='UTF-8' />
                <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <meta name='description' content={description} />
                <title>{title}</title>
            </Head>
            <Navbar />
            <div className=''>
                {children}
            </div>


        </>
    )
}

Layout.defaultProps = {
    title: 'next-django',
    description: 'project react-django auth',
}