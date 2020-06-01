import React, { useEffect, useContext, useState } from  "react"
import Loader from "./RoundLoader.jsx"
import AskItem from "./AskItem.jsx"
import RoundLoader from "./RoundLoader";
import { connect } from "react-redux";
import { setQuestions } from "../store/actions/askListAction.js";

class AskList extends React.Component{

    renderAskItems(){
        const {questions} = this.props.askList
        if( Object.keys(questions).length !== 0){
            return questions.map((elem, index) => {
                return <AskItem number={index} key={elem.id} question={elem.question.questionText} owner={elem.question.owner} 
                        details={elem.question.details} id={elem.id} date={elem.date}/>
            })
        }else{
            return <h1>Пока вопросов нет...</h1>
        }
    }

    componentDidMount(){
        this.props.setQuestions()
    }

    render(){
        return (
            <section className={"AskList"}>
                {this.props.askList.loading ? <RoundLoader/>: null}
                {this.renderAskItems()}
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        askList: state.askList
    }
}

function mapDispatchToProps(dispatch){
    return {
        setQuestions: () => dispatch(setQuestions())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AskList)