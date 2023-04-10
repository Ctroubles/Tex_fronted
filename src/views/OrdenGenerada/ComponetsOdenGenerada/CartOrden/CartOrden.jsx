import style from "./CartOrden.module.css";


const CartOrden = ({name, price, img, quantity})=>{
    return(
        <div id={style.CartOrden}>
            <div id={style.product}>
                <div>
                    <img src={img} alt={img} />
                </div>
                <div>
                    <label><h2>{name}</h2></label>
                </div>
            </div>
            <div id={style.quantity}>
                <label><span>{quantity}</span></label>
            </div>
            <div id={style.precio}>
                <label>
                    <span>
                        s/ {price.toFixed(2)}
                    </span>
                </label>
            </div>
        </div>
    )
};

export default CartOrden