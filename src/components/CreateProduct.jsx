import { useState } from "react"
import { DefaultLayout } from "../layouts/DefaultLayout"
import {  useAuth } from "./auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "./NavBar"


const URL= process.env.REACT_APP_BASE_URL

export const CreateProduct=()=>{
    const [name, setName]= useState("")
    const [price, setPrice]= useState("")
    const [stock, setStock]= useState("")
    const [image, setImage]= useState("")
    const [description, setDescription]= useState("")
    const goTo=useNavigate()
    const auth= useAuth()
  
    const [error, setError]= useState(false)


    if(!auth.isAuthenticated){
        return <Navigate to="/"/>
    }
    if(auth.admin && !auth.user){
        return <Navigate to="/" />
    }
    if(!auth.admin && !auth.user){
        return <Navigate to="/"/>
    } 
   
    const handleSubmit =async (e) => {
        e.preventDefault()
       try {
        const response = await axios({
            method: 'post',
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`
            },
            url: `${URL}/product/${auth.username}`,
            data: {
                name,
                price,
                stock,
                image,
                description
              
            }
          });
          console.log(response.status);
          if(response.status == 201){
            
           goTo("/productos")
          }
          
       } catch (error) {
            console.error(error)
       }
    }
    
   

    return(
       
        <section>
            
            <Navbar/>
          
            
            <form className="form" onSubmit={handleSubmit}>
               <h1>Agregar Producto</h1>
                <label>Nombre Del Producto</label>
                <input type="text" 
                    value={name} 
                    onChange={e=>setName(e.target.value)} />
                <label>Precio Del Producto</label>
                <input type="text" 
                    value={price} 
                    onChange={e=>setPrice(e.target.value)} />
               
                <label>Stock Del Productos</label>
                <input type="text" 
                    value={stock} 
                    onChange={e=>setStock(e.target.value)} />
                <label>Imagen Del Producto</label>
                <input type="text" 
                    value={image} 
                    onChange={e=>setImage(e.target.value)} />
                <label>Descripcion Del Producto</label>
                <input type="text" 
                    value={description} 
                    onChange={e=>setDescription(e.target.value)} />
                
                <button>Crear Producto</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
        
        
    )
}