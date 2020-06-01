import { requestServer } from "../../frameworks/requestServer"
import { SET_QUESTIONS, SET_LIST_LOADING } from "../actionTypes"
import {getSortArray} from "../../frameworks/getSortedArray"

export function setQuestions(){
    return (dispatch) => {
        setLoading(dispatch)
        requestServer("GET", "userQuestions.json").then(data => {
            if(data){
                dispatch({type: SET_QUESTIONS, payload: getSortArray(data)})
            }
            setLoading(dispatch)
        })
    }
}
export function deleteQuestion(id, number){
    return (dispatch, getState) => {
        requestServer("DELETE", `userQuestions/${id}/.json`)
        const questions = getState().askList.questions
        questions.splice(number, 1)
        dispatch({type: SET_QUESTIONS, payload: questions})
    }
}

function setLoading(dispatch){
    dispatch({type: SET_LIST_LOADING})
}