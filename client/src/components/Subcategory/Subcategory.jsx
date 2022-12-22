import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Subcategory = () => {
  const { subcategoryId } = useParams();
  const [subcategory, setSubcategory] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const getsubcategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/subcategory/${subcategoryId}`
        );
        console.log(response);
        setSubcategory(response.data.subcategory);
        setProducts(response.data.subcategory.products);
      } catch (error) {
        console.log(error.response);
      }
    };
    getsubcategory();
  }, []);

  const deleteSubcategory = async (e) => {
    e.preventDefault();
    let option = window.confirm("¿Seguro que quieres borrar esta categoría?");
    if (option == true) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/subcategory/${subcategoryId}`,
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
      <h2>{subcategory.title}</h2>
      {products.map((product) => {
        return (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="products"
          >
            <div class="card tsub">
              <img
                className="foto"
                src={product.image.url}
                alt={"imagen producto"}
              />
              <div className="card-body">
                <div className="title">
                  <h5 className="card-title">{product.title}</h5>
                  <h6 className="precio card-text">${product.price} MXN</h6>
                </div>
                <p class="card-text text-center">{product.sizes}</p>
              </div>
            </div>
          </Link>
        );
      })}
      <div className="botones">
        {role == 2 ? (
          <Link to={`/modifySubcategory/${subcategoryId}`}>
            <button className="btn btn-secondary ">Editar subcategoría</button>
          </Link>
        ) : (
          <></>
        )}
        {role == 2 ? (
          <button
            onClick={deleteSubcategory}
            className="btn btn-outline-danger"
          >
            Borrar subcategoría
          </button>
        ) : (
          <></>
        )}

      </div>
    </div>
  );
};

export default Subcategory;
