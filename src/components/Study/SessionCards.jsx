
export default function SessionCards({cards}) {

    const today = cards.filter(e=> e.next_review_date === "2022-04-29" || e.next_review_date === null)

    return (
        <div className='hidden md:flex md:w-1/5 border border-white flex-col justify-center  rounded-xl' >
            <span>
                Tarea del dia
            </span>
            <div>
                <ul className='flex flex-col'>
                    {today && today.map((e, i) => (
                        <li key={i} >{e.terms.word} {e.easiness}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
