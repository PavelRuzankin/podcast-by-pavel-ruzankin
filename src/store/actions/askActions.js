import { isValid } from "../../frameworks/formFramework"
import { SET_VALUE, SET_DISABLED, CLEAR_FORMS, SET_LOADING, SET_QUESTIONS, CHANGE_M0D_TO_CORRECT, CHANGE_M0D_TO_CREATE } from "../actionTypes"
import { requestServer } from "../../frameworks/requestServer"
import { setQuestions } from "./askListAction";

export function changeValue(name, value){
    return (dispatch, getState) => {
        const controls = getState().ask.controls
        const control = controls[name]

        control.touched = true
        control.value = value
        control.errorMessage = isValid(control)

        controls[name] = control

        dispatch({type: SET_VALUE, payload: controls})
        setDisabled(dispatch, getState)
    }
}
function setDisabled(dispatch, getState){

        const controls = getState().ask.controls
        let disabled = true
        Object.keys(controls).forEach(elem=> {
            const control = controls[elem]
            if(!Object.keys(controls[elem].validation).length) return
            disabled = !control.errorMessage && control.touched && disabled
        })

        dispatch({type: SET_DISABLED, payload: !disabled})
}
export function sendQuestion(){

    return (dispatch, getState) => {
        const questionText = getState().ask.controls.questionControl.value
        const owner = getState().ask.controls.ownerControl.value
        const details = getState().ask.controls.detailsControl.value
        const completedQuestion = {
            date: new Date(),
            question: {questionText, owner, details},
            likeCount: 0,
            comments: {},
        }
        setLoading(dispatch)
        dispatch({type: SET_DISABLED, payload: true})

        requestServer("POST", `userQuestions.json`, completedQuestion).then(response => {
            clearForms(dispatch)
            changeLocalStorage(response.name, "myIdQuestions")
            addNameToLocalStorage(owner)
            setQuestions()(dispatch)
        }).catch(err =>console.log(err))
    }
}

export function correctQuestion(id){
    return (dispatch, getState) => {
        const questionText = getState().ask.controls.questionControl.value
        const owner = getState().ask.controls.ownerControl.value
        const details = getState().ask.controls.detailsControl.value
        let completedQuestion = {question: {questionText, owner, details}}
        setLoading(dispatch)
        dispatch({type: SET_DISABLED, payload: true})

        requestServer("GET", `userQuestions/${id}.json`).then(data => {
            completedQuestion = {
                ...completedQuestion,
                date: data.date,
                likeCount: data.likeCount,
                comments: data.comments

            }
            requestServer("PUT", `userQuestions/${id}.json`, completedQuestion).then(response => {
                clearForms(dispatch)
                changeLocalStorage(response.name, "myIdQuestions")
                addNameToLocalStorage(owner)
                setQuestions()(dispatch)
            }).catch(err =>console.log(err))
        })
    }
}

function addNameToLocalStorage(name){
    localStorage.setItem("owner", JSON.stringify(name))
}

function setLoading(dispatch){
    return dispatch({type: SET_LOADING})
}

export function changeLocalStorage(id, idQuestions, canIPutLike = true){
    let questions = localStorage.getItem(idQuestions)
    if(questions){
        questions = JSON.parse(questions)
    }else{
        questions = []
    }

    questions.forEach((elem, index) => {
        if(elem.id === id) questions.splice(index, 1)
    })
    questions.push({id, canIPutLike})
    localStorage.setItem(idQuestions, JSON.stringify(questions))
}

function clearForms(dispatch){
        dispatch({type: CLEAR_FORMS})
}

export function changeModToCorrect(owner, question, details, id){
    scrollToTop()
    return (dispatch) => {
        dispatch({type: CHANGE_M0D_TO_CORRECT, payload: {owner, question, details, id}})
    }
}

export function changeModToCreate(){
    return (dispatch) => {
        dispatch({type: CHANGE_M0D_TO_CREATE})
    }
}

function scrollToTop(){
    let timer
    let scrolled = window.pageYOffset
    scroll()
    function scroll(){
        if(scrolled > 0){
            window.scrollTo(0, scrolled)
            scrolled = scrolled - 20
            let timer = setTimeout(scroll, 1)
        }else{
            clearTimeout(timer)
            window.scrollTo(0,0)
        }
    }
}



