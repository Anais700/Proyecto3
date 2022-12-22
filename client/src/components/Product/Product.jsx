import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Product = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState({});
    const [image, setImage] = useState({});
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // const [successM, setSuccessM] = useState(null); 


    useEffect(() => {
        const getProduct = async () => {
            const response = await axios.get(
                `http://localhost:5000/api/product/${productId}`
            );
            console.log(response)
            setProduct(response.data.product)
            setImage(response.data.product.image);
        };
        getProduct();
    }, []);


const deleteProduct = async (e) => {
    e.preventDefault();
    let option = window.confirm("¿Seguro que quieres borrar el producto?")
    if(option == true){
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/product/${productId}`, 
                {
                    headers: {
                     Authorization: token,
                },
              }
            );
            console.log(response);
            setTimeout(()=>{
                window.location.href="/";
            }, 2000)
        } catch (error) {
            console.log(error.response)
        }
    }
};


return(
    <div>
        {/* <h1>{product.title}</h1>
        <img src={image.url} alt="image product"/>
        <h3>{product.price}</h3>
        <h4>{product.description}</h4>
        <Link to={"/"}>
            <button>Volver a productos</button>
        </Link> */}
        <div className="card tprodu">
  <img src={image.url} className="card-img-top" alt="image product"/>
  <div className="card-body">
    <h5 className="card-title">{product.title}</h5>
    <p className="card-text">{product.description}</p>
    <p className="card-text">{product.sizes}</p>
    <p className="card-text">$ {product.price} MXN</p>
<div className="botPro">
    <a href="/" className="btn btn-primary mb-2">Volver a productos</a>
    {role == 2? (
    <button onClick={deleteProduct} className="btn btn-outline-danger mb-2">Borrar producto</button>
    ) : (<></>)
    }
    {role == 2? (
        <Link to = {`/modifyProduct/${productId}`}>
            <button className="btn btn-secondary">Editar producto</button>
        </Link>
    ) : (<></>)
    }
    </div>
  </div>
</div>
</div>
)
};

export default Product;