import React, { useEffect, useState } from 'react';
import '../css/Products.css'
import '../css/ClientsDetail.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './auth/AuthProvider';
import Navbar from './NavBar';
const API_URL = process.env.REACT_APP_BASE_URL


// Componente de detalle de producto
export const DetalleCliente = () => {
  const location=useLocation()
  const cuitFromPath = location.pathname.split('/')[2]
    const auth = useAuth()
    const [client, setClient]=useState(null)
    const [clientOriginal ,setClientOriginal]= useState(null)
    const [editando, setEditando] = useState(false);
  
    useEffect(()=>{
        getClient()
    },[])

    const getClient = async ()=>{
       
        const response = await axios.get(`${API_URL}/client/${cuitFromPath}`,{
          headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`
          }
        });
        
        if(response.status ==200){setClient(response.data) ;setClientOriginal(response.data);}
        console.log(client);


    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setClient(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleGuardar = () => {
      // Aquí puedes implementar la lógica para guardar los datos editados
      // Por ejemplo, puedes enviar los datos a una API
      console.log('Datos guardados:', client);
      setEditando(false);
    
      onModificar(client);
    };
    const handleCancelar = () => {
      setEditando(false);
      setClient(clientOriginal)
 // Restaurar datos originales
    };
    const onModificar = async (client)=>{
      try {
        const response = await axios({
            url: `${API_URL}/client/${cuitFromPath}`,
            method: 'put',
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`
            },
          
            data: {
              cuit:client.cuit,
              name:client.name,
              email:client.email,
              lastname:client.lastname,
              direction:client.direction,
              gross_income:client.gross_income,
              enable:client.enable
            }
          });
          console.log(response.status);
          if(response.status == 200){
            console.log("joya");
            setClientOriginal(client)
          
           //goTo("/productos")
          }else{
            setClient(clientOriginal)
          }
          
       } catch (error) {
        setClient(clientOriginal)
            console.error(error)
       }
    }


    return (
      <div>
        {
            client ? (
              <div>

              
              <Navbar/>
              <div className="detail-card">
              <table>
                <tbody>
                  <tr>
                    <th>CUIT</th>
                    <td>{editando ? <input type="text" name="cuit" value={client.cuit} onChange={handleChange} /> : client.cuit}</td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>{editando ? <input type="text" name="name" value={client.name} onChange={handleChange} /> : client.name}</td>
                  </tr>
                  <tr>
                    <th>Apellido</th>
                    <td>{editando ? <input type="text" name="lastname" value={client.lastname} onChange={handleChange} /> : client.lastname}</td>
                  </tr>
                  <tr>
                    <th>Correo Electrónico</th>
                    <td>{editando ? <input type="text" name="email" value={client.email} onChange={handleChange} /> : client.email}</td>
                  </tr>
                  <tr>
                    <th>Dirección</th>
                    <td>{editando ? <input type="text" name="direction" value={client.direction} onChange={handleChange} /> : client.direction}</td>
                  </tr>
                  <tr>
                    <th>Ingresos Brutos</th>
                    <td>{editando ? <input type="text" name="gross_income" value={client.gross_income} onChange={handleChange} /> : client.gross_income}</td>
                  </tr>
                </tbody>
              </table>
              <div className="boton-editar">
              </div>
                {editando ? (
                  <>
                  <button onClick={handleGuardar}>Guardar</button>
                  <button onClick={handleCancelar}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => setEditando(true)}>Editar</button>
                )}
              </div>
            </div>
            ) : <h1>no hay plata</h1>
        }
        
      </div>
    );
  };

const ClientsTable = ({ clients, onClientsClick }) => {
    return (
        <div className="product-table-container">
          <h1>Tabla de Clientes</h1>
          <table className="product-table">
            <thead>
              <tr>
                <th>Cuit</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Direccion</th>
                <th>Ingresos Brutos</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id} onClick={() => onClientsClick(client)}>
                  <td>{client.cuit}</td>
                  <td>{client.name}</td>
                  <td>{client.lastname}</td>
                  <td>{client.email}</td>
                  <td>{client.direction}</td>
                  <td>{client.gross_income}</td>
                  <td>
                <Link to={`/cliente/${client.cuit}`}>Ver Detalles</Link>
                 </td>
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      );
  };
  
  export default ClientsTable;

// Componente ProductsList para renderizar una lista de productos
/*
{
            client ? (
                <div className="detalle-cliente-container">
              <div className="detalle-cliente-header">
                <h2>Detalle del Cliente</h2>
                {editando ? (
                  <button onClick={handleGuardar} className="btn-guardar">Guardar</button>
                ) : (
                  <button onClick={() => setEditando(true)} className="btn-editar">Editar</button>
                )}
              </div>
              <div className="detalle-cliente-body">
                <div className="detalle-cliente-item">
                  <label>CUIT:</label>
                  {editando ? (
                    <input
                      type="text"
                      name="cuit"
  
                      onChange={handleChange}
                      className="input-editable"
                    />
                  ) : (
                    <span>{client.cuit}</span>
                  )}
                </div>
                <div className="detalle-cliente-item">
                  <label>Nombre:</label>
                  {editando ? (
                    <input
                      type="text"
                      name="nombre"
                      
                      onChange={handleChange}
                      className="input-editable"
                    />
                  ) : (
                    <span>{client.name}</span>
                  )}
                </div>
                <div className="detalle-cliente-item">
                  <label>Apellido:</label>
                  {editando ? (
                    <input
                      type="text"
                      name="apellido"
                    
                      onChange={handleChange}
                      className="input-editable"
                    />
                  ) : (
                    <span>{client.lastname}</span>
                  )}
                </div>
                <div className="detalle-cliente-item">
                  <label>Correo Electrónico:</label>
                  {editando ? (
                    <input
                      type="text"
                      name="correo"
                      
                      onChange={handleChange}
                      className="input-editable"
                    />
                  ) : (
                    <span>{client.email}</span>
                  )}
                </div>
                <div className="detalle-cliente-item">
                  <label>Dirección:</label>
                  {editando ? (
                    <input
                      type="text"
                      name="direccion"
                      
                      onChange={handleChange}
                      className="input-editable"
                    />
                  ) : (
                    <span>{client.direction}</span>
                  )}
                </div>
                <div className="detalle-cliente-item">
                  <label>Ingresos Brutos:</label>
                  {editando ? (
                    <input
                      type="number"
                      name="ingresos"
                      
                      onChange={handleChange}
                      className="input-editable"
                    />
                  ) : (
                    <span>{client.gross_income}</span>
                  )}
                </div>
              </div>
            </div>

*/
//export default ProductsList;



/*
 <th>Nombre</th>
                   <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Descripción</th>
                <th>Detalle</th>
*/