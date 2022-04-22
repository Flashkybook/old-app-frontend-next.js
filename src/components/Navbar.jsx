import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white py-4 px-24">
      <div className='flex justify-between items-center space-x-4'>
        <Link href="/">
          <a className='font-bold text-[25px]'>
            vocabulary app
          </a>
        </Link>

        <div className='flex items-center space-x-8 text-[15px]'>
        <Link href="/user/login">
            <a className='hover:bg-slate-300 hover:text-slate-900 px-5 py-2 rounded-[5rem]' >
              login
            </a>
          </Link>
          <Link href="/user/register">
            <a className=''>
              register
            </a>
          </Link>
        </div>
      </div>

    </nav>
  )
}
