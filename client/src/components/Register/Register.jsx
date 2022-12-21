import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [info, setInfo] = useState({
    name: "",
    surname: "",
    nickname: "",
    email: "",
    password: "",
  });

  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  console.log(info);

  const registerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user", {
        ...info,
      });
      console.log(response.data.accessToken);
      localStorage.setItem("token", response.data.accessToken);
    } catch (error) {
        setErrorM(error.response.data.message);
      setTimeout(() => {
        window.location.href= "/"
      }, 3000)
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form className="registro" onSubmit={registerSubmit}>
        <div className="mb-3">
          <label for="exampleInputName1" className="form-label">
            Nombre
          </label>
          <input
            name="name"
            value={info.name}
            onChange={onChangeInput}
            type="string"
            className="form-control"
            id="exampleInputName1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputSurname1" className="form-label">
            Apellido
          </label>
          <input
            name="surname"
            value={info.surname}
            onChange={onChangeInput}
            type="string"
            className="form-control"
            id="exampleInputSurname1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputNickname1" className="form-label">
            Nickname
          </label>
          <input
            name="nickname"
            value={info.nickname}
            onChange={onChangeInput}
            type="string"
            className="form-control"
            id="exampleInputNickname1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            value={info.email}
            onChange={onChangeInput}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={info.password}
            onChange={onChangeInput}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

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

export default Register;
