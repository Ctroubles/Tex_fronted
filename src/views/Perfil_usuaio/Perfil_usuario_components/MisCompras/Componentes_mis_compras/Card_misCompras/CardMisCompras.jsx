import style from "./CardMisCompras.module.css";
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import succes from "../../../MisCompras/assets_mis_compras/success-svgrepo-com.svg";
import pending from "../../../../../../assets/icons/yellow_clock.png";
import { useMediaQuery } from '@material-ui/core';




const CardMisCompras = ({onClickk , orden}) =>{

    const dosHorasEnMilisegundos = 2 * 60 * 60 * 1000;
    const treintaMinutosEnMilisegundos = 30 * 60 * 1000;



    const widthMobile = useMediaQuery('(max-width: 680px)');

    const date = !widthMobile?format(new Date(orden.date), "EEEE d 'de' MMMM 'de' y, HH:mm", {locale: esLocale}):format(new Date(orden.date), "EEEE d 'de' MMMM 'de' y", {locale: esLocale});
    const productosCantidad = orden.products.length

    const ahora = new Date();

    const over2hours = (ahora.getTime() - orden.date) > dosHorasEnMilisegundos;
    const over30minuts = (ahora.getTime() - orden.date) > treintaMinutosEnMilisegundos

    let status = 1;

   if (over2hours && !orden.status) {
        status = 0
   }else if (!over2hours && !orden.status) {
        status = 1
   }else if(orden.status && !orden.delivered && !over30minuts){
        status = 2;
   }else if(orden.status && !orden.delivered && over30minuts){
        status = 3;
   }else if(orden.status && orden.delivered){
        status = 4;
   }

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
                        {status ===0? (<label  style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/CANCELADO_pmqlme.png"} alt="succes" /><span style={{color:"#ff0000"}} >Anulado</span></label>)
                            : status === 1? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/PENDIENTE_ai7cl5.png"} alt="succes" /><span style={{color:"#FFFF00"}}>Pago pendiente</span></label>)
                            : status === 2? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/VALIDADO_svc1do.png"} alt="succes" /><span style={{color:"##0fa80f"}}>Pagado</span></label>)
                            : status === 3? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/EN_CAMINO_eziw1f.png"} alt="succes" /><span style={{color:"#2c9dc9"}}>En camino</span></label>)
                            : status === 4? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/ENTREGADO_eapqos.png"} alt="succes" /><span style={{color:"#0fa80f"}}>Entregado</span></label>):
                            <label>Contace a soporta para consultar el estado de su orden</label>
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