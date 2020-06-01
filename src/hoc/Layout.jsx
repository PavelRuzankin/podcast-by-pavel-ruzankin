import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "../components/Modal"
import Auth from "../components/Auth"

class Layout extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openModal: false
        }
    }
    openModalHandler = () => {
        this.setState({openModal: !this.state.openModal})
    }
    render(){
        return (
            <div className={"Layout"}>
                <header>
                    <h1>PODCAST</h1>
                    <span>By Pavel Ruzankin</span>
                </header>
                <main>
                    <div className={"container"}>
                        <h1>Задай мне вопрос, С*ка</h1>
                        {this.props.children}
                    </div>
                </main>
                <div className={"auth-btn"} onClick={this.openModalHandler}><FontAwesomeIcon icon={"sign-in-alt"} size={"2x"}/></div>
                {this.state.openModal ? 
                <Modal onClick={this.openModalHandler}>
                    <Auth/>
                </Modal>: null}
            </div>
        )
    }
}

export default Layout