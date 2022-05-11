

export default function UserBookList({ all_cards }) {
  const today = new Date().toTimeString()

  return (
    <div className='w-full flex flex-col justify-center my-4' >
      <span className='text-center text-2xl font-bold underline my-2'>
        user book list
      </span>

      <div className='border border-gray-700 p-5  w-full '>
        <table className='text-right md:w-2/3 mx-auto w-full'>
          <thead>
            <tr >
              <th className='text-left md:px-5'>Word</th>
              <th>progress</th>

              <th className="hidden md:table-cell">Next review </th>
              <th className="text-right">Rps</th>
              <th className='md:px-5'>review today</th>
            </tr>
          </thead>
          <tbody>
            {all_cards && all_cards.map((e, i) => (
              <tr className=' bg-gray-700 font-bold border border-slate-900 shadow-md hover:bg-gray-200 hover:text-gray-900' key={i}>
                <td className='text-left px-4'>
                  {e.terms.word}
                </td>
                <td>
                  <span className='px-2 text-xs font-medium text-blue-100 text-center'>
                    <div className='w-full bg-gray-200 rounded-full dark:bg-gray-800'>
                      <div
                        className='bg-blue-600 leading-none rounded-full'
                        style={{ width: `${(e.easiness * 100) / 5}%` }}> {(e.easiness * 100) / 5}%</div>
                    </div>
                  </span>
                </td>

                <td className="hidden md:table-cell">
                  {e.next_review_date}

                </td>

              <td className="test-center">
                  <span> {e.repetitions}</span>
              </td>
                {/* review today */}
                <td className='px-4'>
                  {e.last_review >= today ? <i>✅</i> : <i>➡</i>}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  )
}
