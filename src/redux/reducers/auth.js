import * as types from '../actions/types'

const initial_state = {
    user: null,
    is_auth: false,
    auth_status: '',
}


const authReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {
        case types.AUTH_VERIFY:
            return {...state, is_auth: true, user: payload}

        case types.LOGIN_SUCCESS:
            return { ...state, is_auth: true }

        case types.LOGUT_SUCCESS:
            return { ...state, is_auth: false, user: null }

        case types.AUTH_FAIL:
            return { ...state, is_auth: false }

        case types.ACTION_FAIL:
            return { ...state}


        default:
            return state;
    }
}

export default authReducer