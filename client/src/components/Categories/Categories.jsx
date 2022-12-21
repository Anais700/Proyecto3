import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const role = localStorage.getItem("role")

    useEffect(() =>{
        const getCategories = async () =>{
            const response = await axios.get('http://localhost:5000/api/categories')
            setCategories(response.data.categories)
            console.log(response)
        }
        getCategories()
    }, []);


    return(
        <div>

            <h2>Categorías</h2>
            {
                categories.map((category)=>{
                    return(
                        <>
                        <Link key = {category._id} to= {`/category/${category._id}`} className= "category">
                        <div >
                            <h4>{category.title}</h4>
                            {/* <p>{category.Subcategory}</p> */}
                        </div>
                        {role == 2? ( <Link to={`/newSubcategory/${category._id}`} >
                            <button>Añadir subcategoría</button></Link>) : (<></>)}
                        </Link>
                        </>
                       
                    )
                })
            }

        </div>
    )
}

export default Categories;