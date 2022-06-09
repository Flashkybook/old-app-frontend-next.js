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

    <nav className='shadow bg-slate-800 shadow-black p-4 mx-4  rounded-xl mt-0 flex flex-col sm:flex-row justify-between items-center px-8'>

      <div className='w-full sm:w-auto flex justify-between items-center '>

        <Link href='/'>
          
          <a className='hidden sm:flex button-primary font-bold text-[15px] sm:text-[25px]'>

            Woordbook
            <div className='hidden sm:flex items-center mt-2 ml-2'>
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
      transition-all duration-500 w-full justify-between
      hidden mt-4 sm:mt-0 sm:flex items-center text-[15px] text-center '>

        <div className='flex flex-col sm:flex-row items-center justify-start space-y-2 sm:space-y-0 w-1/3 mb-2 sm:mb-0'>

          <Link href='/contact'>
            <a className='button-primary w-full' >
              contact
            </a>
          </Link>

          <Link href='/about'>
            <a className='button-primary w-full' >
              about
            </a>
          </Link>
        </div>


        {user ?
          <button onClick={() => dispatch(logout_action())}
            className='button-primary'>
            Logout
          </button>
          :
          <div className='flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 w-full'>



            <Link href='/user/login'>
              <a className='button-primary sm:w-auto w-full' >
                login
              </a>
            </Link>

            <Link href='/user/register'>
              <a className='button-primary sm:w-auto w-full'>
                register
              </a>
            </Link>

          </div>
        }
      </div>
    </nav>
  )
}
