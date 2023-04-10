import style from "./Checkout.module.css";
import MetodoPago from "./ComponentsCheckout/MetodoPago/MetodoPago";


const Checkout = ()=>{



    return(
        <div id={style.Checkout}>
            <MetodoPago/>
        </div>
    )
};

export default Checkout;