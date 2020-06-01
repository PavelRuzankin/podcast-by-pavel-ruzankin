import { SET_ANSWER_VALUE, SET_ANSWER_DISABLED, SET_ANSWER_LOADING, CLEAR_ANSWER_FORMS, CLOSE_ANSWER_MODAL } from "../actionTypes"
import { isValid } from "../../frameworks/formFramework"
import { requestServer } from "../../frameworks/requestServer"

export function changeAnswerValue(controlName, value){
    return (dispatch, getState) => {
        const controls = getState().answer.controls
        const control = controls[controlName]

        control.touched = true
        control.value = value

        control.errorMessage = isValid(control)

        controls[controlName] = control

        dispatch({type: SET_ANSWER_VALUE, payload: controls})
        dispatch(setAnswerDisabled())
    }
}

export function setAnswerDisabled(){
    return (dispatch, getState) => {
        const disabled = getState().answer.controls.answerControls.errorMessage
        dispatch({type: SET_ANSWER_DISABLED, payload: !!disabled})
    }
}

export function sendAnswer(id){
    return (dispatch, getState)=>{
        dispatch({type: SET_ANSWER_DISABLED, payload: true})
        dispatch({type: SET_ANSWER_LOADING})
        const answer = {
            text: getState().answer.controls.answerControls.value,
            date: new Date()
        }

        requestServer("PUT", `userQuestions/${id}/answer.json`, answer).then(response => {
            dispatch({type: SET_ANSWER_DISABLED, payload: false})
            dispatch({type: SET_ANSWER_LOADING})
            dispatch({type: CLEAR_ANSWER_FORMS})
            dispatch({type: CLOSE_ANSWER_MODAL})
        })
    }
}