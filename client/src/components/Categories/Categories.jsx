import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() =>{
        const getCategories = async () =>{
            const response = await axios.get('http://localhost:5000/api/categories')
            setCategories(response.data.categories)
        }
        getCategories()
    }, []);


    return(
        <div>
            <h2>Categorías</h2>
            {
                categories.map((category)=>{
                    return(
                        <div key = {category._id}>
                            <h4>{category.title}</h4>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Categories;