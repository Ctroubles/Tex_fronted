import { validators } from '../../helpers_shopping/helpers_shopping';
import { useEffect, useState, useRef } from 'react';
import React from 'react';
import style from "./FormularioShopping.module.css"
import { useSelector } from 'react-redux';
import black_arrow from "../../../../assets/icons/black_arrow.svg"
import  regions  from '../../../../delivery/ciudades_departamentos';




const Formulario = ({statusForm,errorsForm, setErrorsForm}) =>{

    const refDepartamento = useRef(null);
    const refDepartamentoOptions = useRef(null);
    const refCiudad = useRef(null);


    const carrito = useSelector(e=>e.shoppingCart)


    const [selectActive, setSelectActive] = useState()
    const [departamentoStatus, setDepartamentoStatus] = useState(["Selecciona tu departamento",])
    const [formStatus,setFormStatus]=useState({
        name:"",
        dni:"",
        phone:"",
        email:"",
        departamento:"",
        ciudad:"Selecciona tu ciudad",
        address:"",
        instructions:"",
    });

    

    function handleAutoResize(event) {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
      }

      const hanldeChange =(e)=>{
        if (carrito.length) {
            const target = e.target.id;
            const value = e.target.value
            setErrorsForm({...errorsForm,[target]:null})
            if(validators(target,value)){
                setFormStatus({...formStatus,[target]:value})
            }
        }else{
            alert("Tu carrito está vacío")
        }
      }

      useEffect(()=>{
         statusForm.current = formStatus;
      },[formStatus])


      useEffect(() => {
        const handleOutsideClick = (event) => {
            if(refDepartamentoOptions.current && refDepartamentoOptions.current.contains(event.target) ) { setSelectActive("ciudad"); refCiudad.current.focus();}
            else if (refDepartamento.current && !refDepartamento.current.contains(event.target) &&  refCiudad.current && !refCiudad.current.contains(event.target)) setSelectActive("")
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
      }, [refDepartamento]);


      useEffect(()=>{
        setFormStatus({...formStatus,departamento:departamentoStatus[0]})
        setErrorsForm({...errorsForm, departamento:null})
      },[departamentoStatus])


    return(
        <div id={style.FormCotainer}>
            <div id={style.firstChild}>
                                <div>
                                    <h1 id={style.titleFormulario}>Información de entrega</h1>
                                </div>
                <div id={style.identification}>
                    <label className={style.firstLabel}>
                        <div style={errorsForm.name?{border:"1px solid red"}:undefined} id={style.childTwo} className={style.inputsContainer}>
                            <input onChange={hanldeChange} value={formStatus.name} id="name" className={style.inputs} placeholder="Nombres y apellidos" autoComplete='off' spellCheck="false" tabIndex="1"/>
                        </div>
                    </label>
                    <label id={style.id}>
                        <div style={errorsForm.dni?{border:"1px solid red"}:undefined} id={style.childTwo} className={style.inputsContainer}>
                            <input onChange={hanldeChange} value={formStatus.dni} id="dni" className={style.inputs} placeholder="DNI" autoComplete='off' tabIndex="2"/>
                        </div>
                    </label>
                </div>
                <div>
                        <div id={style.contactoSection}>
                            <div id={style.contactoDiv}>
                                <label id={style.contactoLabel}>
                                    <div style={errorsForm.phone?{border:"1px solid red"}:undefined} className={style.inputsContainer}>
                                        <input type="text" value={formStatus.phone} id="phone"  onChange={hanldeChange} className={style.inputs} placeholder="Telefono de contacto" autoComplete='off' tabIndex="3"/>
                                    </div>
                                </label>                                  
                            </div>
                            <div id={style.contactoDiv}>
                                <label id={style.contactoLabel}>
                                    <div style={errorsForm.email?{border:"1px solid red"}:undefined} className={style.inputsContainer}>
                                        <input type="text"  id="email" value={formStatus.email}  onChange={hanldeChange} className={style.inputs} placeholder="Email de contacto" autoComplete='off' tabIndex="4" />
                                    </div>
                                </label>                                  
                            </div>
                        </div>
                </div>
                <div id={style.secondDiv}>
                    <div id={style.childOneSecondDiv}>
                        <div id={style.childOneSecondDivChildOne}>
                            <label id={style.label2}>
                                <div style={errorsForm.departamento?{border:"1px solid red"}:undefined} id={style.divLabelTwo} className={style.inputsContainer}>
                                    <div ref={refDepartamento} onClick={()=>setSelectActive(selectActive === "departamento" ? "" : "departamento")} className={style.selects} onChange={hanldeChange} tabIndex="5" >
                                            <p style={departamentoStatus[0]==="Selecciona tu departamento"?{color:"#B4B9C1",opacity:"0.6"}:undefined} >{departamentoStatus[0]}</p> 
                                            <img src={black_arrow} alt="" />
                                    </div>
                                    <div className={style.opciones} style={{display:selectActive==="departamento"?"block":"none"}} >
                                        <ul ref={refDepartamentoOptions}>
                                            <li onClick={()=>{setDepartamentoStatus(["La Libertad","laLibertad"]);setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                        La Libertad
                                                </span>
                                            </li>
                                            <li onClick={()=>{setDepartamentoStatus(["Amazonas","amazonas"]) ; setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }}  >
                                                <span>
                                                    Amazonas
                                                </span>
                                            </li>
                                            <li onClick={()=>{setDepartamentoStatus(["Áncash","ancash"]) ; setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                        Áncash
                                                </span>
                                            </li>       
                                            <li onClick={()=>{setDepartamentoStatus(["Apurímac","apurimac"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                        Apurímac
                                                </span>
                                            </li>    
                                            <li onClick={()=>{setDepartamentoStatus(["Arequipa","arequipa"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                        Arequipa
                                                </span>
                                            </li>                                             
                                            <li onClick={()=>{setDepartamentoStatus(["Ayacucho","ayacucho"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                        Ayacucho
                                                </span>
                                            </li>   
                                            <li onClick={()=>{setDepartamentoStatus(["Cajamarca","cajamarca"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                        Cajamarca
                                                </span>
                                            </li>                                                                                             
                                            <li onClick={()=>{setDepartamentoStatus(["Cuzco","cusco"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                     Cuzco
                                                </span>
                                            </li>                                                
                                            <li onClick={()=>{setDepartamentoStatus(["Huancavelica","huancavelica"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }}>
                                                <span>
                                                        Huancavelica
                                                </span>
                                            </li>                                                
                                            <li onClick={()=>{setDepartamentoStatus(["Huánuco","huanuco"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                    Huánuco
                                                </span>
                                            </li>                                               
                                             <li onClick={()=>{setDepartamentoStatus(["Ica","ica"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }}  >
                                                <span>
                                                    Ica
                                                </span>
                                            </li>                                                
                                            <li onClick={()=>{setDepartamentoStatus(["Junín","junin"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }}  >
                                                <span>
                                                    Junín
                                                </span>
                                            </li>                                              
                                            <li onClick={()=>{setDepartamentoStatus(["Lambayeque","lambayeque"]); setFormStatus({...formStatus,ciudad:"Selecciona tu ciudad"}) }} >
                                                <span>
                                                    Lambayeque
                                                </span>
                                            </li>                                                                                          
                                            <li onClick={()=>{setDepartamentoStatus(["Lima","lima"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }} >
                                                <span>
                                                        Lima
                                                </span>
                                            </li>                                              
                                            <li onClick={()=>{setDepartamentoStatus(["Loreto","loreto"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }} >
                                                <span>
                                                    Loreto
                                                </span>
                                            </li>                                              
                                            <li onClick={()=>{setDepartamentoStatus(["Madre de Dios","madre_de_dios"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }} >
                                                <span>
                                                    Madre de Dios	
                                                </span>
                                            </li>                                              
                                            <li onClick={()=>{setDepartamentoStatus(["Moquegua","moquegua"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }}  >
                                                <span>
                                                    Moquegua
                                                </span>
                                            </li>                                              
                                            <li onClick={()=>{setDepartamentoStatus(["Pasco","pasco"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }}  >
                                                <span>
                                                    Pasco
                                                </span>
                                            </li>                                              
                                            <li onClick={()=>{setDepartamentoStatus(["Piura","piura"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }}  >
                                                <span>
                                                Piura
                                                </span>
                                            </li>                                                
                                            <li onClick={()=>{setDepartamentoStatus(["Puno","puno"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }} >
                                                <span>
                                                Puno
                                                </span>
                                            </li>                                               
                                                <li onClick={()=>{setDepartamentoStatus(["San Martín","san_martin"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }}  >
                                                <span>
                                                San Martín	
                                                </span>
                                            </li>                                               
                                                <li onClick={()=>{setDepartamentoStatus(["Tacna","tacna"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }}  >
                                                <span>
                                                Tacna
                                                </span>
                                            </li>                                                
                                            <li onClick={()=>{setDepartamentoStatus(["Tumbes","tumbes"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }}  >
                                                <span>
                                                Tumbes
                                                </span>
                                            </li>                                                
                                            <li onClick={()=>{setDepartamentoStatus(["Ucayali","ucayali"]); setFormStatus({...formStatus,ciudad:"Selecciona tu departamento"}) }}  >
                                                <span>
                                                Ucayali
                                                </span>
                                            </li>                                                
                                        </ul>
                                    </div>
                                </div>
                            </label>
                            <label id={style.label2}>
                                <div style={errorsForm.ciudad?{border:"1px solid red"}:undefined} id={style.divLabelTwo} className={style.inputsContainer}>
                                    <div ref={refCiudad} onClick={()=>setSelectActive(selectActive === "ciudad" ? "" : "ciudad")}  value={formStatus.city} className={style.selects} onChange={hanldeChange} tabIndex="6" >
                                            <p style={formStatus.ciudad==="Selecciona tu ciudad"?{color:"#B4B9C1",opacity:"0.6"}:undefined}>{formStatus.ciudad}</p> 
                                            <img src={black_arrow} alt="" />
                                    </div>
                                    <div className={style.opciones} style={{display:selectActive==="ciudad"?"block":"none"}} >
                                            <ul>
                                                {departamentoStatus[1]? regions[departamentoStatus[1]].map(e=>(
                                                        <li key={e} onClick={()=>{ setFormStatus({...formStatus,ciudad:e}); setErrorsForm({...errorsForm, ciudad:null})}} >
                                                           <span>
                                                                   {e}
                                                           </span>
                                                       </li>
                                                )) : undefined}
                                             
                                        </ul>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div></div>
                    </div>   
                </div>
                {formStatus.ciudad ==="Trujillo"?<div id={style.address}>
                    <div>
                        <label>
                            <div style={errorsForm.address?{border:"1px solid red"}:undefined} className={style.inputsContainer} id={style.inputAddressContainer}>
                                <input type="text" id='address' onChange={hanldeChange} value={formStatus.address} className={style.inputs} placeholder="Dirección de entrega" autoComplete='off' tabIndex="7"/>
                            </div>
                        </label>
                    </div>
                </div>:undefined}
                <div id={style.referenciasContainer}>
                    <label id={style.labelReferencias}>
                        <div style={errorsForm.instructions?{border:"1px solid red"}:undefined} id={style.divReferencias} className={style.inputsContainer}>
                            <textarea rows="2" name="" onInput={handleAutoResize} value={formStatus.instructions}  id="instructions" placeholder='Instrucciones especiales (opcional)'   onChange={hanldeChange} className={style.inputs} tabIndex="8" >
                            </textarea>
                        </div>
                    </label>
                </div>
                <div className={style.advertisement}>
                    <label>
                        <p>*Ingresar nombre y número de DNI correctamente.</p>
                    </label>
                </div>
                <div className={style.advertisement}>
                    <label>
                        <p>
                            *Entregas a domicilio o en un punto acordado, disponible para Trujillo. Para el resto del país, los productos serán envíados a través de Olva Courier. </p>
                    </label>
                </div>                
                <div className={style.advertisement}>
                    <label>
                        <p>
                            *Para compras antes de las 16:00 horas: En Trujillo entregas el mismo día, para el resto del pais en 24 horas.
                        </p>
                    </label>
                </div> 
                <div className={style.advertisement}>
                    <label>
                        <p>
                            *Para compras después de las 16:00 horas: En Trujillo entregas al día siguiente, para el resto del país hasta en 48 horas o menos.
                        </p>
                    </label>
                </div>
            </div>
        </div>
    )
};

export default Formulario;



