import React from "react"
import Button from "../UI/Button";
import Input from "../UI/Input"
import Loader from "./SmallLoader";
import { requestServer } from "../frameworks/requestServer";
import { isValid, createControls } from "../frameworks/formFramework";
import { getLastAgo } from "../frameworks/getLastAgo";
import { getSortArray } from "../frameworks/getSortedArray";

class Comments extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            disabled: true,
            commentsControl: createControls({label: "Комментировать", type: "text"}, {required: true}, false),
            comments: {},
        }
    }

    componentDidMount(){
        this.getComments()
    }

    getComments(){
        this.setState({loader: true})
        requestServer("GET", `userQuestions/${this.props.id}/comments.json`).then(comments => this.setState({comments, loader: false}))
    }

    commentChangeHandler = (n, value) => {
        const commentsControl = {...this.state.commentsControl}
         commentsControl.value = value
         commentsControl.touched = true
         commentsControl.errorMessage = isValid({value: commentsControl.value, errorMessages: {short: "Не забудь ввести коммент!"}, validation: commentsControl.validation}),
         this.setState({commentsControl})
         this.setState({disabled: (this.state.commentsControl.errorMessage && this.state.commentsControl.touched)})
    }

    createComment = (event) => {
        this.setState({disabled: true})
        event.preventDefault()
        const owner = JSON.parse(localStorage.getItem("owner")) || "Неизвестный пользователь"
        
        const comment = {
            owner,
            text: this.state.commentsControl.value,
            date: new Date()
        }
        requestServer("POST", `userQuestions/${this.props.id}/comments.json`, comment).then(() => {
            this.setState({commentsControl: createControls({label: "Комментировать", type: "text"}, {required: true}, false)})
            this.setState({disabled: false})
            this.getComments()
        })
    }

    renderCommentCreator = () => {
        if(this.props.showCreator){
            return (
                <form className={"create-comment"} onSubmit={this.createComment}>
                    <Input label={this.state.commentsControl.label} errorMessage={this.state.commentsControl.errorMessage} 
                           touched={this.state.commentsControl.touched} value={this.state.commentsControl.value} onChange={this.commentChangeHandler}/>
                    <Button title={"Отправить"} disabled={this.state.disabledCreateComment}/>
                    {this.state.loader ? <Loader/> : null}
                </form>
            )
        }
    }

    renderComments = () => {
        if(!this.props.showComments){
            return
        }
        if(!this.state.comments || Object.keys(this.state.comments).length === 0){
            return <h3>Комментариев пока нет...</h3>
        }
        return (
            <ol className={"rounded"}>
                {
                    getSortArray(this.state.comments).map((elem, index) => {
                        return  <li key={elem.date}><span>{elem.owner}: {elem.text} </span> <strong>{getLastAgo(elem.date)}</strong></li>
                    })
                }
            </ol>
        )
    }

    render(){
        return (
            <div className={"Comments"}>
               {this.renderCommentCreator()}
               <h2 className={"show-btn"} onClick={this.props.showCommentsHandler}>{this.props.showComments ? 'Скрыть комментарии' : 'Показать коментарии'}</h2>
               {this.renderComments()}
            </div>
         )
    }
}

export default Comments