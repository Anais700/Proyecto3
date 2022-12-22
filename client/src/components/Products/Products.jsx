import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/products"); //-aquí se debe colocar la ruta del backend
      console.log(response.data);
      setProducts(response.data.products);
      console.log(products);
    };
    getProducts();
  }, []);

  return (
    <div className="product1 mb-2">
      {/* <Navbar/> */}
      <h2 className="mb-3">Productos</h2>
      {/* .map() => es lo mismo que un bucle for */}
      <div className="mb-4">
      {products.map((pro) => {
        return (
          <Link key={pro._id} to={`/product/${pro._id}`} className="products">
            <div class="card tpro">
              <img
                src={pro.image.url}
                class="card-img-top"
                alt={"imagen producto"}
              />
              <div className="card-body">
                <div className="title">
                  <h5 className="card-title">{pro.title}</h5>
                  <h6 className="precio card-text">${pro.price}</h6>
                </div>
                <p class="card-text text-center">{pro.sizes}</p>
              </div>
            </div>
          </Link>
        );
      })}
      </div>
    </div>
  );
};

export default Products;

//HOOKS:
// useEffect: nos permite ejecutar código cuando el componente se monta, se actualiza o se desmonta.
//Es una función que en el momento que carga mi componente me trae los datos de la API y los guarda en una variable, para poder manejarlos previamente.
// hasta que no tenga los datos que solicitemos no nos va a mostrar la página-el componente -el resultado... hasta que no tenga los datos no se va a cargar el componente.
// useEffect necesita del useState para poder trabajar, pero useState puede trabajar solo, sin useEffect
// useState: es un hook que nos permite crear variables de estado en un componente funcional.
// es una variable + función que me va a guardar los datos.
