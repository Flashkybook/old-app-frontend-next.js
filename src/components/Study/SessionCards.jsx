
export default function SessionCards({cards}) {
    return (
        <div className='w-1/5 border border-white flex flex-col justify-center  rounded-xl' >
            <span>
                user book list
            </span>
            <div>
                <ul className='flex flex-col'>
                    {cards && cards.map((e, i) => (
                        <li key={i} >{e.terms.word} {e.nivel}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
