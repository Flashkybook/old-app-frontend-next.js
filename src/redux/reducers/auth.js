import * as types from '../actions/types'

const initial_state = {
    user: true,
    is_auth: false,
    auth_status: '',
    error: null
}


const authReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {
        case types.AUTH_VERIFY:
            return {...state, is_auth: true, user: payload}

        case types.LOGIN_SUCCESS:
            return { ...state, is_auth: true }

        case types.LOGOUT_SUCCESS:
            return { ...state, is_auth: false, user: null }

        case types.AUTH_FAIL:
            return { ...state, is_auth: false, error: payload,  user: null }

        case types.ACTION_FAIL:
            return { ...state, error: payload,  user: null}

        default:
            return state;
    }
}

export default authReducer