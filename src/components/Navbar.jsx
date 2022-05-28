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

    <nav className='flex flex-col sm:flex-row justify-between items-center p-4 px-8 bg-gradient-to-t from-blue-900 to-sky-900'>

      <div className='w-full flex justify-between items-center '>

        <Link href='/'>
          <a className='font-bold text-[25px]'>
            Woordbook <span className='text-sm border px-1'>Beta</span>
          </a>
        </Link>

        <div className="mt-4 sm:hidden">
          <button onClick={() => display()} className="flex items-center px-3 py-2 
                                border rounded border-sky-700 hover:text-white hover:border-white
                                text-white ">
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>


      <div ref={navRef} className='hidden sm:flex items-center space-x-8 text-[15px]'>
        {user ?

          <button onClick={() => dispatch(logout_action())} className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[5rem]' >
            Logout
          </button>
          :
          <div className='flex items-center'>

            <Link href='/user/login'>
              <a className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[4rem]' >
                login
              </a>
            </Link>

            <Link href='/user/register'>
              <a className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[4rem]'>
                register
              </a>
            </Link>
          </div>
        }
      </div>




    </nav>

  )
}
