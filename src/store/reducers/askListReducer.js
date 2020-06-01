import { SET_QUESTIONS, SET_LIST_LOADING } from "../actionTypes"

const initialState = {
    questions: {},
    loading: false
}

const handlers = {
    [SET_QUESTIONS]: (state, action) => ({...state, questions: action.payload}),
    [SET_LIST_LOADING]: (state) => ({...state, loading: !state.loading}),
    DEFAULT: state => state
}

export default function askListReducer(state = initialState, action){
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}