import { delete_user_book } from '../../redux/actions/wordbook'
import { useDispatch, useSelector } from 'react-redux'

export default function UserBookList() {

  const dispatch = useDispatch()

  const deleteUserBook = (e) => { dispatch(delete_user_book(e)) }

  const cards = useSelector(e => e.user_book.cards)

  function re_order(a, b) {
    if (a.next_review_date < b.next_review_date) {
      return -1;
    }
    if (a.next_review_date > b.next_review_date) {
      return 1;
    }
    return 0;
  }

  const all_cards = cards.sort(re_order)


  const today = new Date().toISOString("YYYY-MM-DD")


  return (
    <div className='' >
      <span className='w-full flex flex-col justify-center text-center text-2xl font-bold underline my-2'>
        user book list
      </span>

      <div className='border border-gray-700 md:p-5 text-[0.7rem] w-full '>
        <table className='text-center mx-auto w-full'>
          <thead>
            <tr >
              <th className='md:px-5'></th>
              <th className='md:px-5'>Word</th>
              <th className="hidden md:table-cell">progress</th>
              <th className="hidden md:table-cell">Next review</th>
              <th className="">Rps</th>
              <th className='md:px-5'>review today</th>
            </tr>
          </thead>
          <tbody>
            {all_cards && all_cards.map((e, i) => (
              <tr className=' bg-gray-700 font-bold border border-slate-900 shadow-md hover:bg-gray-200 hover:text-gray-900' key={i}>
                <td>
                  {/* <div className='border rounded relative'>
                    <ul>
                      <li className='border-b'>delete</li>
                      <li>get</li>
                    </ul>
                  </div> */}
                  <button onClick={() => deleteUserBook(e)} className='bg-gray-800 hover:gray-700 px-2'>❌</button>
                </td>
                <td className='px-4 text-left'>
                  {e.terms.word}
                </td>
                <td className='hidden sm:table-cell'>
                  <span className='px-1 md:px-2 text-xs font-medium text-blue-100 text-center'>
                    <div className='w-auto md:w-full bg-gray-200 rounded-full dark:bg-gray-800'>
                      <div
                        className='bg-blue-600 leading-none rounded-full'
                        style={{ width: `${(e.easiness * 100) / 5}%` }}> {(e.easiness * 100) / 5}%
                      </div>
                    </div>
                  </span>
                </td>

                {/* next_review_date */}

                <td className="hidden md:table-cell">
                  {e.next_review_date}
                </td>

                {/* numb repetitions */}
                <td className="test-center">
                  <span> {e.repetitions}</span>
                </td>

                {/* review today? */}
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
