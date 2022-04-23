import * as types from '../actions/types'

const initial_state = {
    user_book : []
}


const bookReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {
        case types.GET_BOOK_SUCCESS:
            return   { ...state, user_book : payload}
        case types.GET_BOOK_FAIL:
            return { ...state}

        default:
            return state;
    }
}

export default bookReducer