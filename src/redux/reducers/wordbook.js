import * as types from '../actions/types'

const initial_state = {
    cards: [],
    current: 1,
    current_sesion : [], // son las cartas que seran envidas al backend para su setteo,
    error : null
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

        default:
            return state;
    }
}

export default bookReducer