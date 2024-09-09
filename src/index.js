import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { Login } from './components/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import {ProtectedRoute} from './components/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthProvider';
import { CreateUser } from './components/CreateUser';
import { CreateProduct } from './components/CreateProduct';
import axios from 'axios';
import { Clients } from './components/Clients';
import { Product } from './components/Products';
import { CreateClient } from './components/CreateClients';
import { DetalleCliente } from './components/ClientsTable';
import { DetalleProducto } from './components/ProductsTable';
const URL= process.env.BASE_URL

const instance = axios.create({
  baseURL: `${URL}`
});


const router = createBrowserRouter([{
  path:"/",
  element: <Login />
},{
  path:"/",
  element:<ProtectedRoute/>,
  children: [
    {
      path:"/home",
      element: <App/>
    },{
      path:"/agregar/producto",
      element:<CreateProduct/>
  },{
      path:"/agregar/cliente",
      element:<CreateClient/>
  },{
    path:"/clientes",
    element:<Clients/>
  },{
    path:"/cliente/:cuit",
    element:<DetalleCliente/>
  },{
    path:"/productos",
    element:<Product/>
  },{
    path:"/product/:id",
    element:<DetalleProducto/>
  }
  ]
}

])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />

    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
