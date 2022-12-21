import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


const Subcategory = () => {
    const {subcategoryId} = useParams()
    const [subcategory, setSubcategory] = useState([]);
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
            const getsubcategory = async () =>{
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/subcategory/${subcategoryId}`
                    );
                    console.log(response);
                setSubcategory(response.data.subcategory)
                setProducts(response.data.subcategory.products)
                } catch (error) {
                    console.log(error.response)
                }
            };
            getsubcategory();
 
    }, []);

    return (
        <div>
            <h1>{subcategory.title}</h1>
            {role == 2 ? (
        <Link to={`/modifySubcategory/${subcategoryId}`}>
          <button>Modificar categoría</button>
        </Link>
      ) : (
        <></>
      )}
            {
                products.map((product)=>{
                    return (
                        <Link key = {product._id} to= {`/product/${product._id}`} className= "product">
                        <div >
                            <img className="foto" src={product.image.url} alt={"imagen producto"}/>
                            <h3>{product.title}</h3>
                            <p>${product.price} MXN</p>
                        </div>
                        </Link>
                    )
                })
            }


        </div>
    )
}

export default Subcategory;