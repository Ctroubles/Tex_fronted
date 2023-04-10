import style from "./ShoppingCart.module.css"
import { useSelector } from "react-redux";
import CardShoppingCart from "./CardShoppingCart/CardShoppingCart";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";


const ShoppingCart = (props) =>{
    const itemsToBuy = useSelector(e=>e.shoppingCart)
    const [totalPrice,setTotalPrice] = useState(0)

    useEffect(()=>{
        let num = 0;
        itemsToBuy.forEach(e => {
            let price = e.price
            if(e.quantity)price=price*e.quantity
            num = num + price
        });
        setTotalPrice(num)

    },[itemsToBuy])

    const finalizarHandler = () =>{
        if (props.isAuthenticated)props.history.push("/finalizar");
        else props.setPopoutFinalizar(true);
    }

    return(
    <div id={style.ShoppingCart} ref={props.refCart}>
           <div>
            <h1>Carrito de compras</h1>
        </div>
       {itemsToBuy.length?<div style={{maxHeight: '560px',
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingRight: '0px',}} id={style.cardContainer}>
           {itemsToBuy.map(e=> <CardShoppingCart key={e._id} title={e.name} img={e.img} id={e._id}  cantidad={e.quantity} refToTrash={props.refToTrash}/>)}
        </div>:null }
        {!itemsToBuy.length?<div id={style.empty}>
           <p>Tu carrito está vacío :(</p>
        </div>:null}
        {itemsToBuy.length?<div>
            <span><span ref={props.buttonComprarRef} onClick={()=>finalizarHandler()} to={"/finalizar"}>Comprar</span> </span>
            <h3>${totalPrice}</h3>
        </div>:null}
    </div>
    )
};

export default ShoppingCart;