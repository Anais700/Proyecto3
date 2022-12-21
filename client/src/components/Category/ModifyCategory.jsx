import React from "react"; 
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"


const ModifyCategory = () => {
  const [category, setCategory] = useState({
    title: "",
  });


  const {categoryId} = useParams()

  useEffect(()=>{
    const getCategory = async () =>{
      const response = await axios.get(`http://localhost:5000/api/category/${categoryId}`)
      setCategory(response.data.category)
      console.log(response.data.product)
    }
    getCategory();
  }, [])

  const [successM, setSuccessM] = useState(null)
  const [errorM, setErrorM] = useState(null)
  const token = localStorage.getItem("token");
  const navigate = useNavigate()


    const handleChange = (e) =>{
      const { name, value } = e.target;
      setCategory({ ...category, [name]: value });
    }
console.log(category)
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.put(`http://localhost:5000/api/category/${categoryId}`, {
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
        setErrorM(error.res.data.message)
    }
  }
      return(
        <div>

        <h1>Editar categoría</h1>
       
    <form className="categoria" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="exampleInputTitle1" className="form-label">
          Nombre
        </label>
        <input
          name="title"
          value={category.title}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="exampleInputTitle1"
          placeholder={category.title}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Guardar cambios
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
      )
        
};

export default ModifyCategory;
