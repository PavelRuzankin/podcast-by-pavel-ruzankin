import { getAskFormControls } from "../../frameworks/formFramework";

import { SET_VALUE, SET_DISABLED, CLEAR_FORMS, SET_LOADING, CHANGE_M0D_TO_CORRECT, CHANGE_M0D_TO_CREATE  } from "../actionTypes";

const initialState = getAskFormControls()

const handlers = {
    [SET_VALUE]: (state, action) => ({...state, controls: action.payload}),
    [SET_DISABLED]: (state, action) => ({...state, disabled: action.payload}),
    [SET_LOADING] : state => ({...state, loading: !state.loading}),
    [CHANGE_M0D_TO_CORRECT]: (state, action) => getAskFormControls(action.payload.owner, action.payload.question, action.payload.details, "correct", action.payload.id, false, true),
    [CHANGE_M0D_TO_CREATE]: () => getAskFormControls(),
    [CLEAR_FORMS]: () => getAskFormControls(),
    DEFAULT: state => state
}

export default function askReducer(state = initialState, action){
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
