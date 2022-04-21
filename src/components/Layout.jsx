import Head from 'next/head'
import Navbar from './Navbar'
export default function Layout({ title, description, children }) {
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={description} />
                <title>{title}</title>
            </Head>
            <Navbar/>
            <div className='m-[5rem]'>
                {children}
            </div>


        </>
    )
}

Layout.defaultProps = {
    title: "next-django",
    description: "project react-django auth",
}