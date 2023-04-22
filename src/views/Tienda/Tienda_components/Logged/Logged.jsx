import style from "./Logged.module.css"
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";


const Logged = ({img,name, email})=>{

    const widthMobile = useMediaQuery('(max-width: 680px)');


    const {logout}=useAuth0()
    return(
    <div id={style.Logged}>
        <div id={style.toButton}>
            <label id={style.imgProfileContainer}><img src={img} alt="Imagen del usuario" /></label>
            {!widthMobile?<label id={style.name}><span>{name}</span></label>:null}
            <div id={style.menu_desplegable}>
                <div id={style.email}>
                    <label>
                        <span>{email}</span>
                    </label>
                </div>
                <Link className={style.options} to="/perfil" >
                    <label>
                        <span>Mi perfil</span>
                    </label>
                </Link>            
                <div className={style.options} onClick={()=>logout()} style={{paddingBottom:"5px", color:" #e61919 "}}>
                    <label>
                        <span>Cerrar sesión</span>
                    </label>
                </div>
            </div>
        </div>
    </div>)
};

export default Logged;