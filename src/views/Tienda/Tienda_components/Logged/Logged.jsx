import style from "./Logged.module.css"
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";


const Logged = ({img,name})=>{
    const {logout}=useAuth0()
    return(
    <div id={style.Logged}>
        <div id={style.toButton}>
            <label id={style.imgProfileContainer}><img src={img} alt="" /></label>
            <label id={style.name}><span>{name}</span></label>
            <div id={style.menu_desplegable}>
            <Link className={style.options} to="/perfil" >
                <label>
                    <span>Mi perfil</span>
                </label>
            </Link>            
            <div className={style.options} onClick={()=>logout()}>
                <label>
                    <span>Cerrar sesión</span>
                </label>
            </div>
        </div>
        </div>
    </div>)
};

export default Logged;