import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ModifyProfile = () => {
  const [profile, setProfile] = useState({
    nickname: "",
    password: "",
  });

  const token = localStorage.getItem("token");
  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);
  const navigate = useNavigate()

  useEffect(()=>{
    const getUser = async() =>{
        try {
        const response = await axios.get(`http://localhost:5000/api/user`, {
            headers: {
              Authorization: token,
            },
          });
          console.log(response);
          setProfile(response.data.user);   
        } catch (error) {
            console.log(error.response)
        }
        };
        getUser();
      }, []);


  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  console.log(profile);

  const ProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user", 
        {
        ...profile,
      },
      {
        headers:{
            Authorization: token,
        }
      });
      console.log(response.data.accessToken);
      setSuccessM(response.data.message)
      setTimeout(() => {
        navigate("/profile")
      }, 3000)

    } catch (error) {
        setErrorM(error.response.data.message);
      setTimeout(() => {
        navigate("/")
      }, 3000)
    }
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      <form className="profile" onSubmit={ProfileSubmit}>
        <div className="mb-3">
          <label for="exampleInputNickname1" className="form-label">
            Nickname
          </label>
          <input
            name="nickname"
            value={profile.nickname}
            onChange={onChangeInput}
            type="string"
            className="form-control"
            id="exampleInputNickname1"
            placeholder={profile.nickname}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={profile.password}
            onChange={onChangeInput}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder={profile.password}
          />
        </div>
        <div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        </div>
      </form>
      <div className="nota">
        <p>Si necesita modificar otros datos deberá ponerse en contacto con el administrador de este sitio</p>
      </div>

      <div
        className="alert alert-primary"
        role="alert"
        style={{display: successM ? "block": "none" }}
      >
        {successM}
      </div>
      <div className="alert alert-danger" role="alert" 
      style={{display: errorM ? "block": "none" }}
      > 
      {errorM}
      </div>
    </div>
  );
};

export default ModifyProfile;
