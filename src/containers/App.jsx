import React from "react"
import ReactDOM from "react-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPen, faThumbsUp, faCommentAlt, faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import "../../styles/root_style.sass"
import Layout from "../hoc/Layout.jsx"
import Ask from "../components/Ask.jsx"
import AskList from "../components/AskList.jsx"

library.add(fab, faPen, faThumbsUp, faCommentAlt, faTimes, faSignInAlt)


class App extends React.Component{
    render(){
        return (
        <Layout>
            <Ask/>
            <AskList/>
        </Layout>
        )
    }
}

export default App