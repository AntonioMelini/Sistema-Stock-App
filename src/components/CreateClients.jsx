import { useState } from "react"
import { DefaultLayout } from "../layouts/DefaultLayout"
import {  useAuth } from "./auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "./NavBar"

const URL= process.env.REACT_APP_BASE_URL


export const CreateClient=()=>{
    const [email, setEmail]= useState("")
    const [cuit, setCuit]= useState("")
    const [direccion, setDireccion]= useState("")
    const [ingresosBrutos, setIngresosBrutos]= useState("")
    const [lastname, setLastname]= useState("")
    const [name, setName]= useState("")
    
    const auth= useAuth()
    const goTo= useNavigate()
  
    const [error, setError]= useState(false)
   
    const handleSubmit =async (e) => {
        e.preventDefault()
       try {
        const response = await axios({
            method: 'post',
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${auth.getAccessToken()}`
            },
            url: `${URL}/client/${auth.username}`,
            data: {
                cuit,
                name,
                email,
                lastname,
                direction: direccion,
                gross_income: ingresosBrutos
     
            }
          });
          if(response.status==201){
            goTo("/clientes")
          }
       } catch (error) {
            console.error(error)
       }
    }
    
    if(!auth.isAuthenticated){
        return <Navigate to="/"/>
    }
    if(auth.admin && !auth.user){
        return <Navigate to="/" />
    }
    if(!auth.admin && !auth.user){
        return <Navigate to="/"/>
    } 

    return(
        <DefaultLayout>
        <section>

            <Navbar/>

            <form className="form" onSubmit={handleSubmit}>
               <h1>Agregar Cliente</h1>
                <label>Email</label>
                <input type="text" 
                    value={email} 
                    onChange={e=>setEmail(e.target.value)} />
                <label>Nombre</label>
                <input type="text" 
                    value={name} 
                    onChange={e=>setName(e.target.value)} />
               
                <label>Cuit</label>
                <input type="text" 
                    value={cuit} 
                    onChange={e=>setCuit(e.target.value)} />
                <label>Apellido</label>
                <input type="text" 
                    value={lastname} 
                    onChange={e=>setLastname(e.target.value)} />
                <label>Direccion</label>
                <input type="text" 
                    value={direccion} 
                    onChange={e=>setDireccion(e.target.value)} />
                <label>Ingresos Brutos</label>
                <input type="text" 
                    value={ingresosBrutos} 
                    onChange={e=>setIngresosBrutos(e.target.value)} />
                
                <button>Agregar Cliente</button>
            </form>
            
        </section>
        </DefaultLayout>
        
    )
}