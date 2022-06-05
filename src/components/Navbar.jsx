import Link from 'next/link'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout_action } from '../redux/actions/auth'

export default function Navbar() {
  const userStatus = useSelector(e => e.auth)
  const navRef = useRef()
  const user = userStatus.user
  const dispatch = useDispatch()


  const display = () => {
    const className = navRef.current.classList
    className.toggle('hidden')
  }

  return (
    // fixed top-0 left-0 right-0s

    <nav className='card mt-0 flex flex-col sm:flex-row justify-between items-center px-8'>

      <div className='w-full flex justify-between items-center '>

        <Link href='/'>
          <a className='flex button-primary font-bold text-[25px]'>

            Woordbook
            <div className='flex items-center mt-2 ml-2'>
              <span className='text-sm border-2 border-slate-900 bg-sky-800 px-1 z-1'>Beta</span>
              <span className='text-sm border-2 border-slate-900 bg-teal-800 px-1 -ml-9 -mb-2 z-2'>Beta</span>
            </div>
          </a>
        </Link>

        <div className="mt-4 sm:hidden">
          <button onClick={() => display()}
            className="flex items-center px-3 py-2 
          button-primary
          border rounded 
          border-black 
          hover:border-white
          text-white ">


            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>


      <div ref={navRef} className='
      transition-all duration-500
      hidden mt-4 sm:mt-0 sm:flex items-center space-x-8 text-[15px]'>
        {user ?
          <button onClick={() => dispatch(logout_action())}
            className='button-primary '>
            Logout
          </button>
          :
          <div className='flex items-center'>


            <Link href='/user/login'>
              <a className='button-primary w-full' >
                login
              </a>
            </Link>

            <Link href='/user/register'>
              <a className='button-primary w-full'>
                register
              </a>
            </Link>

          </div>
        }
      </div>
    </nav>
  )
}
