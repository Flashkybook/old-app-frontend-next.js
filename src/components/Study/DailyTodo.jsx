import { useState } from "react"

export default function DailyTodo({ cards }) {

    const today = new Date().toISOString()
    const daily = cards.filter((valor, index) => valor.next_review_date <= today || valor.next_review_date === null)


    return (
        <div className='flex  mt-5 md:mt-0 md:w-1/5 flex-col justify-center  ' >

      

            <table>
                <thead>
                    <tr >
                        <th className='px-2'>✔</th>
                        <th className=''>      <span className='text-xl font-bold px-2 mb-5'>
                Task :
            </span></th>
                    </tr >
                </thead>
                <tbody>
                    {/* <tr className="border-b" >
                        <td className=''>
                            <input type="checkbox" value={false} name="" id="" />
                        </td>
                        <td className=''>repasa los terminos agregados en input</td>
                    </tr > */}

                    <tr className="border-b" >
                        <td className=''>
                            <input type="checkbox" value={daily.length == 0 ? false : true} name="" id="" />
                        </td>
                        <td className=''>{daily.length} terms for review today</td>
                    </tr >
                </tbody>


            </table>

            <div className="my-5">
                {daily.length == 0 &&
                    <>
                        <h6>✅Has completado tu tarea diaria puedes seguir estudiando pero no sera agregado a tu progreso</h6>
                        <h6>✅o puedes agregar mas terminos en el formulario</h6>
                    </>
                }

            </div>
            {/* <div>
                <ul className='flex flex-col'>
                    {daily && daily.map((e, i) => (
                        <li key={i} >
                            {e.terms.word} 
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    )
}


