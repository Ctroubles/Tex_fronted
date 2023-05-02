import style from "./CardShoppingCart.module.css";
import trash_can from "../../../../../assets/icons/trash_can.svg";
import {useDispatch ,useSelector} from "react-redux";
import {removeItemCart, decrementCart, incrementCart} from "../../../../../redux/actions/actions";
import {useEffect, useState } from "react";

const CardShoppingCart= (props) =>{
    const dispatch = useDispatch()

    const itmesToBuy = useSelector(e=>e.shoppingCart)

    const [price, setPrice] = useState(0)

    useEffect(()=>{
        itmesToBuy.forEach(element => {
            if (element._id === props.id) {
                let precio = element.price;
                precio = precio * element.quantity
                setPrice (precio)
            }
        });
    },[itmesToBuy])


    return(
        <div id={style.CardShoppingCart}>
            <div id={style.presentation}>
                <div><img src={props.img} alt={props.title} /></div>
                <h1>{props.title}</h1>
            </div>
            <div id={style.quantity} >
                <span onClick={()=>dispatch(decrementCart(props.id))}>-</span>
                <p>{props.cantidad}</p>
                <span onClick={()=>dispatch(incrementCart(props.id))}>+</span>
            </div>
            <h2 id={style.price} >s/. {price.toFixed(2)}</h2>
            <div  id={style.trashIcon}ref={props.refToTrash} className="trash" onClick={()=>dispatch(removeItemCart(props.id))}><img src={trash_can} alt="Trash Can" /></div>
        </div>
    )
};


export default CardShoppingCart;