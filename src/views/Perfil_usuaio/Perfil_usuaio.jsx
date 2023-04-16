import style from "./Perfil_usuaio.module.css";
import iconAdmiration from "../../assets/icons/admiration_icon_smokeWhite.png";
import MisCompras from "./Perfil_usuario_components/MisCompras/MisCompras";
import { useEffect, useState } from "react";
import axios from "axios";

const Perfil_usuario = ({userEmail})=>{

    const [user, setUser] = useState({})

    useEffect(()=>{
        const getUser = async()=>{
            const {data}= await axios.get(`/users?email=${userEmail}`)
            if (data)setUser(data)
        }
       getUser()
      },[userEmail])
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
                                {/* {user.name} */}
                            </h1>
                        </div>                        
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <p>
                                {user.email}
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
                            <span>{user.texPoints}</span>
                        </label>
                    </div>
                    <div id={style.informationContainer}>
                        <h1>Información</h1>
                        <div id={style.userData}>
                            <div className={style.row}>
                                <label><span>Nombres: </span><span contentEditable={'true'} className={style.valueData}>{user.name}</span></label>
                                <label><span>Apellidos:</span> <span contentEditable={'true'} className={style.valueData}>{user.surname}</span></label>
                            </div>
                            <div className={style.row}>
                                <label><span>Ciudad: </span> <span contentEditable={'true'} className={style.valueData}>{user.city}</span> </label>
                                <label><span>Dirección:</span> <span contentEditable={'true'} className={style.valueData}>{user.address}</span></label>
                            </div>   
                            <div className={style.row}>
                                <label><span>Dni: </span> <span contentEditable={'true'} className={style.valueData}>{user.DNI}</span></label>
                                <label><span>Cumpleaños:</span> <span contentEditable={'true'} className={style.valueData}>{user.birthday}</span> <span id={style.admirationBirthday}><img src={iconAdmiration} alt="" /></span></label>
                            </div>
                            <div className={style.row}>
                                <label><span>Celular:</span> <span contentEditable={'true'} className={style.valueData}>{user.phoneNumber}</span> </label>
                                <div id={style.guardar}>
                                  <label><span>Guradar</span></label>
                                </div>
                            </div> 
                      
                        </div>
                      
                    </div>

                    <div>
                        <MisCompras ordenes={user.purchaseOrders}/>
                    </div>
                </div>
           </div>
        </div>
    )
};

export default Perfil_usuario