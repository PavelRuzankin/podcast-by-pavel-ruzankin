import { getAnswerControls } from "../../frameworks/formFramework"
import { SET_ANSWER_VALUE, SET_ANSWER_DISABLED, SET_ANSWER_LOADING, CLEAR_ANSWER_FORMS, CLOSE_ANSWER_MODAL } from "../actionTypes"

const initialState = getAnswerControls()

const handlers = {
    [SET_ANSWER_VALUE]: (state, action) => ({...state, controls: action.payload}),
    [SET_ANSWER_DISABLED]: (state, action) => ({...state, disabled: action.payload}),
    [SET_ANSWER_LOADING]: (state) => ({...state, loading: !state.loading}),
    [CLOSE_ANSWER_MODAL]: (state) => ({...state, openModal: false}),
    [CLEAR_ANSWER_FORMS]: () => getAnswerControls(),
    DEFAULT: state => state
}

export default function answerReducer(state = initialState, action){
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}