import React, { useState } from 'react';
import '../css/NavBar.css'  ; // Importar el archivo de estilos CSS
import { useAuth } from './auth/AuthProvider';
import { Link, useLocation } from "react-router-dom";



const Navbar = () => {
  const auth = useAuth()
  const location =useLocation()


  const handleCliclk = ()=>{
    auth.logOutUser()
  }
    return (
        <nav className="navbar">
          <div className="navbar-header">
            <img src="logo512.png" alt="" className="navbar-logo" />
            <Link to="/home" className="navbar-title">Amegra</Link>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link  to="=" className="nav-link">Perfil</Link>
            </li>
            { auth.user && auth.isAuthenticated && location.pathname !="/clientes"  &&
              <li className="nav-item">
                <Link  to="/clientes" className="nav-link">Clientes</Link>
              </li>
            }
            {
              auth.user && auth.isAuthenticated && location.pathname !="/productos" &&
              <li className="nav-item">
              <Link  to="/productos" className="nav-link">Productos</Link>
            </li>
            }
            {
                 auth.user && auth.isAuthenticated && location.pathname !="/agregar/producto" &&
            <li className="nav-item">
              <Link  to="/agregar/producto" className="nav-link">Agregar Productos</Link>
            </li>
            }
            {
                auth.user && auth.isAuthenticated && location.pathname !="/agregar/cliente" &&
              <li className="nav-item">
              <Link  to="/agregar/cliente" className="nav-link">Agregar Clientes</Link>
              </li>
            }
           
            <li className="nav-item">
              <Link  to="=" className="nav-link">Factura Electrónica</Link>
            </li>
            {
                <li className="nav-item-cerar-sesion">
                <Link  to="/" className="nav-link" onClick={(e)=> handleCliclk()}>Cerrar sesion</Link>
              </li>
            }
            
          </ul>
        </nav>
      );
    };

export default Navbar;