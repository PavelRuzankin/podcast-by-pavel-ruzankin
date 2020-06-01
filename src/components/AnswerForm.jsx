import React from "react"
import { connect } from "react-redux";
import Button from "../UI/Button"
import Input from "../UI/Input";
import { changeAnswerValue, sendAnswer } from "../store/actions/answerAction";
import Loader from "./SmallLoader";

class AnswerForm extends React.Component{
    constructor(props){
        super(props)
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.sendAnswer(this.props.id)
    }

    componentDidUpdate(){
        if(!this.props.answer.openModal){
            this.props.closeModal()
        }
    }
    render(){
        return (
            <div className={"AnswerForm"}>
                <form onSubmit={this.submitHandler}>
                    {Object.keys(this.props.answer.controls).map(elem => {
                        const control = this.props.answer.controls[elem]
                        return <Input onChange={this.props.onChange} name={elem} key={control} label={control.label} type={control.type} touched={control.touched}
                                value={control.value} errorMessage={control.errorMessage}/>
                    })}
                    <Button title={"Готово!"} disabled={this.props.answer.disabled}/>
                    {this.props.answer.loading ? <Loader/> : null}
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        answer: state.answer
    }
}

function mapDispatchToProps(dispatch){
    return {
        onChange: (controlName, value) => dispatch(changeAnswerValue(controlName, value)),
        sendAnswer: (id) => dispatch(sendAnswer(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm)