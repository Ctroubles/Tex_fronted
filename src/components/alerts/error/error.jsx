import style from "./error.module.css"
import X_error from "../../../assets/assets_alerts/X_red.svg"
import { useEffect } from "react";

const Succes = ({message})=>{

    useEffect(()=>{
        setTimeout(()=>{
            const alerta = document.getElementById(style.Error);
            alerta.classList.add(style.hide)
        },5000)
    },[])


    const throwAlert = ()=>{
        const alerta = document.getElementById(style.Error);
        alerta.classList.add(style.hide)
    };

    return(
        <label id={style.Error} >
            <span id={style.icon }> <img src={X_error} alt="X_error" /> </span>
            <label>{message}</label>
            <span id={style.close} onClick={()=>throwAlert()}>X</span>
        </label>
    )
}; 

export default Succes;