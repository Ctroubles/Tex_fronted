import style from "./Header_tienda.module.css";
import text_logo_modern from "../../../../assets/logos/logo_tex_modern.png";
import LoggingButton from "../LoggingButton/LoggingButton";
import Logged from "../Logged/Logged";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import shoppingCart from "../../../../assets/icons/black-shopping-cart.svg"
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { el } from "date-fns/locale";




const Header_tienda =({setPopoutFinalizar,picture})=>{
    const { user,isAuthenticated,loginWithRedirect,isLoading} = useAuth0()
    const history = useHistory()

    const cartRef = useRef(null);
    const cartIconRef = useRef(null);
    const containerRef = useRef(null)
    const buttonComprarRef = useRef(null)



    const [usuario,setUsuario]= useState({})
    const [shoppingCartStatus, setShoppingCart] = useState(false)
    const [styleCartContainer, setStyleCartContainer] = useState({})
    const [numberStatus, setNumberStatus] = useState()



    const itemsToBuy = useSelector(e=>e.shoppingCart)



    useEffect(()=>{
        if(user)setUsuario({name:user.given_name,img:user.picture})
    },[user,isAuthenticated])


    useEffect(()=>{
        const setCartOff = (e) =>{
        e.stopPropagation();
        if (!containerRef?.current?.contains(e.target) && e.target !== cartIconRef?.current && e.target?.className!== "trash" && e.target?.className!== "buttonSumarCart")setShoppingCart(false)
        if(e.target===buttonComprarRef.current)setShoppingCart(false)
         }

        window.removeEventListener("click",setCartOff)
        window.addEventListener("click", setCartOff)


        if (shoppingCartStatus) {
            setStyleCartContainer({
                height: `${cartRef?.current?.scrollHeight}px`,
                transition: ' all 0.5s ease-in-out',
            });
        }else{
            setStyleCartContainer({
                height: `0px`,
                transition: 'all 0.5s ease-in-out',
            });
        }
        

        return () => {
            if(!shoppingCartStatus)window.removeEventListener('click', setCartOff);
          };
    },[shoppingCartStatus])


    useEffect(()=>{
        let num = 0;
        itemsToBuy.forEach(e => {
            num = num + e.quantity
        });
        setNumberStatus(num)

        if (shoppingCartStatus) {
            setStyleCartContainer({
                transition: 'all 0s ease-in-out',
                height: `${cartRef?.current?.scrollHeight}px`, 
            });
        }else{
            setStyleCartContainer({
                height: `0px`,
                transition: 'all 0 ease-in-out',
            });
        }


     
    },[itemsToBuy])

    const finalizarHanlder=()=>{
        if (isAuthenticated)history.push("/finalizar");
        else setPopoutFinalizar(true);
    }


    return(
            <div id={style.header}>
                <Link to={"/"} id={style.logoTexContainer}>
                    <img src={text_logo_modern} alt="" />
                </Link>  
                <label>
                    <div id={style.shoppingCartContainer}  style={shoppingCartStatus ? { backgroundColor: '#ffdf58' } : undefined} >
                        <div ref={cartIconRef}  onClick={()=>setShoppingCart(!shoppingCartStatus)} >
                            <img src={shoppingCart} alt="shoping Cart"/>
                        </div>
                        <div id={shoppingCartStatus?style.shoppingCartActive:undefined}>
                            <div ref={containerRef} style={styleCartContainer} id={style.carritoContenedor}>
                                 <ShoppingCart setPopoutFinalizar={setPopoutFinalizar} history={history} isAuthenticated={isAuthenticated} refCart={cartRef} buttonComprarRef={buttonComprarRef} />
                            </div>
                        </div>
                        <p id={style.itemNumber}>{numberStatus}</p>
                    </div>
                    <div style={{width:"155px"}}>
                        {isAuthenticated?(
                            <Logged img={picture} name={usuario.name} />
                        ):(
                            <LoggingButton/>
                        )}
                    </div>
                    
                </label>
                {itemsToBuy.length ?<span onClick={(e)=>finalizarHanlder(e)} id={style.finalizarCompre}>
                    <label>
                        <h3>Finalizar compra</h3>
                    </label>
                </span>:undefined}
            </div>
    )
};

export default Header_tienda;