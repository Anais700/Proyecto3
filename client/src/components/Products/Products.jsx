import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const Products = () => {
    const [products, setProducts] = useState([]);  

    useEffect(() => {
        const getProducts = async () =>{
            const response = await axios.get('http://localhost:5000/api/products'); //-aquí se debe colocar la ruta del backend
            console.log(response.data);
            setProducts(response.data.products)
            console.log(products)
        }
        getProducts()
    }, []);

    return (
        <div>
            <h1>Productos</h1>
            {/* .map() => es lo mismo que un bucle for */}
            {
                products.map((pro)=>{
                    return (
                        <div key = {pro._id}>
                            <h2>{pro.title}</h2>
                            <p>{pro.description}</p>
                            <h5>{pro.price}</h5>
                            <img className="foto" src={pro.image.url} alt={"imagen producto"}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Products;


//HOOKS:
// useEffect: nos permite ejecutar código cuando el componente se monta, se actualiza o se desmonta. 
//Es una función que en el momento que carga mi componente me trae los datos de la API y los guarda en una variable, para poder manejarlos previamente.
// hasta que no tenga los datos que solicitemos no nos va a mostrar la página-el componente -el resultado... hasta que no tenga los datos no se va a cargar el componente.
// useEffect necesita del useState para poder trabajar, pero useState puede trabajar solo, sin useEffect
// useState: es un hook que nos permite crear variables de estado en un componente funcional.
// es una variable + función que me va a guardar los datos.

