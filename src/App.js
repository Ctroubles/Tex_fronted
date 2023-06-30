import style from "./App.module.css";
import {Route, Redirect} from "react-router-dom";
import { Landing,PerfilUsuario } from "./views/index.js";
import { useLocation } from "react-router-dom";
import Construye from "./views/Construye/Construye";
import Admin from "./admin/view/Admin.jsx";
import {useEffect, useRef, useState} from "react";
import ShoppingView from "./views/Shopping/Shopping.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import GeneralLoading from "./views/General_Loading/GeneralLoading.jsx"
import Tienda from "./views/Tienda/Tienda";
import Forja from "./views/Forja/Forja.jsx"
import Checkout from "./views/Checkout/Checkout";
import OrdenGenerada from "./views/OrdenGenerada/OrdenGenerada.jsx";
import axios from 'axios';
import PrivacidadView from "./views/Privacidad/Privacidad";
import TermsConditions from "./views/TermsCondi/TermsConditions";


axios.defaults.baseURL = 'https://tex-api.vercel.app/';
// axios.defaults.baseURL = 'http://localhost:3001/';


function App() {

  useEffect(()=>{
    if(pathname==="/") history.push("/tienda")
  },[pathname])


  const { user,isAuthenticated,loginWithRedirect,isLoading,logout} = useAuth0()
  const { pathname } = useLocation()
  const history = useHistory()


  const [currentUser, setCurrentUser]=useState({})
  const [loadinStatus, setLoadingStatus]=useState(true)


  

  useEffect(()=>{
    const setting = async()=>{
        const postUser=async()=>{
        const {data} = await axios.post(`/users`,{user:user}).catch(err=>alert("errore 39 line appjs"+ err))
        if (data) setCurrentUser(data)
      }
        if(isAuthenticated) await postUser()
        if(!isLoading)setLoadingStatus(false)
      
    }
    setting()
   
  },[user,isLoading])
  

  

  if (!loadinStatus) {
    return (
      <div id={style.AbsoluteContaier}>
          <Route exact path={"/"} render={()=> <Landing/>}/>
          <Route  path={"/tienda"} render={()=> <Tienda picture={currentUser?.picture}/>}/>
          <Route exact path={"/perfil"} render={()=>!isAuthenticated?loginWithRedirect():<PerfilUsuario userEmail={currentUser.email}/>}/>
          <Route exact path={"/forja"} render={()=> <Forja/>}/>
          <Route exact path={"/finalizar"} render={()=> <ShoppingView userId={currentUser._id}/>}/>
          <Route exact path={"/finalizar/checkout"} render={()=> <Checkout userId={currentUser._id}/>}/>
          <Route exact path={"/pedidos/:norden/:id"} render={()=> <OrdenGenerada/>}/>
          <Route exact path={"/politica-de-privacidad"} render={()=> <PrivacidadView/>}/>
          <Route exact path={"/terminos&condiciones"} render={()=> <TermsConditions/>}/>
      </div>
    );
  }else{
    return(
        <GeneralLoading/>
    )
  
  }


}

export default App;
