import style from './LoadingCardContainer.module.css';





const LoadingCardContainer = () =>{


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

export default LoadingCardContainer;