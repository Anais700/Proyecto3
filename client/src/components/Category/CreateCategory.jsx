import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"


const CreateCategory = () => {
  const [category, setCategory] = useState({
    title: ""
  });

  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

    const handleChange = (e) =>{
      const { name, value } = e.target;
      setCategory({ ...category, [name]: value });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post("http://localhost:5000/api/category", {
      ...category,
     },
     {
      headers: {
        Authorization: token,
      }
     });

    console.log(res);
    setSuccessM(res.data.message)
    setTimeout(() =>{
      navigate("/")
    });
    } catch (error) {
      setErrorM(error.response.data.message)
    }
  }
      return(
        <div>
          <h2>Crear nueva categoría</h2>
         <div className="categoria">
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label nom">
            Nombre: 
          </label>
          <input
            name="title"
            value={category.title}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleInputTitle1"
          />
        </div>
        <div className="boto">
        <button type="submit" className="btn btn-primary">
          Crear categoría
        </button>
        </div>
      </form>
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
      )

};

export default CreateCategory;
