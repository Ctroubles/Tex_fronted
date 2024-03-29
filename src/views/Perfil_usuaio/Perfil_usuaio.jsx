import style from "./Perfil_usuaio.module.css";
import iconAdmiration from "../../assets/icons/admiration_icon_smokeWhite.png";
import MisCompras from "./Perfil_usuario_components/MisCompras/MisCompras";
import { useEffect, useState } from "react";
import axios from "axios";
import { validators, validatorsLevel2 } from "./validators.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./skeleton.css"






const editableStyle = {
    border:"1px solid #C0C0C0",
    minWidth:"180px",
    backgroundColor:"#272727"
}


const Perfil_usuario = ({userEmail})=>{

    const history = useHistory()
    const {logout}=useAuth0()

    const [loading ,setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        DNI: "",
        region: "",
        city: "",
        address: "",
        phoneNumber: "",
        birthday: "",
      })
    const [editable, setEditable] = useState(false)
    const [errorsForm,setErrorsForm] = useState({})


    /////////////////////////////////FUNCIONESSS
    const getUser = async()=>{
        setTimeout(async()=>{

        const {data}= await axios.get(`/users?email=${userEmail}`)
        if (data){
            setUser(data)
            const { name, surname, DNI, region, city, address, phoneNumber, birthday } = data;
            const personalData = {
                name: name ? name : '',
                surname: surname ? surname : '',
                DNI: DNI ? DNI.toString() : '',
                region: region ? region : '',
                city: city ? city : '',
                address: address ? address : '',
                phoneNumber: phoneNumber ? phoneNumber.toString() : '',
                birthday: birthday ? birthday : '',
            };
            setUserData(personalData)
            setLoading(false)

        }
    },500)

    }

    useEffect(()=>{

       getUser()
      },[userEmail])

    
    const handlerChange = (e)=>{
        const target = e.target.name;
        const value = e.target.value
        setErrorsForm({...errorsForm,[target]:null})
        if(validators(target,value)){
            setUserData({...userData,[target]:value})
        }
    }    


    const handleSave = async()=>{
        const errores = validatorsLevel2(setErrorsForm,userData)
        let approved = true;
        for(let i in errores){
            if(errores[i])approved=false;
        }
        if (approved){
            const {data} = await axios.put(`/users/update/${user._id}`,userData);
            if (data) {
                await  getUser()
                setEditable(false)
            }
        }
    }

    const cancelEdit = ()=>{
        const { name, surname, DNI, region, city, address, phoneNumber, birthday } = user;
            const personalData = {
                name: name ? name : '',
                surname: surname ? surname : '',
                DNI: DNI ? DNI.toString() : '',
                region: region ? region : '',
                city: city ? city : '',
                address: address ? address : '',
                phoneNumber: phoneNumber ? phoneNumber.toString() : '',
                birthday: birthday ? birthday : '',
            };
            setUserData(personalData)
            setEditable(false)
        }


    if(loading){
        return(
            <SkeletonTheme color="#302f2f" highlightColor="#cccccc86" >

            <div id={style.Perfil_usuario}>
            <div id={style.main}>
                    <div id={style.side}>
                        <div id={style.userPresentation} >
                            <div style={{minHeight:"120px"}} >
                                <Skeleton width={112} height={112} duration={0.5} circle={true}/>
                            </div>                                              
                            <div style={{display:"flex", justifyContent:"center", minHeight:"49px"}} >
                                <p>
                                    <Skeleton width={190} height={17} duration={0.5}/>
                                </p>
                            </div>
                        </div> 
                        <div id={style.sideOptions}>
                            <div>
                                <ul>
                                    <li onClick={()=>history.push("/tienda")} >Ir a tienda</li>
                                    <li onClick={()=>setEditable(true)} >Editar perfil</li>
                                    <li onClick={()=>logout()} >Cerrar sesión</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id={style.pricipal}>
                        <div id={style.pointsSection}>
                            <label>
                                <h1>TEXpoints:&nbsp;</h1>
                                <Skeleton width={100} height={24} duration={0.5} align="top"  />                                    
                            </label>
                        </div>
                        <div id={style.informationContainer}>
                            <h1>Información:</h1>
                            <div id={style.userData}>
                                <div className={style.row}>
                                    <label>
                                        <span className={style.attributeData}>Nombres:</span>
                                        <Skeleton width={180} height={22} duration={0.5} align="top"  />
                                    </label>                                    
                                    <label>
                                        <span className={style.attributeData} >Apellidos :</span> 
                                        <Skeleton width={180} height={22} duration={0.5} align="top"  />                                
                                    </label>
                                </div>
                                <div className={style.row}>
                                    <label>
                                        <span className={style.attributeData} >DNI : </span> 
                                        <Skeleton width={180} height={22} duration={0.5} align="top"  />                                    
                                    </label>
                                    <label>
                                        <span className={style.attributeData} >Región :</span> 
                                        <Skeleton width={180} height={22} duration={0.5} align="top"  />                                    
                                    </label>                                
                                </div>   
                                <div className={style.row}>
                                    <label>
                                        <span className={style.attributeData} >Ciudad : </span> 
                                        <Skeleton width={180} height={22} duration={0.5} align="top"  />                                    
                                    </label>                                    
                                    <label>
                                        <span className={style.attributeData} >Dirección :</span> 
                                        <Skeleton width={180} height={22} duration={0.5} align="top"  />                                    
                                    </label>                                </div>
                                <div className={style.row}>
                                    <label>
                                        <span className={style.attributeData} >Celular :</span> 
                                        <Skeleton width={180} height={22} duration={0.5} align="top"  />                                    
                                    </label>                                    
                                    <label>
                                        <span className={style.attributeData} >Cumpleaños :</span> 
                                        <Skeleton width={180} height={22} duration={0.5} align="top"  />                                    
                                    </label>                                
                                </div> 
                                {editable?
                                <div id={style.guardar}>
                                    <label><p onClick={()=>cancelEdit()}>Cancelar</p></label>
                                    <label><span onClick={()=>handleSave()}>Guardar</span></label>
                                </div>:null
                                }
                        
                            </div>
                        
                        </div>

                        <div>
                            <MisCompras ordenes={user.purchaseOrders} loading={loading}/>
                        </div>
                    </div>
            </div>
            </div>
            </SkeletonTheme>

    )
    }
    else{   
        return(
            <div id={style.Perfil_usuario}>
            <div id={style.main}>
                    <div id={style.side}>
                        <div id={style.userPresentation}>
                            <div style={{minHeight:"120px"}}>
                                <img src={user.picture} alt="" />
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
                                    <li onClick={()=>history.push("/tienda")} >Ir a tienda</li>
                                    <li onClick={()=>setEditable(true)} >Editar perfil</li>
                                    <li onClick={()=>logout()} >Cerrar sesión</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id={style.pricipal}>
                        <div id={style.pointsSection}>
                            <label>
                                <h1>TEXpoints:&nbsp;</h1>
                                <p style={{minWidth:"100px"}}>{user.texPoints}</p>
                            </label>
                        </div>
                        <div id={style.informationContainer}>
                            <h1>Información:</h1>
                            <div id={style.userData}>
                                <div className={style.row}>
                                    <label><span className={style.attributeData} >Nombres :</span> <input id={errorsForm.name?style.error:undefined} onChange={handlerChange} name="name" className={style.valueData} style={editable?editableStyle:undefined} value={userData.name} readOnly={!editable}  spellCheck="false"/>  </label>
                                    <label><span className={style.attributeData} >Apellidos :</span> <input id={errorsForm.surname?style.error:undefined} onChange={handlerChange} name="surname" className={style.valueData} style={editable?editableStyle:undefined} value={userData.surname} readOnly={!editable} spellCheck="false" />  </label>
                                </div>
                                <div className={style.row}>
                                    <label><span className={style.attributeData} >DNI : </span> <input id={errorsForm.DNI?style.error:undefined} onChange={handlerChange} name="DNI" className={style.valueData} style={editable?editableStyle:undefined} value={userData.DNI} readOnly={!editable}  spellCheck="false" />  </label>
                                    <label><span className={style.attributeData} >Región :</span> <input id={errorsForm.region?style.error:undefined} onChange={handlerChange} name="region" className={style.valueData} style={editable?editableStyle:undefined} value={userData.region} readOnly={!editable} spellCheck="false" />  </label>
                                </div>   
                                <div className={style.row}>
                                    <label><span className={style.attributeData} >Ciudad : </span> <input id={errorsForm.city?style.error:undefined} onChange={handlerChange} name="city" className={style.valueData} style={editable?editableStyle:undefined} value={userData.city} readOnly={!editable} spellCheck="false" />  </label>
                                    <label><span className={style.attributeData} >Dirección :</span> <input id={errorsForm.address?style.error:undefined} onChange={handlerChange} name="address" className={style.valueData} style={editable?editableStyle:undefined} value={userData.address} readOnly={!editable} spellCheck="false" />  </label>
                                </div>
                                <div className={style.row}>
                                    <label><span className={style.attributeData} >Celular :</span> <input id={errorsForm.phoneNumber?style.error:undefined} onChange={handlerChange} name="phoneNumber" className={style.valueData} style={editable?editableStyle:undefined} value={userData.phoneNumber} readOnly={!editable} spellCheck="false" />  </label>                           
                                    <label><span className={style.attributeData} >Cumpleaños :</span> <input className={errorsForm.birthday?style.error:undefined} id={style.my_date_input} onChange={handlerChange} name="birthday" type={"date"}  style={editable?editableStyle:undefined} value={userData.birthday} readOnly={!editable} spellCheck="false" />  <span id={style.admirationBirthday}><img src={iconAdmiration} alt="" /></span></label>
                                </div> 
                                {editable?
                                <div id={style.guardar}>
                                    <label><p onClick={()=>cancelEdit()}>Cancelar</p></label>
                                    <label><span onClick={()=>handleSave()}>Guardar</span></label>
                                </div>:null
                                }
                        
                            </div>
                        
                        </div>

                        <div>
                            <MisCompras ordenes={user.purchaseOrders}/>
                        </div>
                    </div>
            </div>
            </div>
        )
    }
};

export default Perfil_usuario