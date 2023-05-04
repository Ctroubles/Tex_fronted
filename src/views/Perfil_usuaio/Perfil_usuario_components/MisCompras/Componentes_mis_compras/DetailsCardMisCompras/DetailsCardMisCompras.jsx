import style from "./DetailsCardMisCompras.module.css"
import succes  from "../../assets_mis_compras/success-svgrepo-com.svg"
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import pending from "../../../../../../assets/icons/yellow_clock.png";
import { useHistory } from "react-router-dom";


const DetailsCardMisCompras = ({setOrderFocus,orderFocus})=>{
    const history = useHistory()


    const msPDay = 24 * 60 * 60 * 1000;
    const date = format(new Date(orderFocus.date), "EEEE d 'de' MMMM 'de' y, HH:mm : ss", {locale: esLocale});
    

    const dosHorasEnMilisegundos = 2 * 60 * 60 * 1000;
    const treintaMinutosEnMilisegundos = 30 * 60 * 1000;

    const now = new Date().getTime();

    const over2hours = (now - orderFocus.date) > dosHorasEnMilisegundos;
    const over30minuts = (now - orderFocus.date) > treintaMinutosEnMilisegundos

    let status = 1;

   if (over2hours && !orderFocus.status) {
        status = 0
   }else if (!over2hours && !orderFocus.status) {
        status = 1
   }else if(orderFocus.status && !orderFocus.delivered && !over30minuts){
        status = 2;
   }else if(orderFocus.status && !orderFocus.delivered && over30minuts){
        status = 3;
   }else if(orderFocus.status && orderFocus.delivered){
        status = 4;
   }

    
    return(
        <div id={style.DetallesContainer}>
            <div id={style.topDetallesContainer}>
                <div id={style.aNombreDeContainer}>
                    <label id={style.aNombreDe}>
                        <span style={{marginRight:"10px"}}>A nombre de:</span>
                        <span className={style.values}>{orderFocus.fullName}</span>
                    </label>
                </div>
                <label id={style.compraStatus}>
                        {status ===0? (<label  style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/CANCELADO_pmqlme.png"} alt="succes" /><span style={{color:"#ff0000"}} >Anulado</span></label>)
                            : status === 1? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/PENDIENTE_ai7cl5.png"} alt="succes" /><span style={{color:"#FFFF00"}}>Pago pendiente</span></label>)
                            : status === 2? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/VALIDADO_svc1do.png"} alt="succes" /><span style={{color:"##0fa80f"}}>Pagado</span></label>)
                            : status === 3? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/EN_CAMINO_eziw1f.png"} alt="succes" /><span style={{color:"#2c9dc9"}}>En camino</span></label>)
                            : status === 4? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/ENTREGADO_eapqos.png"} alt="succes" /><span style={{color:"#0fa80f"}}>Entregado</span></label>):
                            <label>Contace a soporta para consultar el estado de su orden</label>
                        }                                               
                </label>
                <p onClick={()=>setOrderFocus({})} id={style.xToClose}>x</p>
            </div>
            <div id={style.mainDetallesCompras}>
                <div>
                <div id={style.mainTop}>
                <div>
                    <div id={style.fechaHoraContainer}>
                        <label>
                            <span className={style.atributtes}>Fecha de la compra:</span>
                            <span className={style.values}>{date}</span>
                        </label>
                    </div>
                </div>               
                <div>
                    <div id={style.montoTotal}>
                        <label>
                            <span className={style.atributtes}>Numero de contacto:</span>
                            <span className={style.values}>+51&nbsp;{orderFocus.phone}</span>
                        </label>
                    </div>
                </div>  
                <div>
                    <div id={style.montoTotal}>
                        <label>
                            <span className={style.atributtes}>Email de contacto:</span>
                            <span className={style.values}>{orderFocus.email}</span>
                        </label>
                    </div>
                </div>
                <div id={style.directionPropiedadesContainer}>
                    <label className={style.directionPropiedades} style={{marginTop:"15px"}}><span>Departamento: </span><span className={style.values} >{orderFocus?.department}</span></label>
                    <label className={style.directionPropiedades}><span>Ciudad: </span><span className={style.values}>{orderFocus?.city}</span></label>
                    {orderFocus?.address?<label className={style.directionPropiedades}><span>Dirección: </span><span className={style.values}>{orderFocus?.address}</span></label>:undefined}
                </div>
                <div id={style.productosContainer}>
                    <div>
                        <label className={style.atributtes}>
                            <span>Productos: </span>
                        </label>
                        <label>
                            <span className={style.atributtes}>Montol total:</span>
                            <span className={style.values}>s/ {orderFocus.totalPrice.toFixed(1)}</span>
                        </label>
                    </div>
                </div>
                    
                    </div>
                        <div id={style.cardsProductosOnDetailsContainer}>
                            {
                                orderFocus.products.map(e=>(<div key={e._id} id={style.cardsProductosOnDetails}>
                                                    <div>
                                                        <label id={style.CardContainer}>
                                                            <div id={style.firstDiv} className={style.contenedores}>
                                                                <div className={style.imgContainer}><img className={style.img} src={e.img} alt="" /></div>
                                                                <div className={style.titleContainer}><span id={style.titleCard}>{e.name}</span></div>
                                                            </div>
                                                            <div id={style.secondDiv} className={style.contenedores}>
                                                                <div className={style.divTwo}>
                                                                    <label>
                                                                        <span id={style.attributesCards}>Cantidad: </span>
                                                                        <span id={style.valuesCards}>{e.quantity}</span>
                                                                    </label>
                                                                    <label>
                                                                        <span id={style.attributesCards} >Precio unitario:</span>
                                                                        <span id={style.valuesCards}>s/&nbsp;{e.price.toFixed(2)}</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div id={style.thirdDiv} className={style.contenedores}>  
                                                                    <label>
                                                                        <span id={style.attributesCardsTotal}>Precio Total: </span>
                                                                        <span id={style.valuesCards}>&nbsp;s/&nbsp;{(e.price*e.quantity).toFixed(2)}</span>
                                                                    </label>
                                                            </div>                
                                                        </label>
                                                    </div>
                                                      </div>))
                            }
                                    <div id={style.footer}>
                                        <label id={style.thanks}><span>Gracias por su compra.</span></label>
                                        <label><span id={style.buttonIr} onClick={()=> history.push(`/pedidos/${orderFocus.nOrden}/${orderFocus._id}`)}>Ir</span></label>
                                    </div>
                        </div>
                    </div>
            </div>
        </div>
    )
};
export default DetailsCardMisCompras;