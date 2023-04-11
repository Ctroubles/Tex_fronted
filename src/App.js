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

// axios.defaults.baseURL = 'https://tex-api.vercel.app/';
axios.defaults.baseURL = 'https://localhost:3001/';



function App() {
  const history = useHistory();

  const { user,isAuthenticated,loginWithRedirect,isLoading,logout} = useAuth0()

  const headerRef = useRef(null)
  const location = useLocation();

  const [paddingMain,setPadingMain] = useState(0)
  const [currentUser, setCurrentUser]=useState({})
  const [loadinStatus, setLoadingStatus]=useState(true)

  useEffect(()=>{
    setPadingMain(95)
  },[])
  

  useEffect(()=>{
    const setting = async()=>{
      const postUser=async()=>{
        console.log(user.email);
        const {data} = await axios.post(`/users`,{email:user.email}).catch(err=>console.log(err))
        if (data) setCurrentUser(data)
      }
        if(isAuthenticated) await postUser()
        if(!isLoading)setLoadingStatus(false)
      
    }
    setting()
   
  },[user,isLoading])
  

  useEffect(()=>{
    const userBanned = async()=>{
    // const userr = await axios.get(`${urlBack}/users/db/${user.email}`)
    // if(userr.data.isActive===false){
    //   alert("User is banned. Please contact us for more information")
    //   logout({ returnTo: window.location.origin })
    // }
  }

  })
  

  if (!loadinStatus) {
    return (
      <div id={style.AbsoluteContaier}>
          <Route exact path={"/"} render={()=> <Landing/>}/>
          <Route  path={"/tienda"} render={()=> <Tienda/>}/>
          <Route exact path={"/perfil"} render={()=>!isAuthenticated?loginWithRedirect():<PerfilUsuario/>}/>
          <Route exact path={"/forja"} render={()=> <Forja/>}/>
          <Route exact path={"/finalizar"} render={()=> <ShoppingView userId={currentUser._id}/>}/>
          <Route exact path={"/finalizar/checkout"} render={()=> <Checkout userId={currentUser._id}/>}/>
          <Route exact path={"/pedidos/:norden/:id"} render={()=> <OrdenGenerada/>}/>
          {/* { location.pathname!=='/' && !location.pathname.toLowerCase().includes('/admin') && location.pathname!=='/shoppingcart' && <Header headerRef={headerRef} isAdmin={currentUser?.isAdmin}/>}
          { location.pathname!=='/' &&  !location.pathname.toLowerCase().includes('/admin') && location.pathname!=='/shoppingcart' &&<div id={style.bodyMain} style={{paddingTop:`${paddingMain}px`}}>
          <Route exact path={"/productos"} render={()=> <Productos/>} />
          <Route exact path={"/producto/:id"} render={()=> <DetalleProducto/>} />
          <Route path={"/construye"} render={()=> <Construye/>} />
          <Route exact path={"/compra"} render={()=> <Compra/>}/>
          <Route exact path={"/profile/miscompras"} render={()=>!isAuthenticated?loginWithRedirect():<MisCompras currentUser={currentUser}/>}/>
          {/* <Route exact path={"/edituser"} render={()=> <EditUser/>}/>
          <Route exact path={"/edituser"} render={()=> <EditUser/>}/> */}
          {/*<Route exact path={"/ayuda"} render={()=> <Ayuda/>}/> }
          </div>
          }
          <Route exact path={"/notfound"} render={()=> <NotFound/>}/>
          <Route path={"/admin"} render={()=>!isAuthenticated?loginWithRedirect():currentUser?.isAdmin?<Admin/>:history.push("/productos")}/>
          <Route exact path={"/nosotros"} render={()=><Nosotros/>}/>
          { location.pathname!=='/' && !location.pathname.toLowerCase().includes('/admin') &&  location.pathname!=='/shoppingcart' &&  <Footer/>}
          <Route path="*"> <Redirect to="/notfound" /> </Route> */}
      </div>
    );
  }else{
    return(
        <GeneralLoading/>
    )
  
  }


}

export default App;
