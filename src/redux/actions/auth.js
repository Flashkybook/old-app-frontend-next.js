
import * as types from './types'


/** 
* accion de verificacion de usuario enviando el access token al backend
*/
export const auth_action = () => async dispatch => {
    try {
        const res = await fetch('/api/01/user/auth/', {
            method: 'GET',
            headers: {
                'Action': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const userData = await res.json()
        // resultado exitoso o fail
        if (res.status === 200) {
            dispatch({
                type: types.AUTH_VERIFY,
                payload: userData.success  // => res auth user data user
            })
        } else {
            dispatch({
                type: types.AUTH_FAIL,
                payload: userData.error

            })
        }
    } catch (error) {
        dispatch({
            type: types.AUTH_FAIL,
            payload: "error 500"
        })
    }
}


export const login_action = (formData) => async dispatch => {
    const { email, password } = formData
    const const_body = JSON.stringify({ email, password })
    try {
        const res = await fetch('/api/01/user/login/', {
            method: 'POST',
            headers: {
                'Action': 'application/json',
                'Content-Type': 'application/json'
            },
            body: const_body
            
        })
        const data = await res.json()

        // resultado exitoso o fail
        if (res.status === 201) {
            dispatch(auth_action())
            dispatch({
                type: types.LOGIN_SUCCESS
            })
        } else {
            dispatch({
                type: types.AUTH_FAIL,
                payload: data.error
            })
        }
    } catch (error) {
        console.log(const_body)
        dispatch({
            type: types.AUTH_FAIL
        })


    }
}


export const register_action = (formData) => async dispatch => {
    const const_body = JSON.stringify(formData)
    try {
        const res = await fetch('/api/01/user/register/', {
            method: 'POST',
            headers: {
                'Action': 'application/json',
                'Content-Type': 'application/json'
            },
            body: const_body
        })
        const data = await res.json()


        // resultado exitoso o fail
        if (res.status === 201) {
            dispatch(login_action(formData))

            dispatch({
                type: types.REGISTER_SUCCESS
            })
        } else {
            dispatch({
                type: types.ACTION_FAIL,
                payload: data.error
            })
        }

    } catch (error) {
        console.log(const_body)
        dispatch({
            type: types.ACTION_FAIL,
            payload: "Error 500"
        })


    }
}


export const logout_action = () => async dispatch => {
    try {
        const res = await fetch('/api/01/user/logout/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch({
                type: types.LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type: types.ACTION_FAIL,
                payload: "error 500"

            })
        }
    } catch (error) {
        dispatch({
            type: types.ACTION_FAIL,
            payload: "error 500"
        })


    }
}