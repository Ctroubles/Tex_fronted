import style from './LoggingButton.module.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from '@material-ui/core';
import userimg from "../../../../assets/icons/user-login.svg";



const LoggingButton = () =>{
    const { loginWithRedirect } = useAuth0();
    const esAncho = useMediaQuery('(min-width: 680px)');


    return(
       <label style={{height:"40px"}}>
            {esAncho ?  <div  className={style.LinkCreate}  onClick={() => loginWithRedirect()}
            >
                INICIAR SESIÓN
                
            </div> : <img  onClick={() => loginWithRedirect()} id={style.imgLogIN} src={userimg} alt="imagen" />}
       </label>
    )

}

export default LoggingButton;