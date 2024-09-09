import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './auth/AuthProvider';
import { DefaultLayout } from '../layouts/DefaultLayout';
import Navbar from './NavBar';
import ProductTable from './ProductsTable';
const API_URL = process.env.REACT_APP_BASE_URL

export const Product =() => {
 const [products, setProducts] = useState([])
 const [productInfo, setProductInfo]= useState(null)
 const auth = useAuth()

 const handleProductClick = (product) => {
        
  //<link to={`/cliente/${cliente.cuit}`}></link>
  //console.log(cliente);
  setProductInfo(product)
  console.log("toco",productInfo);
};
 

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
            <div>
                <Navbar/>
                <ul>
                     {

                    products.length  && auth.user && auth.isAuthenticated ? (
                        <ProductTable products={products} onProductsClick={handleProductClick}/>
                        ) : (
                    <l1>No Products</l1>
                    )
                    }
               </ul>
           
            </div>
            
      
                
            
        </DefaultLayout>
   

  );
}
