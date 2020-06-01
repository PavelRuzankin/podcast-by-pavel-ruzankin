import { isValid } from "../../frameworks/formFramework"
import { SET_AUTH_VALUE, SET_AUTH_DISABLED, SET_AUTH_LOADING, AUTH_SUCCESS, LOGOUT, CLEAR_AUTH_FORMS } from "../actionTypes"

export function changeAuthValue(controlName, value){
    return (dispatch, getState) => {
        const controls = getState().auth.controls
        const control = controls[controlName]

        control.touched = true
        control.value = value

        control.errorMessage = isValid(control)

        controls[controlName] = control

        dispatch({type: SET_AUTH_VALUE, payload: controls})
        dispatch(setAuthDisabled())
    }
}

export function setAuthDisabled(){
    return (dispatch, getState) => {
        const controls = getState().auth.controls
        let disabled = true
        Object.keys(controls).forEach(elem=> {
            const control = controls[elem]
            if(!Object.keys(controls[elem].validation).length) return
            disabled = !control.errorMessage && control.touched && disabled
        })

        dispatch({type: SET_AUTH_DISABLED, payload: !disabled})
    }
}

function authSuccess(idToken){
    return {type: AUTH_SUCCESS, payload: idToken}
}

export function signIn(){
    return  (dispatch, getState) => {
        dispatch(setAuthLoading())
        const authData = {
            email: getState().auth.controls.emailControls.value,
            password: getState().auth.controls.passwordControls.value,
            returnSecureToken: true
        }
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQwtXMBKwNRSPSwPfnqZOv-fcE-Hw4gto`, {
            method: "POST",
            body: JSON.stringify(authData)
        })
        .then(response => response.json())
        .then(data => {
            debugger
            const expirationDate = new Date(new Date().getTime(data.expiresIn * 1000))

            localStorage.setItem("token", data.idToken)
            localStorage.setItem("userId", data.localId)
            localStorage.setItem("expirationDate", expirationDate)
            dispatch({type: CLEAR_AUTH_FORMS})
            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))
        })
        .catch(err => console.log(err))
        dispatch(setAuthLoading())
    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => dispatch(logout()), time * 1000)
    }
}

export function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("expirationDate")
    return {type: LOGOUT}
}

export function setAuthLoading(){
    return dispatch => {
        dispatch({type: SET_AUTH_LOADING})
    }
}