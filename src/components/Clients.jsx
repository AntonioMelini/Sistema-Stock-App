import { useEffect, useState } from "react";
import { DefaultLayout } from "../layouts/DefaultLayout"
import Navbar from "./NavBar"
import { useAuth } from "./auth/AuthProvider";
import axios from "axios";
import ClientsTable, { DetalleCliente } from "./ClientsTable";
const API_URL = process.env.REACT_APP_BASE_URL










export const  Clients = () =>{
    const auth=useAuth()
    const [clients, setClients]= useState([])
    const [clienteInfo, setClientInfo]= useState(null)
    

    const handleClientClick = (cliente) => {
        
        //<link to={`/cliente/${cliente.cuit}`}></link>
        //console.log(cliente);
        setClientInfo(cliente)
        console.log("toco",clienteInfo);
    };
  
    

    useEffect (()=>{
        getClients()
    },[])


    async function getClients() {
        try {
          const response = await axios.get(`${API_URL}/clients/${auth.username}`,{
            headers: {
              "Content-Type":"application/json",
              Authorization: `Bearer ${auth.getAccessToken()}`
            }
          });
        console.log(response.data);
          setClients( response.data)
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <DefaultLayout>
            <div>
                <Navbar/>
                <ul>
                     {

                    clients.length ? (
                        <ClientsTable clients={clients} onClientsClick={handleClientClick}/>
                         
                        ) : (
                    <l1>No Clients</l1>
                    )
                    }
                    {
                        
                    }
                    
               </ul>
           
            </div>
            
      
                
            
        </DefaultLayout>
    )
}
//