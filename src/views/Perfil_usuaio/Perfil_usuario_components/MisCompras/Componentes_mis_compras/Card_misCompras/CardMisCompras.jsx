import style from "./CardMisCompras.module.css";
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import succes from "../../../MisCompras/assets_mis_compras/success-svgrepo-com.svg";
import pending from "../../../../../../assets/icons/yellow_clock.png";

const CardMisCompras = ({onClickk , orden}) =>{

    // const direccion = direction?.city +"-"+ direction?.direction
    const date = format(new Date(orden.date), "EEEE d 'de' MMMM 'de' y, HH:mm", {locale: esLocale});
    const productosCantidad = orden.products.length



    console.log(orden);



    return(
        <div id={style.CardMisComprasContainer}>
            <div id={style.fechaContainer}>
                <label><span id={style.nOrden}>N°&nbsp;{orden.nOrden}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;</span><p id={style.fecha}>{date}</p></label>
                <label><button onClick={()=>onClickk({...orden,visible:true})}><span>Ver Detalles</span></button></label>
            </div>
            <div id={style.mainCardMisCompras}>
                <div>
                    <div id={style.deliveryStatus}>
                    <label id={style.compraStatus}>
                        {orden.status?(<label id={style.entregado} ><img src={succes} alt="succes" /><span>Entregado</span></label>):
                            (<label id={style.pendiente} ><img src={pending} alt="succes" /><span>Pendiente</span></label>)
                        }                                                
                    </label>
                    </div>
                    <div id={style.productosCantidad}>
                        <label>
                            <span className={style.attribute}>Cantidad de productos: </span> 
                            <span className={style.value}>{productosCantidad}</span> 
                        </label>
                    </div>
                    <div id={style.direction}>
                        <label>
                            <span className={style.attribute} >Ciudad:</span>
                            <span className={style.value}>{orden.city}</span>
                        </label>
                    </div>
                    <div id={style.precioSection}>
                        <label>
                            <span className={style.attribute}>Monto total:</span>
                            <span className={style.value}>s/.&nbsp;{orden.totalPrice}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardMisCompras;