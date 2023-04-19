import { Link } from 'react-router-dom';
import Paypal from "./ShoppingComponents/PasarelaPago/PasarelaPago";
import Form from "./ShoppingComponents/FormularioShopping/FormularioShopping";
import ShoppingCart from './ShoppingComponents/ShoppingCart/ShoppingCart';
import { useRef, useState, } from "react";
import style from "./Shopping.module.css";
import CompraExitosa from "./ShoppingComponents/PasarelaPago/AlertsPasarela/CompraExitosa";
import logoTex from "../../assets/logos/logo_tex_modern.png";
import { validatorsLevel2 } from './helpers_shopping/helpers_shopping';
import { useSelector, useDispatch } from 'react-redux';
import { addDeliveryInformation } from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom';





const Shopping = (props) =>{
    // window.scroll({
    //     top: 0
    //   });
    const dispatch = useDispatch()
    const history = useHistory()

    // const itemsInCart = useSelector(e=>e.shoppingCart);



    const [estadoPasarela,setEstadoPasarela] = useState(0)
    const [errorsForm,setErrorsForm] = useState({})


    const statusForm = useRef(null)

    const submitHandler = ()=>{
        const errores = validatorsLevel2(setErrorsForm,statusForm.current)
        let approved = true;
        for(let i in errores){
            if(errores[i])approved=false;
        }
        // if (approved){
            dispatch(addDeliveryInformation(statusForm.current))
            history.push("/finalizar/checkout")
        // }
    }

    return(
        <>
            <div id={style.ContainerShopping}>
                <div id={style.headerShopping}>
                    <div>
                        <img onClick={()=>history.push("/tienda")} src={logoTex} alt="" />
                        <Link to={"/tienda"} tabIndex="1">Volver</Link>
                    </div>
                </div>
                <div id={style.mainShopping}>
                    <div id={style.firstChildMain}>
                        <div id={style.formularioContainer}>
                            <div>
                                {/* <div>
                                    <h1 id={style.titleFormulario}>Información de entrega</h1>
                                </div> */}
                                <section>
                                    <Form statusForm={statusForm} errorsForm={errorsForm} setErrorsForm={setErrorsForm}/>
                                    <div id={style.continuarButton}>
                                        <button onClick={()=>submitHandler()} id={style.principalButton} tabIndex="9">
                                            <span >Continuar</span>
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div id={style.cartContainer}>
                            <ShoppingCart/>
                        </div>
                    </div>
                </div>
                <div id={style.footerShopping}>
                    <div id={style.navFooter}>
                        <div>
                            <Link to={"/ayuda"}>Terminos y condiciones</Link>
                            <Link to={"/ayuda"}>Cómo cuidamos tu privacidad</Link>
                            <Link to={"/ayuda"}>Ayuda</Link>
                        </div>
                        <div>
                            <h2>Copyright © 2023 Tex Lima-Perú S.R.L.</h2>
                        </div>
                        <div id={style.firma}>
                            <p>With love C. Troubles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
  
};
export default Shopping;

