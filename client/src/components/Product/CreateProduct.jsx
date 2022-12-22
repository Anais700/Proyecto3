import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    subcategoryId: "",
    sizes: "",
    price: "",
  });

  const [image, setImage] = useState({});
  const [successM, setSuccessM] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const token = localStorage.getItem("token");
  // console.log(token)
  useEffect(() => {
    const getSubcategory = async () => {
      const resS = await axios.get("http://localhost:5000/api/subcategories");
      setSubcategories(resS.data.subcategories);
      console.log(resS);
    };
    getSubcategory();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("No se ha subido la imagen");
      // Se pueden poner las mismas condiciones que en el back

      let formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: token,
            "content-type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      setImage(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // console.log(image.url)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  console.log(product);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/product",
        {
          ...product,
          image,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(res);
      setSuccessM(res.data.message);
      setTimeout(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
      <h2>Crear nuevo producto</h2>

      <div className="sol">
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
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputSubcategory1" className="form-label">
            Subcategoría
          </label>
          {/* <input
            name="subcategoryId"
            value={product.subcategoryId}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleInputSubcategory1"
          /> */}
          <select name="subcategoryId" id="" onChange={handleChange}>
            <option selected>selecciona...</option>
            {subcategories.map((sub) => {
              return (
                <option value={sub._id} key={sub._id}>
                  {sub.title}
                </option>
              );
            })}
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
          />
        </div>
        <p>Foto</p>
        <input type="file" name="file" id="" onChange={handleUpload} />

        <div>
          <img src={image.url} alt="imagen" className="foto1" />
        </div>
        <button type="submit" className="btn btn-primary crear">
          Crear producto
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateProduct;
