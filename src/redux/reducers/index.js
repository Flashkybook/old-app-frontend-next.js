import { combineReducers } from 'redux'
import authReducer from './auth'
import bookReducer from './wordbook'

const reducers = {
    auth: authReducer,
    book: bookReducer,
}

export default combineReducers(reducers)