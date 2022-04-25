import { combineReducers } from 'redux'
import authReducer from './auth'
import bookReducer from './wordbook'

const reducers = {
    auth: authReducer,
    user_book: bookReducer,
}

export default combineReducers(reducers)