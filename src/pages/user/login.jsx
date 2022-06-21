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

  const handlerSubmit = e => {
    e.preventDefault()
    dispatch(login_action(formData))
  }



  const typeForm = (e) => {
    if (e === 'username') {
      return 'text'
    } if (e === 'email') {
      return 'email'
    } else {
      return 'password'
    }
  }



  const handlerChange = e => {
    setFormaData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Layout>
      <div className='mx-[4%] flex justify-center items-center mt-5'>
        <div className='card-2 my-5'>
          <div className='text-center mb-8'>
            <h3 className='text-[3rem]'>Login</h3>

          </div>
          <form method='POST' onSubmit={handlerSubmit}>
            <div className="flex flex-col mx-[2%] md:mx-5 mb-10 space-y-2 text-black">
              {Object.keys(formData).map((e, index) => (
                <input
                  autoComplete='off'
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

            {error !== 'Server error GET ' || error !== 'Refresh token fail' &&
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

