import style from "./Perfil_usuaio.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import iconAdmiration from "../../assets/icons/admiration_icon_smokeWhite.png";
import MisCompras from "./Perfil_usuario_components/MisCompras/MisCompras";

const Perfil_usuario = ()=>{

    const {user} = useAuth0()

    console.log(user);
    return(
        <div id={style.Perfil_usuario}>
           <div id={style.main}>
                <div id={style.side}>
                    <div id={style.userPresentation}>
                        <div>
                            <img src={user.picture} alt="" />
                        </div>                       
                        <div>
                            <h1>
                                César rrr
                            </h1>
                        </div>                        
                        <div>
                            <p>
                                cesar@gmail.com
                            </p>
                        </div>
                    </div> 
                    <div id={style.sideOptions}>
                        <div>
                            <ul>
                                <li>Editar Perfil</li>
                                <li>Cerrar Sesión</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id={style.pricipal}>
                    <div id={style.pointsSection}>
                        <label>
                            <span>TEXpoints: </span>
                            <span>14759</span>
                        </label>
                    </div>
                    <div id={style.informationContainer}>
                        <h1>Información</h1>
                        <div id={style.userData}>
                            <div className={style.row}>
                                <label><span>Nombres: </span>César Alfredo</label>
                                <label><span>Apellidos:</span>Llajaruna González</label>
                            </div>
                            <div className={style.row}>
                                <label><span>Ciudad: </span>Trujillo</label>
                                <label><span>Dirección:</span>Jr. La piedra</label>
                            </div>   
                            <div className={style.row}>
                                <label><span>Dni: </span>72674963</label>
                                <label><span>Cumpleaños:</span>25 de Diciembre <span id={style.admirationBirthday}><img src={iconAdmiration} alt="" /></span></label>
                            </div>
                            <div className={style.row}>
                                <label><span>Celular:</span>902038984</label>
                            </div> 
                      
                        </div>
                    </div>

                    <div>
                        <MisCompras/>
                    </div>
                </div>
           </div>
        </div>
    )
};

export default Perfil_usuario