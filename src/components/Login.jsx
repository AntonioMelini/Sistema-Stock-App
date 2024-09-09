import { useState } from "react"
import { DefaultLayout } from "../layouts/DefaultLayout"
import { useAuth } from "./auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import "../css/Login.css"
export const Login=()=>{
    const [nombre, setNombre]= useState("")
    const [contraseña, setContraseña]= useState("")
    const [errorResponse, setErrorResponse]= useState(false)
    const auth = useAuth()
    const API_URL = process.env.REACT_APP_BASE_URL
    const goTo= useNavigate();
    const LOGIN = process.env.REACT_APP_LOGIN

    if(auth.isAuthenticated){
        return < Navigate to="/home" />
    }

    const handleSubmit =async (e) => {
        e.preventDefault()
       try {
        const response = await axios({
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            },
            url: `${LOGIN}`,
            data: JSON.stringify ({
             
              username:nombre,
              password: contraseña,
             
            })
          });
          
          if (response.status==200){
            setErrorResponse(false);
            if(response.data.access_token && response.data.refresh_token)
            auth.saveUser(response.data)
            goTo("/home")
          }else{
            console.log("Something went worng");
            const json = await response.data ;
            setErrorResponse(true);
            return;
          }
       } catch (error) {
        console.log("tener mas cuidado tio");
        setErrorResponse(true)
       }
    }


    return(
        <section className="login-form-container">
          <div className="company-info">
            <div className="alegra-logo">
              <img src="logo1.jpeg" alt="logo1" />
            </div>
            <div className="company-name">
              Amegra
            </div>
          </div>
          <div className="company-info-2">
            <div className="company-info-a">
              <h2>Ingresá a tu cuenta</h2>
            </div>
            <div className="company-info-b">
              <h4>Asegura tu facturación</h4>
            </div>
            
          </div>
          {
            errorResponse ? <p className="error-message">Error en inicio de sesion, porfavor intente nuevamente!</p> 
             : null  
          }
          <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label htmlFor="username">Correo electrónico:</label>
             <input type="text" id="username" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ingrese su correo electrónico" />
           </div>
           <div className="form-group">
             <label htmlFor="password">Contraseña:</label>
             <input type="password" id="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Ingrese su contraseña" />
           </div>
           
           <button type="submit" className="submit-button">Ingresar</button>
          </form>
          <p className="forgot-password">¿Olvidaste tu contraseña?</p>
          
            
        </section>
        
    )
}

/*
<form className="form" onSubmit={handleSubmit}>
               <h1>Ingresa a tu cuenta</h1>
               <h3>Ahorra tiempo administrando tus facturas</h3>
               
               <div className="form-group">
                <label>Username</label>
                <input type="text" 
                value={nombre} 
                onChange={e=>setNombre(e.target.value)} />
                
               </div>
               <div className="form-group">

                <label>Password</label>
                <input type="password" 
                    value={contraseña} 
                    onChange={e=>setContraseña(e.target.value)} />
               </div>
                <button className="submit-button">Iniciar sesion</button>
            </form>

*/
