import React from "react"

const Button = ({disabled, title, onClick}) => {
    return <button onClick={onClick || null } className={"Button"} disabled={disabled || false}>{title}</button>
}

export default Button