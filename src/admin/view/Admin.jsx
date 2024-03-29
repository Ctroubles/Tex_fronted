import style from "./Admin.module.css"
import {Link, Route} from "react-router-dom"
import userIcon from "../admin_assets/user_icon.png";
import { useHistory } from "react-router-dom";
import logoutIcon from "../admin_assets/logout-svgrepo-com.svg"
// import TableProductos from "../admin_componets/TableProductos/TableProductos";
import ControlPanel from "../view/ControlPanel/ControlPanel";
// import FormAgregarProducto from "../admin_componets/FormAgregarProducto/FormAgregarProducto";
import { useAuth0 } from "@auth0/auth0-react";
// import TablaUsuarios from "../admin_componets/TableUsuarios/TableUsuarios";

const Admin = () =>{

    const {logout} = useAuth0();

    const pathname = useHistory().location.pathname

    return(
        <div id={style.AdminContainer}>
            <div id={style.panelAdmin}>
                <nav>
                    <div>
                        <div>CS</div>
                        <div>
                            <h1>Compu Shop</h1>
                            <p>Componentes de PC</p>
                        </div>
                    </div>
                    <Link id={pathname==="/admin/controlPanel"?style.linkActive:undefined} to={"/admin/controlPanel"}>Panel de control</Link>
                    <Link id={pathname==="/admin/users"?style.linkActive:undefined} to={"/admin/users"}>Users</Link>
                    <Link id={pathname==="/admin/products"?style.linkActive:undefined} to={"/admin/products"}>Productos</Link>
                    <Link className={style.volver} id={pathname==="/home"?style.linkActive:undefined} to={"/home"}>Volver a Home</Link>
                </nav>
                <div>
                <Link to={"/profile"}>
                    <div>
                        <img src={userIcon} alt="" /></div>
                        <h3>Mi perfil</h3>
                    </Link>
                        <div onClick={()=> logout({ returnTo: window.location.origin})}>
                        <img src={logoutIcon} alt="" />
                        <p>Logout</p>
                    </div>
                </div>
            </div>

            <div id={style.mainAdmin}>
                <Route exact path={"/admin/controlPanel"} render={()=> <ControlPanel />}/>
                {/* <Route exact path={"/admin/products"} render={()=> <TableProductos/>}/> */}
                {/* <Route exact path={"/admin/products/add"} render={()=> <FormAgregarProducto/>}/> */}
                {/* <Route exact path={"/admin/users"} render={()=> <TablaUsuarios/>}/> */}
            </div>
        </div>
    )
};

export default Admin;