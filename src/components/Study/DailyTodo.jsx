
export default function DailyTodo({cards}) {

    const today = new Date().toLocaleDateString()
    const daily = cards.filter((valor, index)=> valor.next_review_date === today || valor.next_review_date === null )

    
    return (
        <div className='flex p-2 mt-5 md:mt-0 md:w-1/5 border border-white flex-col justify-center  rounded-xl' >
            
            { daily.length > 0 ? 
            <h6>Hoy tienes {daily.length} que debes repasar</h6>
            :
            <h6>✅Has completado tu tarea diaria puedes seguir estudiando pero no sera agregado a tu progreso </h6>    
            }
            
            
            <div>
                <ul className='flex flex-col'>
                    {daily && daily.map((e, i) => (
                        <li key={i} >{e.terms.word} </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
