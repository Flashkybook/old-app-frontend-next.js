import { useState } from "react"

export default function DailyTodo({ cards }) {

    const today = new Date().toISOString()
    const daily = cards.filter((valor, index) => valor.next_review_date <= today || valor.next_review_date === null)


    return (
        <div className='' >

 



            <div className="my-5 text-center">
                {daily.length == 0 ?
                    <>
                        <p className="p-2 bg-slate-900 bg-opacity-50">✅You have completed your daily task.</p>
                        <p className="bg-blue-600 px-2 rounded-lg">you can continue studying but it will not be added to your progress</p>
                    </>
                    :
                    <p className='p-2 bg-slate-900 rounded-full bg-opacity-50'>
                        <span className="bg-blue-600 px-1 rounded-lg">

                            {daily.length}
                        </span>
                        terms for review today</p>

                }

            </div>

        </div>
    )
}


