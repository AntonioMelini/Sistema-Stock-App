import { useState } from "react"
import { DefaultLayout } from "../layouts/DefaultLayout"
import {  useAuth } from "./auth/AuthProvider"
import { Navigate } from "react-router-dom"
import axios from "axios"

const URL= process.env.BASE_URL


export const CreateUser=()=>{
    const [email, setEmail]= useState("")
    const [contraseña, setContraseña]= useState("")
    const [cuit, setCuit]= useState("")
    const [direccion, setDireccion]= useState("")
    const [ingresosBrutos, setIngresosBrutos]= useState("")
    const [nombre, setNombre]= useState("")
    const [username, setUsername]= useState("")
    
    const auth= useAuth()
  
    const [error, setError]= useState(false)
   
    const handleSubmit =async (e) => {
        e.preventDefault()
       try {
        const response = await axios({
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            },
            url: `${URL}/user`,
            data: {
              email,
              username,
              password: contraseña,
              cuit,
              business_name: nombre,
              business_direction: direccion,
              gross_income: ingresosBrutos
              
            }
          });
       } catch (error) {
            console.error(error)
       }
    }
    
    if(!auth.isAuthenticated){
        return <Navigate to="/home"/>
    }
    if(auth.admin && !auth.user){
        return <Navigate to="/home" />
    }
    if(!auth.admin && !auth.user){
        return <Navigate to="/"/>
    } 

    return(
        <DefaultLayout>
        <section>
            <form className="form" onSubmit={handleSubmit}>
               <h1>Sing Up</h1>
                <label>Email</label>
                <input type="text" 
                    value={email} 
                    onChange={e=>setEmail(e.target.value)} />
                <label>Username</label>
                <input type="text" 
                    value={username} 
                    onChange={e=>setUsername(e.target.value)} />
               
                <label>Contraseña</label>
                <input type="password" 
                    value={contraseña} 
                    onChange={e=>setContraseña(e.target.value)} />
                <label>Cuit</label>
                <input type="text" 
                    value={cuit} 
                    onChange={e=>setCuit(e.target.value)} />
                <label>Razon Social</label>
                <input type="text" 
                    value={nombre} 
                    onChange={e=>setNombre(e.target.value)} />
                <label>Direccion</label>
                <input type="text" 
                    value={direccion} 
                    onChange={e=>setDireccion(e.target.value)} />
                <label>Ingresos Brutos</label>
                <input type="text" 
                    value={ingresosBrutos} 
                    onChange={e=>setIngresosBrutos(e.target.value)} />
                
                <button>Crear usuario</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
        </DefaultLayout>
        
    )
}