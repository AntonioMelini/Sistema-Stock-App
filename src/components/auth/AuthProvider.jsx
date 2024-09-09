import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

 
const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: ()=>"",
    saveUser:(userData)=>{},
    admin: false,
    user: false,
    logOutUser:()=>{},
    username : ""
})

export const AuthProvider =({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken]= useState("");
    const [refreshToken, setRefreshToken]= useState("");
    const [admin, setAdmin]= useState(false);
    const [user, setUser]= useState(false);
    const [username, setUsername]= useState("");
    const API_URL = process.env.REACT_APP_BASE_URL


    useEffect(() =>{
        checkAuth()
        
    },[])

    const requestNewAccessToken = async(refreshToken)=>{
        try {
            const tokenReady=`Bearer ${refreshToken}`.replace('"','').replace('"','');
            const response = await axios({
                method: 'GET',
                headers: {
                    "Content-Type":"application/json",
                    Authorization: tokenReady
                },
                url: `${API_URL}/user/token/refresh`,
            
              });
            if(response.status==200){
                console.log("RequestNewAccesToken (AT,RT): ",response.data);
               return response.data; //aca te devuelve accestoken y refersh token
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getUserInfo = async (accessToken) =>{
        try {
            console.log("ESTO ES ACCESTOKEN: ",accessToken);
            const response = await axios({
                method: 'GET',
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                url: `${API_URL}/user/info/${accessToken}`,
            
              });
            if(response.status==200){
                console.log("Esta es ña data de getUserInfo: ", response.data);
               return response.data;
            }
        } catch (error) {
            console.error(error)
        }
    }
    const logOutUser=()=>{
        setAccessToken("");
        setAdmin(false);
        setIsAuthenticated(false);
        setUser(false);
        setRefreshToken("");
        localStorage.removeItem("token")
        setUsername("")
    }

    const checkAuth = async ()=>{
        if(accessToken ){
            console.log("este es el accesToken de checkAuth",accessToken);
        }else{
            const token = getRefreshToken() ? getAccessToken() : localStorage.getItem("token");
            if(token){
                const newAccessToken = await requestNewAccessToken(token);
                if(newAccessToken){
                    
                    const userInfo = await getUserInfo(newAccessToken.access_token);
                    if(userInfo){
                        
                        userInfo.refresh_token=newAccessToken.refresh_token
                        userInfo.access_token=newAccessToken.access_token
                        saveUser(userInfo)  
                    }
                }
            }else{
                logOutUser();
            }
            
        }
    }


    const getAccessToken =() =>  accessToken;
    const getRefreshToken =() =>  refreshToken ? refreshToken :null;
    
    
    const saveUser =(userData) => {
        console.log("Esto se guarda en el estado: ",userData);
        
        setAccessToken(userData.access_token) 
        setRefreshToken(userData.refresh_token)

        if(userData.roles =="ROLE_ADMIN") setAdmin(true)
        if(userData.roles =="ROLE_USER") setUser(true)
        setIsAuthenticated(true)
        setUsername(userData.username)
        localStorage.setItem("token", JSON.stringify(userData.refresh_token))
    };



    return <AuthContext.Provider value={{isAuthenticated, getAccessToken, saveUser, admin , user  ,logOutUser ,username}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)