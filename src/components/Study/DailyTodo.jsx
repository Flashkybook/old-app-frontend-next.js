
export default function DailyTodo({ cards }) {

    const today = new Date().toISOString()
    const daily = cards.filter((valor, index) => valor.next_review_date <= today || valor.next_review_date === null)

    
    return (
        <div className='flex  mt-5 md:mt-0 md:w-1/5 flex-col justify-center  ' >

            <span className='text-xl font-bold px-2 mb-5'>
                Actividades :
            </span>
            <div className='border border-white rounded-xl p-2'>

                <h6><span className='text-blue-900'>❕</span> repasa los terminos agregados en input </h6>
                {daily.length > 0 
                    ?<>
                        <h6><span className='text-blue-900'>❕</span> Hoy tienes {daily.length} termino que debes repasar </h6>
                    </>
                    :<>
                        <h6>✅Has completado tu tarea diaria puedes seguir estudiando pero no sera agregado a tu progreso</h6>

                        <h6>✅o puedes agregar mas terminos en el formulario</h6>
                    </>}
            </div>


            <div>
                <ul className='flex flex-col'>
                    {daily && daily.map((e, i) => (
                        <li key={i} >
                            {/* {e.terms.word}  */}
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


