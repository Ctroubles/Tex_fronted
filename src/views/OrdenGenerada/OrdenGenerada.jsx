import style from "./OrdenGenerada.module.css";
import PedidoGenerado from "./ComponetsOdenGenerada/PedidoGenerado/PedidoGenerado";


const Checkout = ()=>{

    return(
        <div id={style.PedidoGenerado}>
            <PedidoGenerado/>
        </div>
    )
};

export default Checkout;