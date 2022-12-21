import React from "react";
import { useState } from "react";
import axios from "axios";

// useState me sirve para guardar la respuesta que me viene del back en una variable, pero también sirve para asignar (no para recibir, sino para enviar)
const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  
  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  console.log(info)

  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        ...info,
      });
      console.log(response);
      setSuccessM(response.data.message)
      localStorage.setItem("token", response.data.accessToken)
      // localStorage.setItem("token") -- esto será necesario para todas las rutas donde necesitemos el token
      localStorage.setItem("role", response.data.user.role)
      localStorage.setItem("name", response.data.user.name)
      setTimeout(() => {
        window.location.href= "/"
      }, 3000)

    } catch (error) {
      setErrorM(error.response.data.message);
      setTimeout(() => {
        window.location.href= "/login";
      }, 3000);
    }
  };

  return (
    <div>     
      <h1>Login</h1>
      <form className="formulario" onSubmit={loginSubmit}>
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
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={info.password}
            onChange={onChangeInput}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="alert alert-primary" role="alert" 
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

export default Login;
