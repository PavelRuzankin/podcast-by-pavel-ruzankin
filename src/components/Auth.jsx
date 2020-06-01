import React from "react";
import {connect} from "react-redux"
import Input from "../UI/Input";
import Button from "../UI/Button";
import { changeAuthValue, signIn } from "../store/actions/authActions";
import Loader from "./SmallLoader"

class Auth extends React.Component{
    constructor(props){
        super(props)
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.signIn()
    }

    render(){
        return (
            <div className={"Auth"}>
                <h1>Автоизация</h1>
                <form onSubmit={this.submitHandler}>
                    {Object.keys(this.props.auth.controls).map(elem=> {
                        const control = this.props.auth.controls[elem]
                        return <Input onChange={this.props.changeValue} key={elem} name={elem} label={control.label} type={control.type} value={control.value}
                                errorMessage={control.errorMessage} touched={control.touched}/>
                    })}
                    <Button disabled={this.props.auth.disabled} title={"Войти"}/>
                    {this.props.auth.loading ? <Loader/> : null}
                </form>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return {
        signIn: () => dispatch(signIn()),
        changeValue: (controlName, value) => dispatch(changeAuthValue(controlName,value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)