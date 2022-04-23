import * as types from './types'

export const get_book = () => async dispatch => {
    try {
        const res = await fetch("/api/01/wordbook/", {
            method: "GET",
            headers: {
                "Action": "application/json",
                "Content-Type": "application/json"
            },
        })
        const userData = await res.json() 
        // resultado exitoso o fail

        if (res.status === 200) {
            dispatch({
                type: types.GET_BOOK_SUCCESS,
                payload: userData.success  // => res wordbook user data user
            })
        } else {
            dispatch({
                type: types.GET_BOOK_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: types.GET_BOOK_FAIL
        })


    }
}