import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  // const [successM, setSuccessM] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:5000/api/user`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      setUser(response.data.user);
    };
    getUser();
  }, []);

  return (
    <div>
      <h2>Mi perfil</h2>
      <div className="profile">
        <p>Nombre: {user.name}</p>
        <p>Apellido: {user.surname}</p>
        <p>Nickname: {user.nickname}</p>
        <p>Email: {user.email}</p>
        <p type="password" className="mb-4">
          Contraseña:
          <input value={user.password} type="password" className="in" />
        </p>
        <div className="botones">
        <Link to={"/modifyProfile"}>
        <button className="boton btn btn-secondary me-3">Editar</button>
        </Link>
        <Link to={"/logout"}>
        <button className="btn btn-secondary">Cerrar sesión</button>
        </Link>

        </div>
      </div>
    </div>
  );
};

export default Profile;
