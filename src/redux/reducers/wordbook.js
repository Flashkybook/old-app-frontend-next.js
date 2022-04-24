import * as types from '../actions/types'

const initial_state = {
    user_book: [],
    current: 1
}


const bookReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {
        case types.GET_BOOK_SUCCESS:
            return { ...state, user_book: payload }
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