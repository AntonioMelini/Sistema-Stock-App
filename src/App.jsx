import './App.css';
import { useEffect, useState } from 'react';
import { useAuth } from "./components/auth/AuthProvider"
import { DefaultLayout } from './layouts/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductsList from './components/ProductsTable';
import ProductTable from './components/ProductsTable';
import Navbar from './components/NavBar';
const API_URL = process.env.REACT_APP_BASE_URL

export const App =() => {
 const [products, setProducts] = useState([])
 const auth = useAuth()
 const goTo = useNavigate()

 

 useEffect(() =>{
  getProducts()
  
},[])



 async function getProducts() {
  try {
    const response = await axios.get(`${API_URL}/products/${auth.username}`,{
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${auth.getAccessToken()}`
      }
    });
  
    setProducts( response.data)
  } catch (error) {
    console.error(error);
  }
}

 
  return (
    
    <DefaultLayout>
     <div className="App">
      
     <Navbar/>
      
      
    
    <h1>{auth.admin ? "ADMIN" && auth.isAuthenticated : auth.user && auth.isAuthenticated ? "USER" : "LOGIN PERRO"}</h1>
      <h1>Bienvenido a Amegra</h1>
      <h2>Aqui vas a poder gestionar tus movimientos</h2>
    
     
       
      
      
      </div>
   
    </DefaultLayout>
   

  );
}
