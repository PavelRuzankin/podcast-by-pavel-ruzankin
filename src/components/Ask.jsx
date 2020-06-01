import React from "react"
import Input from '../UI/Input.jsx'
import Button from "../UI/Button.jsx"
import { connect } from "react-redux";
import { changeValue, sendQuestion, changeModToCreate, correctQuestion } from "../store/actions/askActions";
import SmallLoader from "./SmallLoader.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Ask extends React.Component{
    submitHandler = (e) => {
        e.preventDefault()
        if(this.props.ask.mode === "create"){
            this.props.sendQuestion()
        }else{
            this.props.correctQuestion(this.props.ask.id)
        }
    }
    renderInputs(){
        return Object.keys(this.props.ask.controls).map(elem => {
            const control = this.props.ask.controls[elem]
            
            return <Input key={control.name} onChange={this.props.changeValue} name={control.name} label={control.label} type={control.type}
                          value={control.value} touched={control.touched} errorMessage={control.errorMessage} />
        })
    }

    getTitle = () => {
        switch(this.props.ask.mode){
            case "correct":
                return "Исправить"
            case "create":
                return "Спросить"
            default:
                return "Кнопочка"
        }
    }
    render(){
        return (
            <div className={"Ask"}>
                {this.props.ask.mode==="correct" ? <button className={"change"} onClick={this.props.changeModToCreate}><FontAwesomeIcon icon={"times"} size={"3x"}/></button> : null}
                <form onSubmit={this.submitHandler}>
                   {this.renderInputs()}
                    <Button title={this.getTitle()} disabled={this.props.ask.disabled} />
                    {this.props.ask.loading ? <SmallLoader/>: null}
                </form>
                <hr/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        ask: state.ask
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeValue: (name, value) => dispatch(changeValue(name, value)),
        sendQuestion: (method, id) => dispatch(sendQuestion(method, id)),
        changeModToCreate: () => dispatch(changeModToCreate()),
        correctQuestion: (id) => dispatch(correctQuestion(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ask)