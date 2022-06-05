import { delete_user_book } from '../../redux/actions/wordbook'
import { useDispatch, useSelector } from 'react-redux'

export default function UserBookList() {

  const dispatch = useDispatch()

  const deleteUserBook = (e) => { dispatch(delete_user_book(e)) }

  const cards = useSelector(e => e.user_book.cards)
  const today = useSelector(e => e.user_book.today)

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



  return (
    <div className='' >
      <span className='w-full flex flex-col justify-center text-center text-2xl font-bold underline my-2'>
        Your WordBook List
      </span>

      <table className='w-full'>
        <thead>
          <tr className='text-left'>
            <th ></th>
            <th >Word</th>
            <th >progress</th>
            <th >last review</th>
            <th >Next review</th>
            <th >Rps</th>

          </tr>
        </thead>
        <tbody>
          {all_cards && all_cards.map((e, i) => (
            <tr className='border-t-2 border-slate-900 px-2 pb-0' key={i}>
              <td>
                <button onClick={() => deleteUserBook(e)} className='text-red-600 font-bold text-2xl mx-4'>x</button>
              </td>
              <td>{e.terms.word}</td>
              <td className='mx-5 pr-5'>
                <span className='text-[0.75rem] text-blue-100 text-center'>
                  <div className='w-auto md:w-full bg-gray-900 rounded-full border-2 border-black '>
                    <div
                      className='bg-slate-600 leading-none rounded-full'
                      style={{ width: `${(e.easiness * 100) / 5}%` }}> {(e.easiness * 100) / 5}%
                    </div>
                  </div>
                </span>
              </td>
              <td>
                {e.last_review}
              </td>
              <td>

                {e.next_review_date}
              </td>
              <td>

                {e.repetitions}
              </td>


            </tr>

          ))}
        </tbody>

      </table>
    </div>

  )
}
