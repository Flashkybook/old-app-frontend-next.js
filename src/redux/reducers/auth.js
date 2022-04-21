import * as types from '../actions/types'

const initial_state = {
    user: null,
    is_auth: false,
}

const authReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {
        default:
            return state;
    }
}

export default authReducer