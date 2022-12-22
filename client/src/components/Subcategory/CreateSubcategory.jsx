import React from "react"; 
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CreateSubcategory = () => {
  const {categoryId} = useParams()
  const [subcategory, setSubcategory] = useState({
    title: "",
    description: "",
    category: `${categoryId}`,
  });


  const [image, setImage] = useState({});
  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
// console.log(token)

  useEffect(()=>{
    const getCategory = async () => {
      const resC = await axios.get("http://localhost:5000/api/categories")
      setCategories(resC.data.categories)
      // console.log(resC)
    }
    getCategory()
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
        console.log(error.response)          
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
     const res = await axios.post(`http://localhost:5000/api/subcategory/${categoryId}`, {
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
      window.location.href = "/";
    });

    } catch (error) {
      setErrorM(error.response.data.message)
    }
  }
      return(
        <div>
          <h2>Crear nueva subcategoría</h2>

      <form className="categoria" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputTitle1" className="form-label me-2">
            Nombre:
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
          <label for="exampleInputDescription1" className="form-label me-2">
            Descripción:
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
        <input 
          type="file"
          name= "file"
          id=""
          onChange={handleUpload} />
        
        <div>
        <img src={image.url} alt="imagen" className="foto1"/>
        </div>
        <button type="submit" className="btn btn-primary">
          Crear subcategoría
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

export default CreateSubcategory;
