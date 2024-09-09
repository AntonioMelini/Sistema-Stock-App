import React, { useEffect, useState } from 'react';
import '../css/ClientsDetail.css'
import { Link,useLocation} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './auth/AuthProvider';
import Navbar from './NavBar';
const API_URL = process.env.REACT_APP_BASE_URL

// Componente Product para renderizar un producto individual
export const DetalleProducto =()=>{
  const auth = useAuth()
  const location=useLocation()
  const idFromPath = location.pathname.split('/')[2]
    const [product, setProduct]=useState(null)
    const [productOriginal ,setProductOriginal]= useState(null)
    const [editando, setEditando] = useState(false);
    
    useEffect(()=>{
        getProduct()
    },[])

    const getProduct = async ()=>{
      
      const response = await axios.get(`${API_URL}/product/${idFromPath}`,{
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`
        }
      });
      
      if(response.status ==200){setProduct(response.data) ;setProductOriginal(response.data);}
      console.log(product);

    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    const handleGuardar = () => {
      // Aquí puedes implementar la lógica para guardar los datos editados
      // Por ejemplo, puedes enviar los datos a una API
      console.log('Datos guardados:', product);
      setEditando(false);
      onModificar(product)
      //onModificar(client);
    };

    const handleCancelar = () => {
      setEditando(false);
      setProduct(productOriginal)
 // Restaurar datos originales
    };

    const onModificar = async (product)=>{
      try {
        const response = await axios({
            url: `${API_URL}/product/${idFromPath}`,
            method: 'put',
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`
            },
          
            data: {
              name:product.name,
              price:product.price,
              stock:product.stock,
              image:product.image ? product.image : "",
              description:product.description,
              enable:product.enable
            }
          });
          console.log(response.status);
          if(response.status == 201){
            console.log("joya");
            setProductOriginal(product)
          
           //goTo("/productos")
          }else{
            setProduct(productOriginal)
          }
          
       } catch (error) {
        setProduct(productOriginal)
            console.error(error)
       }
    }

    return (
      <div>
        {
            product ? (
              <div>

              
              <Navbar/>
              <div className="detail-card">
              <table>
                <tbody>
                  <tr>
                    <th>Nombre</th>
                    <td>{editando ? <input type="text" name="name" value={product.name} onChange={handleChange} /> : product.name}</td>
                  </tr>
                  <tr>
                    <th>Precio</th>
                    <td>{editando ? <input type="text" name="price" value={product.price} onChange={handleChange} /> : product.price}</td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>{editando ? <input type="text" name="stock" value={product.stock} onChange={handleChange} /> : product.stock}</td>
                  </tr>
                  <tr>
                    <th>Descripcion</th>
                    <td>{editando ? <input type="text" name="description" value={product.description} onChange={handleChange} /> : product.description}</td>
                  </tr>
                  
                  <tr>
                    <th>Imagen</th>
                    <td>{editando ? <input type="text" name="image" value={product.image} onChange={handleChange} /> : product.image}</td>
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


}

const ProductTable = ({ products, onProductsClick }) => {
    return (
        <div className="product-table-container">
          <h1>Tabla de Productos</h1>
          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Descripción</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} onClick={() => onProductsClick(product)}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.description}</td>
                  <td>
                <Link to={`/product/${product.id}`}>Ver Detalles</Link>
                 </td>
                </tr>
              
              ))}
            </tbody>
          </table>
        </div>
      );
  };
  
  export default ProductTable;

// Componente ProductsList para renderizar una lista de productos
/*
const ProductsList = ({ products }) => {
  return (
    <div className="products-list">
      <h1>Lista de Productos</h1>
      {products.map(product => (
        <Product
          key={product.id}
          name={product.name}
          price={product.price}
          stock={product.stock}
          image={product.image}
          description={product.description}
        />
      ))}
    </div>
  );
};

*/
//export default ProductsList;