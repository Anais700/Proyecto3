import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // const [successM, setSuccessM] = useState(null);
  const [subcategory, setSubcategory] = useState([]);

  useEffect(() => {
    try {
      const getCategory = async () => {
        const response = await axios.get(
          `http://localhost:5000/api/category/${categoryId}`
        );
        console.log(response);
        setCategory(response.data.category);
        setSubcategory(response.data.category.Subcategory);
      };
      getCategory();
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const deleteCategory = async (e) => {
    e.preventDefault();
    let option = window.confirm("¿Seguro que quieres borrar esta categoría?");
    if (option == true) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/category/${categoryId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <h1>{category.title}</h1>
      {subcategory.map((subc) => {
        return (
          <Link
            key={subc._id}
            to={`/subcategory/${subc._id}`}
            className="subcategory"
          >
            <h2>{subc.title}</h2>
          </Link>
        );
        
      })}
      
      <Link to={"/"}>
        <button>Volver</button>
      </Link>

      {/* <div className="card tpro">
  <img className="card-img-top" alt="image category"/>
  <div className="card-body">
    <h5 className="card-title">{category.title}</h5>
    <p className="card-text">{category.description}</p>
    <a href="/" className="btn btn-primary">Volver a productos</a>
  </div>
  </div> */}
      {role == 2 ? (
        <button onClick={deleteCategory} className="btn btn-danger">
          Borrar categoría
        </button>
      ) : (
        <></>
      )}
      {role == 2 ? (
        <Link to={`/modifyCategory/${categoryId}`}>
          <button>Modificar categoría</button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Category;
