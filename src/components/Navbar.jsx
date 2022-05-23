import Link from 'next/link'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout_action } from '../redux/actions/auth'

export default function Navbar() {

  const userStatus = useSelector(e => e.auth)

  const navRef = useRef()
  const user = userStatus.user

  const dispatch = useDispatch()

  const handlerHidden = () => {
    const className = navRef.current.classList
    className.toggle('hidden')
  }

  return (
    // fixed top-0 left-0 right-0s
    <nav className='w-full sm:block justify-between flex bg-gradient-to-t from-blue-900 to-sky-900'>

      <div className='flex flex-col sm:flex-row justify-between items-center p-4 px-8'>
        <Link href='/'>
          <a className='font-bold text-[25px]'>
            Woordbook <span className='text-sm border px-1'>Beta</span>
          </a>
        </Link>

        <ul ref={navRef} className='hidden md:flex items-center space-x-8 text-[15px]'>
          {user ?

            <li onClick={() => dispatch(logout_action())} className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[5rem]' >
              Logout
            </li>
            :
            <div className='flex items-center'>
              <Link href='/user/login'>
                <button className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[4rem]' >
                  login
                </button>
              </Link>
              <button>

              <Link href='/user/register'>
                <a className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[4srem]'>
                  register
                </a>
              </Link>
              </button>
            </div>
          }
        </ul>

        <div className="flex mt-4 items-start sm:hidden">
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

    </nav>
  )
}
