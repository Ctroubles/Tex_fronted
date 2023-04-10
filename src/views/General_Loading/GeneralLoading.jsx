import style from './GeneralLoading.module.css' 
import logoTex from "../../assets/logos/TEX LOGO.svg"
 
 const Loading = ()=>{
    return(
         <div id={style.body}>
            <div className={style.center}>
                <div className={style.ring}></div>
                <span id={style.span}><img src={logoTex} alt="" /></span> 
            </div>
         </div>
           
    )
}

export default Loading;