import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token");
    const [successM, setSuccessM] = useState(null);
    const [errorM, setErrorM] = useState(null)

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get("http://localhost:5000/api/users", {
                headers: {
                    Authorization: token,
                },
            });
            console.log(response);
            setUsers(response.data.users);
        };
        getUsers();
    }, []);

    const deleteUser = (user) => {
        localStorage.setItem("user", user)
        let option = window.confirm("¿Seguro que quieres eliminar esta cuenta? El cliente perderá todo su historial e información")
        let userd = localStorage.getItem("user")
        if (option == true) {
            try {
                const response = axios.delete(`http://localhost:5000/api/user/${userd}`,
                    {
                        headers: {
                            Authorization: token
                        }
                    })
                console.log(response)
                setSuccessM(response.data.message)

                setTimeout(() => {
                    window.location.href = "/users"
                }, 1000)

            } catch (error) {
                setErrorM(error.response.message)
                setTimeout(() => {
                    window.location.href = "/"
                }, 2000)

            }
        }
    }

    return (
        <div>
            <h2>Usuarios</h2>
            {
                users.map((user) => {
                    return (
                        <div key={user._id} className="profile">
                            <p>Nombre: {user.name}</p>
                            <p>Apellido: {user.surname}</p>
                            <p>Nickname: {user.nickname}</p>
                            <p>Email: {user.email}</p>

                            <div className="botones">
                                <Link to={"/modifyUser"}>
                                    <button className="boton btn btn-secondary me-4">Editar</button>
                                </Link>
                                {
                                    role == 2 ? (<button onClick={() => { deleteUser(user._id) }} className="botonAdmiU btn btn-secondary btn-sm">Borrar</button>) : (<></>)
                                }       
                                 {/* <button onClick={deleteUser} className="btn btn-secondary">Eliminar</button> */}
                            </div>
                        </div>
                    )
                })

            }


        </div>
    );
};

export default Users;
