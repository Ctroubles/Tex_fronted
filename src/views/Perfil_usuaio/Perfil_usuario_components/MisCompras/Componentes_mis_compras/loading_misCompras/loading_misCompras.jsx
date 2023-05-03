import style from "./loading_misCompras.module.css"

const LoadingMisCompras = ()=>{
    return(
        <div  id={style.Main}>
        <div className={style.loader}>
            <span className={style.loader__element}></span>
            <span className={style.loader__element}></span>
            <span className={style.loader__element}></span>
        </div>
    </div> 
    )
};

export default LoadingMisCompras;