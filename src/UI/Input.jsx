import React from "react"

const Input = props => {
    const classes = ["Input"]
    if(props.errorMessage && props.touched){
        classes.push("error")
    }

    const htmlFor = `${props.type}${parseInt(Math.random() * 100)}`

    return (
        <div className={classes.join(" ")}>
            <label htmlFor={htmlFor}>{props.label}</label>
            {props.type === "textarea" ?
            <textarea onChange={(e) => props.onChange(props.name, e.target.value)} type={"text"} value={props.value} id={htmlFor}></textarea>
            :
            <input type={props.type || "text"} onChange={(e) => props.onChange(props.name, e.target.value)}  value={props.value} id={htmlFor} />}
            <span>{props.errorMessage}</span>
        </div>
    )
}


export default Input
