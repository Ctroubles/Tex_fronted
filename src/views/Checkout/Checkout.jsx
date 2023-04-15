import style from "./Checkout.module.css";
import MetodoPago from "./ComponentsCheckout/MetodoPago/MetodoPago";


const Checkout = ({userId})=>{



    return(
        <div id={style.Checkout}>
            <MetodoPago userId={userId}/>
        </div>
    )
};

export default Checkout;