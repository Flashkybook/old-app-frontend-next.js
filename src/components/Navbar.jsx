import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import {logout_action} from '../redux/actions/auth'

export default function Navbar() {
  
  const userStatus = useSelector(e => e.auth)
  const user = userStatus.user

  const dispatch = useDispatch()

  return (
    <nav className="bg-slate-900 text-white py-4 px-24">
      <div className='flex justify-between items-center space-x-4'>
        {user &&
          <p className='font-bold text-[25px]'>
            {user.email}
          </p>
        }
        <Link href="/study">
          <a className='font-bold text-[25px]'>
            vocabulary app
          </a>
        </Link>


        <ul className='flex items-center space-x-8 text-[15px]'>

          {user ?
              <li onClick={()=>dispatch(logout_action())} className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[5rem]' >
                Logout
              </li>
           

            :
            <>
              <Link href="/user/login">
                <li className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[5rem]' >
                  login
                </li>
              </Link>
              <Link href="/user/register">
                <li className=''>
                  register
                </li>
              </Link>
            </>


          }


        </ul>
      </div>

    </nav>
  )
}
