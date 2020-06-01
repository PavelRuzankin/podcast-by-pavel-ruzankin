import { getAuthFormControls } from "../../frameworks/formFramework"
import { SET_AUTH_VALUE, SET_AUTH_DISABLED, CLEAR_AUTH_FORMS, SET_AUTH_LOADING, AUTH_SUCCESS, LOGOUT } from "../actionTypes"

const initialState = getAuthFormControls()

const handlers = {
    [SET_AUTH_VALUE]: (state, action) => ({...state, controls: action.payload}),
    [SET_AUTH_DISABLED]: (state, action) => ({...state, disabled: action.payload}),
    [CLEAR_AUTH_FORMS]: () => getAuthFormControls(),
    [SET_AUTH_LOADING]: (state) => ({...state, loading: !state.loading}),
    [AUTH_SUCCESS]: (state, action) => ({...state, idToken: action.payload}),
    [LOGOUT]: state => ({...state, idToken: null}),
    DEFAULT: state => state
}

export default function authReducer(state = initialState, action){
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}