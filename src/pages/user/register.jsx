import React, { useState } from 'react'
import Layout from '../../components/Layout'
import {useDispatch} from 'react-redux'
import {register_action} from '../../redux/actions/auth'

const register = () => {
  const dispatch = useDispatch()

  const [formData, setFormaData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  })

  const typeForm = (e)=>{
    if( e=== 'username'){
      return 'text'
    }if(e === 'email'){
      return 'email'
    }else{
      return 'password'
    }
  }

  const [error, setError] = useState()
  const handlerSubmit = e => {
    e.preventDefault()
    if(formData.password === formData.re_password){
      dispatch(register_action(formData))
    }else{
      setError("contraseñas no son iguales")
    }
  }


  const handlerChange = e => {
    setFormaData({ ...formData, [e.target.name]: e.target.value })
  }

  // una ves registrado el login debe ser automatico para evitar mandar mesajes de success
  


  return (
    <Layout>
      <div className='flex justify-center items-center'>

        <div className='border border-slate-50 rounded-[3rem] 
        w-[100%] sm:w-[85%] md:w-[65%] xl:w-[50%] lg:w-[40%]
         bg-slate-600 py-5 px-4 '>
          <div className='text-center mb-8'>
            <h3 className='text-[3rem]'>Create an Account</h3>
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
              
              {/* <input className='input-field' type="text" placeholder='user name*' />
              <input className='input-field' type="email" placeholder='email*' />
              <input className='input-field' type="password" placeholder='password*' />
              <input className='input-field' type="password" placeholder='re password*' /> */}
            </div>
            {error && <p>{error}</p>}
            <div className='flex justify-center mb-8'>
              <button className='input-field bg-slate-800 text-white w-1/3' type="submit">Register</button>
            </div>

          </form>
        </div>
      </div>

    </Layout>
  )
}

export default register