import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Products from "../Products/Products";

const Home = () => {
  const [novedades, setNovedades] = useState([]);
  const [subcategories, setSubcategories] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/products");
      console.log(response.data);
      setNovedades(response.data.products);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getSubcategories = async () => {
      const response = await axios.get("http://localhost:5000/api/subcategories");
      console.log(response.data);
      setSubcategories(response.data.subcategories);
    };
    getSubcategories();
  }, []);

  const newProduct = novedades.slice(novedades.length-1)
  console.log(newProduct)

  return (
    <div>
      <h3>¡Novedades!</h3>
      {
        newProduct.map((product)=>{
          const newSubcategory = subcategories.slice(subcategories.length-1)
          return(
            <div key={product._id}>
      <div
        id="carouselExampleControlsNoTouching"
        className="carousel slide"
        data-bs-touch="false"
        data-bs-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={product.image.url} className="d-block w-100" alt="..." />
          </div>
          {
            newSubcategory.map((subc)=>{
              return(
          <div key={subc._id} className="carousel-item">
            <img src={subc.image.url} className="d-block w-100" alt="..." />
          </div>
              )
            })
          }
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
            </div>
          )
        })
      }

      <Products/>
    </div>
  );
};

export default Home;
