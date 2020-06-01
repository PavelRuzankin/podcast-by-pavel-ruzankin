import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../UI/Button"
import Modal from "./Modal"
import ReceivedAnswer from"./ReceivedAnswer"

export default ({idToken, likeCount, isOwner, owner, question, details, id, number, answer, openModal, functions}) => {


    const renderModal = () => {
        return (
            <Modal onClick={functions.openModalHandler}>
                <h2>Вы действительно хотите удалить вопрос?</h2>
                <Button onClick={() => functions.deleteQuestion(id, number)} title={"Да!"}/>
            </Modal>
        )
    }

    return (
        <>
            {openModal ? renderModal() : null}
            <div className={"actions"}>
                {idToken ? <Button onClick={() => functions.openModalHandler("openAnswerModal")} title={"Ответить"} disabled={false}/>:null}
                <div className={"action"}>
                    <span>{likeCount ? likeCount : null}</span>
                    <button onClick={functions.putLike}><FontAwesomeIcon icon={"thumbs-up"} color={"white"} size={"2x"}/></button>
                </div>
                <div className={"action"}>
                    <button onClick={functions.showCreatorHandler}><FontAwesomeIcon icon={"comment-alt"} color={"white"} size={"2x"}/></button>
                </div>
                {isOwner ?
                    <div className={"action"}>
                    <button onClick={() => functions.changeModToCorrect(owner, question, details, id)}><FontAwesomeIcon icon={"pen"} color={"white"} size={"2x"}/></button>
                </div> : null
                }
                {answer ? <ReceivedAnswer answer={answer}/>: null }
            </div>
        </>
    )
}