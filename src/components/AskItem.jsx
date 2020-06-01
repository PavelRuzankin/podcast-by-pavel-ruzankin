import React from  "react"
import {connect} from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLastAgo } from "../frameworks/getLastAgo";
import Modal from "./Modal"
import Comments from "./Comments"
import Button from  "../UI/Button"
import { requestServer } from "../frameworks/requestServer";
import { changeLocalStorage, changeModToCorrect } from "../store/actions/askActions";
import { deleteQuestion } from "../store/actions/askListAction";
import AnswerForm from "./AnswerForm";
import Actions from "./Actions";

 class AskItem extends React.Component{
     constructor(props){
         super(props)
         this.state = {
            whoseQuestion: "myIdQuestions",
            isOwner: false,
            showCreator: false,
            showComments: false,
            lastAgo: "",
            likeCount: null,
            canIPutLike: false,
            openClosModal: false,
            openAnswerModal: false,
            classes: ["scaleOff"]
         }
     }
     findIdQuestions(idQuestions){
        const idQuestionsArray = JSON.parse(localStorage.getItem(idQuestions)) || []
         return idQuestionsArray.find(elem => elem.id === this.props.id)
     }
     setCanIPutLike(){
         if(localStorage.getItem("myIdQuestions") || localStorage.getItem("otherIdQuestions")){
            let idQuestion = this.findIdQuestions("myIdQuestions") || this.findIdQuestions("otherIdQuestions")
            if(!idQuestion){
                this.setState({whoseQuestion: "otherIdQuestions",})
                changeLocalStorage(this.props.id, "otherIdQuestions")
                idQuestion = this.findIdQuestions("otherIdQuestions")
            }

            this.setState({canIPutLike: idQuestion.canIPutLike})
         }else{
             this.setState({canIPutLike: true})
         }
     }
     checkIsOwner(){
        if(localStorage.getItem("myIdQuestions")){
            const myIdQuestions = JSON.parse(localStorage.getItem("myIdQuestions"))
            this.setState({isOwner: myIdQuestions.some(elem => elem.id === this.props.id)})
        }else{
            this.setState({isOwner: false})
        }
     }

     setLikeAndCommentCount(){
         return requestServer("GET", `userQuestions/${this.props.id}/likeCount.json`).then(count => this.setState({likeCount: count}))
         .catch(err => console.log(err))
     }

     sendLikeCount(likeCount){
         requestServer("PUT", `userQuestions/${this.props.id}/likeCount.json`, likeCount).then(likeCount => {
             console.log(likeCount);

            this.setState({likeCount})
         });

     }

     putLike = () => {
         if(this.state.canIPutLike){
            this.setState({likeCount: this.state.likeCount + 1})
            this.sendLikeCount(this.state.likeCount + 1)
         }else{
            this.setState({likeCount: this.state.likeCount - 1})
            this.sendLikeCount(this.state.likeCount - 1)
         }
         changeLocalStorage(this.props.id, this.state.whoseQuestion, !this.state.canIPutLike)
         this.setCanIPutLike()
     }

     getAnswer(){
        requestServer("GET", `userQuestions/${this.props.id}/answer.json`).then(data => {
            const answer = data || null
            this.setState({answer})
        })
     }

     componentDidMount(){
         this.setState({lastAgo: getLastAgo(this.props.date)})
         this.checkIsOwner()
         this.setCanIPutLike()
         this.setLikeAndCommentCount()
         this.getAnswer()
         setTimeout(() => this.setState({classes: [...this.state.classes, "scaleOn"]}), 10)
     }

     showCommentsHandler = () => {
         this.setState({showComments: !this.state.showComments})
     }

     deleteQuestion = (id, number) => {
         this.openModalHandler()
         this.setState({classes: ["scaleOff"]})

        setTimeout(()=>this.props.deleteQuestion(id, number), 300)
     }

     openModalHandler = (modelType) =>{
        this.setState({[modelType]: !this.state[modelType]})
     }

    renderModal = () => {
        if(this.state.openAnswerModal){
            return (
               <Modal onClick={()=>this.setState({openAnswerModal: !this.state.openAnswerModal})}>
                   <AnswerForm closeModal={() => this.setState({openAnswerModal: !this.state.openAnswerModal})} id={this.props.id}/>
               </Modal>
            )
        }
    }

    showCreatorHandler = () => this.setState({showCreator: !this.state.showCreator})

    render(){
        const {question, owner, details, id} = this.props
        return (
            <>
                {this.renderModal()}
                <div className={this.state.classes.join(" ")}>
                <div className={"AskItem"}>
                    <div className={"eve"}>
                        <div className={"number"}><h2>{this.props.number+1}</h2></div>
                        {this.state.isOwner ?
                         <button className={"button"} onClick={() => this.openModalHandler("openCloseModal")}><FontAwesomeIcon icon={"times"} color={"white"} size={"2x"}/></button>
                         : null
                        }
                    </div>
                    <h4>Вопрос от: {owner}</h4>
                    <h2>{question}</h2>
                    <p>{details}</p>
                    <span>{this.state.lastAgo}</span>
                    <Actions idToken={this.props.auth.idToken} likeCount={this.state.likeCount} isOwner={this.state.isOwner} answer={this.state.answer} 
                        owner={owner} question={question} details={details} id={id} openModal={this.state.openCloseModal} number={this.props.number}
                        functions={{
                            putLike: this.putLike,
                            changeModToCorrect: this.props.changeModToCorrect,
                            showCreatorHandler: this.showCreatorHandler,
                            openModalHandler: this.openModalHandler,
                            deleteQuestion: this.deleteQuestion
                        }}
                    />
                </div>
                <Comments id={this.props.id} showCreator={this.state.showCreator} showComments={this.state.showComments} showCommentsHandler={this.showCommentsHandler}/>
            </div>
            </>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeLocalStorage: (id) => dispatch(changeLocalStorage(id)),
        deleteQuestion: (id, number) => dispatch(deleteQuestion(id, number)),
        changeModToCorrect: (owner, question, details, id) => dispatch(changeModToCorrect(owner, question, details, id))
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AskItem)

