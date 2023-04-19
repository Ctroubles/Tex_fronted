import style from "./Popout_finalizar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";



const Popout_finalizar = ({setPopoutFinalizar})=>{
    const { loginWithRedirect } = useAuth0();

    return(
        <div id={style.PopoutContainer} onClick={()=>setPopoutFinalizar(false)}>
            <div id={style.popout}>
                 <div>
                    <label>
                        ¿Cómo desea continuar su compra?
                    </label>
                </div>  
                <div>
                    <label>
                        <button id={style.logging} onClick={() => loginWithRedirect()}>Iniciar sesión</button>
                    </label>       
                    <label>
                        <Link to={"/finalizar"} id={style.ivited}>Como invitado</Link>
                    </label>
                </div>
            </div>
        </div>
    )
};

export default Popout_finalizar;