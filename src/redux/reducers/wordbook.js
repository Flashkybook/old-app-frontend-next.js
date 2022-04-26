import * as types from '../actions/types'

const initial_state = {
    cards: [],
    current: 1,
    session: [], // son las cartas que seran envidas al backend para su setteo,
    error: null
}


const bookReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {
        case types.GET_BOOK_SUCCESS:
            return { ...state, cards: payload }
        case types.GET_BOOK_FAIL:
            return { ...state }

        // SET CURRENT
        case types.RESET_CURRENT:
            return { ...state, current: 0 }

        case types.ADD_TO_CURRENT:
            return { ...state, current: state.current + payload }

        case types.SUBTRACT_TO_CURRENT:
            return state.current > 0 ? { ...state, current: state.current + payload } : { ...state }

        case types.SET_CURRENT_FAIL:
            return { ...state }

        // SESSION
        case types.CURRENT_SESSION_ADD:
            return { ...state }

        case types.NEW_STUDY_SESSION:

            let study_commit = 2 // seteable por configuracion de usuario poximamente

            // ordena por easiness mayor
            let list_order = state.cards
            function compare(a, b) {
                if (a.easiness < b.easiness) {
                    return 1;
                }
                if (a.easiness > b.easiness) {
                    return -1;
                }
                return 0;
            }
            list_order.sort(compare);

            let list = list_order.slice(0, study_commit)
            return { ...state, session: list }

        default:
            return state;
    }
}

export default bookReducer