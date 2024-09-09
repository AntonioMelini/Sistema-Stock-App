import { Link } from "react-router-dom"
import { useAuth } from "../components/auth/AuthProvider"
import { useLocation } from "react-router-dom";
import "./DefaultLayout.css";

export const DefaultLayout = ({children}) =>{
    const auth = useAuth()
    const location = useLocation()
    return(
        <>
        <header className="">
            <nav >
            <ul>
            hola
            </ul>
               
            </nav>
        </header>
        
        <index>{children}</index>
        </>
    )
}

/*
 <ul >
                    { auth.isAuthenticated &&
                        <l1 >
                            <button onClick={(e)=>auth.logOutUser()}>Log Out</button>
                        </l1>
                    }
                    {
                        auth.user && location.pathname !="/create/product" &&
                        <l1 className="new_link">
                            <Link to="/create/product">Add Product</Link>
                        </l1>
                    }
                     {
                        auth.user && location.pathname != "/create/client" &&
                        <l1 className="new_link">
                            <Link to="/create/client">Add Client</Link>
                        </l1>
                    }

                    { location.pathname != "/home" && <li className="new_link">
                        <Link to="/">Home</Link>
                    </li>}
                    { location.pathname != "/createU" || "/createUser" &&  auth.admin && <li>
                        <Link to="/create/user">CreateUser</Link></li>}
                   
                </ul>


*/