

const WordBook = ({ all_cards }) => {

  console.log("2022-04-29" > "2022-04-30" )



  return (
    <div className='w-full flex flex-col justify-center mt-4' >
      <span className="text-center text-2xl font-bold underline my-2">
        user book list
      </span>

      <div className="border border-gray-700 p-5 ">
        <ul className='flex flex-col space-y-2 px-4 md:w-1/3 mx-auto'>

          {all_cards && all_cards.map((e, i) => (
            <li className="border p-2 flex justify-between" key={i}>
              <div>
                {e.terms.word}
                <span className="px-2">
                  {(e.easiness / 5)}
                </span>
              </div>
              <div>
              </div>
              <div>
                {e.last_review === "2022-04-29" || e.last_review === "2022-04-30" ?
                  <i>✅</i> : <i>➡</i>
                }

              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>

  )
}

export default WordBook