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
      <h2>{category.title}</h2>
      <div className="categoria">
      {subcategory.map((subc) => {
        return (
          <Link
            key={subc._id}
            to={`/subcategory/${subc._id}`}
            className="subcategory"
          >
            <h4>{subc.title}</h4>
            <img src={subc.image.url} className="card-img-top foto1" alt="image product"/>
          </Link>
        );
        
      })}
      </div>

      <div className="mb-5 botones">
      {/* <Link to={"/"}>
        <button className="btn btn-secondary">Volver</button>
      </Link> */}
      {role == 2 ? (
        <Link to={`/modifyCategory/${categoryId}`}>
          <button className="btn btn-secondary">Editar categoría</button>
        </Link>
      ) : (
        <></>
      )}
      {role == 2 ? (
        <button onClick={deleteCategory} className="btn btn-outline-danger">
          Borrar categoría
        </button>
      ) : (
        <></>
      )}

      </div>
    </div>
  );
};

export default Category;
