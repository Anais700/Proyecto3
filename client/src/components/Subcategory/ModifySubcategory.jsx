import React from "react"; 
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const ModifySubcategory = () => {
  const [subcategory, setSubcategory] = useState({
    title: "",
    description: "",
    category: "",
  });

  const {subcategoryId} = useParams()

  useEffect(()=>{
    const getSubcategory = async () =>{
      const response = await axios.get(`http://localhost:5000/api/subcategory/${subcategoryId}`)
      setSubcategory(response.data.subcategory)
      console.log(response.data.subcategory)
      setImage(response.data.subcategory.image)

    }
    getSubcategory();
  }, [])

  const [image, setImage] = useState({});
  const [successM, setSuccessM] = useState(null)
  const [errorM, setErrorM] = useState(null)
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  useEffect(()=>{
    const getCategories = async () => {
      const response = await axios.get("http://localhost:5000/api/categories")
      setCategories(response.data.categories)
      console.log(response.data.categories)
    }
    getCategories()
  }, [])

  const handleUpload = async (e) =>{
    e.preventDefault()
    try {
      const file = e.target.files[0];
      if(!file) return alert("No se ha subido la imagen")
      // Se pueden poner las mismas condiciones que en el back

      let formData = new FormData();
      formData.append("file", file)
      const response = await axios.post("http://localhost:5000/api/upload", 
      formData, {
        headers: {
          Authorization: token,
          "content-type": "multipart/form-data"
        }
      });
      console.log(response)
      setImage(response.data)

      } catch (error) { 
        setErrorM(error.response.data.message)          
      }
    };

    // console.log(image.url)   

    const handleChange = (e) =>{
      const { name, value } = e.target;
      setSubcategory({ ...subcategory, [name]: value });
    }
console.log(subcategory)
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.put(`http://localhost:5000/api/subcategory/${subcategoryId}`, {
      ...subcategory, image,
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
      console.log(error.response)
    }
  }
      return(
        <div>
        <h1>Editar subcategoría</h1>
          <input 
          type="file"
          name= "file"
          id=""
          onChange={handleUpload} />

      <form className="subcategoria" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputTitle1" className="form-label">
            Nombre
          </label>
          <input
            name="title"
            value={subcategory.title}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleInputTitle1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputDescription1" className="form-label">
            Descripción
          </label>
          <input
            name="description"
            value={subcategory.description}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleInputDescription1"
          />
        </div>
        <div className="mb-3">
          {/* <label for="exampleInputSubcategory1" className="form-label">
            Categoría
          </label> */}
        
          {/* <select name="category" id="" onChange={handleChange}>
            <option selected>selecciona...</option>
          {
            categories.map((category) =>{
              return(
              <option value={category._id} key={category._id}>{category.title}</option>
            )})
          }
          </select> */}
        </div>
        
        <div>
        <img src={image.url} alt="imagen"/>
        </div>
        <button type="submit" className="btn btn-primary">
          Guaradar
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

export default ModifySubcategory;
