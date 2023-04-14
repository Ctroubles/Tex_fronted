import style from "./Perfil_usuaio.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import iconAdmiration from "../../assets/icons/admiration_icon_smokeWhite.png";
import MisCompras from "./Perfil_usuario_components/MisCompras/MisCompras";
import { useEffect, useState } from "react";
import axios from "axios";

const Perfil_usuario = ()=>{

    const {user} = useAuth0()
    const [usuario, setUsuario] = useState({})

    useEffect(()=>{
        const setting = async()=>{
            const { data } = await axios.get(`/users?email=${user.email}`).catch(err => alert(err));
            if (data) setUsuario(data)   
            console.log(data);
        }
        setting()
       
      },[])

    // console.log(user);
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
                                {usuario.name}
                            </h1>
                        </div>                        
                        <div>
                            <p>
                                {usuario.email}
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
                            <span>{usuario.texPoints}</span>
                        </label>
                    </div>
                    <div id={style.informationContainer}>
                        <h1>Información</h1>
                        <div id={style.userData}>
                            <div className={style.row}>
                                <label><span>Nombres: </span>{usuario.name}</label>
                                <label><span>Apellidos:</span>{usuario.surname}</label>
                            </div>
                            <div className={style.row}>
                                <label><span>Ciudad: </span>Trujillo</label>
                                <label><span>Dirección:</span>Jr. La piedra</label>
                            </div>   
                            <div className={style.row}>
                                <label><span>Dni: </span>{usuario.DNI}</label>
                                <label><span>Cumpleaños:</span>{usuario.birthday} <span id={style.admirationBirthday}><img src={iconAdmiration} alt="" /></span></label>
                            </div>
                            <div className={style.row}>
                                <label><span>Celular:</span>{usuario.phoneNumber}</label>
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