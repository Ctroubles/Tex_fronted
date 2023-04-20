import style from "./CardMisCompras.module.css";
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import succes from "../../../MisCompras/assets_mis_compras/success-svgrepo-com.svg";
import pending from "../../../../../../assets/icons/yellow_clock.png";
import { useMediaQuery } from '@material-ui/core';




const CardMisCompras = ({onClickk , orden}) =>{
    const widthMobile = useMediaQuery('(max-width: 680px)');


    const date = !widthMobile?format(new Date(orden.date), "EEEE d 'de' MMMM 'de' y, HH:mm", {locale: esLocale}):format(new Date(orden.date), "EEEE d 'de' MMMM 'de' y", {locale: esLocale});
    const productosCantidad = orden.products.length



    return(
        <div id={style.CardMisComprasContainer}>
            <div id={style.fechaContainer}>
                {widthMobile?( <label><span id={style.nOrden}>N°&nbsp;{orden.nOrden}&nbsp;&nbsp;&nbsp;&nbsp;</span><p id={style.fecha}>{date}</p></label>)
                :(<label><span id={style.nOrden}>N°&nbsp;{orden.nOrden}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;</span><p id={style.fecha}>{date}</p></label>)}
                <label><button onClick={()=>onClickk({...orden,visible:true})}><span>{widthMobile?"Detalles":"Ver detalles"}</span></button></label>
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
                    {!widthMobile?<div id={style.productosCantidad}>
                        <label>
                            <span className={style.attribute}>Cantidad de productos: </span> 
                            <span className={style.value}>{productosCantidad}</span> 
                        </label>
                    </div>:null}
                    {!widthMobile?<div id={style.direction}>
                        <label>
                            <span className={style.attribute} >Ciudad:</span>
                            <span className={style.value}>{orden.city}</span>
                        </label>
                    </div>:null}
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