import React, { useState } from "react";
import axios from "axios";

// useState me sirve para guardar la respuesta que me viene del back en una variable, pero también sirve para asignar (no para recibir, sino para enviar)
const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  // const [errorM, setErrorM] = useState(null);
  const [successM, setSuccessM] = useState(null)

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
      localStorage.setItem("token", response.data.acccessToken)
      // localStorage.setItem("token")
    } catch (error) {
      // setErrorM(error.response.data.message);
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
      style={{display: successM ? "block": "none" }}> 
        
      </div>
    </div>
  );
};

export default Login;
