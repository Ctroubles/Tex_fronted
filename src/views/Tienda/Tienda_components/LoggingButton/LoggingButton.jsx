import style from './LoggingButton.module.css'
import { useAuth0 } from "@auth0/auth0-react";


const LoggingButton = () =>{
    const { loginWithRedirect } = useAuth0();

    return(
        <div  className={style.LinkCreate}  onClick={() => loginWithRedirect()}
        >
            Iniciar sesión
        </div>
    )

}

export default LoggingButton;