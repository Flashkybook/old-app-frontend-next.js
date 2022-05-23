import { useState } from 'react'
import Layout from '../../components/Layout'
import { login_action } from '../../redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

export default function Login() {
  const route = useRouter()
  const reduxStatus = useSelector(e => e.auth)
  const error = useSelector(e => e.auth.error)

  if (reduxStatus.is_auth) {
    route.push("/")
  }

  const dispatch = useDispatch()
  const [formData, setFormaData] = useState({
    email: "",
    password: "",
  })

  const typeForm = (e) => {
    if (e === 'username') {
      return 'text'
    } if (e === 'email') {
      return 'email'
    } else {
      return 'password'
    }
  }


  const handlerSubmit = e => {
    e.preventDefault()
    dispatch(login_action(formData))
  }


  const handlerChange = e => {
    setFormaData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Layout>
      <div className='flex justify-center items-center mt-5'>


        <div className='border border-slate-50 rounded-[3rem] w-full  md:w-[50%] bg-slate-600 py-5 px-0 md:px-4 '>
          <div className='text-center mb-8'>
            <h3 className='text-[3rem]'>Login</h3>

            <div className='flex justify-center'>
              <div className='bg-slate-800 w-2/3 text-left p-4 -mb-6 rounded-3xl'>
                <p>recomendado:</p>
                <p>user: invitado@callapp.com</p>
                <p>password: 123456++</p>
              </div>
            </div>
          </div>
          <form method='POST' onSubmit={handlerSubmit}>
            <div className="flex flex-col m-10 mt-0 space-y-2 text-black">
              {Object.keys(formData).map((e, index) => (
                <input
                  key={index}
                  value={formData[e]}
                  type={typeForm(e)}
                  name={e}
                  required
                  onChange={handlerChange}
                  className='input-field'
                  placeholder={`${e}*`}
                />
              ))}
            </div>

            {error &&
              <div className='flex justify-center -mt-5 mb-5'>
                <span className='text-red-400 font-semibold uppercase'>{error} !</span>
              </div>
            }
            <div className='flex justify-center mb-8'>
              <button className='input-field bg-slate-800 text-white w-1/3' type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>

    </Layout>
  )
}

