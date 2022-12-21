import React from "react"; 
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"


const UpdateProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    subcategoryId: "",
    sizes: "",
    price: "",
  });


  // const [mproduct, setMProduct] = useState({})
  const {productId} = useParams()

  useEffect(()=>{
    const getProduct = async () =>{
      const response = await axios.get(`http://localhost:5000/api/product/${productId}`)
      setProduct(response.data.product)
      console.log(response.data.product)
      setImage(response.data.product.image)

    }
    getProduct();
  }, [])

  const [image, setImage] = useState({});
  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null)
  const [subcategories, setSubcategories] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

// console.log(token)
  useEffect(()=>{
    const getSubcategory = async () => {
      const resS = await axios.get("http://localhost:5000/api/subcategories")
      setSubcategories(resS.data.subcategories)
      console.log(resS)
    }
    getSubcategory()
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
      setProduct({ ...product, [name]: value });
    }
console.log(product)
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.put(`http://localhost:5000/api/product/${productId}`, {
      ...product, image,
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

          <h1>Editar producto</h1>
          <input 
          type="file"
          name= "file"
          id=""
          onChange={handleUpload} />

      <form className="producto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputTitle1" className="form-label">
            Nombre
          </label>
          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleInputTitle1"
            placeholder={product.title}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputDescription1" className="form-label">
            Descripción
          </label>
          <input
            name="description"
            value={product.description}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleInputDescription1"
            placeholder={product.description}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputSubcategory1" className="form-label">
            Subcategoría
          </label>

          <select name="subcategoryId" id="" onChange={handleChange}>
            <option selected>selecciona...</option>
          {
            subcategories.map((sub) =>{
              return(
              <option value={sub._id} key={sub._id}>{sub.title}</option>
            )})
          }
          </select>
        </div>
        <div className="mb-3">
          <label for="exampleInputSizes1" className="form-label">
            Tallas
          </label>
          <input
            name="sizes"
            value={product.sizes}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleInputSizes1"
            placeholder={product.sizes}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPrice1" className="form-label">
            Precio
          </label>
          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            type="number"
            className="form-control"
            id="exampleInputPrice1"
            placeholder={product.price}
          />
        </div>
        <div>
        <img src={image.url} alt="imagen"/>
        </div>
        <button type="submit" className="btn btn-primary">
          Modificar producto
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

export default UpdateProduct;
