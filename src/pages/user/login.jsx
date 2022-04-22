import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux'
import { login_action } from '../../redux/actions/auth'


export default function login() {
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

  const [error, setError] = useState()

  const handlerSubmit = e => {
    e.preventDefault()
    dispatch(login_action(formData))
  }


  const handlerChange = e => {
    setFormaData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Layout>
      <div className='flex justify-center items-center'>

        <div className='border border-slate-50 rounded-[3rem] w-[50%] bg-slate-600 py-5 px-4 '>
          <div className='text-center mb-8'>
            <h3 className='text-[3rem]'>Login</h3>
          </div>
          <form method='POST' onSubmit={handlerSubmit}>
            <div className="flex flex-col m-10 space-y-2 text-black">
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
            <div className='flex justify-center mb-8'>
              <button className='input-field bg-slate-800 text-white w-1/3' type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>

    </Layout>
  )
}

