import * as types from '../actions/types'

const initial_state = {
    cards: [],
    current: 0,
    session_study: false,
    cards_session: [], // son las cartas que seran envidas al backend para su setteo,
    error: null,
    commit: 5
}


const bookReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {
        case types.GET_BOOK_SUCCESS:
            return { ...state, cards: payload}
        case types.GET_BOOK_FAIL:
            return { ...state }

        // SET CURRENT
        case types.RESET_CURRENT:
            return { ...state, current: 0 }

        case types.NEXT_CURRENT:
            return { ...state, current: state.current + payload }

        case types.PREVIOUS_CURRENT:
            return state.current > 0 ? { ...state, current: state.current + payload } : { ...state }


        case types.SET_CURRENT_FAIL:
            return { ...state }

        // SESSION
        case types.SET_WORD_STUDY:
            return { ...state }

        case types.NEW_STUDY_SESSION:
            const study_commit = state.commit // seteable por configuracion de usuario poximamente
            // ordena por easiness mayor
            const cards = state.cards
            function compare(a, b) {
                if (a.repetitions < b.repetitions) {
                    return -1;
                }
                if (a.repetitions > b.repetitions) {
                    return 1;
                }
                return 0;
            }

            
            const lista =  cards.filter(e=> e.next_review_date === "2022-04-29" || e.next_review_date === null)
            // if (list_order.length === 0){
            // }

            if (lista.length === 0){
                console.log("valio")
                lista = cards.sort(compare);    
            }

            console.log(lista)

            
            const list = lista.slice(0, study_commit)    

            return { ...state, cards_session: list, session_study:true, current: 0 }
        case types.SESSION_STUDY_END:
            return { ...state, cards_session: [], session_study: false, current: 0 }

        default:
            return state;
    }
}

export default bookReducer