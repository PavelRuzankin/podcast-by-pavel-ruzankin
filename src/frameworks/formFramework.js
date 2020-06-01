export function createControls(config, validation = {}, touched = false, value = ""){
    return {
        ...config,
        value: value,
        errorMessage: null,
        touched,
        validation
    }
}

function questionSymbol(value){
    const arrValue = value.slice("")
    return arrValue[arrValue.length - 1] === "?"
}

function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

export function isValid({ value, errorMessages, validation}){
    if(Object.keys(validation).length === 0){
        return null
    }

    let errorMessage = null

    if(validation.questionSymbol){
        if(!questionSymbol(value)){
            errorMessage = errorMessages.noQuestionSymbol
        }
    }

    if(validation.required){
        if(!value.trim()){
            errorMessage = errorMessages.short
        }
    }
    if(validation.minLength){
        if(validation.minLength > value.length){
            errorMessage = errorMessages.short
        }
    }
    if(validation.email){
        if(!validateEmail(value)){
            errorMessage = errorMessages.invalidEmail
        }
    }
    return errorMessage
}

export function getAskFormControls(ownerValue, questionValue, detailsValue, mode = "create", id=null, disabled=true, touched){
    const errorMessages = {
        ownerControl:{
            short: "Не забудь представится"
        },
        questionControl:{
            short: "Вопрос слишком короткий",
            long: "Вопрос слишком длинный",
            noQuestionSymbol: 'Вопрос должен оканчиватся на "?"'
        },
    }
    return {
       id,
       disabled,
       loading: false,
       mode,
       questions: [],
       controls: {
            ownerControl: createControls( {label: "Как тебя зовут?", type: "text", name: "ownerControl",
                          errorMessages: errorMessages.ownerControl},{required: true}, touched, ownerValue),
            questionControl: createControls({label: "Что хочешь спросить?",type: "text", name: "questionControl",
                             errorMessages: errorMessages.questionControl}, {required: true, minLength: 7, questionSymbol: true}, touched, questionValue),
            detailsControl: createControls({label: "Детали Вопроса",type: "textarea", name: "detailsControl"}, touched, detailsValue)
       }
    }
}

export function getAuthFormControls(){
    const errorMessages = {
        email: {
            short: "Короткий E-mail!",
            invalidEmail: "Не валидный E-mail!"
        },
        password: {
            short: "Пароль слишком короткий!"
        }
    }

    return {
        idToken: null,
        loading: false,
        disabled: true,
        controls: {
            emailControls: createControls({label: "Введи e-mail", type: "text", name: "emailControls",
                           errorMessages: errorMessages.email}, {required: true, email: true}),
            passwordControls: createControls({label: "Введи пароль", type: "password", name: "passwordControls",
                           errorMessages: errorMessages.password}, {required: true, minLength: 6})
        }
    }
}

export function getAnswerControls(){
    const errorMessages = {
        short: "Не забудь ввести вопрос"
    }

    return {
        loading: false,
        disabled: true,
        openModal: true,
        controls: {
            answerControls: createControls({label: "Введи ответ", type: "textarea", name: "answerControls",
                                            errorMessages: errorMessages}, {required: true})
        }
    }
}
