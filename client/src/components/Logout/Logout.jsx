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
            <h2>Esperamos verte pronto</h2>

            <Link to={"/login"}>
            <button>Ir a iniciar sesión</button>    
            </Link>
        </div>

    )

}

export default Logout