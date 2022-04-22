import React, { useState } from 'react'

export default function Form({ send, formData }) {

    
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
        <>
            <div className="flex flex-col m-10 space-y-2 text-black">
                {Object.keys(formData).map((e, index) => (
                    <input
                        key={index}
                        value={formData[e]}
                        type={typeForm(e)}
                        name={e}
                        onChange={handlerChange}
                        className='input-field'
                        placeholder='user name*'
                    />
                ))}

            </div>
            <div className='flex justify-center mb-8'>
                <button className='input-field bg-slate-800 text-white w-1/3' type="submit">Register</button>
            </div>
        </>
    )
}
