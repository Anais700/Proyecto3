import React from "react";
import { useEffect } from "react";
import {Link} from "react-router-dom"

const Logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("name")

    useEffect (() =>{
        setTimeout(() => {
           window.location.href = "/" 
        }, 3000);
    }, [])

    return (
        <div>
            <h1>¡Esperamos verte pronto!</h1>
        </div>

    )

}

export default Logout