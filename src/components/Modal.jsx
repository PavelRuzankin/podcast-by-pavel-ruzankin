import React from "react"

const Modal = ({children, onClick}) => {
    return (
            <>
                <div onClick={onClick} className={"background"}></div>
                <div className={"Modal"}>
                    {children}
                </div>
            </>
    )
}

export default Modal