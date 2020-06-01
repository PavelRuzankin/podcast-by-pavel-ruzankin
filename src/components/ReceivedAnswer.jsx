import React from "react"
import Modal from "./Modal"
import { getLastAgo } from "../frameworks/getLastAgo"

class ReceivedAnswer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            openAnswer: false,
        }
    }

    openAnswerHandler = () => {
        this.setState({openAnswer: !this.state.openAnswer})
    }
    render(){
        console.log(this.props);
        return (
            <>
           {this.state.openAnswer ? <Modal onClick={this.openAnswerHandler}>
                <div className={"AnswerItem"}>
                    <h2>Ответ:</h2>
                    <div>{this.props.answer.text}</div>
                    <h3>{getLastAgo(this.props.answer.date)}</h3>
                </div>
            </Modal> : null}
                <span className={"ReceivedAnswer no-touched"} onClick={this.openAnswerHandler}>Получен Ответ</span>
            </>
        )
    }
}

export default ReceivedAnswer